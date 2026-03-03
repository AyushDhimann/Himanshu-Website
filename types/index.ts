/**
 * types/index.ts — Shared TypeScript Types
 *
 * This file defines the "shape" of the data used across the whole app.
 *
 * WHY HAVE TYPES?
 * Imagine you're writing a function that takes a car object. Without types,
 * you'd have to guess: "does it have car.specs or car.stat? Is it horsepower
 * or hp?" TypeScript tells you exactly what fields exist and what type they are.
 *
 * Once you define these here and import them elsewhere, VS Code will
 * autocomplete car. with the exact list of valid fields. No more typos!
 *
 * INTERFACE vs TYPE:
 * Both define object shapes. `interface` is preferred for objects you might
 * extend later (it reads like a blueprint). `type` is preferred for unions
 * or computed types. We use `interface` here since these are plain data shapes.
 */

/* ----------------------------------------------------------------
 * Car category — the filter values that appear in the nav bar.
 * This is a "union type" — the category MUST be one of these exact strings.
 * TypeScript will yell at you if you accidentally type 'SuperCar' instead of 'supercar'.
 * ---------------------------------------------------------------- */
export type CarCategory =
  | 'supercar'
  | 'hypercar'
  | 'suv-luxury'
  | 'concept-racing'

/* ----------------------------------------------------------------
 * CarSpecs — the two stat boxes on each card
 * ---------------------------------------------------------------- */
export interface CarSpecs {
  /** e.g. "630 hp" or "infinity" */
  horsepower: string
  /** e.g. "193 mph / 310 km/h" or "infinity" */
  topSpeed: string
}

/* ----------------------------------------------------------------
 * Car — a single entry in data/cars.json
 * ---------------------------------------------------------------- */
export interface Car {
  name:        string
  category:    CarCategory
  /** Absolute URL or /images/filename.ext (served from /public) */
  image:       string
  /** Alt text for screen readers — describes what the image shows */
  alt:         string
  description: string
  specs:       CarSpecs
}

/* ----------------------------------------------------------------
 * CarsData — the root shape of data/cars.json
 * ---------------------------------------------------------------- */
export interface CarsData {
  /** Optional comment field in the JSON — ignored at runtime */
  _comment?:    string
  _categories?: string[]
  cars:         Car[]
}

/* ----------------------------------------------------------------
 * Filter — the nav filter buttons
 * ---------------------------------------------------------------- */
export interface Filter {
  label: string
  value: 'all' | CarCategory
}
