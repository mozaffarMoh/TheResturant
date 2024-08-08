import { ClockSVG, AlarmClockSVG, UsersSVG, DurationSVG, PersonSVG, DateSVG } from '../../assets/icons';

export function metadataIcons(value: string) {
    if (value == "duration") return DurationSVG
    if (value == "the-person-conducted" || value == "minimum-number-of-people" || value == "maximum-number-of-people") return PersonSVG
    if (value == "date") return DateSVG
    if (value == "max-capacity" || value == "capacity-range") return UsersSVG
    if (value == "time" || value == "minimum-number-of-hours" || value == "maximum-number-of-hours") return ClockSVG
    return null
}