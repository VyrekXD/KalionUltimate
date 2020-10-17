
function checkPerms(member, ...perms){
    if (!perms.length) return false;

    return perms.every(perm => member.hasPermission(perm))
}
module.exports = { checkPerms }