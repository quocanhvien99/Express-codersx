module.exports.content = function(array, page) {    
    var perPage = 5;
    var start = (page - 1) * perPage;
    var end = page * perPage;
    return array.slice(start, end);
};
module.exports.nav = function(page, totalPages) {     
    var pages = [];    
    var start, end;
    if (totalPages < 5) {
        start = 1;
        end = totalPages;
    } else {
        if (page < 5) {
            start = 1;
            end = 5;
        } else {
            if (page % 2 == 1) {
                start = page - 2;
                end = page + 2;
            } else {
                start = page - 3;
                end = page + 1;
            }
        }
        if (page === totalPages) {
            start = page - 4;
            end = page;
        }
        if (page === totalPages - 1) {
            start = page - 3;
            end = page + 1;
        }
    }
    for (var i = start; i <= end; i++) {
        pages.push(i);
    }
    return pages;
};