import Explosion from "../Models/Explosion";
/**
 * Always provides a fresh explosion object.
 */
export type ExplosionProviderFunction = () => Explosion;
