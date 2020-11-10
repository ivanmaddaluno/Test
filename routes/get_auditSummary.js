const express = require("express");
const router = express.Router();
const { tags } = require("../formatted_tags_load_time.js");

const {
    fetch_audit_summary,
    fetch_pages_loadTime,
    fetch_tag_presence,
    fetch_tags_details_for_page,
} = require("../utils/fetch_functions.js");

const {
    classify_pages_based_on_loadTime,
    validate_tag_presence,
    validate_tags_load_time,
    tags_name_and_load_time_for_single_page,
    classify_tags_based_on_load_time,
} = require("../utils/functions.js");

router.get("/", async (req, res) => {
    let summary_run_id = "2186844"; // 2179542 100 pages test
    let summary_audit_id = "568228 "; // 567365 5000 pages test

    // const audit_summary = await fetch_audit_summary(
    //     summary_run_id,
    //     summary_audit_id
    // );

    // const pages_loadTime_summary = await fetch_pages_loadTime(
    //     summary_run_id,
    //     summary_audit_id
    // );

    // const pages_loadTime = await classify_pages_based_on_loadTime(
    //     pages_loadTime_summary
    // );
    // console.log("PAGES", pages_loadTime);

    // const tag_presence = await fetch_tag_presence(
    //     summary_run_id,
    //     summary_audit_id
    // );

    // validate_tag_presence(tag_presence);

    // const details = await fetch_tags_details_for_page(
    //     summary_run_id,
    //     summary_audit_id,
    //     "https://news.immobilienscout24.de/rss-feed/"
    // );

    //const details2 = tags_name_and_load_time_for_single_page(data);
    //console.log("Look", details2);
    //const times = validate_tags_load_time(details);

    // const tags_load_time = classify_tags_based_on_load_time(tags);
    // console.log(tags_load_time);
    res.send(/*tags_load_time*/ "sent");
});

module.exports = router;
