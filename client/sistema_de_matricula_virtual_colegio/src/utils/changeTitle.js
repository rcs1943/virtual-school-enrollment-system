const changeTitle = (currentPageName) => {
    document
        .querySelector('title')
            .innerText = `${currentPageName} | I.E. Victor Manuel Maurtua`;
};

export default changeTitle;