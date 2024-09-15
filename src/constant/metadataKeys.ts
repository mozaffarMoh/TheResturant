
export function metadataKeys(slug: string, t: any) {
    if (slug == "duration") return t('dialog.duration')
    if (slug == "the-person-conducted") return t('dialog.the-person-conducted')
    if (slug == "date") return t('dialog.date')
    if (slug == "time") return t('dialog.time')
    if (slug == "max-capacity") return t('dialog.max-capacity')
    if (slug == "capacity-range") return t('dialog.capacity-range')
    if (slug == "maximum-number-of-people") return t('dialog.maximum-number-of-people')
    if (slug == "minimum-number-of-people") return t('dialog.minimum-number-of-people')
    if (slug == "maximum-number-of-hours") return t('dialog.maximum-number-of-hours')
    if (slug == "minimum-number-of-hours") return t('dialog.minimum-number-of-hours')
    return null
}