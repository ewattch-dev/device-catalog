function extractPoints(input) {
    const result = {}
    const data = input.message

    if (input.message != null && Array.isArray(data)) {
        data.forEach((item) => {
            if (item.variable != null) {
                switch (item.variable) {
                    case "temperature":
                        if (!result.temperature) {
                            result.temperature = { unitId: "Cel", records: [] }
                        }
                        result.temperature.records.push({
                            eventTime: new Date(item.date).toISOString(),
                            value: item.value
                        })
                        break

                    case "humidity":
                        if (!result.humidity) {
                            result.humidity = { unitId: "%RH", records: [] }
                        }
                        result.humidity.records.push({
                            eventTime: new Date(item.date).toISOString(),
                            value: item.value
                        })
                        break

                    case "battery_voltage":
                        if (!result.batteryVoltage) {
                            result.batteryVoltage = { unitId: "V", records: [] }
                        }
                        result.batteryVoltage.records.push({
                            eventTime: new Date(item.date).toISOString(),
                            value: item.value
                        })
                        break
                        
                    case "disposable_battery_voltage":
                        if (!result.batteryVoltage) {
                            result.batteryVoltage = { unitId: "V", records: [] }
                        }
                        result.batteryVoltage.records.push({
                            eventTime: new Date(item.date).toISOString(),
                            value: item.value
                        })
                        break
                        
                    default:
                        break
                }
            }
        })
    } else {
        return {}
    }

    if(result.batteryVoltage != null && result.batteryVoltage.records.length === 1) {
        let val = result.batteryVoltage.records[0].value
        result.batteryVoltage = { unitId: "V", record: val }
    }
    if(result.humidity != null && result.humidity.records.length === 1) {
        let val = result.humidity.records[0].value
        result.humidity = { unitId: "%H", record: val }
    }

    if(result.temperature != null && result.temperature.records.length === 1) {
        let val = result.temperature.records[0].value
        result.temperature = { unitId: "Cel", record: val }
    }

    return result
}

exports.extractPoints = extractPoints
