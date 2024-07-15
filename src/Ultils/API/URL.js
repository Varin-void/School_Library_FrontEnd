export const Server = 'https://localhost:7285';
// export const Server = 'https://192.168.2.217:7285';

export const Host = Server + '/FT_SD_A_3';

export const LOGIN_URL = "/User/Login";

export const CHECK_LOGIN_URL = "/User/Get?";

export const USER_SEARCH = "/User/GetList";
export const USER_GET_ALL = "/User/Get/All";
export const USER_GET_BY_ID = "/User/Get/Id";
export const USER_CREATE = "/User/Create";
export const USER_UPDATE = "/User/Update";
export const USER_DELETE = "/User/Delete";
export const USER_ASSIGN_GROUP = "/Group/Add-User";
export const USER_REASSIGN_GROUP = "/Group/Remove-User";


export const GROUP_URL = "/Group/Get";
export const GROUP_CREATE = "/Group/Create";
export const GROUP_UPDATE = "/Group/Update";
export const GROUP_DELETE = "/Group/Delete";
export const GROUP_GET_BY_ID = "/Group/Get-Id";

export const BOOK_URL = "/Book/Get";
export const BOOK_CREATE = "/Book/Create";
export const BOOK_UPDATE = "/Book/Update";
export const BOOK_DELETE = "/Book/Delete";
export const BOOK_GET_BY_ID = "/Book/Get-Id";
export const BOOK_ASSIGN_GROUP = "/Group/Add-Book";
export const BOOK_REASSIGN_GROUP = "/Group/Remove-Book";

export const BOOK_DOWNLOAD = "/Book/Download";
export const LIBRARIAN_GET_SUMMARY = "/User/Get/Summary";
export const CHANGE_PASSWORD = "/User/ChangePassword";