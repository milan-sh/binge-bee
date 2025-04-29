const formatViews = (views: number): string => {
    if (views >= 1_000_000) {
        return `${(views / 1_000_000).toFixed(1)}M`;
    } else if (views >= 1_000) {
        return `${(views / 1_000).toFixed(1)}K`;
    } else if (views === 0) {
        return "No";
    } else {
        return views.toString();
    }
};


export default formatViews