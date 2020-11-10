import { chart_data } from "./chart_data.js";

const extract_pages_from_data = (chart_data) => {
    let pages = [];

    for (let page in chart_data) {
        pages.push(`<li>${page}</li>`);
    }

    return pages;
};

document.querySelector(".suggestions").innerHTML += extract_pages_from_data(
    chart_data
).join("");

document.querySelectorAll(".suggestions li").forEach((li) => {
    li.addEventListener("click", (e) => {
        document.querySelector(".choose-page-input").value =
            e.target.textContent;
        document.querySelector(".suggestions").style.visibility = "hidden";
    });
});

const extract_tags_name = (all_tags) => {
    let tags_name = [];
    all_tags.forEach((tag) => {
        for (let key in tag) {
            tags_name.push(key);
        }
    });

    return tags_name;
};

const extract_tags_load_time = (all_tags) => {
    let tags_load_time = [];
    all_tags.forEach((tag) => {
        for (let key in tag) {
            tags_load_time.push(tag[key].loadTime);
        }
    });

    return tags_load_time;
};

const extract_all_tags = (chart_data, page) => {
    //const pages = extract_pages_from_data(chart_data);
    const all_tags = [];
    for (let key in chart_data) {
        if (key === page) {
            console.log(key, page);
            all_tags.push(chart_data[key]);
        }
    }

    return all_tags;
};

document
    .querySelector(".choose-page-input")
    .addEventListener("focus", (e) => {});

// document.querySelector(".choose-page-input").addEventListener("blur", (e) => {
//     document.querySelector(".suggestions").style.visibility = "hidden";
// });

let tags_name;
let tags_load_time;
let input = document.querySelector(".choose-page-input");

input.addEventListener("keyup", (e) => {
    if (input.value) {
        document.querySelector(".suggestions").style.display = "block";
    } else {
        document.querySelector(".suggestions").style.display = "none";
    }
    document.querySelector(".suggestions").innerHTML = extract_pages_from_data(
        chart_data
    )
        .filter((el) => el.includes(e.target.value))
        .join("");

    document.querySelectorAll(".suggestions li").forEach((li) => {
        li.addEventListener("click", (e) => {
            document.querySelector(".choose-page-input").value =
                e.target.textContent;

            let all_tags = extract_all_tags(chart_data, e.target.textContent);

            document.querySelector(".suggestions").style.display = "none";

            tags_name = extract_tags_name(all_tags);
            tags_load_time = extract_tags_load_time(all_tags);

            document
                .querySelector("#renderBtn")
                .addEventListener("click", () => {
                    let data = tags_load_time; //[20000, 14000, 12000, 15000, 18000, 19000, 22000];
                    let labels = tags_name; /*[
                    "sunday",
                    "monday",
                    "tuesday",
                    "wednesday",
                    "thursday",
                    "friday",
                    "saturday",
                ];*/
                    renderChart(data, labels);
                });
        });
    });
});

function renderChart(data, labels) {
    document.getElementById("myChart").remove();

    document.querySelector(".container").innerHTML =
        '<canvas id="myChart"></canvas>';

    var ctx = document.getElementById("myChart").getContext("2d");

    var myChart = new Chart(ctx, {
        type: "line",
        data: {
            labels: labels,
            datasets: [
                {
                    label: "Load Time",
                    data: data,
                    borderColor: "#64b3f4", //"#40A6FF",
                    backgroundColor: "transparent",
                },
            ],
        },
        options: {
            scaleShowValues: true,
            layout: {
                padding: {
                    left: 50,
                    right: 50,
                    top: 50,
                    bottom: 50,
                },
            },
            legend: {
                display: true,
                labels: {
                    fontColor: "whitesmoke",
                },
            },
            scales: {
                xAxes: [
                    {
                        ticks: {
                            autoSkip: false,
                            fontColor: "whitesmoke",
                            fontSize: 14,
                        },
                    },
                ],
                yAxes: [
                    {
                        ticks: {
                            autoSkip: false,
                            fontColor: "whitesmoke",
                            fontSize: 14,
                        },
                    },
                ],
            },
        },
    });
}
