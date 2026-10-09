import { initialUsers, initialRooms, initialRecaps, initialCommunities, initialNotifications } from './seedData';

// Check if environment variables exist
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const isRealSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

// In-Memory Mock Store for Demo Mode
class MockSupabaseClient {
  constructor() {
    this.users = [...initialUsers];
    this.rooms = [...initialRooms];
    this.recaps = [...initialRecaps];
    this.communities = [...initialCommunities];
    this.notifications = [...initialNotifications];
    this.subscribers = [];
  }

  from(table) {
    const dataMap = {
      users: this.users,
      rooms: this.rooms,
      recaps: this.recaps,
      communities: this.communities,
      notifications: this.notifications
    };
    const dataset = dataMap[table] || [];

    return {
      select: () => ({
        eq: (col, val) => Promise.resolve({ data: dataset.filter(item => item[col] === val), error: null }),
        order: () => Promise.resolve({ data: dataset, error: null }),
        single: () => Promise.resolve({ data: dataset[0] || null, error: null }),
        then: (cb) => Promise.resolve({ data: dataset, error: null }).then(cb)
      }),
      insert: (newRows) => {
        const rows = Array.isArray(newRows) ? newRows : [newRows];
        dataset.push(...rows);
        this.emitRealtime(table, rows[0]);
        return Promise.resolve({ data: rows, error: null });
      },
      update: (updates) => ({
        eq: (col, val) => {
          const index = dataset.findIndex(item => item[col] === val);
          if (index !== -1) {
            dataset[index] = { ...dataset[index], ...updates };
            this.emitRealtime(table, dataset[index]);
          }
          return Promise.resolve({ data: dataset[index], error: null });
        }
      })
    };
  }

  channel(name) {
    return {
      on: (event, payload, callback) => {
        this.subscribers.push({ name, callback });
        return {
          subscribe: () => console.log(`Subscribed to channel ${name}`)
        };
      }
    };
  }

  emitRealtime(tableName, payload) {
    this.subscribers.forEach(sub => {
      if (sub.callback) sub.callback({ new: payload });
    });
  }
}

export const supabase = new MockSupabaseClient();
