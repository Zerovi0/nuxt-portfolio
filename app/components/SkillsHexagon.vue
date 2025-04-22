<template>
  <div class="skills-hexagon-container">
    <div class="hexagon-grid">
      <div 
        v-for="(percentage, skillName) in skills" 
        :key="skillName"
        class="hexagon-item"
      >
        <div 
          class="hexagon" 
          :style="{ 
            '--skill-percentage': `${percentage}%`,
            '--skill-color': getColorForPercentage(percentage)
          }"
        >
          <div class="hexagon-fill"></div>
          <div class="hexagon-content">
            <div class="skill-name">{{ skillName }}</div>
            <div class="skill-percentage">{{ percentage }}%</div>
          </div>
          <!-- Skill bar overlay appears on hover -->
          <div class="skill-bar-overlay">
            <div class="skill-bar-content">
              <div class="skill-name">{{ skillName }}</div>
              <div class="skill-percentage">{{ percentage }}%</div>
              <div class="skill-bar">
                <div class="skill-bar-fill" :style="{ width: `${percentage}%` }"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface SkillsProps {
  skills: Record<string, number>;
}

const props = defineProps<SkillsProps>();

// Function to generate color based on percentage
const getColorForPercentage = (percentage: number): string => {
  // Base color in OKLCH format 
  // Using the same color scheme as the rest of the portfolio
  if (percentage >= 80) {
    return 'oklch(0.68 0.15 160)'; // Green-ish for high proficiency
  } else if (percentage >= 60) {
    return 'oklch(0.68 0.1378 213.14)'; // Blue-ish (current theme color) for medium
  } else if (percentage >= 40) {
    return 'oklch(0.68 0.14 250)'; // Purple-ish for average
  } else {
    return 'oklch(0.68 0.15 30)'; // Orange-ish for beginner
  }
};
</script>

<style scoped>
.skills-hexagon-container {
  width: 100%;
  padding: 2rem 0;
}

.hexagon-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1.8rem;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.hexagon-item {
  width: 150px;
  height: 170px;
  margin: 0.5rem;
  position: relative;
  transition: transform 0.3s ease;
}

.hexagon-item:hover {
  transform: scale(1.05);
  z-index: 10;
}

.hexagon {
  width: 100%;
  height: 100%;
  position: relative;
  clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
  background: rgba(20, 10, 40, 0.3);
  transition: all 0.3s ease;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
  border: 2px solid var(--skill-color);
  overflow: hidden;
}

.hexagon:hover {
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.4), 0 0 15px var(--skill-color);
}

.hexagon:hover .hexagon-fill,
.hexagon:hover .hexagon-content {
  opacity: 0;
  visibility: hidden;
}

.hexagon:hover .skill-bar-overlay {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.hexagon-fill {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: var(--skill-percentage);
  background: var(--skill-color);
  transition: all 0.3s ease-out;
  opacity: 0.6;
  z-index: 1;
}

.hexagon-content {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  text-align: center;
  color: white;
  padding: 1rem;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  height: 100%;
  transition: all 0.3s ease;
}

/* Skill bar overlay */
.skill-bar-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(15, 5, 30, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
  transform: translateY(10px);
  z-index: 10;
}

.skill-bar-content {
  text-align: center;
  color: white;
  padding: 1rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.skill-bar {
  width: 85%;
  height: 6px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 3px;
  overflow: hidden;
  margin-top: 0.6rem;
}

.skill-bar-fill {
  height: 100%;
  background: var(--skill-color);
  border-radius: 3px;
  box-shadow: 0 0 8px var(--skill-color);
  transition: width 0.6s ease-in-out;
}

.skill-name {
  font-weight: bold;
  font-size: 1rem;
  margin-bottom: 0.3rem;
  text-shadow: 0 1px 4px rgba(0, 0, 0, 0.7);
  white-space: nowrap;
}

.skill-percentage {
  font-size: 0.9rem;
  font-weight: 600;
  color: white;
  text-shadow: 0 1px 4px rgba(0, 0, 0, 0.7);
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .hexagon-item {
    width: 120px;
    height: 140px;
  }
  
  .skill-name {
    font-size: 0.9rem;
  }
  
  .skill-percentage {
    font-size: 0.8rem;
  }
  
  .skill-bar {
    height: 5px;
    margin-top: 0.4rem;
  }
}

@media (max-width: 480px) {
  .hexagon-item {
    width: 100px;
    height: 120px;
  }
  
  .hexagon-grid {
    gap: 1rem;
  }
  
  .hexagon-content, 
  .skill-bar-content {
    padding: 0.75rem;
  }
  
  .skill-bar {
    height: 4px;
    margin-top: 0.3rem;
  }
}
</style>
