const scrollInterval = 350; // Thời gian giữa mỗi lần cuộn (ms), ví dụ: 1 giây
const scrollStep = 1500; // Khoảng cách cuộn mỗi bước (px)
// console.log(scrollStep)

async function scrollPageOrDiv(querySelector, direction = 'down') {
    const scrollTarget = getScrollTarget(querySelector);

    while (true) {
        autoSelectAllItems()

        const newScrollTop = getNewScrollTop(scrollTarget, direction);
        scrollTarget.scrollTo({
            top: newScrollTop,
            behavior: 'smooth'
        });

        await waitIfLoading()

        await sleep(scrollInterval)
    }
}

function getScrollTarget(querySelector) {
    // Nếu querySelector là null hoặc không tìm thấy, cuộn cả trang
    let scrollTarget = querySelector ? document.querySelector(querySelector) : window;

    if (querySelector && !scrollTarget) {
        console.log(`Không tìm thấy div với selector "${querySelector}". Vui lòng kiểm tra lại.`);
        return;
    }

    return scrollTarget
}

function getNewScrollTop(scrollTarget, direction = 'down') {
    const isWindow = scrollTarget === window;
    const currentScrollTop = isWindow ? window.pageYOffset || document.documentElement.scrollTop : scrollTarget.scrollTop;
    const scrollHeight = isWindow ? document.body.scrollHeight : scrollTarget.scrollHeight;
    const clientHeight = isWindow ? window.innerHeight : scrollTarget.clientHeight;

    // Tính toán vị trí cuộn mới
    let newScrollTop;

    if (direction === 'down') {
        newScrollTop = currentScrollTop + scrollStep;

        // Kiểm tra nếu đã cuộn đến cuối
        if (newScrollTop + clientHeight >= scrollHeight) {
            newScrollTop = scrollHeight - clientHeight;
        }
    } else if (direction === 'up') {
        newScrollTop = currentScrollTop - scrollStep;

        // Kiểm tra nếu đã cuộn đến đầu
        if (newScrollTop <= 0) {
            newScrollTop = 0;
        }
    } else if (direction === 'top') {
        // Cuộn lên đầu
        newScrollTop = 0;
    } else if (direction === 'bottom') {
        // Cuộn xuống cuối
        newScrollTop = scrollHeight - clientHeight;
    }

    return newScrollTop
}

function hasImageCurrentLoading() {
    return document.querySelectorAll('.RY3tic:not([data-latest-bg])').length > 0
        || document.querySelectorAll('.O1Wnce:empty').length > 0
}

async function waitIfLoading() {
    return await retryCallback(
        () => {
            if (hasImageCurrentLoading()) {
                console.log('Retry for check loading...');
                throw new Error('hasImageCurrentLoading');
            }
        },
    )
}

function autoSelectAllItems() {
    // document.querySelectorAll('div[jsaction="click:eWXOff"][aria-checked="false"]')
    //     .forEach(div => {
    //         div.click();
    //     })


    document.querySelectorAll('div[jsaction="mousedown:KamsZ; click:KamsZ; focus:AHmuwe; blur:O22p3e"][aria-checked="false"]')
        .forEach(div => {
            div.click();
        })
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

async function retryCallback(callback, maxRetries = 10, delay = 100) {
    let attempts = 0;


    while (true) {
        attempts++;
        try {
            return callback();
        } catch (error) {
        }

        if (attempts >= maxRetries) {
            break
        }


        await sleep(delay);
    }
}


scrollPageOrDiv('.yDSiEe.uGCjIb.zcLWac.eejsDc.TWmIyd', 'down');

