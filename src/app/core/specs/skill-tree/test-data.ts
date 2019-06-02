import { SkillDesc } from '../../skill-tree/skill-desc';
import { SkillDependency } from '../../skill-tree/skill-dependencies';

const skills: SkillDesc[] = [
    { name: 'Mage', id: 1 },
    { name: 'Fireball', id: 2 },
    { name: 'Electroshock', id: 3 },
    { name: 'Thunderbolt', id: 4 },
    { name: 'Freeze', id: 5 },
    { name: 'Snowstorm', id: 6 },
    { name: 'Warrior', id: 7 },
    { name: 'Strike', id: 8 },
    { name: 'Double Strike', id: 9 },
    { name: 'Slash', id: 10 },
    { name: 'Hit', id: 11 },
    { name: 'Knockout', id: 12 },
    { name: 'Roundhouse Kick', id: 13 }
];
const skillsDependencies: SkillDependency[] = [
    { id: 2, dependOnIds: [1] },
    { id: 3, dependOnIds: [2] },
    { id: 4, dependOnIds: [3] },
    { id: 5, dependOnIds: [2] },
    { id: 6, dependOnIds: [5] },
    { id: 8, dependOnIds: [7] },
    { id: 9, dependOnIds: [8] },
    { id: 10, dependOnIds: [8] },
    { id: 11, dependOnIds: [7] },
    { id: 12, dependOnIds: [11] },
    { id: 13, dependOnIds: [12, 10] },
];
export {skills, skillsDependencies};