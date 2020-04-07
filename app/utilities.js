const allAvatars = (ctx => {
    let keys = ctx.keys();
    return keys.map(ctx);
})(require.context('./images/avatars', true, /.*/));

export function randomArray(arr) {
    const index = Math.round(Math.random() * (arr.length - 1));
    return arr[0];
}

export function randomAvatar() {
    return './images/avatars/default-user.png';
    //return randomArray(allAvatars);
}