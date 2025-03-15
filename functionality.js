// javascript file that set the functionality of some of the components in the index.html file
// imported to the index.html file via the <script> tag in the end of the body part  

$(document).ready(function() {
    let bpg_K_to_folder = {
        "128": {"1": '128,256_0.0352_1.jpg', "2": '128_0.0248_2.jpg', "4": '128_0.0276_4.jpg', "7": '128,256_0.0363_7.jpg', "8": '128,256,1024,4096_0.0939_8.jpg', "17": '128,256_0.0325_17.jpg', "18": '128,256,1024_0.0380_18.jpg', "19": '128,256,1024_0.0442_19.jpg', "20": '128_0.0279_20.jpg', "21": '128,256_0.0375_21.jpg', "22": '128_0.0278_22.jpg', "23": '128,256_0.0329_23.jpg'}, 
        "256": {"1": '128,256_0.0352_1.jpg', "2": '256_0.0352_2.jpg', "4": '256,1024_0.0348_4.jpg', "7": '128,256_0.0363_7.jpg', "8": '128,256,1024,4096_0.0939_8.jpg', "17": '128,256_0.0325_17.jpg', "18": '128,256,1024_0.0380_18.jpg', "19": '128,256,1024_0.0442_19.jpg', "20": '256_0.0319_20.jpg', "21": '128,256_0.0375_21.jpg', "22": '256,1024_0.0332_22.jpg', "23": '128,256_0.0329_23.jpg'}, 
        "1024": {"1": '1024,4096_0.0433_1.jpg', "2": '1024,4096_0.0484_2.jpg', "4": '256,1024_0.0348_4.jpg', "7": '1024_0.0427_7.jpg', "8": '128,256,1024,4096_0.0939_8.jpg', "17": '1024_0.0386_17.jpg', "18": '128,256,1024_0.0380_18.jpg', "19": '128,256,1024_0.0442_19.jpg', "20": '1024_0.0440_20.jpg', "21": '1024,4096_0.0452_21.jpg', "22": '256,1024_0.0332_22.jpg', "23": '1024_0.0381_23.jpg'}, 
        "4096": {"1": '1024,4096_0.0433_1.jpg', "2": '1024,4096_0.0484_2.jpg', "4": '4096_0.0454_4.jpg', "7": '4096_0.0568_7.jpg', "8": '128,256,1024,4096_0.0939_8.jpg', "17": '4096_0.0552_17.jpg', "18": '4096_0.0462_18.jpg', "19": '4096_0.0507_19.jpg', "20": '4096_0.0576_20.jpg', "21": '1024,4096_0.0452_21.jpg', "22": '4096_0.0443_22.jpg', "23": '4096_0.0500_23.jpg'}
    };
    let psc_K_to_folder = {"128": "6_0251", "256": "6_0251", "1024": "7_0485", "4096": "7_0485"};
    let perco_ims = {'1': 0.0329, '2': 0.03268, '19': 0.03271, '22': 0.03271, '20': 0.03281, '17': 0.03284, '7': 0.03302, '8': 0.03302, '18': 0.03308, '4': 0.03311, '21': 0.03317, '23': 0.03329};
    let orig_bpps = {"1": 16.314727783203125, "2": 12.9637451171875, "4": 13.06585693359375, "7": 11.53411865234375, "8": 16.173004150390625, "13": 18.207366943359375, "15": 13.703948974609375, "17": 13.8753662109375, "18": 16.10675048828125, "19": 13.899169921875, "20": 10.289093017578125, "21": 13.991943359375, "22": 13.9517822265625, "23": 12.052703857421875};

    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ scroll back to top button ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // javascript code was taken from https://mdbootstrap.com/docs/standard/extended/back-to-top/
    //Get the button
    let mybutton = $("#btn-back-to-top")[0];
    // When the user scrolls down 20px from the top of the document, show the button
    window.onscroll = function () {
        if (document.body.scrollTop > 20 ||
            document.documentElement.scrollTop > 20) {
            mybutton.style.display = "block";
        } else {
            mybutton.style.display = "none";
        }
    }
    // When the user clicks on the button, scroll to the top of the document
    $("#btn-back-to-top").on("click", function () {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    });

    // ~~~~~~~~~~~~~~~~ toggle the uncopmressed methods ~~~~~~~~~~~~~~~~ 
    $('.btn-ourcomp').on('click', function() {
        let this_button = $(this);
        let current_input_id = $(this)[0].id;
        let task = current_input_id.split('-')[0];
        let method = current_input_id.split('-')[1];
        let column = current_input_id.split('-')[2];
        
        let columns_to_change = [];
        if (task == "posterior") {
            if (column == "104")
                columns_to_change = [104, 777, 11];
            else if (column == "0")
                columns_to_change = [0, 10, 120];
            else if (column == "107")
                columns_to_change = [107, 124];
            else if (column == "101")
                columns_to_change = [101, 114];
        } else if (task == "bfr") {
            if (column == "0005")
                columns_to_change = ["0005", "0022"];
            else if (column == "ana")
                columns_to_change = ["ana", "00042"];
        }
        
        for (let i = 0; i < columns_to_change.length; i++) {
            let slider_id = task + "-" + method + "-" + columns_to_change[i] + "-range";
            if (!this_button.hasClass('active')) {
                $("#" + slider_id).prop("disabled", false);
                $("#" + slider_id).trigger('input');
            } else {
                $("#" + slider_id).prop("disabled", true);
                let current_im_id = task + "-" + method + "-" + columns_to_change[i] + "-img";
                let current_bpp_id = task + "-" + method + "-" + columns_to_change[i] + "-bpp";
                let current_im_path = $("#" + current_im_id)[0].src;
                
                let new_im_path = current_im_path.replace(/noises=\w+/, "noises=inf");
                $("#" + current_im_id)[0].src = new_im_path;
                $("#" + current_bpp_id)[0].innerHTML = "no comp.";
            }
        }
        this_button.toggleClass('active');
    });

    // ~~~~~~~~~~~~~~~~ change text and active state of collapse buttons ~~~~~~~~~~~~~~~~ 
    $('.collapsing-button').on('click', function() {
        let this_button = $(this);
        this_button.toggleClass('active');
        if (this_button.hasClass('active')) {
            this_button.text("Close");
        } else {
            this_button.text("More samples");
        }
    });

    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ image bpp slider ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // event listener for changes to any range input elements on the page
    $('input[type=range]').on('input', function () {
        let current_input_id = $(this)[0].id;
        let current_im_id = current_input_id.replace('range', 'img')
        let current_bpp_id = current_input_id.replace('range', 'bpp')
        let current_range_value = current_input_id.replace('range', 'values')
        let current_im_path = $("#" + current_im_id)[0].src;
        let new_im_path = current_im_path;
        
        let rangeValue = $(this)[0].value;
        let newValue = $("#" + current_range_value + " option[value='" + rangeValue + "']").data("value");
        let optim_ts = 0;

        let task = current_input_id.split('-')[0];
        if (task == "compression") {
            new_im_path = current_im_path.replace(/num_noises=\d+/, "num_noises=" + newValue);
            optim_ts = 999;
        } else if (task == "posterior" | task == "bfr" | task == "ccg" | task == "ccfg") {
            new_im_path = current_im_path.replace(/noises=\w+/, "noises=" + newValue);
            optim_ts = 1000;
        }
        $("#" + current_im_id)[0].src = new_im_path;

        if ($("#" + current_bpp_id)[0].innerHTML.includes("BPP") || 
                $("#" + current_bpp_id)[0].innerHTML.includes("no comp.")) {
            if (!String(newValue).includes("inf")) {
                let newBPP = 0;
                let im_size = $("#" + current_im_id)[0].naturalHeight * $("#" + current_im_id)[0].naturalWidth;
                newBPP = optim_ts * Math.log2(newValue) / im_size;
                $("#" + current_bpp_id)[0].innerHTML = newBPP.toFixed(3) + " BPP";
            } else {
                $("#" + current_bpp_id)[0].innerHTML = "no comp.";
            }
        }

        let checked_radio_btn = $("input[id^=" + current_input_id.replace('range', 'compareim-radio') + "]:checked");
        checked_radio_btn.trigger('click');
    });

    // ~~~~~~~~~~~~~~~~ change text and active state of collapse buttons ~~~~~~~~~~~~~~~~ 
    $('.collapsing-button').on('click', function() {
        let this_button = $(this);
        this_button.toggleClass('active');
        if (this_button.hasClass('active')) {
            this_button.text("Close");
        } else {
            this_button.text("More samples");
        }
    });

    // ~~~~~~~~~~~~~~~~~~ change compression comparison image and bpp ~~~~~~~~~~~~~~~~~~
    $('input[name$=radio]').on('click', function() {
        let this_radio = $(this);
        let this_label = this_radio.next('label');
        let chosen_method_name = this_label.text();
        
        let current_task_div = this_radio[0].name.replace('radio', 'method');
        let current_im_id = this_radio[0].name.replace('radio', 'img');
        let current_im_path = $("#" + current_im_id)[0].src;
        let current_bpp_id = this_radio[0].name.replace('radio', 'caption');
        let current_range_value = $("#" + this_radio[0].name.replace('compareim-radio', 'range'))[0].value;
        current_range_value = $("#" + this_radio[0].name.replace('compareim-radio', 'values') + " option[value='" + current_range_value + "']").data("value");
        
        console.log(current_im_path);
        let im_name = this_radio[0].name.split('-')[1];

        let new_im_path = current_im_path;
        let new_bpp = 0;
        $("#" + current_bpp_id).show();

        $("#" + current_task_div)[0].innerHTML = chosen_method_name;

        if (chosen_method_name == "Original") {
            new_im_path = "resources/compression/gt/" + im_name + ".jpg";
            $("#" + current_bpp_id).hide();
            // new_bpp = orig_bpps[im_name.split('.')[0]].toFixed(2) + " BPP";
        } else if (chosen_method_name == "PSC-P") {
            new_im_path = "resources/compression/pscp/" + psc_K_to_folder[current_range_value] + "/" + im_name + ".jpg";
            new_bpp = parseFloat("0." + psc_K_to_folder[current_range_value].split('_')[1]).toFixed(3) + " BPP";
        } else if (chosen_method_name == "BPG") {
            new_im_path = "resources/compression/bpg/" + bpg_K_to_folder[current_range_value][im_name.split('.')[0]];
            new_bpp = parseFloat(bpg_K_to_folder[current_range_value][im_name.split('.')[0]].split('_')[1]).toFixed(3) + " BPP";
        } else if (chosen_method_name == "PerCo (SD)") {
            // perco is available only for K=128,256
            if (current_range_value == "128" || current_range_value == "256") {
                new_im_path = "resources/compression/perco/" + perco_ims[im_name.split('.')[0]] + "_" + im_name + ".jpg";
                new_bpp = perco_ims[im_name.split('.')[0]].toFixed(3) + " BPP";
            } else {
                new_im_path = "resources/compression/perco/unavailable.svg";
                new_bpp = "Unavailable";
            }
        }
             

        $("#" + current_im_id)[0].src = new_im_path;
        $("#" + current_bpp_id)[0].innerHTML = new_bpp;
    });

    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ slider synchronization ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    $("[id$=comp]").on('slide', function () {
    // $("[id^=posterior][id$=comp]").on('slide', function () {
        let current_slide_id = $(this)[0].id;
        // change all sliders with same number (of the different methods) to the same value (posterior-ours-1-comp)
        let current_slide_value = $(this)[0].value;
        let current_slide_task = current_slide_id.split('-')[0];
        // let current_slide_method = current_slide_id.split('-')[1];
        let current_slide_number = current_slide_id.split('-')[2];
        let methods = []; // for debugging in the

        console.log(current_slide_id);
        console.log(current_slide_value);
        console.log(current_slide_task);

        if (current_slide_task == "posterior") {
            methods = ["ours", "ddnm", "dps"];
        } else if (current_slide_task == "bfr") {
            methods = ["ours", "cpmrf", "cdifface", "cbfrffusion"];
            // methods = ["ours", "pmrf", "difface", "bfrffusion"];
            // methods = ["ours", "pmrf", "cpmrf", "difface", "cdifface", "bfrffusion", "cbfrffusion"];
        }
        for (let i = 0; i < methods.length; i++) {
            let other_slide_id = current_slide_task + "-" + methods[i] + "-" + current_slide_number + "-comp";
            console.log(other_slide_id);
            if (other_slide_id != current_slide_id) {
                $("#" + other_slide_id)[0].value = current_slide_value;
            }
        }
    });

});

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ copy button ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
function copyBib() {
  let copyText = $("#citation")[0];
  navigator.clipboard.writeText(copyText.getHTML());
}

