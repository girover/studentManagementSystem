const Result = require('./result');

const pagination = {
    currentPage: 1,
    totalPages: 0,
    pageSize: 10,
    totalItems: 0,
    links: {
        currentPage: null,
        nextPage: null,
        previousPage: null
    }
};


exports.paginate = async (model, page, pageSize) => {
    page = parseInt(page) || 1;
    pageSize = parseInt(pageSize) || 10;
    let result = null;
    pagination.links.currentPage = globalResponseResult.request.url;

    await model.countDocuments()
               .exec()
               .then(count => {
                    pagination.totalItems = count;
                    pagination.totalPages = Math.ceil(count / pageSize);
                });

    await model.find()
        .skip((page - 1) * pageSize)
        .limit(pageSize)
        .exec()
        .then(data => {
            result = Result.ok('Data retrieved successfully', data);
        });
    
    if(page < pagination.totalPages){
        pagination.links.nextPage = globalResponseResult.request.url.replace(/page=\d+/, 'page=' + (page + 1));
    }
    if(page > 1){
        pagination.links.previousPage = globalResponseResult.request.url.replace(/page=\d+/, 'page=' + (page - 1));
    }

    result.pagination = pagination;

    return result;
};