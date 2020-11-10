const fetch = require("node-fetch");
require("dotenv").config();

let api_key = process.env.API_KEY;
let url = "https://api.observepoint.com/v2";
let post_options = {
    method: "POST",
    body: "{}",
    headers: {
        Authorization: "api_key " + api_key,
        "Content-Type": "application/json",
    },
};

let get_options = {
    headers: {
        Authorization: "api_key " + api_key,
        "Content-Type": "application/json",
    },
};

exports.fetch_audit_summary = async (run_id, audit_id) => {
    let endpoint = `/report/summary/audit?run_id=${run_id}&audit_id=${audit_id}`;
    let response = await fetch(url + endpoint, get_options);
    return await response.json();
};

exports.fetch_JSerrors_for_audit = async (run_id, audit_id) => {
    let endpoint = `/web-audits/${audit_id}/runs/${run_id}/results/page/javascript-errors`;
    let response = await fetch(url + endpoint, options);
    return await response.json();
};

exports.fetch_pages_loadTime = async (run_id, audit_id) => {
    let endpoint = `/report/page/load-time/pages?run_id=${run_id}&audit_id=${audit_id}`;
    let response = await fetch(url + endpoint, post_options);
    let data = await response.json();

    return await data;
};

exports.fetch_tag_presence = async (run_id, audit_id) => {
    let endpoint = `/report/tag/presence?run_id=${run_id}&audit_id=${audit_id}`;
    let response = await fetch(url + endpoint, get_options);
    let data = await response.json();
    return await data.runTags[0].tags;
};

exports.fetch_tags_details_for_page = async (
    run_id,
    audit_id,
    url_to_check
) => {
    let url_to_check_encoded = encodeURIComponent(url_to_check);

    let endpoint = `/web-audits/${audit_id}/runs/${run_id}/results/pages/page?url=${url_to_check_encoded}`;
    let response = await fetch(url + endpoint, get_options);
    let data = await response.json();
    return await data.page.tags.map((tag) => {
        //console.log(tag);
        return {
            name: tag.tag.name,
            //"id":tag.tag.id
            loadTime: tag.loadtime,
        };
    });
};
