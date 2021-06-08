export const isAuth = {
    get: cb => {
        chrome.storage.local.get(['isAuth'], result => {
            cb(result.isAuth);
        });
    },
    set: (isAuth, cb) => {
        chrome.storage.local.set(
            {
                isAuth: isAuth,
            },
            () => {
                cb();
            }
        );
    },
};

export const articleStorage = {
    get: cb => {
        chrome.storage.local.get(['currentArticle'], result => {
            cb(result.currentArticle);
        });
    },
    set: (article, cb) => {
        chrome.storage.local.set(
            {
                currentArticle: article,
            },
            () => {
                cb();
            }
        );
    },
};

export const tagStorage = {
    get: cb => {
        chrome.storage.local.get(['currentArticleTag'], result => {
            cb(result.currentArticleTag);
        });
    },
    set: (tags, cb) => {
        chrome.storage.local.set(
            {
                currentArticleTag: tags,
            },
            () => {
                cb();
            }
        );
    },
};

export const userStorage = {
    get: cb => {
        chrome.storage.local.get(['readMeUserCredentials'], result => {
            cb(result.readMeUserCredentials);
        });
    },
    set: (userCredentials, cb) => {
        chrome.storage.local.set(
            { readMeUserCredentials: userCredentials },
            () => {
                cb();
            }
        );
    },
};

export function clearStorage() {
    chrome.storage.local.clear(function (obj) {
        console.log("cleared");
    });
}



