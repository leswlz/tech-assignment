// This program calculates the most suitable (with most power) link station for a device at given point [x,y]


// Return a distance between two points (point_a and point_b)
function get_distance(point_a, point_b) {
    return Math.sqrt((point_a[0] - point_b[0])**2 + (point_a[1] - point_b[1])**2);
}

// Calculate link station's power with the following formula:
// power = (reach - device's distance from linkstation)^2
// and if distance > reach, then power = 0
function get_power(point, link_station) {
    distance = get_distance(point, link_station)
    if (distance > link_station[2]) {
        return 0;
    } else {
        return (link_station[2] - distance)**2
    }
}

// Get the best link statition for a given device
function get_best_link_station(devices, link_stations) {
    let i, j;

    for (i of devices) {
        let best_link_station = [0, 0, 0];
        for (j of link_stations) {
            let power = get_power(i, j);
            if (power > best_link_station[0]) {
                best_link_station[0] = power;
                best_link_station[1] = j[0];
                best_link_station[2] = j[1];
            }
        }

        if (best_link_station[0] == 0) {
            console.log("No link station within reach for point " + i[0] + "," + i[1]);
        } else {
            console.log("Best link station for point " + i[0]  + "," + i[1] + " is " + best_link_station[1] + "," + best_link_station[2]
            + " with power " + best_link_station[0])
        }
    }
}

// Run the program with exercise data
function run_with_default_data() {
    // Every device has two coordinates (x and y)
    const devices = [
        [0, 0],
        [100, 100],
        [15, 10],
        [18, 18]
    ];
    // Link stations​ are located at points (x, y) and have reach (r) ([x, y, r])
    const link_stations = [
        [0, 0, 10],
        [20, 20, 5],
        [10, 0, 12]
    ]
 
    // Find the best link station for a device or a set of devices
    get_best_link_station(devices, link_stations)
}

run_with_default_data()
