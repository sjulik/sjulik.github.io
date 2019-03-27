function remove_selected_item(elem, e) {
    e.stopPropagation();
    var option_text = elem.parentElement.querySelector(".select_content").innerHTML;
    var option_value = elem.parentElement.querySelector(".select_content").dataset.optionValue;
    var selector = elem.parentElement.parentElement.parentElement.querySelector(".select_select");
    
  
    selector.innerHTML += "<option value='"+ option_value +"'>"+ option_text +"</option>";
    
    if (selector.length > 1)
        selector.style.display = "block";
    
    var selected_items = elem.parentElement.parentElement.parentElement.querySelectorAll(".select_item");
    if (selected_items.length == 1) {
        var placeholder = elem.parentElement.parentElement.parentElement.querySelector(".select_placeholder");
        placeholder.style.display = "block";
    }

    
    elem.parentElement.parentElement.removeChild(elem.parentElement);
}

function add_selected_item(elem, e) {
    e.stopPropagation();
    var option_text =  elem[elem.selectedIndex].text;
    var option_value =  elem[elem.selectedIndex].value;
    var selected_items = elem.parentElement.querySelector(".select_items");
    var placeholder = elem.parentElement.querySelector(".select_placeholder");
    if (option_value === "filler" && option_text === "")
        return;

    placeholder.style.display = "none";
   

    selected_items.innerHTML += "<div class='select_item'><div data-option-value='"+ option_value +"' class='select_content'>"+ option_text +"</div><div class='select_del' onclick='remove_selected_item(this, event);'><div class='select_x'></div><div class='select_x'></div></div></div> ";

  
    elem[elem.selectedIndex].parentElement.removeChild(elem[elem.selectedIndex]);
    if (elem.length == 1)
        elem.style.display = "none";
}

function get_selected_items(select7_id, type/* = "both"*/) {
    type = type || "both";
    var selected_items = document.getElementById(select7_id).querySelectorAll(".select_content");

    if (selected_items.length > 0) {
        var selected_values = [];
        
        if (type == "value")
            for (let i = 0; i < selected_items.length; i++)
                selected_values.push(selected_items[i].dataset.optionValue);
        
                if (type == "text")
            for (let i = 0; i < selected_items.length; i++)
                selected_values.push(selected_items[i].innerHTML);
        
        if (type == "both")
            for (let i = 0; i < selected_items.length; i++)
                selected_values.push({
                    "text": selected_items[i].innerHTML,
                    "value": selected_items[i].dataset.optionValue,
                });

        return selected_values;
    }

    return null;
}
