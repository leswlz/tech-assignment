// This program calculates the most suitable (with most power) link station for a device at given point [x,y]


// Return a distance between two points
function get_distance(device, link_station) {
    return Math.sqrt((device[0] - link_station[0])**2 + (device[1] - link_station[1])**2);
}

// Calculate link station's power with the following formula:
// power = (reach - device's distance from linkstation)^2
// and if distance > reach, then power = 0
function get_power(device, link_station) {
    distance = get_distance(device, link_station)
    if (distance > link_station[2]) {
        return 0;
    } else {
        return (link_station[2] - distance)**2
    }
}

// Get the best link statition for a given device / set of devices
function get_best_link_station(devices, link_stations) {
    let d, ls;

    for (d of devices) {
        let best_link_station = [0, 0, 0];
        for (ls of link_stations) {
            let power = get_power(d, ls);
            if (power > best_link_station[0]) {
                best_link_station[0] = power;
                best_link_station[1] = ls[0];
                best_link_station[2] = ls[1];
            }
        }

        if (best_link_station[0] == 0) {
            console.log("No link station within reach for point " + d[0] + "," + d[1]);
            return "No link station within reach for point " + d[0] + "," + d[1];
        } else {
            console.log("Best link station for point " + d[0]  + "," + d[1] + " is " + best_link_station[1] + "," + best_link_station[2]
            + " with power " + best_link_station[0])
        }
    }
}

// Run the program with exercise data
function run_with_default_data() {
    // Every device has two coordinates (x and y)
    const devices = [
        [4, 4]
        //[0, 0],
        //[100, 100],
        //[15, 10],
        //[18, 18]
    ];
    // Link stations​ are located at points (x, y) and have reach (r) ([x, y, r])
    const link_stations = [
        [3, 3, 10]
        //[0, 0, 10],
        //[20, 20, 5],
        //[10, 0, 12]
    ];
 
    // Find the best link station for a device or a set of devices
    get_best_link_station(devices, link_stations)
}

// Expose functions as modules
module.exports = {
    get_distance: function(device, link_station) {
        return get_distance(device, link_station);
    },
    get_power: function(device, link_station) {
        return get_power(device, link_station);
    },
    get_best_link_station: function(devices, link_stations) {
        return get_best_link_station(devices, link_stations);
    }
}

// Run the program with default data
run_with_default_data()
