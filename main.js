
var button = document.querySelector(".save_button");
var siteName = document.querySelector("[name='site_name']");
var url = document.querySelector("[name='url']");
var bookmarksSection = document.querySelector(".bookmarks");
if(typeof(localStorage.bookmark) == "undefined"){
localStorage.bookmark = "";
}
button.addEventListener("click", function(e){
    e.preventDefault();
    
    let patternURL = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    
    let arrayItems, check = false, adr, itemAdr;
    
    if(siteName.value === ""){
        alert("you must fill the siteName input");
    } else if(url.value === ""){
        alert("you must fill the url input");
    } else if(!patternURL.test(url.value)){
        alert("you must enter a valid url");
    } else{
        
        arrayItems = localStorage.bookmark.split(";");
        adr = url.value;
        adr = adr.replace(/http:\/\/|https:\/\//i, "");
        arrayItems.length--;
        for(item of arrayItems){
            itemAdr = item.split(',')[1].replace(/http:\/\/|https:\/\//i,"");
            if(itemAdr == adr){
            check = true;
            }
        }
            
        if(check == true){
            alert("This website is already bookmarked");
        }
        else{
            localStorage.bookmark += `${siteName.value},${url.value};`;
            addBookmark(siteName.value, url.value);
            siteName.value = "";
            url.value = "";
        }
    }
    });
function addBookmark(name, url){
    let dataLink = url;
    if(!url.includes("http")){
        url = "//" + url;
    }
    let item = `<div class="bookmark">
                <span>${name}</span>
                <a class="visit" href="${url}" target="_blank"
                    data-link='${dataLink}'>Visit</a>
                <a onclick="removeBookmark(this)"
                    class="delete" href="#">delete</a>
                </div>`;
    bookmarksSection.innerHTML += item;
    }

(function fetchBoookmark(){
    if(typeof(localStorage.bookmark) != "undefined" && localStorage.bookmark !== ""){
        let arrayItems = localStorage.bookmark.split(";");
        arrayItems.length--;
        for(item of arrayItems){
        let itemSpli = item.split(',');
        addBookmark(itemSpli[0], itemSpli[1]);
        }
    }
    })();
function removeBookmark(thisItem){
    let arrayItems = [],
        index,
        item = thisItem.parentNode,
        itemURL = item.querySelector(".visit").dataset.link,
        itemName = item.querySelector("span").innerHTML;
    arrayItems = localStorage.bookmark.split(";");
        
    for(i in arrayItems){
        if(arrayItems[i] == `${itemName},${itemURL}`){
        index = i;
        break;
        }
    }
    index = arrayItems.indexOf(`${itemName},${itemURL}`);
    arrayItems.splice(index,1);
    localStorage.bookmark = arrayItems.join(";");
    
    bookmarksSection.removeChild(item);
    }
                