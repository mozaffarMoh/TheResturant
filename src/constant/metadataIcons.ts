import { ClockSVG, AlarmClockSVG, UsersSVG, DurationSVG, PersonSVG, DateSVG } from '../../assets/icons';

export function metadataIcons(value: string) {
    if (value == "duration") return DurationSVG
    if (value == "the-person-conducted") return PersonSVG
    if (value == "date") return DateSVG
    if (value == "max-capacity") return UsersSVG
    if (value == "time") return ClockSVG
    return null
}