/**
 * @preserve Copyright 2010-2020s Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

/**
 * Module:          EnemyColorOptions
 * Responsibility:  Define the options for enemy colors. Used by the DefaultEnemy to set colors for explosions and frames.
 */

export default interface EnemyColorOptions {
    /**
     * The color of an explosion.
     */
    explosionColor?: string;

    /**
     * The color of the explosions particle.
     */
    explosionParticleColor?: string;

    /**
     * Some enemies very in color.
     */
    varyingEnemyColor?: string;
}
