most_simple_slide();

function check_selenium() {
    return document.$cdc_asdjflasutopfhvcZLmcfl_ || window.navigator.webdriver;
}

function most_simple_slide() {
    if(check_selenium()){
        $("#is_selenium").text("是");}
    else{
        $("#is_selenium").text("不是");}

}

$("#reset_inner").click(function () {
    check_selenium();
})
