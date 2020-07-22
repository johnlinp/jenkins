function createFilterMenuButton (button, menu, menuAlignment, menuMinScrollHeight) {
    var menuButton = new YAHOO.widget.Button(button, {
        type: "menu",
        menu: menu,
        menualignment: menuAlignment,
        menuminscrollheight: menuMinScrollHeight
    });

    var filter = _createFilter(menuButton._menu);

    menuButton._menu.element.appendChild(filter);
    menuButton._menu.showEvent.subscribe(function() {
        filter.firstElementChild.value = '';
        _applyFilterKeyword(menuButton._menu, filter.firstElementChild);
    });
    menuButton._menu.setInitialFocus = function () {
        setTimeout(function() {
            filter.firstElementChild.focus();
        }, 0);
    };

    return menuButton;
}

function _createFilter (menu) {
    var filterInput = document.createElement("input");
    filterInput.style.width = '100%';
    filterInput.setAttribute("placeholder", "Filter");
    filterInput.onkeyup = _onFilterKeyUp.bind(menu);

    var filterContainer = document.createElement("div");
    filterContainer.appendChild(filterInput);

    return filterContainer;
}

function _onFilterKeyUp (evt) {
    _applyFilterKeyword(this, evt.target);
}

function _applyFilterKeyword (menu, filterInput) {
    var filterKeyword = filterInput.value;
    var itemList = menu.body.children[0];
    var item, match;
    for (item of itemList.children) {
        match = (item.innerText.toLowerCase().indexOf(filterKeyword) !== -1);
        item.style.display = match ? '' : 'NONE';
    }
    menu.align();
}
