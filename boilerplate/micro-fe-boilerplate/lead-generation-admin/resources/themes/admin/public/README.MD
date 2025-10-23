# Change log

# 1.0

## extra_fields

add :

- desc
- submit
- title
- fields
- popUpTermAgreeText
- popUpTermText
- popUpTermURL
- popupThankyouDesc
- popupThankyouTitle

- target (JSON string [])
- targetType (links, tags)

# 1.1

- Using https://jqueryvalidation.org/ for valid form (check by control name)
- Using http://intl-tel-input.com/ for validation phone number

## extra_fields

Update data when submit lead:

- old

```
 { [control]: value }
```

- new

```
  {
    key: ""
    control: "",
    value: "",
  }
```

Remove:

- target
- targetType

Add:

- listTargetCheck (JSON string [link, csv])
