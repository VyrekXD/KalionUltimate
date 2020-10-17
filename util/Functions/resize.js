function resize(user, size = 2048) {
    let root = "https://cdn.discordapp.com/avatars"; 
    
    const validSizes = Array.from({ length: 9 }, (e, i) => 2 ** (i + 4));
    if (!validSizes.includes(parseInt(size))) size = 2048; 
       
    return `${root}/${user.id}/${user.avatar}.${user.avatar.startsWith("a_") ? "gif" : "png"}?size=${size}`;
}
