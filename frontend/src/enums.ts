export const ApplicationStatus = {
    pending: 'pending',
    accepted: 'accepted',
    rejected: 'rejected'
} as const

export type ApplicationStatus = (typeof ApplicationStatus)[keyof typeof ApplicationStatus]


export const Status = {
    complete: 'complete',
    pending: 'pending',
    in_Progress: 'in_Progress',
    not_Complete: 'not_Complete',
    cancelled: 'cancelled'
} as const

export type Status = (typeof Status)[keyof typeof Status]


export const TaskTypes = {
    tutoring: 'tutoring',
    delivery: 'delivery',
    freelance: 'freelance',
    moving: 'moving',
    tech_support: 'tech_support',
    general: 'general',
    other: 'other'
} as const

export type TaskTypes = (typeof TaskTypes)[keyof typeof TaskTypes]


export const EventTypes = {
    social: 'social',
    sport: 'sport',
    academic: 'academic',
    career: 'career',
    cultural: 'cultural',
    volunteering: 'volunteering',
    other: 'other'
} as const

export type EventTypes = (typeof EventTypes)[keyof typeof EventTypes]


export const Rating = {
    ONE: 'ONE',
    TWO: 'TWO',
    THREE: 'THREE',
    FOUR: 'FOUR',
    FIVE: 'FIVE'
} as const

export type Rating = (typeof Rating)[keyof typeof Rating]
