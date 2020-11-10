const fs = require("fs");
const { data } = require("../pages_loadTime.js");
const { fetch_tags_details_for_page } = require("./fetch_functions.js");

exports.classify_pages_based_on_loadTime = (response) => {
    const slow = {};
    const average = {};
    const fast = {};
    //console.log(response.runPages[0].pages);
    response.runPages[0].pages.forEach((page) => {
        if (Math.abs(page.loadTime) >= 6000) {
            slow[page.url] = Math.abs(page.loadTime);
        } else if (
            Math.abs(page.loadTime) < 6000 &&
            Math.abs(page.loadTime) >= 3000
        ) {
            average[page.url] = Math.abs(page.loadTime);
        } else if (Math.abs(page.loadTime) < 3000) {
            fast[page.url] = Math.abs(page.loadTime);
        }
    });

    const data = JSON.stringify(slow);
    fs.writeFile(
        "./pages_loadTime.js",
        data /*.replace(/":/g, '"=')*/,
        (err) => {
            if (err) {
                console.log(err);
            } else {
                console.log("File saved");
            }
        }
    );
};

exports.validate_tag_presence = (tags) => {
    const alerts = {};
    // TOTAL : 37 tags
    //Facebook Conversion / Facebook Events / Taboola Loader / TVSquared Tracker / TVSquared Loader / Bing Event Tracking / Taboola / LinkedIn Insights / Bing Ad Loader / SalesForce DMP Consent
    const tagToValidate = {
        IVW: true,
        "Data Layer": true,
        comScore: true,
        "Google Universal Analytics": true,
        "Tealium Tag Load": true,
    };

    tags.forEach((tag) => {
        if (tagToValidate[tag.name]) {
            if (tag.percentTagged < 98) {
                console.log("error");
            } else {
                console.log(
                    tag.name,
                    "is present on",
                    tag.percentTagged + "% of the pages"
                );
            }
        }
    });
};

exports.validate_tags_load_time = (tags) => {
    return tags.map((tag) => {
        return { [tag.tag.name]: [tag.loadTime] };
    });
};

exports.tags_name_and_load_time_for_single_page = async (pages) => {
    let load_time_details_all_pages = [];
    for (page in pages) {
        console.log(page);
        await load_time_details_all_pages.push({
            [page]: await fetch_tags_details_for_page(
                "2186844",
                "568228",
                page
            ),
        });
    }

    const data = JSON.stringify(load_time_details_all_pages);

    fs.writeFile(
        "./all_pages_loadTime_details.js",
        data /*.replace(/":/g, '"=')*/,
        (err) => {
            if (err) {
                console.log(err);
            } else {
                console.log("File saved");
            }
        }
    );

    return load_time_details_all_pages;
};

exports.classify_tags_based_on_load_time = (tags) => {
    let all_tags = {};
    let slow = {};
    let average = {};
    let fast = {};

    let pages = Object.keys(data);

    tags.forEach((tag, i) => {
        all_tags[pages[i]] = {};
        tag[pages[i]].forEach((el) => {
            let tag_name = Object.keys(el);
            if (all_tags[pages[i]][tag_name]) {
                all_tags[pages[i]][tag_name].presence++;
            } else {
                all_tags[pages[i]][tag_name] = {
                    loadTime: el[tag_name],
                    presence: 1,
                };
            }
        });
    });

    let data_for_chart = JSON.stringify(all_tags);
    console.log(data_for_chart);
    fs.writeFile("./chart_data.js", data_for_chart, (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log("File saved");
        }
    });

    return all_tags;
};
