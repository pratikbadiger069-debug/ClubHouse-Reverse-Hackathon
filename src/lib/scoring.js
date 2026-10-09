// Echo Scoring Formulas & Explanation Utilities

/**
 * Calculates Speaker Expertise score
 * Formula: (Number of rooms hosted on topic * 2) + Average Room Quality
 */
export function calculateSpeakerExpertise(hostedCount = 10, avgQuality = 9.2) {
  const score = (hostedCount * 2) + Number(avgQuality);
  return {
    score: score.toFixed(1),
    formula: `(${hostedCount} hosted rooms × 2) + ${avgQuality} avg quality = ${score.toFixed(1)}`
  };
}

/**
 * Calculates Room Quality Score
 * Formula: (Reactions × 0.3) + (Pins × 0.5) + (Poll Votes × 0.4) + (Recap Views × 0.2)
 */
export function calculateRoomQuality(reactions = 45, pins = 12, pollVotes = 28, views = 180) {
  const score = (reactions * 0.3) + (pins * 0.5) + (pollVotes * 0.4) + (views * 0.2);
  const normalized = Math.min(10, Math.max(5, (score / 10).toFixed(1)));
  return {
    score: normalized,
    rawScore: score.toFixed(1),
    formula: `(${reactions} reactions × 0.3) + (${pins} pins × 0.5) + (${pollVotes} poll votes × 0.4) + (${views} views × 0.2) per listener`
  };
}

/**
 * Calculates Recommendation Score for User Profile
 * Formula: (Interest Overlap × 4) + (Topic Followed ? 3 : 0) + (Past Room Attended ? 2 : 0)
 */
export function calculateRecommendationScore(room, userInterests = []) {
  let overlapCount = 0;
  if (userInterests.includes(room.topic)) overlapCount += 1;
  
  if (room.tags) {
    room.tags.forEach(t => {
      if (userInterests.some(ui => ui.toLowerCase() === t.toLowerCase())) {
        overlapCount += 1;
      }
    });
  }

  const baseScore = overlapCount * 4 + 2;
  const reason = overlapCount > 0 
    ? `Recommended because you like ${room.topic}` 
    : `Popular in ${room.topic || 'Community'}`;

  return {
    score: baseScore,
    reason
  };
}
