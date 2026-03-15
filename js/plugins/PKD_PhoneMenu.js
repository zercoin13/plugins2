/*
 * Copyright (c) 2024 Vladimir Skrypnikov (Pheonix KageDesu)
 * <http://kdworkshop.net/>
 *

* License: Creative Commons 4.0 Attribution, Share Alike, Commercial

 */

/*:
 * @plugindesc (v.1.2)[PRO] Mobile Phone Menu
 * @author Pheonix KageDesu
 * @target MZ MV
 * @url https://kdworkshop.net/plugins/phone-menu
 *
 * @help
 * ---------------------------------------------------------------------------
 * 
 * ===========================================================================
 * This plugin add mobile phone (smartphone) menu with alternative
 * messaging system.
 * You can add menu items (phone apps) in phone menu via Plugin Parameters
 *
 * Plugin have resources: img\pPhoneMenu, you can edit them for your purposes
 *
 * ---------------------------------------------------------------------------
 * Script calls:
 * 
 * - Phone.Show(); - Open (show) phone menu
 * - Phone.ShowInstantly(); - Open (show) phone menu without animation
 * - Phone.Hide(); - Hide (close) phone menu
 * - Phone.Disable(); - Disable phone menu (can't be opened)
 * - Phone.Enable(); - Enable phone menu
 *
 * - Phone.AddApp("ID"); - Add APP to Phone Menu (by ID from Plugin Parameters)
 * - Phone.RemoveApp("ID"); - Remove APP from Phone Menu
 * - Phone.OpenApp("ID") - Open Phone APP directly (will open Phone if closed)
 * - Phone.CreateUser("ID") - Create phone profile (player/NPC)
 * - Phone.SetUser("ID") - Switch active phone profile
 * - Phone.GetUser() - Get active phone profile ID
 * - Phone.SetPlayerUser("ID") - Set profile used by hotkey (P)
 * - Phone.GetPlayerUser() - Get profile used by hotkey (P)
 * - Phone.SetPin("ID", "1234") - Set 4-digit PIN for profile
 * - Phone.SetPhoneType("ID", "android|iphone") - Set profile phone type
 * - Phone.GetPhoneType("ID") - Get profile phone type
 * - Phone.SetupCharacterProfile("ID", SETTINGS) - Apply robust profile template (phone + instagram env)
 * - Phone.ConfigureInstagram("ID", SETTINGS) - Configure instagram environment for profile
 * - Phone.OpenInstagram("feed|dm|discovery", "ID?") - Open instagram section (run configured common event)
 * - Phone.OpenInstagramProfile("PROFILE_ID", "feed|dm|discovery") - View another discovered profile
 * - Phone.InstagramMenu("main|profiles") - Navigate instagram in-phone menu
 *
 * Example: Phone.AddApp("saveApp");
 * Example: Phone.RemoveApp("loadApp");
 * Example (Common Event character template):
 *   Phone.SetupCharacterProfile("npc_chanel_p", {
 *     type: "iphone",
 *     pin: "8241",
 *     wallpaper: "Wall_Chanel",
 *     messagesWallpaper: "Msg_Chanel",
 *     galleryWallpaper: "Gal_Chanel",
 *     enableInstagram: true,
 *     instagramProfileName: "chanel.private",
 *     instagramFollowSwitchId: 25,
 *     instagramFeedCommonEventId: 101,
 *     instagramDmCommonEventId: 102,
 *     instagramDiscoveryCommonEventId: 103
 *   });
 *
 * - Phone.ChangePhone("NAME"); - Change phone image to NAME.png
 *              image should be in img\pPhoneMenu folder
 *
 * - Phone.ChangeWallpaper("NAME"); - Change phone wallpaper image
 *
 * - Phone.ChangeMessageWallpaper("NAME"); - Change Messages App background image
 * - Phone.ChangeGalleryWallpaper("NAME"); - Change Gallery App background image
 *
 * - Phone.UnlockGalleryPicture("NAME") - Unlock picture in Gallery App,
            where NAME is same as in Picture
            field in Gallery Picture Plugin Parameter
 *
 * Script calls relative Phone Icon on map:
 *
 * - PhoneIcon.Show();
 * - PhoneIcon.Hide();
 * - PhoneIcon.Enable();
 * - PhoneIcon.Disable();
 *
 *
 * Script call for show Notify:
 *
 * Phone.Notify({image: "NAME", text: "TEXT", textPos: [X, Y], se: "FILENAME" });
 *
 * !Image should be from folder \img\pPhoneMenu\
 *
 * Examples:
        Phone.Notify({image: "Notify_NewMessage"});
        Phone.Notify({image: "Notify_NewMessage", text: "Hello!"});
        Phone.Notify({image: "Notify_NewMessage", text: "Hello!", textPos: [10, 20]});
        Phone.Notify({image: "Notify_NewMessage", text: "Hello!", textPos: [10, 20], se: "Attack1" });
 *
 * 
 * Script calls for show Modal Menu:
 *
 * Phone.ShowModalMessage("TITLE TEXT", "BUTTON TITLE"); - Show simple modal message
 * Phone.ShowModalQuestion("TITLE TEXT", "BUTTON 1 TITLE", BUTTON_1_ACTION, "BUTTON 2 TITLE", BUTTON_2_ACTION);
 *     Show simple modal choice with 2 buttons
 *     Where: BUTTON_ACTION can be common event ID or script call (in quotes)
 *
 * Phone.ShowModalMenu("TITLE TEXT", ID, FromMap?); - Show modal menu from event body choices
 *           Where: FromMap - optional, if TRUE, choices body will be loaded from Event (ID)
              on Messages Map instead of Common Event ID
              (set Map ID in Plugin Parameter Messages Map first)
 *
 * Examples:
       Phone.ShowModalMessage("Autosave done!", "OK");
       Phone.ShowModalQuestion("Load autosave?", "Yes", 1, "No", "console.log('canceled')");
       Phone.ShowModalMenu("Select wallpaper", 4, false);
 *
 * ---------------------------------------------------------------------------
 * Messages system:
 *
 * For add new message use script call:
 *
 * - Phone.AddMessage("A", "N", ID, FromMap);
 *      Add new message, A - avatar image name, N - from who (name),
 *          ID - common event Id for conversation content
 *                              (with event message commands)
 *     FromMap - optional, if TRUE, message body will be loaded from Event (ID)
              on Messages Map instead of Common Event ID
              (set Map ID in Plugin Parameter Messages Map first)
 *
 * Example: Phone.AddMessage("avaActor1", "John", 22); // From Common Event ID 22
 * Example: Phone.AddMessage("avaActor2", "Alice", 4, true); // From Messages Map, event 4
 *
 * Common Event should contains messages (and or choices)
 *  (only 2 choices variants supported)
 *
 * Common Event inside converstaion also support next event commands:
 *  - Common Event
 *  - Control Variable
 *  - Control Switches
 *  - Plugin Command (MV only)
 *
 * - Phone.IsHaveNewMessages(); - return true if you have any unread message
 *
 *
 * For default Message App (with ID "messagesApp") parameter Alert Switch is
 * turning ON automatically when you call Phone.AddMessage script call
 *
 *  - Phone.DeleteConversation(N); - remove converstaion (with history)
 *    Example: Phone.DeleteConversation("John");
 *
 * ---------------------------------------------------------------------------
 * New Messages System (since update 1.1)
 *
 * New messages system supports more control characters (like \C and \I)
 *    and support more than two choices (up to 6)
 *
 * For activate, set plugin Parameter Is use NEW message App? to TRUE
 *
 * For configurate NEXT message, add comment right ABOVE message:
 *
 * config:NAME,TX,TY,DX
 *
 * (better without spaces after commas!)
 *
 *    Where: NAME - background picture name (from img/pPhoneMenu folder)
 *          TX, TY - message text margins relative background image
 *          DX - whole message horizontal margin (from left side of screen)
 *
 * You can show just pictures with this comment if NEXT message is empty
 *
 * Example:
 *     config:messageBackground2,6,3,0
 *
 *
 * You can add extra picture within message (like character face)
 * Add comment right ABOVE message or config comment
 *
 * msgExtraImage:NAME,DX,DY
 *
 *    Where: NAME - picture name (from img/pPhoneMenu folder)
 *          DX, DY - picture margins relative message
 *
 * Example:
 *     msgExtraImage:exFace2,-54,6
 *
 * New extra control characters:
 *
 *    Show Icon INDEX with SIZE x SIZE, margin DX, DY
 *          \Isz[INDEX, SIZE, DX, DY]
 *    Example: \Isz[89, 20, 0, 0]
 *
 *    Show Picture (from Pictures folder!)
 *           \Psz[NAME, WIDTH, HEIGHT, DX, DY]
 *
 *     Exmaple: \Psz[Actor1_1, 220, 220, 0, 0] 
 *
 * ---------------------------------------------------------------------------
 * ! Examples you can find in plugin Demo project!
 * ---------------------------------------------------------------------------
 * If you like my Plugins, want more and offten updates,
 * please support me on Boosty or Patreon!
 * 
 * Boosty Page:
 *      https://boosty.to/kagedesu
 * Patreon Page:
 *      https://www.patreon.com/KageDesu
 * YouTube Channel:
 *      https://www.youtube.com/channel/UCA3R61ojF5vp5tGwJ1YqdgQ?
 *
 * You can use this plugin in your game thanks to all who supports me!
 * 

* License: Creative Commons 4.0 Attribution, Share Alike, Commercial

 *
 * 
 * @param PKD_PhoneMenu
 * 
 * @param phoneSettings:j
 * @parent PKD_PhoneMenu
 * @type note
 * @text Phone Settings
 * @desc Settings, in [param name]:[value] format. You can change values after :
 * @default "\"openPhoneKey\": \"p\"\n\"screenSize\": { \"w\": 278, \"h\": 434 }\n\"screenOffset\": { \"x\": 16, \"y\": 86 }\n\"phonePosition\": { \"x\": \"Graphics.width / 2 - 155\", \"y\": \"20\" }\n\"appsGrid\": { \"x\": 3, \"y\": 4 }\n\"isAnimate\": true\n\"animationSpeed\": 24\n\"appBackgroundColor\": \"#FFF\"\n\"image\": \"PhoneFace\"\n\"wallpaper\": \"Wallpaper1\"\n\"isShowMapIcon\": true\n\"mapIconPosition\": { \"x\": 4, \"y\": 120 }"
 * 
 * @param phoneDefaultAppsList
 * @parent PKD_PhoneMenu
 * @type text
 * @text Default Apps
 * @desc List of default Apps for Phone Menu (separated by comma)
 * @default messagesApp, galleryApp, saveApp, loadApp, settingsApp, contactsApp
 * 
 * @param phoneApps:structA
 * @parent phoneDefaultAppsList
 * @type struct<AppItem>[]
 * @text Apps
 * @desc Phone Apps
 * @default ["{\"id:str\":\"messagesApp\",\"name:str\":\"Messages\",\"icon:str\":\"AppIcon_Messages\",\"visibleSwitchId:i\":\"0\",\"enabledSwitchId:i\":\"0\",\"commonEventId:str\":\"Phone.StartApp('messagesApp')\",\"isOuterStart:b\":\"false\",\"alertSwitchId:i\":\"1\"}","{\"id:str\":\"saveApp\",\"name:str\":\"Save\",\"icon:str\":\"AppIcon_SaveGame\",\"visibleSwitchId:i\":\"0\",\"enabledSwitchId:i\":\"0\",\"commonEventId:str\":\"SceneManager.push(Scene_Save)\",\"isOuterStart:b\":\"false\",\"alertSwitchId:i\":\"0\"}","{\"id:str\":\"loadApp\",\"name:str\":\"Load\",\"icon:str\":\"AppIcon_LoadGame\",\"visibleSwitchId:i\":\"0\",\"enabledSwitchId:i\":\"0\",\"commonEventId:str\":\"SceneManager.push(Scene_Load)\",\"isOuterStart:b\":\"false\",\"alertSwitchId:i\":\"0\"}","{\"id:str\":\"settingsApp\",\"name:str\":\"Settings\",\"icon:str\":\"AppIcon_Settings\",\"visibleSwitchId:i\":\"0\",\"enabledSwitchId:i\":\"0\",\"commonEventId:str\":\"Phone.StartApp('settingsApp')\",\"isOuterStart:b\":\"false\",\"alertSwitchId:i\":\"0\"}","{\"id:str\":\"contactsApp\",\"name:str\":\"Contacts\",\"icon:str\":\"AppIcon_Contacts\",\"visibleSwitchId:i\":\"0\",\"enabledSwitchId:i\":\"0\",\"commonEventId:str\":\"Phone.StartApp('contactsApp')\",\"isOuterStart:b\":\"false\",\"alertSwitchId:i\":\"0\"}"]
 * 
 * @param messagesStyle:j
 * @parent PKD_PhoneMenu
 * @type note
 * @text [OLD] Messages Style
 * @desc Settings, in [param name]:[value] format. You can change values after :
 * @default "\"playerMessagePosition\": \"right\"\n\"playerMessageFontSize\": 14\n\"playerMessageTextColor\": \"#00ff00\"\n\"playerBackRectColor\": \"rgba(0,0,0,0)\"\n\"charMessagePosition\": \"left\"\n\"charMessageFontSize\": 12\n\"charMessageTextColor\": \"#FFFFFF\"\n\"charBackRectColor\": \"rgba(0,0,0,0.7)\""
 * 
 * @param isUseNewMessageScreen:b
 * @parent PKD_PhoneMenu
 * @type boolean
 * @text Is use NEW message App?
 * @desc If you want using new messaging App (>= version 1.1), set to TRUE
 * @default true
 * 
 * @param newMessagesAppSettings:struct
 * @parent isUseNewMessageScreen:b
 * @text New Messages App Settings
 * @type struct<NewMessagesAppSettings>
 * @desc New messaging app settings
 * @default {"defaultMessageHeight:int":"30","spaceBetweenMessages:int":"6","nextMessageShowDelayMs:int":"400","defaultMessagesFont:struct":"{\"face:str\":\"\",\"size:int\":\"14\",\"italic:bool\":\"false\"}","defaultChoiceTextFont:struct":"{\"face:str\":\"\",\"size:int\":\"16\",\"italic:bool\":\"false\"}","addMessageSE:str":"Cursor3"}
 * 
 * @param newNPCMessageConfig:struct
 * @parent newMessagesAppSettings:struct
 * @text NPC message style
 * @type struct<NewMessageDataConfig>
 * @default {"image:str":"messageBackground1","tx:int":"6","ty:int":"3","dx:int":"0"}
 * 
 * @param newPlayerMessageConfig:struct
 * @parent newMessagesAppSettings:struct
 * @text Playe message style
 * @type struct<NewMessageDataConfig>
 * @default {"image:str":"messageBackground0","tx:int":"116","ty:int":"3","dx:int":"0"}
 * 
 * @param galleryAppSettings:j
 * @parent PKD_PhoneMenu
 * @type note
 * @text Gallery App
 * @desc Settings, in [param name]:[value] format. You can change values after :
 * @default "\"previewImageHeight\": 144\n\"gridCols\": 2"
 * 
 * @param galleryAppButtonsSettings:j
 * @parent galleryAppSettings:j
 * @type note
 * @text Buttons
 * @desc Settings, in [param name]:[value] format. You can change values after :
 * @default "\"backButtonIsVisible\": true\n\"backButtonPosition\": { \"x\": 2, \"y\": 2 }\n\"zoomInButtonIsVisible\": true\n\"zoomInButtonPosition\": { \"x\": 228, \"y\": 2 }"
 * 
 * @param galleryBigMode:b
 * @parent galleryAppSettings:j
 * @text Allow Zoom?
 * @type boolean
 * @desc Is allow extra zoom for image on OK key or with Zoom button?
 * @default true
 * 
 * @param galleryKeepAspect:b
 * @parent galleryAppSettings:j
 * @text Keep Aspect Ratio?
 * @type boolean
 * @desc Is keep aspect ratio of image when preview it?
 * @default true
 * 
 * @param galleryItems:structA
 * @parent galleryAppSettings:j
 * @type struct<GalleryItem>[]
 * @text Pictures
 * @desc Pictures for Gallery App
 * @default []
 * 
 * @param settingsAppConfig
 * @parent PKD_PhoneMenu
 * @text Settings App
 * 
 * @param settingsAppOptionsList:structA
 * @parent settingsAppConfig
 * @type struct<OptionsAppItemConfig>[]
 * @text Options List
 * @desc Options that player can change via Settings App
 * @default ["{\"type\":\"switch\",\"position:struct\":\"{\\\"x:int\\\":\\\"200\\\",\\\"y:int\\\":\\\"8\\\"}\",\"titleImg\":\"optionTitle_alwaysDash\",\"titlePosition:struct\":\"{\\\"x:int\\\":\\\"20\\\",\\\"y:int\\\":\\\"10\\\"}\",\"configManagerField\":\"alwaysDash\",\"condition\":\"true\"}","{\"type\":\"switch\",\"position:struct\":\"{\\\"x:int\\\":\\\"200\\\",\\\"y:int\\\":\\\"46\\\"}\",\"titleImg\":\"optionTitle_commandRemember\",\"titlePosition:struct\":\"{\\\"x:int\\\":\\\"20\\\",\\\"y:int\\\":\\\"48\\\"}\",\"configManagerField\":\"commandRemember\",\"condition\":\"true\"}","{\"type\":\"switch\",\"position:struct\":\"{\\\"x:int\\\":\\\"200\\\",\\\"y:int\\\":\\\"84\\\"}\",\"titleImg\":\"optionTitle_touchUI\",\"titlePosition:struct\":\"{\\\"x:int\\\":\\\"20\\\",\\\"y:int\\\":\\\"86\\\"}\",\"configManagerField\":\"touchUI\",\"condition\":\"KDCore.isMZ()\"}","{\"type\":\"slider\",\"position:struct\":\"{\\\"x:int\\\":\\\"148\\\",\\\"y:int\\\":\\\"182\\\"}\",\"titleImg\":\"optionTitle_bgmVolume\",\"titlePosition:struct\":\"{\\\"x:int\\\":\\\"4\\\",\\\"y:int\\\":\\\"180\\\"}\",\"configManagerField\":\"bgmVolume\",\"condition\":\"true\"}","{\"type\":\"slider\",\"position:struct\":\"{\\\"x:int\\\":\\\"148\\\",\\\"y:int\\\":\\\"232\\\"}\",\"titleImg\":\"optionTitle_bgsVolume\",\"titlePosition:struct\":\"{\\\"x:int\\\":\\\"4\\\",\\\"y:int\\\":\\\"230\\\"}\",\"configManagerField\":\"bgsVolume\",\"condition\":\"true\"}","{\"type\":\"slider\",\"position:struct\":\"{\\\"x:int\\\":\\\"148\\\",\\\"y:int\\\":\\\"282\\\"}\",\"titleImg\":\"optionTitle_meVolume\",\"titlePosition:struct\":\"{\\\"x:int\\\":\\\"4\\\",\\\"y:int\\\":\\\"280\\\"}\",\"configManagerField\":\"meVolume\",\"condition\":\"true\"}","{\"type\":\"slider\",\"position:struct\":\"{\\\"x:int\\\":\\\"148\\\",\\\"y:int\\\":\\\"332\\\"}\",\"titleImg\":\"optionTitle_seVolume\",\"titlePosition:struct\":\"{\\\"x:int\\\":\\\"4\\\",\\\"y:int\\\":\\\"330\\\"}\",\"configManagerField\":\"seVolume\",\"condition\":\"true\"}"]
 * 
 * @param isShowNotifyOnNewMsg:b
 * @parent PKD_PhoneMenu
 * @text New Message Notify?
 * @type boolean
 * @on Show
 * @off No
 * @desc Is show notify when receives new message?
 * @default true
 * 
 * @param newMsgNotifyConfig:j
 * @parent isShowNotifyOnNewMsg:b
 * @type note
 * @text Notify Settings
 * @desc Settings, in [param name]:[value] format. You can change values after :
 * @default "\"image\": \"Notify_NewMessage\"\n\"text\": \"New message from \\\\C[1]$1\"\n\"textPos\": { \"x\": 30, \"y\": 40 }\n\"se\": \"Recovery\""
 * 
 * @param notifySettings:j
 * @parent PKD_PhoneMenu
 * @type note
 * @text Notifications Settings
 * @desc Settings, in [param name]:[value] format. You can change values after :
 * @default "\"position\": { \"x\": \"Graphics.width / 2\", \"y\": 0 }\n\"stayTime\": 100\n\"appearSpeed\": 40\n\"disappearSpeed\": 55\n\"moveOutSpeed\": 6\n\"initialScale\": 0.8\n\"finalScale\": 1.0\n\"isMoveDownWhenMoveOut\": false\n\"defaultFontSize\": 18"
 * 
 * @param isUseAsMainMenu:b
 * @parent PKD_PhoneMenu
 * @type boolean
 * @text Replace Menu
 * @on Replace
 * @off No
 * @desc Are replace Main Menu with Phone Menu?
 * @default false
 * 
 * @param messagesMapId:int
 * @parent PKD_PhoneMenu
 * @text Messages Map ID
 * @type number
 * @min 0
 * @default 0
 * @desc [Optional] Map ID with events for messages. Used when you add message with FromMap = TRUE  
 * 
 * @param modalMenuSettings:j
 * @parent PKD_PhoneMenu
 * @type note
 * @text Modal Menu Settings
 * @desc Settings, in [param name]:[value] format. You can change values after :
 * @default "\"width\": 200\n\"optionLineHeight\": 40\n\"titleHeight\": 60\n\"padding\": 10\n\"menuColor\": \"#FFFFFF\""
 * 
 * @param contacts:structA
 * @parent PKD_PhoneMenu
 * @type struct<Contact>[]
 * @text Contacts List
 * @desc Contacts data for Contacts App
 * @default []
 * 
 * @param customContext:structA
 * @parent PKD_PhoneMenu
 * @type struct<CustomAppContextData>[]
 * @text Custom Apps Data
 * @desc Your custom Apps data and structures
 * @default []
 * 
 * @param spacer|endHolder @text‏‏‎ ‎@desc ===============================================
 * 
 * @command EMPTY_HOLDER
 * @text ‏
 * @desc
 * @default
 */
/*:ru
 * @plugindesc (v.1.2)[PRO] Меню - смартфон
 * @author Pheonix KageDesu
 * @target MZ MV
 * @url https://kdworkshop.net/plugins/phone-menu
 *
 * @help
 * ---------------------------------------------------------------------------
 * 
 * ===========================================================================
 *
 * Плагин добавлят новое меню ввиду смартфона, а также альтернативную систему сообщений
 * Можно добавлять свои элементы меню в телефон (создаются они в параметрах плагина)
 *
 * Ресурсы тут: img\pPhoneMenu, файлы можно редактировать
 *
 * ---------------------------------------------------------------------------
 * Вызовы скриптов:
 * 
 * - Phone.Show(); - Открыть телефон
 * - Phone.ShowInstantly(); - Открыть телефон (без анимации)
 * - Phone.Hide(); - Закрыть
 * - Phone.Disable(); - Отключить (нельзя открыт по нажатию кнопки)
 * - Phone.Enable(); - Включить
 *
 * - Phone.AddApp(ID); - Добавить элемент меню по ID (из параметров плагина)
 * - Phone.RemoveApp(ID); - Удалить элемент из меню
 * - Phone.OpenApp("ID") - Открыть приложение на телефоне (телефон с приложением)
 *
 * - Phone.ChangePhone("ИМЯ"); - Изменить графику телефона на ИМЯ.png
 *              картинка должна быть в папке img\pPhoneMenu
 *
 * - Phone.ChangeWallpaper("ИМЯ"); - Аналогично, только для обоев телефона
 *
 * - Phone.ChangeMessageWallpaper("NAME"); - Фон в приложении сообщений
 * - Phone.ChangeGalleryWallpaper("NAME"); - Фон в приложении галлерея
 *
 * - Phone.UnlockGalleryPicture("NAME") - открыть изображение в галлерее,
            где NAME имя файла из поля Picture
            в параметре плагина Pictures
 *
 * Вызовы скриптов относительно иконки телефона на карте:
 *
 * - PhoneIcon.Show(); - Показать
 * - PhoneIcon.Hide(); - Спрятать
 * - PhoneIcon.Enable(); - Включить
 * - PhoneIcon.Disable(); - Отключить
 *
 * Вызов скрипта для оповещения:
 *
 * Phone.Notify({image: "ИМЯ", text: "ТЕКСТ", textPos: [X, Y], se: "ИМЯ ЗВУКА" });
 *
 * !Картинка должна быть в папке \img\pPhoneMenu\
 *
 * Examples:
        Phone.Notify({image: "Notify_NewMessage"});
        Phone.Notify({image: "Notify_NewMessage", text: "Hello!"});
        Phone.Notify({image: "Notify_NewMessage", text: "Hello!", textPos: [10, 20]});
        Phone.Notify({image: "Notify_NewMessage", text: "Hello!", textPos: [10, 20], se: "Attack1" });
 *
 * Вызов скрипта для меню выбора:
 *
 * Phone.ShowModalMessage("TITLE TEXT", "BUTTON TITLE"); - Простое сообщение с одной кнопкой
 * Phone.ShowModalQuestion("TITLE TEXT", "BUTTON 1 TITLE", BUTTON_1_ACTION, "BUTTON 2 TITLE", BUTTON_2_ACTION);
 *     Сообщение с двумя кнопками
 *     Где: BUTTON_ACTION может быть номером общего события или вызовом скрипта (в кавычках)
 *
 * Phone.ShowModalMenu("TITLE TEXT", ID, FromMap?); - Показать меню из тела события
 *           Where: FromMap - Опционально, если true, то тело меню загружается не из
 *            общего события, а из события ID на специальной карте, заданной
 *            через параметр плагина Messages Map
 *
 * Examples:
       Phone.ShowModalMessage("Autosave done!", "OK");
       Phone.ShowModalQuestion("Load autosave?", "Yes", 1, "No", "console.log('canceled')");
       Phone.ShowModalMenu("Select wallpaper", 4, false);
 *
 * ---------------------------------------------------------------------------
 * Система сообщений в телефоне:
 *
 * Вызов скрипта чтобы добавить новое сообщение:
 *
 * - Phone.AddMessage(A, N, ID, FromMap);
 *      A - Имя картинки аватара, N - Имя автора (от кого),
 *          ID - Номер общего события с содержанием сообщения (текстом)
 *
 *      FromMap - Опционально, если true, то тело сообщения загружается не из
 *            общего события, а из события ID на специальной карте, заданной
 *            через параметр плагина Messages Map
 *
 * Общее событие может содержать обычные сообщения (и или варианты выбора)
 *  (поддерживается выбор только из 2х вариантов)
 *
 * Пример: Phone.AddMessage("avaActor1", "Джон", 22); // Сообщение из общего события 22
 * Пример: Phone.AddMessage("avaActor2", "Алиса", 4, true); // Из события 4 на карте Messages Map 
 *
 * Так-же поддерживаются след. команды события:
 *  - Вызов общего события
 *  - Переключение переменной
 *  - Переключение переключателя
 *  - Команда плагин (только для RPG Maker MV)
 *
 * - Phone.IsHaveNewMessages(); - Возращает истину, если есть хоть одно НЕ прочитанное
 *      сообщение
 *
 * Для стандартного элемента меню Сообщения (с ID "messagesApp" ) параметр
 * Alert Switch переключается на ВКЛ автоматически. (Срабатывает при вызове Phone.AddMessage(...))
 * (Т.е. для сообщений красный значёк что есть новое сообещние - автоматически работает)
 *
 *  - Phone.DeleteConversation(N); - удалить историю переписки (полностью)
 *    Пример: Phone.DeleteConversation("Джон");
 *
  * ---------------------------------------------------------------------------
 * Новая система сообщений (обновление 1.1)
 *
 * Новая система сообщений поддерживает использование
 *    символов управления (\C и \I и другие)
 * Так же теперь можно добавлять больше двух пунктов выбора
 *
 * Чтобы активировать, включите параметр плагина
      Is use NEW message App?
 *
 *
 * Чтобы настроить СЛЕДУЮЩЕЕ сообщение, добавьте КОММЕНТАРИЙ
 *          прямо НАД ним
 *
 * config:NAME,TX,TY,DX
 * (не вставляйте пробелы после и до запятых)
 *
 *    Где: NAME - имя фона (картинки) (из папки img/pPhoneMenu)
 *          TX, TY - отступ текста относительно фона (картинки)
 *          DX - отступ всего соощения от левого края экрана
 *
 * Пример:
 *     config:messageBackground2,6,3,0
 *
 * Вы можете добавить дополнительнку картинку для сообещния (например лицо персонажа)
 * Добавьте КОММЕНТАРИЙ (прямо НАД соощением или комментарием конфигурации)
 *
 * msgExtraImage:NAME,DX,DY
 *
 *    Где: NAME - имя картинки (из папки img/pPhoneMenu)
 *          DX, DY - смещение относительно сообщения
 *
 * Пример:
 *     msgExtraImage:exFace2,-54,6
 *
 * Доп. символы управления в тексте:
 *
 *    Показать иконку номер INDEX с размером SIZE x SIZE, с отступом DX, DY
 *          \Isz[INDEX, SIZE, DX, DY]
 *    Пример: \Isz[89, 20, 0, 0]
 *
 *    Показать картинку (из папки Pictures !!!)
 *           \Psz[NAME, WIDTH, HEIGHT, DX, DY]
 *
 *     Пример: \Psz[Actor1_1, 220, 220, 0, 0] 
 *
 * ---------------------------------------------------------------------------
 * ! Примеры использования комманд можно найти в демке !
 * ---------------------------------------------------------------------------
 * Если Вам нравятся мои плагины, поддержите меня на Boosty!
 * 
 * Boosty Page:
 *      https://boosty.to/kagedesu
 * YouTube Channel:
 *      https://www.youtube.com/channel/UCA3R61ojF5vp5tGwJ1YqdgQ?
 *
 * 

* Лицензия: Creative Commons 4.0 Attribution, Share Alike, Commercial

 *
 * 
 * @param PKD_PhoneMenu
 * 
 * @param phoneSettings:j
 * @parent PKD_PhoneMenu
 * @type note
 * @text Phone Settings
 * @desc Телефон. Настройки в формате [имя параметра]:[значение]. Только значение после : можно менять
 * @default "\"openPhoneKey\": \"p\"\n\"screenSize\": { \"w\": 278, \"h\": 434 }\n\"screenOffset\": { \"x\": 16, \"y\": 86 }\n\"phonePosition\": { \"x\": \"Graphics.width / 2 - 155\", \"y\": \"20\" }\n\"appsGrid\": { \"x\": 3, \"y\": 4 }\n\"isAnimate\": true\n\"animationSpeed\": 24\n\"appBackgroundColor\": \"#FFF\"\n\"image\": \"PhoneFace\"\n\"wallpaper\": \"Wallpaper1\"\n\"isShowMapIcon\": true\n\"mapIconPosition\": { \"x\": 4, \"y\": 120 }"
 * 
 * @param phoneDefaultAppsList
 * @parent PKD_PhoneMenu
 * @type text
 * @text Default Apps
 * @desc Набор стандартных приложений (ID через запятую)
 * @default messagesApp, galleryApp, saveApp, loadApp, settingsApp, contactsApp
 * 
 * @param phoneApps:structA
 * @parent phoneDefaultAppsList
 * @type struct<AppItem>[]
 * @text Apps
 * @desc Приложения (пункт меню) для телефона
 * @default ["{\"id:str\":\"messagesApp\",\"name:str\":\"Messages\",\"icon:str\":\"AppIcon_Messages\",\"visibleSwitchId:i\":\"0\",\"enabledSwitchId:i\":\"0\",\"commonEventId:str\":\"Phone.StartApp('messagesApp')\",\"isOuterStart:b\":\"false\",\"alertSwitchId:i\":\"1\"}","{\"id:str\":\"saveApp\",\"name:str\":\"Save\",\"icon:str\":\"AppIcon_SaveGame\",\"visibleSwitchId:i\":\"0\",\"enabledSwitchId:i\":\"0\",\"commonEventId:str\":\"SceneManager.push(Scene_Save)\",\"isOuterStart:b\":\"false\",\"alertSwitchId:i\":\"0\"}","{\"id:str\":\"loadApp\",\"name:str\":\"Load\",\"icon:str\":\"AppIcon_LoadGame\",\"visibleSwitchId:i\":\"0\",\"enabledSwitchId:i\":\"0\",\"commonEventId:str\":\"SceneManager.push(Scene_Load)\",\"isOuterStart:b\":\"false\",\"alertSwitchId:i\":\"0\"}","{\"id:str\":\"settingsApp\",\"name:str\":\"Settings\",\"icon:str\":\"AppIcon_Settings\",\"visibleSwitchId:i\":\"0\",\"enabledSwitchId:i\":\"0\",\"commonEventId:str\":\"Phone.StartApp('settingsApp')\",\"isOuterStart:b\":\"false\",\"alertSwitchId:i\":\"0\"}","{\"id:str\":\"contactsApp\",\"name:str\":\"Contacts\",\"icon:str\":\"AppIcon_Contacts\",\"visibleSwitchId:i\":\"0\",\"enabledSwitchId:i\":\"0\",\"commonEventId:str\":\"Phone.StartApp('contactsApp')\",\"isOuterStart:b\":\"false\",\"alertSwitchId:i\":\"0\"}"]
 * 
 * @param messagesStyle:j
 * @parent PKD_PhoneMenu
 * @type note
 * @text [OLD] Messages Style
 * @desc Стиль сообщений. Настройки в формате [имя параметра]:[значение]. Только значение после : можно менять
 * @default "\"playerMessagePosition\": \"right\"\n\"playerMessageFontSize\": 14\n\"playerMessageTextColor\": \"#00ff00\"\n\"playerBackRectColor\": \"rgba(0,0,0,0)\"\n\"charMessagePosition\": \"left\"\n\"charMessageFontSize\": 12\n\"charMessageTextColor\": \"#FFFFFF\"\n\"charBackRectColor\": \"rgba(0,0,0,0.7)\""
 * 
 * @param isUseNewMessageScreen:b
 * @parent PKD_PhoneMenu
 * @type boolean
 * @text Is use NEW message App?
 * @desc Использовать обновлённую систему сообщений? (версия 1.1 и выше)
 * @default true
 * 
 * @param newMessagesAppSettings:struct
 * @parent isUseNewMessageScreen:b
 * @text New Messages App Settings
 * @type struct<NewMessagesAppSettings>
 * @desc Настройки обновлённой системы сообщений
 * @default {"defaultMessageHeight:int":"30","spaceBetweenMessages:int":"6","nextMessageShowDelayMs:int":"400","defaultMessagesFont:struct":"{\"face:str\":\"\",\"size:int\":\"14\",\"italic:bool\":\"false\"}","defaultChoiceTextFont:struct":"{\"face:str\":\"\",\"size:int\":\"16\",\"italic:bool\":\"false\"}","addMessageSE:str":"Cursor3"}
 * 
 * @param newNPCMessageConfig:struct
 * @parent newMessagesAppSettings:struct
 * @text NPC message style
 * @type struct<NewMessageDataConfig>
 * @default {"image:str":"messageBackground1","tx:int":"6","ty:int":"3","dx:int":"0"}
 * 
 * @param newPlayerMessageConfig:struct
 * @parent newMessagesAppSettings:struct
 * @text Playe message style
 * @type struct<NewMessageDataConfig>
 * @default {"image:str":"messageBackground0","tx:int":"116","ty:int":"3","dx:int":"0"}
 * 
 * @param galleryAppSettings:j
 * @parent PKD_PhoneMenu
 * @type note
 * @text Gallery App
 * @desc Настройки в формате [имя параметра]:[значение]. Только значение после : можно менять
 * @default "\"previewImageHeight\": 144\n\"gridCols\": 2"
 * 
 * @param galleryAppButtonsSettings:j
 * @parent galleryAppSettings:j
 * @type note
 * @text Buttons
 * @desc Настройки в формате [имя параметра]:[значение]. Только значение после : можно менять
 * @default "\"backButtonIsVisible\": true\n\"backButtonPosition\": { \"x\": 2, \"y\": 2 }\n\"zoomInButtonIsVisible\": true\n\"zoomInButtonPosition\": { \"x\": 228, \"y\": 2 }"
 * 
 * @param galleryBigMode:b
 * @parent galleryAppSettings:j
 * @text Allow Zoom?
 * @type boolean
 * @desc Разрешить доп. увеличние картинки по нажатию ОК (или кнопкой)?
 * @default true
 * 
 * @param galleryKeepAspect:b
 * @parent galleryAppSettings:j
 * @text Keep Aspect Ratio?
 * @type boolean
 * @desc Сохранять пропорции изображения при просмотре? (когда открываем картинку)
 * @default true
 * 
 * @param galleryItems:structA
 * @parent galleryAppSettings:j
 * @type struct<GalleryItem>[]
 * @text Pictures
 * @desc Картинки для галереи
 * @default []
 * 
 * @param settingsAppConfig
 * @parent PKD_PhoneMenu
 * @text Settings App
 * 
 * @param settingsAppOptionsList:structA
 * @parent settingsAppConfig
 * @type struct<OptionsAppItemConfig>[]
 * @text Options List
 * @desc Набор опций, которые игрок может менять через приложение настроек
 * @default ["{\"type\":\"switch\",\"position:struct\":\"{\\\"x:int\\\":\\\"200\\\",\\\"y:int\\\":\\\"8\\\"}\",\"titleImg\":\"optionTitle_alwaysDash\",\"titlePosition:struct\":\"{\\\"x:int\\\":\\\"20\\\",\\\"y:int\\\":\\\"10\\\"}\",\"configManagerField\":\"alwaysDash\",\"condition\":\"true\"}","{\"type\":\"switch\",\"position:struct\":\"{\\\"x:int\\\":\\\"200\\\",\\\"y:int\\\":\\\"46\\\"}\",\"titleImg\":\"optionTitle_commandRemember\",\"titlePosition:struct\":\"{\\\"x:int\\\":\\\"20\\\",\\\"y:int\\\":\\\"48\\\"}\",\"configManagerField\":\"commandRemember\",\"condition\":\"true\"}","{\"type\":\"switch\",\"position:struct\":\"{\\\"x:int\\\":\\\"200\\\",\\\"y:int\\\":\\\"84\\\"}\",\"titleImg\":\"optionTitle_touchUI\",\"titlePosition:struct\":\"{\\\"x:int\\\":\\\"20\\\",\\\"y:int\\\":\\\"86\\\"}\",\"configManagerField\":\"touchUI\",\"condition\":\"KDCore.isMZ()\"}","{\"type\":\"slider\",\"position:struct\":\"{\\\"x:int\\\":\\\"148\\\",\\\"y:int\\\":\\\"182\\\"}\",\"titleImg\":\"optionTitle_bgmVolume\",\"titlePosition:struct\":\"{\\\"x:int\\\":\\\"4\\\",\\\"y:int\\\":\\\"180\\\"}\",\"configManagerField\":\"bgmVolume\",\"condition\":\"true\"}","{\"type\":\"slider\",\"position:struct\":\"{\\\"x:int\\\":\\\"148\\\",\\\"y:int\\\":\\\"232\\\"}\",\"titleImg\":\"optionTitle_bgsVolume\",\"titlePosition:struct\":\"{\\\"x:int\\\":\\\"4\\\",\\\"y:int\\\":\\\"230\\\"}\",\"configManagerField\":\"bgsVolume\",\"condition\":\"true\"}","{\"type\":\"slider\",\"position:struct\":\"{\\\"x:int\\\":\\\"148\\\",\\\"y:int\\\":\\\"282\\\"}\",\"titleImg\":\"optionTitle_meVolume\",\"titlePosition:struct\":\"{\\\"x:int\\\":\\\"4\\\",\\\"y:int\\\":\\\"280\\\"}\",\"configManagerField\":\"meVolume\",\"condition\":\"true\"}","{\"type\":\"slider\",\"position:struct\":\"{\\\"x:int\\\":\\\"148\\\",\\\"y:int\\\":\\\"332\\\"}\",\"titleImg\":\"optionTitle_seVolume\",\"titlePosition:struct\":\"{\\\"x:int\\\":\\\"4\\\",\\\"y:int\\\":\\\"330\\\"}\",\"configManagerField\":\"seVolume\",\"condition\":\"true\"}"]
 * 
 * 
 * @param isShowNotifyOnNewMsg:b
 * @parent PKD_PhoneMenu
 * @text New Message Notify?
 * @type boolean
 * @on Show
 * @off No
 * @desc Показывать уведомление при получении нового сообщения?
 * @default true
 * 
 * @param newMsgNotifyConfig:j
 * @parent isShowNotifyOnNewMsg:b
 * @type note
 * @text Notify Settings
 * @desc Настройки в формате [имя параметра]:[значение]. Только значение после : можно менять
 * @default "\"image\": \"Notify_NewMessage\"\n\"text\": \"New message from \\\\C[1]$1\"\n\"textPos\": { \"x\": 30, \"y\": 40 }\n\"se\": \"Recovery\""
 * 
 * @param notifySettings:j
 * @parent PKD_PhoneMenu
 * @type note
 * @text Notifications Settings
 * @desc Уведомления. Настройки в формате [имя параметра]:[значение]. Только значение после : можно менять
 * @default "\"position\": { \"x\": \"Graphics.width / 2\", \"y\": 0 }\n\"stayTime\": 100\n\"appearSpeed\": 40\n\"disappearSpeed\": 55\n\"moveOutSpeed\": 6\n\"initialScale\": 0.8\n\"finalScale\": 1.0\n\"isMoveDownWhenMoveOut\": false\n\"defaultFontSize\": 18"
 * 
 * @param isUseAsMainMenu:b
 * @parent PKD_PhoneMenu
 * @type boolean
 * @text Replace Menu
 * @on Заместо
 * @off Нет
 * @desc Открывать телефон заместо главного меню?
 * @default false
 * 
 * @param messagesMapId:int
 * @parent PKD_PhoneMenu
 * @text Messages Map ID
 * @type number
 * @min 0
 * @default 0
 * @desc [Опционально] ID с событиями для сообщений
 * 
 * @param modalMenuSettings:j
 * @parent PKD_PhoneMenu
 * @type note
 * @text Modal Menu Settings
 * @desc Меню выбора. Настройки в формате [имя параметра]:[значение]. Только значение после : можно менять
 * @default "\"width\": 200\n\"optionLineHeight\": 40\n\"titleHeight\": 60\n\"padding\": 10\n\"menuColor\": \"#FFFFFF\""
 * 
 * @param contacts:structA
 * @parent PKD_PhoneMenu
 * @type struct<Contact>[]
 * @text Contacts List
 * @desc Данные контактов для приложения Контакты (Contacts)
 * @default []
 * 
 * @param customContext:structA
 * @parent PKD_PhoneMenu
 * @type struct<CustomAppContextData>[]
 * @text Custom Apps Data
 * @desc Данные пользовательских приложений
 * @default []
 * 
 * @param spacer|endHolder @text‏‏‎ ‎@desc ===============================================
 * 
 * @command EMPTY_HOLDER
 * @text ‏
 * @desc
 * @default
 */
/*~struct~XY:
 * @param x:int
 * @text X
 * @type number
 * @default 0
 * @min -1000
 *
 * @param y:int
 * @text Y
 * @type number
 * @default 0
 * @min -1000
 */

 /*~struct~WH:
 * @param w:int
 * @text Width
 * @type number
 * @default 200
 * @min 1
 *
 * @param h:int
 * @text Height
 * @type number
 * @default 100
 * @min 1
 */
 
/*~struct~AppItem:

 @param id:str
 @text ID
 @type text 
 @desc Unique App ID for add or remove by script call to Phone Menu
 @default myApp

 @param name:str
 @text Name
 @type text 
 @desc Displayed name in Phone Menu
 @default MyApp 


 @param icon:str
 @text Icon
 @type file
 @dir img\pPhoneMenu\
 @require 1
 @desc Icon image name 
 @default 

 @param visibleSwitchId:i
 @text Visible Switch
 @type switch 
 @desc Switch for APP visibility
 @default 0


 @param enabledSwitchId:i
 @text Available Switch
 @type switch 
 @desc Switch for APP enabled or disable state
 @default 0


 @param commonEventId:str
 @text Common Event
 @type text
 @desc Common Event for App (or script call)
 @default 1


 @param isOuterStart:b
 @text Is exit when started?
 @type boolean 
 @on Yes
 @off No
 @desc If true - App will close phone and will be executed on game map
 @default false 


 @param alertSwitchId:i
 @text Alert Switch
 @type switch 
 @desc When this Switch is ON, you will see red alert cirle on this App icon
 @default 0

*/

/*~struct~AppItem:ru

 @param id:str
 @text ID
 @type text 
 @desc Уник. ID исп. чтобы добавлять (убирать) приложение при помощи вызова скрипта
 @default myApp

 @param name:str
 @text Name
 @type text 
 @desc Отображаемое имя
 @default MyApp 


 @param icon:str
 @text Icon
 @type file
 @dir img\pPhoneMenu\
 @require 1
 @desc Изображение иконки
 @default 

 @param visibleSwitchId:i
 @text Visible Switch
 @type switch 
 @desc Переключетель для видимости приложения в меню
 @default 0


 @param enabledSwitchId:i
 @text Available Switch
 @type switch 
 @desc Переключатель для возможности запуска приложения в меню
 @default 0


 @param commonEventId:str
 @text Common Event
 @type common_event 
 @desc Общее событие для этого приложения
 @default 1


 @param isOuterStart:b
 @text Is exit when started?
 @type boolean 
 @on Да
 @off Нет
 @desc Если ДА, то после запуска приложения, телефон закроется, а общее событие будет вып-но на карте
 @default false 


 @param alertSwitchId:i
 @text Alert Switch
 @type switch 
 @desc Когда этот переключатель ВКЛ, то будет видет красный круг на иконке приложения
 @default 0

*/


/*~struct~GalleryItem:

 @param picName:str
 @text Picture
 @type file
 @dir img\pPhoneMenu\
 @require 1
 @default 

 @param previewPicName:str
 @text Preview
 @type file
 @dir img\pPhoneMenu\
 @require 1
 @desc Optional. Preview picture for album grid
 @default

 @param albumName:str
 @text Album
 @type text 
 @desc Required! Album Name
 @default Default 

 @param title:str
 @text Name
 @type text 
 @desc Optional. Picture Name
 @default

 @param enabledSwitchId:i
 @text Enabled Switch
 @type switch 
 @desc When this Switch is ON, you will see this image in Gallery App. 0 - always available
 @default 0

 @param ownerId:str
 @text Owner Profile ID
 @type text
 @desc Optional. If set, picture is visible only for this phone profile ID
 @default

*/

/*~struct~Contact:

 @param name:str
 @text Name
 @type text 
 @desc Required! Contact display name
 @default Friend

 @param previewImg:str
 @text Preview
 @type file
 @dir img\pPhoneMenu\
 @require 1
 @desc Optional. Preview image for contacts list. Recommended 48 x 48
 @default 

 @param enabledSwitchId:i
 @text Enabled Switch
 @type switch 
 @desc When this Switch is ON, you will see this contact in Contacts list. 0 - always visible
 @default 0

 @param extraPreviewImage:struct
 @text Extra Image
 @type struct<LContactExtraImage>
 @default
 @desc Optional. Extra image for this contact for contacts list

 @param pictures:structA
 @type struct<LContactExtraImage>[]
 @text Pictures
 @desc Pictures for contact info
 @default []

 @param gauges:structA
 @type struct<LContactExtraGauges>[]
 @text Gauges
 @desc Gauges for contact info
 @default []

*/

/*~struct~LContactExtraImage:

 @param name:str
 @text Image
 @type file
 @dir img\pPhoneMenu\
 @require 1
 @default 

 @param enabledSwitchId:i
 @text Enabled Switch
 @type switch 
 @desc When this Switch is ON, you will see this image. 0 - always visible
 @default 0

 @param margins:struct
 @text Margins
 @type struct<XY>
 @default {"x:int":"0","y:int":"0"}
 @desc Position of image on screen

 @param zIndex:int
 @text Priority
 @type number
 @default 0
 @min -1000
 @desc Optional. Z Index. More value -> will be on top of others (with lower value)

 */

/*~struct~LContactExtraGauges:

 @param enabledSwitchId:i
 @text Enabled Switch
 @type switch 
 @desc When this Switch is ON, you will see this gauge. 0 - always visible
 @default 0

 @param currentPercentVarId:i
 @text Value Variable
 @type variable
 @desc Variable with current value for gauge in % (100 = 100%). Min 0, Max 100
 @default 0

 @param margins:struct
 @text Margins
 @type struct<XY>
 @default {"x:int":"0","y:int":"0"}
 @desc Position of gauge on screen

 @param zIndex:int
 @text Priority
 @type number
 @default 0
 @min -1000
 @desc Optional. Z Index. More value -> will be on top of others (with lower value)

 @param settings:s
 @text Gauge
 @type struct<CGauge> 
 @desc Gauge configuration
 @default {} 

 */

/*~struct~LCustomElementTextItem:

 @param text
 @text Text
 @desc Text, supports control characters (\I[x], \V[x] and others)
 @default Text!

 @param enabledSwitchId:i
 @text Enabled Switch
 @type switch 
 @desc When this Switch is ON, you will see this element. 0 - always visible
 @default 0

 @param margins:struct
 @text Margins
 @type struct<XY>
 @default {"x:int":"0","y:int":"0"}
 @desc Position of element on screen

 @param zIndex:int
 @text Priority
 @type number
 @default 0
 @min -1000
 @desc Optional. Z Index. More value -> will be on top of others (with lower value)

 @param settings:s
 @text Settings
 @type struct<CText> 
 @desc Configuration
 @default {}

*/


/*~struct~LCustomElementButton:

 @param commonEventId:int
 @text Common Event
 @type common_event 
 @desc Required! Common Event that will be called when button is clicked
 @default 1

 @param isOuterStart:b
 @text Is exit when started?
 @type boolean 
 @on Yes
 @off No
 @desc If true - App will close phone and will be executed on game map
 @default false 

 @param enabledSwitchId:i
 @text Enabled Switch
 @type switch 
 @desc When this Switch is ON, you will see this element. 0 - always visible
 @default 0

 @param margins:struct
 @text Margins
 @type struct<XY>
 @default {"x:int":"0","y:int":"0"}
 @desc Position of element on screen

 @param zIndex:int
 @text Priority
 @type number
 @default 0
 @min -1000
 @desc Optional. Z Index. More value -> will be on top of others (with lower value)

 @param main
 @text Button image
 @type file
 @dir img/pPhoneMenu/
 @require 1
 @default btnZoom_00
 @desc Required! Image for button

 @param hover
 @text Hovered image
 @type file
 @dir img/pPhoneMenu/
 @require 1
 @default btnZoom_01
 @desc Required! Image for button when hovered by cursor

*/

/*~struct~LCustomElementSwitchBtn:

 @param switchId:i
 @text Controlled switch
 @type switch 
 @desc Required! You will control state of this switch by this Switch Button
 @default 1

 @param enabledSwitchId:i
 @text Enabled Switch
 @type switch 
 @desc When this Switch is ON, you will see this element. 0 - always visible
 @default 0

 @param margins:struct
 @text Margins
 @type struct<XY>
 @default {"x:int":"0","y:int":"0"}
 @desc Position of element on screen

 @param zIndex:int
 @text Priority
 @type number
 @default 0
 @min -1000
 @desc Optional. Z Index. More value -> will be on top of others (with lower value)

 @param onImage
 @text ON image
 @type file
 @dir img/pPhoneMenu/
 @require 1
 @default switchButton_1
 @desc Required! Image when switch is ON

 @param offImage
 @text OFF image
 @type file
 @dir img/pPhoneMenu/
 @require 1
 @default switchButton_0
 @desc Required! Image when switch is OFF

*/

/*~struct~LCustomElementSlider:

 @param variableId:i
 @text Value Variable
 @type variable
 @desc Required! Variable that will be controlled by this Slider (value will be from 0 to 100)
 @default 1

 @param enabledSwitchId:i
 @text Enabled Switch
 @type switch 
 @desc When this Switch is ON, you will see this element. 0 - always visible
 @default 0

 @param margins:struct
 @text Margins
 @type struct<XY>
 @default {"x:int":"0","y:int":"0"}
 @desc Position of element on screen

 @param zIndex:int
 @text Priority
 @type number
 @default 0
 @min -1000
 @desc Optional. Z Index. More value -> will be on top of others (with lower value)

 @param sliderBackImg
 @text Back image
 @type file
 @dir img/pPhoneMenu/
 @require 1
 @default sliderBack
 @desc Required! Slider background image

 @param sliderKnobImg
 @text Slider image
 @type file
 @dir img/pPhoneMenu/
 @require 1
 @default sliderKnob
 @desc Required! Slider knob image

*/

/*~struct~CGauge:
 *
 * @param vertical:bool
 * @text Is Vertical?
 * @type boolean
 * @default false
 * @desc Gauge will use vertical fill?
 * 
 * @param fill
 * @text Fill Image
 * @type file
 * @dir img/pPhoneMenu/
 * @require 1
 * @default
 * @desc Gaguge fill image, required!
 * 
 * @param foreground
 * @text Foreground Image
 * @type file
 * @dir img/pPhoneMenu/
 * @require 1
 * @default
 * @desc Image above gauge fill, optional
 * 
 * @param mask
 * @text Mask Image
 * @type file
 * @dir img/pPhoneMenu/
 * @require 1
 * @default
 * @desc Whole gauge image mask, optional
 * 
 * @param backColor:css
 * @type string
 * @text Background Color
 * @default #000000
 * @desc Text color in HEX format (#000000)
 * 
 * @param backOpacity:int
 * @type number
 * @min 0
 * @max 255
 * @text Background Opacity
 * @default 255
 * @desc from 0 to 255, 0 - transparent, 255 - opaque
*/

/*~struct~CText:
 * @param size:struct
 * @text TextBox Size
 * @type struct<WH>
 * @default
 * @desc Size of text zone
 * 
 * @param font:struct
 * @type struct<CFont>
 * @text Font Settings
 * @default
 * @desc Text font settings
*/

/*~struct~CFont:
 * @param face:str
 * @text Face
 * @default
 *
 * @param size:int
 * @text Size
 * @type number
 * @default 14
 * @min 4
 * 
 * @param italic:bool
 * @text IsItalic
 * @type boolean
 * @default false
*/

/*~struct~CustomAppContextData:

 @param id:str
 @text ID
 @type text 
 @desc Required! Custom App Context ID (should match App ID)
 @default myCustomApp

 @param backgroundImage:str
 @text Background
 @type file
 @dir img\pPhoneMenu\
 @require 1
 @desc Optional. Background app screen image
 @default customAppBackgroundDemo

 @param elements
 @text Elements

 @param pictures:structA
 @parent elements
 @type struct<LContactExtraImage>[]
 @text Pictures
 @desc
 @default []

 @param gauges:structA
 @parent elements
 @type struct<LContactExtraGauges>[]
 @text Gauges
 @desc
 @default []

 @param sliders:structA
 @parent elements
 @type struct<LCustomElementSlider>[]
 @text Sliders
 @desc
 @default []

 @param buttons:structA
 @parent elements
 @type struct<LCustomElementButton>[]
 @text Buttons
 @desc
 @default []

 @param switches:structA
 @parent elements
 @type struct<LCustomElementSwitchBtn>[]
 @text Switches (buttons)
 @desc
 @default []

 @param textItems:structA
 @parent elements
 @type struct<LCustomElementTextItem>[]
 @text Text items
 @desc
 @default []

*/


/*~struct~NewMessagesAppSettings:

 * @param defaultMessageHeight:int
 * @text Height for message
 * @type number
 * @default 30
 * @min 10
 * @desc Default height for single message, used for auto scroll calculations

 * @param spaceBetweenMessages:int
 * @text Vertical spacing
 * @type number
 * @default 6
 * @min 0
 * @desc Vertical spacing between messages

 * @param nextMessageShowDelayMs:int
 * @text Show Delay
 * @type number
 * @default 400
 * @min 100
 * @desc Delay before next message is appears, in milliseconds!

 * @param defaultMessagesFont:struct
 * @type struct<CFont>
 * @text Messages Style
 * @default
 * @desc Default font style and size for messages

 * @param defaultChoiceTextFont:struct
 * @type struct<CFont>
 * @text Choices Style
 * @default
 * @desc Default font style and size for choices buttons
 
 @param addMessageSE:str
 @text SE for message
 @type file
 @dir audio\se\
 @require 1
 @desc Sound effect when next message appears
 @default Cursor3

*/

/*~struct~NewMessageDataConfig:

 @param image:str
 @text Image
 @type file
 @dir img\pPhoneMenu\
 @require 1
 @desc Background image name 
 @default messageBackground1

 * @param tx:int
 * @text Text Margin X
 * @type number
 * @default 6
 * @desc Text block margin by X relative background image

 * @param ty:int
 * @text Text Margin Y
 * @type number
 * @default 3
 * @desc Text block margin by Y relative background image

 * @param dx:int
 * @text Message Margin X
 * @type number
 * @default 0
 * @desc Whole message (background + text) margin by X (horizontal)

*/


/*~struct~OptionsAppItemConfig:

    @param type
    @text Option Type
    @type select
    @option switch
    @option slider
    @default switch
    @desc
    
    @param position:struct
    @text Position
    @type struct<XY>
    @default {"x:int":"0","y:int":"0"}
    @desc Position of option on screen

    @param titleImg
    @text Title image
    @type file
    @dir img\pPhoneMenu\
    @require 1
    @desc Option title image
    @default

    @param titlePosition:struct
    @parent titleImg
    @text Position
    @type struct<XY>
    @default {"x:int":"0","y:int":"0"}
    @desc Position of title image on screen

    @param configManagerField
    @text ConfigManager field
    @default alwaysDash
    @desc ConfigManager class field name to manipulate via this option

    @param condition
    @text Condition
    @desc Option visibility condition. Script that will be evaluated
    @default true

*/


var Imported = Imported || {};
Imported.PKD_PhoneMenu = true;

var PKD_PhoneMenu = {};
PKD_PhoneMenu.Version = 120;

//?VERSION
PKD_PhoneMenu.isPro = function() { return false; };

PKD_PhoneMenu.PP = {};
PKD_PhoneMenu.Utils = {};

// * Загрзука параметров
PKD_PhoneMenu.LoadPluginSettings = () => {
    PKD_PhoneMenu.PP._loader = new KDCore.ParamLoader('PKD_PhoneMenu');
};

window.Phone = PKD_PhoneMenu;

// --- --- --- --- ---

//%[Для обновлений]
// * SubMenus (simple list) 
// Управляется SubMenu через вызовы скриптов Phone.AddItemToSubMenu("myMenu1", {img: "test", title: "Text", enbledSwitch:0, onClick: 2, onMap: true});
// * CE - должен поддерживать Extended Values, title - Extended Text

// * Возможность задавать background картинку для сообщений от того или иного персонажа (каждому свою)

// * Notify Auto when gallery items added ?

// * Добавить перелистывание картинок в режиме Zoom (в галерее), кнопки или стрелками или колесом мышки

// * Options App (sliders for sounds, switches for other settings)

// * Extra JS Code for Custom User App

// * Zoom In Pictures for Custom User App

// * Context Forward (in Custom User App) via Button (contextForward)

// * Refresh (API call) (перерисовка всех компонентов) and parameters (to Struct) Custom User App layout (например когда игрок нажимает кнопку или переключает switch)

// * Simple Shop App
//SHOP: Item Name, Item Image, Item Price, Switch (is appear or not), Limit (sold out), Common Event on Buy, Item/Armor/Weapon gain on Buy

// * Add Custom elements to Contacts App

// * Add Silent messages (т.е. добавляется сообщение, которое как-бы уже прочитано, сразу в историю, без нотификаций)

// * Gallery App -> change list items visual for custom images (default window loosk wierd)

/*
# ==========================================================================
# ==========================================================================
#
#   EMBEDDED PHEONIX KAGEDESU PLUGINS CORE LIBRARY
#   (This plugin may not use the entire code of this library)
#
# ==========================================================================
# ==========================================================================
 * 
 * 
 */



/*!
 * pixi-filters - v4.2.0
 * Compiled Fri, 05 Aug 2022 19:51:27 UTC
 *
 * pixi-filters is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */
var __filters=function(e,n,t,r,o,i,l,a){"use strict";var s=function(e,n){return(s=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,n){e.__proto__=n}||function(e,n){for(var t in n)Object.prototype.hasOwnProperty.call(n,t)&&(e[t]=n[t])})(e,n)};function u(e,n){function t(){this.constructor=e}s(e,n),e.prototype=null===n?Object.create(n):(t.prototype=n.prototype,new t)}var f=function(){return(f=Object.assign||function(e){for(var n,t=arguments,r=1,o=arguments.length;r<o;r++)for(var i in n=t[r])Object.prototype.hasOwnProperty.call(n,i)&&(e[i]=n[i]);return e}).apply(this,arguments)};Object.create;Object.create;var c="attribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nuniform mat3 projectionMatrix;\n\nvarying vec2 vTextureCoord;\n\nvoid main(void)\n{\n    gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n    vTextureCoord = aTextureCoord;\n}",m=function(e){function n(n){var t=e.call(this,c,"varying vec2 vTextureCoord;\nuniform sampler2D uSampler;\n\nuniform float gamma;\nuniform float contrast;\nuniform float saturation;\nuniform float brightness;\nuniform float red;\nuniform float green;\nuniform float blue;\nuniform float alpha;\n\nvoid main(void)\n{\n    vec4 c = texture2D(uSampler, vTextureCoord);\n\n    if (c.a > 0.0) {\n        c.rgb /= c.a;\n\n        vec3 rgb = pow(c.rgb, vec3(1. / gamma));\n        rgb = mix(vec3(.5), mix(vec3(dot(vec3(.2125, .7154, .0721), rgb)), rgb, saturation), contrast);\n        rgb.r *= red;\n        rgb.g *= green;\n        rgb.b *= blue;\n        c.rgb = rgb * brightness;\n\n        c.rgb *= c.a;\n    }\n\n    gl_FragColor = c * alpha;\n}\n")||this;return t.gamma=1,t.saturation=1,t.contrast=1,t.brightness=1,t.red=1,t.green=1,t.blue=1,t.alpha=1,Object.assign(t,n),t}return u(n,e),n.prototype.apply=function(e,n,t,r){this.uniforms.gamma=Math.max(this.gamma,1e-4),this.uniforms.saturation=this.saturation,this.uniforms.contrast=this.contrast,this.uniforms.brightness=this.brightness,this.uniforms.red=this.red,this.uniforms.green=this.green,this.uniforms.blue=this.blue,this.uniforms.alpha=this.alpha,e.applyFilter(this,n,t,r)},n}(n.Filter),p=function(e){function n(n){void 0===n&&(n=.5);var t=e.call(this,c,"\nuniform sampler2D uSampler;\nvarying vec2 vTextureCoord;\n\nuniform float threshold;\n\nvoid main() {\n    vec4 color = texture2D(uSampler, vTextureCoord);\n\n    // A simple & fast algorithm for getting brightness.\n    // It's inaccuracy , but good enought for this feature.\n    float _max = max(max(color.r, color.g), color.b);\n    float _min = min(min(color.r, color.g), color.b);\n    float brightness = (_max + _min) * 0.5;\n\n    if(brightness > threshold) {\n        gl_FragColor = color;\n    } else {\n        gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);\n    }\n}\n")||this;return t.threshold=n,t}return u(n,e),Object.defineProperty(n.prototype,"threshold",{get:function(){return this.uniforms.threshold},set:function(e){this.uniforms.threshold=e},enumerable:!1,configurable:!0}),n}(n.Filter),d=function(e){function n(n,r,o){void 0===n&&(n=4),void 0===r&&(r=3),void 0===o&&(o=!1);var i=e.call(this,c,o?"\nvarying vec2 vTextureCoord;\nuniform sampler2D uSampler;\n\nuniform vec2 uOffset;\nuniform vec4 filterClamp;\n\nvoid main(void)\n{\n    vec4 color = vec4(0.0);\n\n    // Sample top left pixel\n    color += texture2D(uSampler, clamp(vec2(vTextureCoord.x - uOffset.x, vTextureCoord.y + uOffset.y), filterClamp.xy, filterClamp.zw));\n\n    // Sample top right pixel\n    color += texture2D(uSampler, clamp(vec2(vTextureCoord.x + uOffset.x, vTextureCoord.y + uOffset.y), filterClamp.xy, filterClamp.zw));\n\n    // Sample bottom right pixel\n    color += texture2D(uSampler, clamp(vec2(vTextureCoord.x + uOffset.x, vTextureCoord.y - uOffset.y), filterClamp.xy, filterClamp.zw));\n\n    // Sample bottom left pixel\n    color += texture2D(uSampler, clamp(vec2(vTextureCoord.x - uOffset.x, vTextureCoord.y - uOffset.y), filterClamp.xy, filterClamp.zw));\n\n    // Average\n    color *= 0.25;\n\n    gl_FragColor = color;\n}\n":"\nvarying vec2 vTextureCoord;\nuniform sampler2D uSampler;\n\nuniform vec2 uOffset;\n\nvoid main(void)\n{\n    vec4 color = vec4(0.0);\n\n    // Sample top left pixel\n    color += texture2D(uSampler, vec2(vTextureCoord.x - uOffset.x, vTextureCoord.y + uOffset.y));\n\n    // Sample top right pixel\n    color += texture2D(uSampler, vec2(vTextureCoord.x + uOffset.x, vTextureCoord.y + uOffset.y));\n\n    // Sample bottom right pixel\n    color += texture2D(uSampler, vec2(vTextureCoord.x + uOffset.x, vTextureCoord.y - uOffset.y));\n\n    // Sample bottom left pixel\n    color += texture2D(uSampler, vec2(vTextureCoord.x - uOffset.x, vTextureCoord.y - uOffset.y));\n\n    // Average\n    color *= 0.25;\n\n    gl_FragColor = color;\n}")||this;return i._kernels=[],i._blur=4,i._quality=3,i.uniforms.uOffset=new Float32Array(2),i._pixelSize=new t.Point,i.pixelSize=1,i._clamp=o,Array.isArray(n)?i.kernels=n:(i._blur=n,i.quality=r),i}return u(n,e),n.prototype.apply=function(e,n,t,r){var o,i=this._pixelSize.x/n._frame.width,l=this._pixelSize.y/n._frame.height;if(1===this._quality||0===this._blur)o=this._kernels[0]+.5,this.uniforms.uOffset[0]=o*i,this.uniforms.uOffset[1]=o*l,e.applyFilter(this,n,t,r);else{for(var a=e.getFilterTexture(),s=n,u=a,f=void 0,c=this._quality-1,m=0;m<c;m++)o=this._kernels[m]+.5,this.uniforms.uOffset[0]=o*i,this.uniforms.uOffset[1]=o*l,e.applyFilter(this,s,u,1),f=s,s=u,u=f;o=this._kernels[c]+.5,this.uniforms.uOffset[0]=o*i,this.uniforms.uOffset[1]=o*l,e.applyFilter(this,s,t,r),e.returnFilterTexture(a)}},n.prototype._updatePadding=function(){this.padding=Math.ceil(this._kernels.reduce((function(e,n){return e+n+.5}),0))},n.prototype._generateKernels=function(){var e=this._blur,n=this._quality,t=[e];if(e>0)for(var r=e,o=e/n,i=1;i<n;i++)r-=o,t.push(r);this._kernels=t,this._updatePadding()},Object.defineProperty(n.prototype,"kernels",{get:function(){return this._kernels},set:function(e){Array.isArray(e)&&e.length>0?(this._kernels=e,this._quality=e.length,this._blur=Math.max.apply(Math,e)):(this._kernels=[0],this._quality=1)},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"clamp",{get:function(){return this._clamp},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"pixelSize",{get:function(){return this._pixelSize},set:function(e){"number"==typeof e?(this._pixelSize.x=e,this._pixelSize.y=e):Array.isArray(e)?(this._pixelSize.x=e[0],this._pixelSize.y=e[1]):e instanceof t.Point?(this._pixelSize.x=e.x,this._pixelSize.y=e.y):(this._pixelSize.x=1,this._pixelSize.y=1)},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"quality",{get:function(){return this._quality},set:function(e){this._quality=Math.max(1,Math.round(e)),this._generateKernels()},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"blur",{get:function(){return this._blur},set:function(e){this._blur=e,this._generateKernels()},enumerable:!1,configurable:!0}),n}(n.Filter),h=function(e){function n(t){var o=e.call(this,c,"uniform sampler2D uSampler;\nvarying vec2 vTextureCoord;\n\nuniform sampler2D bloomTexture;\nuniform float bloomScale;\nuniform float brightness;\n\nvoid main() {\n    vec4 color = texture2D(uSampler, vTextureCoord);\n    color.rgb *= brightness;\n    vec4 bloomColor = vec4(texture2D(bloomTexture, vTextureCoord).rgb, 0.0);\n    bloomColor.rgb *= bloomScale;\n    gl_FragColor = color + bloomColor;\n}\n")||this;o.bloomScale=1,o.brightness=1,o._resolution=r.settings.FILTER_RESOLUTION,"number"==typeof t&&(t={threshold:t});var i=Object.assign(n.defaults,t);o.bloomScale=i.bloomScale,o.brightness=i.brightness;var l=i.kernels,a=i.blur,s=i.quality,u=i.pixelSize,f=i.resolution;return o._extractFilter=new p(i.threshold),o._extractFilter.resolution=f,o._blurFilter=l?new d(l):new d(a,s),o.pixelSize=u,o.resolution=f,o}return u(n,e),n.prototype.apply=function(e,n,t,r,o){var i=e.getFilterTexture();this._extractFilter.apply(e,n,i,1,o);var l=e.getFilterTexture();this._blurFilter.apply(e,i,l,1),this.uniforms.bloomScale=this.bloomScale,this.uniforms.brightness=this.brightness,this.uniforms.bloomTexture=l,e.applyFilter(this,n,t,r),e.returnFilterTexture(l),e.returnFilterTexture(i)},Object.defineProperty(n.prototype,"resolution",{get:function(){return this._resolution},set:function(e){this._resolution=e,this._extractFilter&&(this._extractFilter.resolution=e),this._blurFilter&&(this._blurFilter.resolution=e)},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"threshold",{get:function(){return this._extractFilter.threshold},set:function(e){this._extractFilter.threshold=e},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"kernels",{get:function(){return this._blurFilter.kernels},set:function(e){this._blurFilter.kernels=e},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"blur",{get:function(){return this._blurFilter.blur},set:function(e){this._blurFilter.blur=e},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"quality",{get:function(){return this._blurFilter.quality},set:function(e){this._blurFilter.quality=e},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"pixelSize",{get:function(){return this._blurFilter.pixelSize},set:function(e){this._blurFilter.pixelSize=e},enumerable:!1,configurable:!0}),n.defaults={threshold:.5,bloomScale:1,brightness:1,kernels:null,blur:8,quality:4,pixelSize:1,resolution:r.settings.FILTER_RESOLUTION},n}(n.Filter),g=function(e){function n(n){void 0===n&&(n=8);var t=e.call(this,c,"varying vec2 vTextureCoord;\n\nuniform vec4 filterArea;\nuniform float pixelSize;\nuniform sampler2D uSampler;\n\nvec2 mapCoord( vec2 coord )\n{\n    coord *= filterArea.xy;\n    coord += filterArea.zw;\n\n    return coord;\n}\n\nvec2 unmapCoord( vec2 coord )\n{\n    coord -= filterArea.zw;\n    coord /= filterArea.xy;\n\n    return coord;\n}\n\nvec2 pixelate(vec2 coord, vec2 size)\n{\n    return floor( coord / size ) * size;\n}\n\nvec2 getMod(vec2 coord, vec2 size)\n{\n    return mod( coord , size) / size;\n}\n\nfloat character(float n, vec2 p)\n{\n    p = floor(p*vec2(4.0, -4.0) + 2.5);\n\n    if (clamp(p.x, 0.0, 4.0) == p.x)\n    {\n        if (clamp(p.y, 0.0, 4.0) == p.y)\n        {\n            if (int(mod(n/exp2(p.x + 5.0*p.y), 2.0)) == 1) return 1.0;\n        }\n    }\n    return 0.0;\n}\n\nvoid main()\n{\n    vec2 coord = mapCoord(vTextureCoord);\n\n    // get the rounded color..\n    vec2 pixCoord = pixelate(coord, vec2(pixelSize));\n    pixCoord = unmapCoord(pixCoord);\n\n    vec4 color = texture2D(uSampler, pixCoord);\n\n    // determine the character to use\n    float gray = (color.r + color.g + color.b) / 3.0;\n\n    float n =  65536.0;             // .\n    if (gray > 0.2) n = 65600.0;    // :\n    if (gray > 0.3) n = 332772.0;   // *\n    if (gray > 0.4) n = 15255086.0; // o\n    if (gray > 0.5) n = 23385164.0; // &\n    if (gray > 0.6) n = 15252014.0; // 8\n    if (gray > 0.7) n = 13199452.0; // @\n    if (gray > 0.8) n = 11512810.0; // #\n\n    // get the mod..\n    vec2 modd = getMod(coord, vec2(pixelSize));\n\n    gl_FragColor = color * character( n, vec2(-1.0) + modd * 2.0);\n\n}\n")||this;return t.size=n,t}return u(n,e),Object.defineProperty(n.prototype,"size",{get:function(){return this.uniforms.pixelSize},set:function(e){this.uniforms.pixelSize=e},enumerable:!1,configurable:!0}),n}(n.Filter),v=function(e){function n(n){var t=e.call(this,c,"precision mediump float;\n\nvarying vec2 vTextureCoord;\nuniform sampler2D uSampler;\nuniform vec4 filterArea;\n\nuniform float transformX;\nuniform float transformY;\nuniform vec3 lightColor;\nuniform float lightAlpha;\nuniform vec3 shadowColor;\nuniform float shadowAlpha;\n\nvoid main(void) {\n    vec2 transform = vec2(1.0 / filterArea) * vec2(transformX, transformY);\n    vec4 color = texture2D(uSampler, vTextureCoord);\n    float light = texture2D(uSampler, vTextureCoord - transform).a;\n    float shadow = texture2D(uSampler, vTextureCoord + transform).a;\n\n    color.rgb = mix(color.rgb, lightColor, clamp((color.a - light) * lightAlpha, 0.0, 1.0));\n    color.rgb = mix(color.rgb, shadowColor, clamp((color.a - shadow) * shadowAlpha, 0.0, 1.0));\n    gl_FragColor = vec4(color.rgb * color.a, color.a);\n}\n")||this;return t._thickness=2,t._angle=0,t.uniforms.lightColor=new Float32Array(3),t.uniforms.shadowColor=new Float32Array(3),Object.assign(t,{rotation:45,thickness:2,lightColor:16777215,lightAlpha:.7,shadowColor:0,shadowAlpha:.7},n),t.padding=1,t}return u(n,e),n.prototype._updateTransform=function(){this.uniforms.transformX=this._thickness*Math.cos(this._angle),this.uniforms.transformY=this._thickness*Math.sin(this._angle)},Object.defineProperty(n.prototype,"rotation",{get:function(){return this._angle/t.DEG_TO_RAD},set:function(e){this._angle=e*t.DEG_TO_RAD,this._updateTransform()},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"thickness",{get:function(){return this._thickness},set:function(e){this._thickness=e,this._updateTransform()},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"lightColor",{get:function(){return o.rgb2hex(this.uniforms.lightColor)},set:function(e){o.hex2rgb(e,this.uniforms.lightColor)},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"lightAlpha",{get:function(){return this.uniforms.lightAlpha},set:function(e){this.uniforms.lightAlpha=e},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"shadowColor",{get:function(){return o.rgb2hex(this.uniforms.shadowColor)},set:function(e){o.hex2rgb(e,this.uniforms.shadowColor)},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"shadowAlpha",{get:function(){return this.uniforms.shadowAlpha},set:function(e){this.uniforms.shadowAlpha=e},enumerable:!1,configurable:!0}),n}(n.Filter),y=function(e){function n(n,o,s,u){void 0===n&&(n=2),void 0===o&&(o=4),void 0===s&&(s=r.settings.FILTER_RESOLUTION),void 0===u&&(u=5);var f,c,m=e.call(this)||this;return"number"==typeof n?(f=n,c=n):n instanceof t.Point?(f=n.x,c=n.y):Array.isArray(n)&&(f=n[0],c=n[1]),m.blurXFilter=new a.BlurFilterPass(!0,f,o,s,u),m.blurYFilter=new a.BlurFilterPass(!1,c,o,s,u),m.blurYFilter.blendMode=i.BLEND_MODES.SCREEN,m.defaultFilter=new l.AlphaFilter,m}return u(n,e),n.prototype.apply=function(e,n,t,r){var o=e.getFilterTexture();this.defaultFilter.apply(e,n,t,r),this.blurXFilter.apply(e,n,o,1),this.blurYFilter.apply(e,o,t,0),e.returnFilterTexture(o)},Object.defineProperty(n.prototype,"blur",{get:function(){return this.blurXFilter.blur},set:function(e){this.blurXFilter.blur=this.blurYFilter.blur=e},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"blurX",{get:function(){return this.blurXFilter.blur},set:function(e){this.blurXFilter.blur=e},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"blurY",{get:function(){return this.blurYFilter.blur},set:function(e){this.blurYFilter.blur=e},enumerable:!1,configurable:!0}),n}(n.Filter),b=function(e){function n(t){var r=e.call(this,c,"uniform float radius;\nuniform float strength;\nuniform vec2 center;\nuniform sampler2D uSampler;\nvarying vec2 vTextureCoord;\n\nuniform vec4 filterArea;\nuniform vec4 filterClamp;\nuniform vec2 dimensions;\n\nvoid main()\n{\n    vec2 coord = vTextureCoord * filterArea.xy;\n    coord -= center * dimensions.xy;\n    float distance = length(coord);\n    if (distance < radius) {\n        float percent = distance / radius;\n        if (strength > 0.0) {\n            coord *= mix(1.0, smoothstep(0.0, radius / distance, percent), strength * 0.75);\n        } else {\n            coord *= mix(1.0, pow(percent, 1.0 + strength * 0.75) * radius / distance, 1.0 - percent);\n        }\n    }\n    coord += center * dimensions.xy;\n    coord /= filterArea.xy;\n    vec2 clampedCoord = clamp(coord, filterClamp.xy, filterClamp.zw);\n    vec4 color = texture2D(uSampler, clampedCoord);\n    if (coord != clampedCoord) {\n        color *= max(0.0, 1.0 - length(coord - clampedCoord));\n    }\n\n    gl_FragColor = color;\n}\n")||this;return r.uniforms.dimensions=new Float32Array(2),Object.assign(r,n.defaults,t),r}return u(n,e),n.prototype.apply=function(e,n,t,r){var o=n.filterFrame,i=o.width,l=o.height;this.uniforms.dimensions[0]=i,this.uniforms.dimensions[1]=l,e.applyFilter(this,n,t,r)},Object.defineProperty(n.prototype,"radius",{get:function(){return this.uniforms.radius},set:function(e){this.uniforms.radius=e},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"strength",{get:function(){return this.uniforms.strength},set:function(e){this.uniforms.strength=e},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"center",{get:function(){return this.uniforms.center},set:function(e){this.uniforms.center=e},enumerable:!1,configurable:!0}),n.defaults={center:[.5,.5],radius:100,strength:1},n}(n.Filter),x=function(e){function t(n,t,r){void 0===t&&(t=!1),void 0===r&&(r=1);var o=e.call(this,c,"varying vec2 vTextureCoord;\nuniform sampler2D uSampler;\nuniform sampler2D colorMap;\nuniform float _mix;\nuniform float _size;\nuniform float _sliceSize;\nuniform float _slicePixelSize;\nuniform float _sliceInnerSize;\nvoid main() {\n    vec4 color = texture2D(uSampler, vTextureCoord.xy);\n\n    vec4 adjusted;\n    if (color.a > 0.0) {\n        color.rgb /= color.a;\n        float innerWidth = _size - 1.0;\n        float zSlice0 = min(floor(color.b * innerWidth), innerWidth);\n        float zSlice1 = min(zSlice0 + 1.0, innerWidth);\n        float xOffset = _slicePixelSize * 0.5 + color.r * _sliceInnerSize;\n        float s0 = xOffset + (zSlice0 * _sliceSize);\n        float s1 = xOffset + (zSlice1 * _sliceSize);\n        float yOffset = _sliceSize * 0.5 + color.g * (1.0 - _sliceSize);\n        vec4 slice0Color = texture2D(colorMap, vec2(s0,yOffset));\n        vec4 slice1Color = texture2D(colorMap, vec2(s1,yOffset));\n        float zOffset = fract(color.b * innerWidth);\n        adjusted = mix(slice0Color, slice1Color, zOffset);\n\n        color.rgb *= color.a;\n    }\n    gl_FragColor = vec4(mix(color, adjusted, _mix).rgb, color.a);\n\n}")||this;return o.mix=1,o._size=0,o._sliceSize=0,o._slicePixelSize=0,o._sliceInnerSize=0,o._nearest=!1,o._scaleMode=null,o._colorMap=null,o._scaleMode=null,o.nearest=t,o.mix=r,o.colorMap=n,o}return u(t,e),t.prototype.apply=function(e,n,t,r){this.uniforms._mix=this.mix,e.applyFilter(this,n,t,r)},Object.defineProperty(t.prototype,"colorSize",{get:function(){return this._size},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"colorMap",{get:function(){return this._colorMap},set:function(e){var t;e&&(e instanceof n.Texture||(e=n.Texture.from(e)),(null===(t=e)||void 0===t?void 0:t.baseTexture)&&(e.baseTexture.scaleMode=this._scaleMode,e.baseTexture.mipmap=i.MIPMAP_MODES.OFF,this._size=e.height,this._sliceSize=1/this._size,this._slicePixelSize=this._sliceSize/this._size,this._sliceInnerSize=this._slicePixelSize*(this._size-1),this.uniforms._size=this._size,this.uniforms._sliceSize=this._sliceSize,this.uniforms._slicePixelSize=this._slicePixelSize,this.uniforms._sliceInnerSize=this._sliceInnerSize,this.uniforms.colorMap=e),this._colorMap=e)},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"nearest",{get:function(){return this._nearest},set:function(e){this._nearest=e,this._scaleMode=e?i.SCALE_MODES.NEAREST:i.SCALE_MODES.LINEAR;var n=this._colorMap;n&&n.baseTexture&&(n.baseTexture._glTextures={},n.baseTexture.scaleMode=this._scaleMode,n.baseTexture.mipmap=i.MIPMAP_MODES.OFF,n._updateID++,n.baseTexture.emit("update",n.baseTexture))},enumerable:!1,configurable:!0}),t.prototype.updateColorMap=function(){var e=this._colorMap;e&&e.baseTexture&&(e._updateID++,e.baseTexture.emit("update",e.baseTexture),this.colorMap=e)},t.prototype.destroy=function(n){void 0===n&&(n=!1),this._colorMap&&this._colorMap.destroy(n),e.prototype.destroy.call(this)},t}(n.Filter),_=function(e){function n(n,t){void 0===n&&(n=0),void 0===t&&(t=1);var r=e.call(this,c,"varying vec2 vTextureCoord;\nuniform sampler2D uSampler;\nuniform vec3 color;\nuniform float alpha;\n\nvoid main(void) {\n    vec4 currentColor = texture2D(uSampler, vTextureCoord);\n    gl_FragColor = vec4(mix(currentColor.rgb, color.rgb, currentColor.a * alpha), currentColor.a);\n}\n")||this;return r._color=0,r._alpha=1,r.uniforms.color=new Float32Array(3),r.color=n,r.alpha=t,r}return u(n,e),Object.defineProperty(n.prototype,"color",{get:function(){return this._color},set:function(e){var n=this.uniforms.color;"number"==typeof e?(o.hex2rgb(e,n),this._color=e):(n[0]=e[0],n[1]=e[1],n[2]=e[2],this._color=o.rgb2hex(n))},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"alpha",{get:function(){return this._alpha},set:function(e){this.uniforms.alpha=e,this._alpha=e},enumerable:!1,configurable:!0}),n}(n.Filter),C=function(e){function n(n,t,r){void 0===n&&(n=16711680),void 0===t&&(t=0),void 0===r&&(r=.4);var o=e.call(this,c,"varying vec2 vTextureCoord;\nuniform sampler2D uSampler;\nuniform vec3 originalColor;\nuniform vec3 newColor;\nuniform float epsilon;\nvoid main(void) {\n    vec4 currentColor = texture2D(uSampler, vTextureCoord);\n    vec3 colorDiff = originalColor - (currentColor.rgb / max(currentColor.a, 0.0000000001));\n    float colorDistance = length(colorDiff);\n    float doReplace = step(colorDistance, epsilon);\n    gl_FragColor = vec4(mix(currentColor.rgb, (newColor + colorDiff) * currentColor.a, doReplace), currentColor.a);\n}\n")||this;return o._originalColor=16711680,o._newColor=0,o.uniforms.originalColor=new Float32Array(3),o.uniforms.newColor=new Float32Array(3),o.originalColor=n,o.newColor=t,o.epsilon=r,o}return u(n,e),Object.defineProperty(n.prototype,"originalColor",{get:function(){return this._originalColor},set:function(e){var n=this.uniforms.originalColor;"number"==typeof e?(o.hex2rgb(e,n),this._originalColor=e):(n[0]=e[0],n[1]=e[1],n[2]=e[2],this._originalColor=o.rgb2hex(n))},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"newColor",{get:function(){return this._newColor},set:function(e){var n=this.uniforms.newColor;"number"==typeof e?(o.hex2rgb(e,n),this._newColor=e):(n[0]=e[0],n[1]=e[1],n[2]=e[2],this._newColor=o.rgb2hex(n))},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"epsilon",{get:function(){return this.uniforms.epsilon},set:function(e){this.uniforms.epsilon=e},enumerable:!1,configurable:!0}),n}(n.Filter),S=function(e){function n(n,t,r){void 0===t&&(t=200),void 0===r&&(r=200);var o=e.call(this,c,"precision mediump float;\n\nvarying mediump vec2 vTextureCoord;\n\nuniform sampler2D uSampler;\nuniform vec2 texelSize;\nuniform float matrix[9];\n\nvoid main(void)\n{\n   vec4 c11 = texture2D(uSampler, vTextureCoord - texelSize); // top left\n   vec4 c12 = texture2D(uSampler, vec2(vTextureCoord.x, vTextureCoord.y - texelSize.y)); // top center\n   vec4 c13 = texture2D(uSampler, vec2(vTextureCoord.x + texelSize.x, vTextureCoord.y - texelSize.y)); // top right\n\n   vec4 c21 = texture2D(uSampler, vec2(vTextureCoord.x - texelSize.x, vTextureCoord.y)); // mid left\n   vec4 c22 = texture2D(uSampler, vTextureCoord); // mid center\n   vec4 c23 = texture2D(uSampler, vec2(vTextureCoord.x + texelSize.x, vTextureCoord.y)); // mid right\n\n   vec4 c31 = texture2D(uSampler, vec2(vTextureCoord.x - texelSize.x, vTextureCoord.y + texelSize.y)); // bottom left\n   vec4 c32 = texture2D(uSampler, vec2(vTextureCoord.x, vTextureCoord.y + texelSize.y)); // bottom center\n   vec4 c33 = texture2D(uSampler, vTextureCoord + texelSize); // bottom right\n\n   gl_FragColor =\n       c11 * matrix[0] + c12 * matrix[1] + c13 * matrix[2] +\n       c21 * matrix[3] + c22 * matrix[4] + c23 * matrix[5] +\n       c31 * matrix[6] + c32 * matrix[7] + c33 * matrix[8];\n\n   gl_FragColor.a = c22.a;\n}\n")||this;return o.uniforms.texelSize=new Float32Array(2),o.uniforms.matrix=new Float32Array(9),void 0!==n&&(o.matrix=n),o.width=t,o.height=r,o}return u(n,e),Object.defineProperty(n.prototype,"matrix",{get:function(){return this.uniforms.matrix},set:function(e){var n=this;e.forEach((function(e,t){n.uniforms.matrix[t]=e}))},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"width",{get:function(){return 1/this.uniforms.texelSize[0]},set:function(e){this.uniforms.texelSize[0]=1/e},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"height",{get:function(){return 1/this.uniforms.texelSize[1]},set:function(e){this.uniforms.texelSize[1]=1/e},enumerable:!1,configurable:!0}),n}(n.Filter),F=function(e){function n(){return e.call(this,c,"precision mediump float;\n\nvarying vec2 vTextureCoord;\n\nuniform sampler2D uSampler;\n\nvoid main(void)\n{\n    float lum = length(texture2D(uSampler, vTextureCoord.xy).rgb);\n\n    gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);\n\n    if (lum < 1.00)\n    {\n        if (mod(gl_FragCoord.x + gl_FragCoord.y, 10.0) == 0.0)\n        {\n            gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);\n        }\n    }\n\n    if (lum < 0.75)\n    {\n        if (mod(gl_FragCoord.x - gl_FragCoord.y, 10.0) == 0.0)\n        {\n            gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);\n        }\n    }\n\n    if (lum < 0.50)\n    {\n        if (mod(gl_FragCoord.x + gl_FragCoord.y - 5.0, 10.0) == 0.0)\n        {\n            gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);\n        }\n    }\n\n    if (lum < 0.3)\n    {\n        if (mod(gl_FragCoord.x - gl_FragCoord.y - 5.0, 10.0) == 0.0)\n        {\n            gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);\n        }\n    }\n}\n")||this}return u(n,e),n}(n.Filter),z=function(e){function n(t){var r=e.call(this,c,"varying vec2 vTextureCoord;\nuniform sampler2D uSampler;\n\nuniform vec4 filterArea;\nuniform vec2 dimensions;\n\nconst float SQRT_2 = 1.414213;\n\nconst float light = 1.0;\n\nuniform float curvature;\nuniform float lineWidth;\nuniform float lineContrast;\nuniform bool verticalLine;\nuniform float noise;\nuniform float noiseSize;\n\nuniform float vignetting;\nuniform float vignettingAlpha;\nuniform float vignettingBlur;\n\nuniform float seed;\nuniform float time;\n\nfloat rand(vec2 co) {\n    return fract(sin(dot(co.xy, vec2(12.9898, 78.233))) * 43758.5453);\n}\n\nvoid main(void)\n{\n    vec2 pixelCoord = vTextureCoord.xy * filterArea.xy;\n    vec2 dir = vec2(vTextureCoord.xy * filterArea.xy / dimensions - vec2(0.5, 0.5));\n    \n    gl_FragColor = texture2D(uSampler, vTextureCoord);\n    vec3 rgb = gl_FragColor.rgb;\n\n    if (noise > 0.0 && noiseSize > 0.0)\n    {\n        pixelCoord.x = floor(pixelCoord.x / noiseSize);\n        pixelCoord.y = floor(pixelCoord.y / noiseSize);\n        float _noise = rand(pixelCoord * noiseSize * seed) - 0.5;\n        rgb += _noise * noise;\n    }\n\n    if (lineWidth > 0.0)\n    {\n        float _c = curvature > 0. ? curvature : 1.;\n        float k = curvature > 0. ?(length(dir * dir) * 0.25 * _c * _c + 0.935 * _c) : 1.;\n        vec2 uv = dir * k;\n\n        float v = (verticalLine ? uv.x * dimensions.x : uv.y * dimensions.y) * min(1.0, 2.0 / lineWidth ) / _c;\n        float j = 1. + cos(v * 1.2 - time) * 0.5 * lineContrast;\n        rgb *= j;\n        float segment = verticalLine ? mod((dir.x + .5) * dimensions.x, 4.) : mod((dir.y + .5) * dimensions.y, 4.);\n        rgb *= 0.99 + ceil(segment) * 0.015;\n    }\n\n    if (vignetting > 0.0)\n    {\n        float outter = SQRT_2 - vignetting * SQRT_2;\n        float darker = clamp((outter - length(dir) * SQRT_2) / ( 0.00001 + vignettingBlur * SQRT_2), 0.0, 1.0);\n        rgb *= darker + (1.0 - darker) * (1.0 - vignettingAlpha);\n    }\n\n    gl_FragColor.rgb = rgb;\n}\n")||this;return r.time=0,r.seed=0,r.uniforms.dimensions=new Float32Array(2),Object.assign(r,n.defaults,t),r}return u(n,e),n.prototype.apply=function(e,n,t,r){var o=n.filterFrame,i=o.width,l=o.height;this.uniforms.dimensions[0]=i,this.uniforms.dimensions[1]=l,this.uniforms.seed=this.seed,this.uniforms.time=this.time,e.applyFilter(this,n,t,r)},Object.defineProperty(n.prototype,"curvature",{get:function(){return this.uniforms.curvature},set:function(e){this.uniforms.curvature=e},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"lineWidth",{get:function(){return this.uniforms.lineWidth},set:function(e){this.uniforms.lineWidth=e},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"lineContrast",{get:function(){return this.uniforms.lineContrast},set:function(e){this.uniforms.lineContrast=e},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"verticalLine",{get:function(){return this.uniforms.verticalLine},set:function(e){this.uniforms.verticalLine=e},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"noise",{get:function(){return this.uniforms.noise},set:function(e){this.uniforms.noise=e},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"noiseSize",{get:function(){return this.uniforms.noiseSize},set:function(e){this.uniforms.noiseSize=e},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"vignetting",{get:function(){return this.uniforms.vignetting},set:function(e){this.uniforms.vignetting=e},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"vignettingAlpha",{get:function(){return this.uniforms.vignettingAlpha},set:function(e){this.uniforms.vignettingAlpha=e},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"vignettingBlur",{get:function(){return this.uniforms.vignettingBlur},set:function(e){this.uniforms.vignettingBlur=e},enumerable:!1,configurable:!0}),n.defaults={curvature:1,lineWidth:1,lineContrast:.25,verticalLine:!1,noise:0,noiseSize:1,seed:0,vignetting:.3,vignettingAlpha:1,vignettingBlur:.3,time:0},n}(n.Filter),O=function(e){function n(n,t){void 0===n&&(n=1),void 0===t&&(t=5);var r=e.call(this,c,"precision mediump float;\n\nvarying vec2 vTextureCoord;\nvarying vec4 vColor;\n\nuniform vec4 filterArea;\nuniform sampler2D uSampler;\n\nuniform float angle;\nuniform float scale;\n\nfloat pattern()\n{\n   float s = sin(angle), c = cos(angle);\n   vec2 tex = vTextureCoord * filterArea.xy;\n   vec2 point = vec2(\n       c * tex.x - s * tex.y,\n       s * tex.x + c * tex.y\n   ) * scale;\n   return (sin(point.x) * sin(point.y)) * 4.0;\n}\n\nvoid main()\n{\n   vec4 color = texture2D(uSampler, vTextureCoord);\n   float average = (color.r + color.g + color.b) / 3.0;\n   gl_FragColor = vec4(vec3(average * 10.0 - 5.0 + pattern()), color.a);\n}\n")||this;return r.scale=n,r.angle=t,r}return u(n,e),Object.defineProperty(n.prototype,"scale",{get:function(){return this.uniforms.scale},set:function(e){this.uniforms.scale=e},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"angle",{get:function(){return this.uniforms.angle},set:function(e){this.uniforms.angle=e},enumerable:!1,configurable:!0}),n}(n.Filter),P=function(e){function i(o){var l=e.call(this)||this;l.angle=45,l._distance=5,l._resolution=r.settings.FILTER_RESOLUTION;var a=o?f(f({},i.defaults),o):i.defaults,s=a.kernels,u=a.blur,m=a.quality,p=a.pixelSize,h=a.resolution;l._tintFilter=new n.Filter(c,"varying vec2 vTextureCoord;\nuniform sampler2D uSampler;\nuniform float alpha;\nuniform vec3 color;\n\nuniform vec2 shift;\nuniform vec4 inputSize;\n\nvoid main(void){\n    vec4 sample = texture2D(uSampler, vTextureCoord - shift * inputSize.zw);\n\n    // Premultiply alpha\n    sample.rgb = color.rgb * sample.a;\n\n    // alpha user alpha\n    sample *= alpha;\n\n    gl_FragColor = sample;\n}"),l._tintFilter.uniforms.color=new Float32Array(4),l._tintFilter.uniforms.shift=new t.Point,l._tintFilter.resolution=h,l._blurFilter=s?new d(s):new d(u,m),l.pixelSize=p,l.resolution=h;var g=a.shadowOnly,v=a.rotation,y=a.distance,b=a.alpha,x=a.color;return l.shadowOnly=g,l.rotation=v,l.distance=y,l.alpha=b,l.color=x,l._updatePadding(),l}return u(i,e),i.prototype.apply=function(e,n,t,r){var o=e.getFilterTexture();this._tintFilter.apply(e,n,o,1),this._blurFilter.apply(e,o,t,r),!0!==this.shadowOnly&&e.applyFilter(this,n,t,0),e.returnFilterTexture(o)},i.prototype._updatePadding=function(){this.padding=this.distance+2*this.blur},i.prototype._updateShift=function(){this._tintFilter.uniforms.shift.set(this.distance*Math.cos(this.angle),this.distance*Math.sin(this.angle))},Object.defineProperty(i.prototype,"resolution",{get:function(){return this._resolution},set:function(e){this._resolution=e,this._tintFilter&&(this._tintFilter.resolution=e),this._blurFilter&&(this._blurFilter.resolution=e)},enumerable:!1,configurable:!0}),Object.defineProperty(i.prototype,"distance",{get:function(){return this._distance},set:function(e){this._distance=e,this._updatePadding(),this._updateShift()},enumerable:!1,configurable:!0}),Object.defineProperty(i.prototype,"rotation",{get:function(){return this.angle/t.DEG_TO_RAD},set:function(e){this.angle=e*t.DEG_TO_RAD,this._updateShift()},enumerable:!1,configurable:!0}),Object.defineProperty(i.prototype,"alpha",{get:function(){return this._tintFilter.uniforms.alpha},set:function(e){this._tintFilter.uniforms.alpha=e},enumerable:!1,configurable:!0}),Object.defineProperty(i.prototype,"color",{get:function(){return o.rgb2hex(this._tintFilter.uniforms.color)},set:function(e){o.hex2rgb(e,this._tintFilter.uniforms.color)},enumerable:!1,configurable:!0}),Object.defineProperty(i.prototype,"kernels",{get:function(){return this._blurFilter.kernels},set:function(e){this._blurFilter.kernels=e},enumerable:!1,configurable:!0}),Object.defineProperty(i.prototype,"blur",{get:function(){return this._blurFilter.blur},set:function(e){this._blurFilter.blur=e,this._updatePadding()},enumerable:!1,configurable:!0}),Object.defineProperty(i.prototype,"quality",{get:function(){return this._blurFilter.quality},set:function(e){this._blurFilter.quality=e},enumerable:!1,configurable:!0}),Object.defineProperty(i.prototype,"pixelSize",{get:function(){return this._blurFilter.pixelSize},set:function(e){this._blurFilter.pixelSize=e},enumerable:!1,configurable:!0}),i.defaults={rotation:45,distance:5,color:0,alpha:.5,shadowOnly:!1,kernels:null,blur:2,quality:3,pixelSize:1,resolution:r.settings.FILTER_RESOLUTION},i}(n.Filter),A=function(e){function n(n){void 0===n&&(n=5);var t=e.call(this,c,"precision mediump float;\n\nvarying vec2 vTextureCoord;\n\nuniform sampler2D uSampler;\nuniform float strength;\nuniform vec4 filterArea;\n\n\nvoid main(void)\n{\n\tvec2 onePixel = vec2(1.0 / filterArea);\n\n\tvec4 color;\n\n\tcolor.rgb = vec3(0.5);\n\n\tcolor -= texture2D(uSampler, vTextureCoord - onePixel) * strength;\n\tcolor += texture2D(uSampler, vTextureCoord + onePixel) * strength;\n\n\tcolor.rgb = vec3((color.r + color.g + color.b) / 3.0);\n\n\tfloat alpha = texture2D(uSampler, vTextureCoord).a;\n\n\tgl_FragColor = vec4(color.rgb * alpha, alpha);\n}\n")||this;return t.strength=n,t}return u(n,e),Object.defineProperty(n.prototype,"strength",{get:function(){return this.uniforms.strength},set:function(e){this.uniforms.strength=e},enumerable:!1,configurable:!0}),n}(n.Filter),T=function(e){function r(t){var o=e.call(this,c,"// precision highp float;\n\nvarying vec2 vTextureCoord;\nuniform sampler2D uSampler;\n\nuniform vec4 filterArea;\nuniform vec4 filterClamp;\nuniform vec2 dimensions;\nuniform float aspect;\n\nuniform sampler2D displacementMap;\nuniform float offset;\nuniform float sinDir;\nuniform float cosDir;\nuniform int fillMode;\n\nuniform float seed;\nuniform vec2 red;\nuniform vec2 green;\nuniform vec2 blue;\n\nconst int TRANSPARENT = 0;\nconst int ORIGINAL = 1;\nconst int LOOP = 2;\nconst int CLAMP = 3;\nconst int MIRROR = 4;\n\nvoid main(void)\n{\n    vec2 coord = (vTextureCoord * filterArea.xy) / dimensions;\n\n    if (coord.x > 1.0 || coord.y > 1.0) {\n        return;\n    }\n\n    float cx = coord.x - 0.5;\n    float cy = (coord.y - 0.5) * aspect;\n    float ny = (-sinDir * cx + cosDir * cy) / aspect + 0.5;\n\n    // displacementMap: repeat\n    // ny = ny > 1.0 ? ny - 1.0 : (ny < 0.0 ? 1.0 + ny : ny);\n\n    // displacementMap: mirror\n    ny = ny > 1.0 ? 2.0 - ny : (ny < 0.0 ? -ny : ny);\n\n    vec4 dc = texture2D(displacementMap, vec2(0.5, ny));\n\n    float displacement = (dc.r - dc.g) * (offset / filterArea.x);\n\n    coord = vTextureCoord + vec2(cosDir * displacement, sinDir * displacement * aspect);\n\n    if (fillMode == CLAMP) {\n        coord = clamp(coord, filterClamp.xy, filterClamp.zw);\n    } else {\n        if( coord.x > filterClamp.z ) {\n            if (fillMode == TRANSPARENT) {\n                discard;\n            } else if (fillMode == LOOP) {\n                coord.x -= filterClamp.z;\n            } else if (fillMode == MIRROR) {\n                coord.x = filterClamp.z * 2.0 - coord.x;\n            }\n        } else if( coord.x < filterClamp.x ) {\n            if (fillMode == TRANSPARENT) {\n                discard;\n            } else if (fillMode == LOOP) {\n                coord.x += filterClamp.z;\n            } else if (fillMode == MIRROR) {\n                coord.x *= -filterClamp.z;\n            }\n        }\n\n        if( coord.y > filterClamp.w ) {\n            if (fillMode == TRANSPARENT) {\n                discard;\n            } else if (fillMode == LOOP) {\n                coord.y -= filterClamp.w;\n            } else if (fillMode == MIRROR) {\n                coord.y = filterClamp.w * 2.0 - coord.y;\n            }\n        } else if( coord.y < filterClamp.y ) {\n            if (fillMode == TRANSPARENT) {\n                discard;\n            } else if (fillMode == LOOP) {\n                coord.y += filterClamp.w;\n            } else if (fillMode == MIRROR) {\n                coord.y *= -filterClamp.w;\n            }\n        }\n    }\n\n    gl_FragColor.r = texture2D(uSampler, coord + red * (1.0 - seed * 0.4) / filterArea.xy).r;\n    gl_FragColor.g = texture2D(uSampler, coord + green * (1.0 - seed * 0.3) / filterArea.xy).g;\n    gl_FragColor.b = texture2D(uSampler, coord + blue * (1.0 - seed * 0.2) / filterArea.xy).b;\n    gl_FragColor.a = texture2D(uSampler, coord).a;\n}\n")||this;return o.offset=100,o.fillMode=r.TRANSPARENT,o.average=!1,o.seed=0,o.minSize=8,o.sampleSize=512,o._slices=0,o._offsets=new Float32Array(1),o._sizes=new Float32Array(1),o._direction=-1,o.uniforms.dimensions=new Float32Array(2),o._canvas=document.createElement("canvas"),o._canvas.width=4,o._canvas.height=o.sampleSize,o.texture=n.Texture.from(o._canvas,{scaleMode:i.SCALE_MODES.NEAREST}),Object.assign(o,r.defaults,t),o}return u(r,e),r.prototype.apply=function(e,n,t,r){var o=n.filterFrame,i=o.width,l=o.height;this.uniforms.dimensions[0]=i,this.uniforms.dimensions[1]=l,this.uniforms.aspect=l/i,this.uniforms.seed=this.seed,this.uniforms.offset=this.offset,this.uniforms.fillMode=this.fillMode,e.applyFilter(this,n,t,r)},r.prototype._randomizeSizes=function(){var e=this._sizes,n=this._slices-1,t=this.sampleSize,r=Math.min(this.minSize/t,.9/this._slices);if(this.average){for(var o=this._slices,i=1,l=0;l<n;l++){var a=i/(o-l),s=Math.max(a*(1-.6*Math.random()),r);e[l]=s,i-=s}e[n]=i}else{i=1;var u=Math.sqrt(1/this._slices);for(l=0;l<n;l++){s=Math.max(u*i*Math.random(),r);e[l]=s,i-=s}e[n]=i}this.shuffle()},r.prototype.shuffle=function(){for(var e=this._sizes,n=this._slices-1;n>0;n--){var t=Math.random()*n>>0,r=e[n];e[n]=e[t],e[t]=r}},r.prototype._randomizeOffsets=function(){for(var e=0;e<this._slices;e++)this._offsets[e]=Math.random()*(Math.random()<.5?-1:1)},r.prototype.refresh=function(){this._randomizeSizes(),this._randomizeOffsets(),this.redraw()},r.prototype.redraw=function(){var e,n=this.sampleSize,t=this.texture,r=this._canvas.getContext("2d");r.clearRect(0,0,8,n);for(var o=0,i=0;i<this._slices;i++){e=Math.floor(256*this._offsets[i]);var l=this._sizes[i]*n,a=e>0?e:0,s=e<0?-e:0;r.fillStyle="rgba("+a+", "+s+", 0, 1)",r.fillRect(0,o>>0,n,l+1>>0),o+=l}t.baseTexture.update(),this.uniforms.displacementMap=t},Object.defineProperty(r.prototype,"sizes",{get:function(){return this._sizes},set:function(e){for(var n=Math.min(this._slices,e.length),t=0;t<n;t++)this._sizes[t]=e[t]},enumerable:!1,configurable:!0}),Object.defineProperty(r.prototype,"offsets",{get:function(){return this._offsets},set:function(e){for(var n=Math.min(this._slices,e.length),t=0;t<n;t++)this._offsets[t]=e[t]},enumerable:!1,configurable:!0}),Object.defineProperty(r.prototype,"slices",{get:function(){return this._slices},set:function(e){this._slices!==e&&(this._slices=e,this.uniforms.slices=e,this._sizes=this.uniforms.slicesWidth=new Float32Array(e),this._offsets=this.uniforms.slicesOffset=new Float32Array(e),this.refresh())},enumerable:!1,configurable:!0}),Object.defineProperty(r.prototype,"direction",{get:function(){return this._direction},set:function(e){if(this._direction!==e){this._direction=e;var n=e*t.DEG_TO_RAD;this.uniforms.sinDir=Math.sin(n),this.uniforms.cosDir=Math.cos(n)}},enumerable:!1,configurable:!0}),Object.defineProperty(r.prototype,"red",{get:function(){return this.uniforms.red},set:function(e){this.uniforms.red=e},enumerable:!1,configurable:!0}),Object.defineProperty(r.prototype,"green",{get:function(){return this.uniforms.green},set:function(e){this.uniforms.green=e},enumerable:!1,configurable:!0}),Object.defineProperty(r.prototype,"blue",{get:function(){return this.uniforms.blue},set:function(e){this.uniforms.blue=e},enumerable:!1,configurable:!0}),r.prototype.destroy=function(){var e;null===(e=this.texture)||void 0===e||e.destroy(!0),this.texture=this._canvas=this.red=this.green=this.blue=this._sizes=this._offsets=null},r.defaults={slices:5,offset:100,direction:0,fillMode:0,average:!1,seed:0,red:[0,0],green:[0,0],blue:[0,0],minSize:8,sampleSize:512},r.TRANSPARENT=0,r.ORIGINAL=1,r.LOOP=2,r.CLAMP=3,r.MIRROR=4,r}(n.Filter),w=function(e){function n(t){var r=this,o=Object.assign({},n.defaults,t),i=o.outerStrength,l=o.innerStrength,a=o.color,s=o.knockout,u=o.quality,f=Math.round(o.distance);return(r=e.call(this,c,"varying vec2 vTextureCoord;\nvarying vec4 vColor;\n\nuniform sampler2D uSampler;\n\nuniform float outerStrength;\nuniform float innerStrength;\n\nuniform vec4 glowColor;\n\nuniform vec4 filterArea;\nuniform vec4 filterClamp;\nuniform bool knockout;\n\nconst float PI = 3.14159265358979323846264;\n\nconst float DIST = __DIST__;\nconst float ANGLE_STEP_SIZE = min(__ANGLE_STEP_SIZE__, PI * 2.0);\nconst float ANGLE_STEP_NUM = ceil(PI * 2.0 / ANGLE_STEP_SIZE);\n\nconst float MAX_TOTAL_ALPHA = ANGLE_STEP_NUM * DIST * (DIST + 1.0) / 2.0;\n\nvoid main(void) {\n    vec2 px = vec2(1.0 / filterArea.x, 1.0 / filterArea.y);\n\n    float totalAlpha = 0.0;\n\n    vec2 direction;\n    vec2 displaced;\n    vec4 curColor;\n\n    for (float angle = 0.0; angle < PI * 2.0; angle += ANGLE_STEP_SIZE) {\n       direction = vec2(cos(angle), sin(angle)) * px;\n\n       for (float curDistance = 0.0; curDistance < DIST; curDistance++) {\n           displaced = clamp(vTextureCoord + direction * \n                   (curDistance + 1.0), filterClamp.xy, filterClamp.zw);\n\n           curColor = texture2D(uSampler, displaced);\n\n           totalAlpha += (DIST - curDistance) * curColor.a;\n       }\n    }\n    \n    curColor = texture2D(uSampler, vTextureCoord);\n\n    float alphaRatio = (totalAlpha / MAX_TOTAL_ALPHA);\n\n    float innerGlowAlpha = (1.0 - alphaRatio) * innerStrength * curColor.a;\n    float innerGlowStrength = min(1.0, innerGlowAlpha);\n    \n    vec4 innerColor = mix(curColor, glowColor, innerGlowStrength);\n\n    float outerGlowAlpha = alphaRatio * outerStrength * (1. - curColor.a);\n    float outerGlowStrength = min(1.0 - innerColor.a, outerGlowAlpha);\n\n    vec4 outerGlowColor = outerGlowStrength * glowColor.rgba;\n    \n    if (knockout) {\n      float resultAlpha = outerGlowAlpha + innerGlowAlpha;\n      gl_FragColor = vec4(glowColor.rgb * resultAlpha, resultAlpha);\n    }\n    else {\n      gl_FragColor = innerColor + outerGlowColor;\n    }\n}\n".replace(/__ANGLE_STEP_SIZE__/gi,""+(1/u/f).toFixed(7)).replace(/__DIST__/gi,f.toFixed(0)+".0"))||this).uniforms.glowColor=new Float32Array([0,0,0,1]),Object.assign(r,{color:a,outerStrength:i,innerStrength:l,padding:f,knockout:s}),r}return u(n,e),Object.defineProperty(n.prototype,"color",{get:function(){return o.rgb2hex(this.uniforms.glowColor)},set:function(e){o.hex2rgb(e,this.uniforms.glowColor)},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"outerStrength",{get:function(){return this.uniforms.outerStrength},set:function(e){this.uniforms.outerStrength=e},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"innerStrength",{get:function(){return this.uniforms.innerStrength},set:function(e){this.uniforms.innerStrength=e},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"knockout",{get:function(){return this.uniforms.knockout},set:function(e){this.uniforms.knockout=e},enumerable:!1,configurable:!0}),n.defaults={distance:10,outerStrength:4,innerStrength:0,color:16777215,quality:.1,knockout:!1},n}(n.Filter),D=function(e){function n(r){var o=e.call(this,c,"varying vec2 vTextureCoord;\nuniform sampler2D uSampler;\nuniform vec4 filterArea;\nuniform vec2 dimensions;\n\nuniform vec2 light;\nuniform bool parallel;\nuniform float aspect;\n\nuniform float gain;\nuniform float lacunarity;\nuniform float time;\nuniform float alpha;\n\n${perlin}\n\nvoid main(void) {\n    vec2 coord = vTextureCoord * filterArea.xy / dimensions.xy;\n\n    float d;\n\n    if (parallel) {\n        float _cos = light.x;\n        float _sin = light.y;\n        d = (_cos * coord.x) + (_sin * coord.y * aspect);\n    } else {\n        float dx = coord.x - light.x / dimensions.x;\n        float dy = (coord.y - light.y / dimensions.y) * aspect;\n        float dis = sqrt(dx * dx + dy * dy) + 0.00001;\n        d = dy / dis;\n    }\n\n    vec3 dir = vec3(d, d, 0.0);\n\n    float noise = turb(dir + vec3(time, 0.0, 62.1 + time) * 0.05, vec3(480.0, 320.0, 480.0), lacunarity, gain);\n    noise = mix(noise, 0.0, 0.3);\n    //fade vertically.\n    vec4 mist = vec4(noise, noise, noise, 1.0) * (1.0 - coord.y);\n    mist.a = 1.0;\n    // apply user alpha\n    mist *= alpha;\n\n    gl_FragColor = texture2D(uSampler, vTextureCoord) + mist;\n\n}\n".replace("${perlin}","vec3 mod289(vec3 x)\n{\n    return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\nvec4 mod289(vec4 x)\n{\n    return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\nvec4 permute(vec4 x)\n{\n    return mod289(((x * 34.0) + 1.0) * x);\n}\nvec4 taylorInvSqrt(vec4 r)\n{\n    return 1.79284291400159 - 0.85373472095314 * r;\n}\nvec3 fade(vec3 t)\n{\n    return t * t * t * (t * (t * 6.0 - 15.0) + 10.0);\n}\n// Classic Perlin noise, periodic variant\nfloat pnoise(vec3 P, vec3 rep)\n{\n    vec3 Pi0 = mod(floor(P), rep); // Integer part, modulo period\n    vec3 Pi1 = mod(Pi0 + vec3(1.0), rep); // Integer part + 1, mod period\n    Pi0 = mod289(Pi0);\n    Pi1 = mod289(Pi1);\n    vec3 Pf0 = fract(P); // Fractional part for interpolation\n    vec3 Pf1 = Pf0 - vec3(1.0); // Fractional part - 1.0\n    vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);\n    vec4 iy = vec4(Pi0.yy, Pi1.yy);\n    vec4 iz0 = Pi0.zzzz;\n    vec4 iz1 = Pi1.zzzz;\n    vec4 ixy = permute(permute(ix) + iy);\n    vec4 ixy0 = permute(ixy + iz0);\n    vec4 ixy1 = permute(ixy + iz1);\n    vec4 gx0 = ixy0 * (1.0 / 7.0);\n    vec4 gy0 = fract(floor(gx0) * (1.0 / 7.0)) - 0.5;\n    gx0 = fract(gx0);\n    vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);\n    vec4 sz0 = step(gz0, vec4(0.0));\n    gx0 -= sz0 * (step(0.0, gx0) - 0.5);\n    gy0 -= sz0 * (step(0.0, gy0) - 0.5);\n    vec4 gx1 = ixy1 * (1.0 / 7.0);\n    vec4 gy1 = fract(floor(gx1) * (1.0 / 7.0)) - 0.5;\n    gx1 = fract(gx1);\n    vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);\n    vec4 sz1 = step(gz1, vec4(0.0));\n    gx1 -= sz1 * (step(0.0, gx1) - 0.5);\n    gy1 -= sz1 * (step(0.0, gy1) - 0.5);\n    vec3 g000 = vec3(gx0.x, gy0.x, gz0.x);\n    vec3 g100 = vec3(gx0.y, gy0.y, gz0.y);\n    vec3 g010 = vec3(gx0.z, gy0.z, gz0.z);\n    vec3 g110 = vec3(gx0.w, gy0.w, gz0.w);\n    vec3 g001 = vec3(gx1.x, gy1.x, gz1.x);\n    vec3 g101 = vec3(gx1.y, gy1.y, gz1.y);\n    vec3 g011 = vec3(gx1.z, gy1.z, gz1.z);\n    vec3 g111 = vec3(gx1.w, gy1.w, gz1.w);\n    vec4 norm0 = taylorInvSqrt(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));\n    g000 *= norm0.x;\n    g010 *= norm0.y;\n    g100 *= norm0.z;\n    g110 *= norm0.w;\n    vec4 norm1 = taylorInvSqrt(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));\n    g001 *= norm1.x;\n    g011 *= norm1.y;\n    g101 *= norm1.z;\n    g111 *= norm1.w;\n    float n000 = dot(g000, Pf0);\n    float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));\n    float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));\n    float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));\n    float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));\n    float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));\n    float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));\n    float n111 = dot(g111, Pf1);\n    vec3 fade_xyz = fade(Pf0);\n    vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);\n    vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);\n    float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x);\n    return 2.2 * n_xyz;\n}\nfloat turb(vec3 P, vec3 rep, float lacunarity, float gain)\n{\n    float sum = 0.0;\n    float sc = 1.0;\n    float totalgain = 1.0;\n    for (float i = 0.0; i < 6.0; i++)\n    {\n        sum += totalgain * pnoise(P * sc, rep);\n        sc *= lacunarity;\n        totalgain *= gain;\n    }\n    return abs(sum);\n}\n"))||this;o.parallel=!0,o.time=0,o._angle=0,o.uniforms.dimensions=new Float32Array(2);var i=Object.assign(n.defaults,r);return o._angleLight=new t.Point,o.angle=i.angle,o.gain=i.gain,o.lacunarity=i.lacunarity,o.alpha=i.alpha,o.parallel=i.parallel,o.center=i.center,o.time=i.time,o}return u(n,e),n.prototype.apply=function(e,n,t,r){var o=n.filterFrame,i=o.width,l=o.height;this.uniforms.light=this.parallel?this._angleLight:this.center,this.uniforms.parallel=this.parallel,this.uniforms.dimensions[0]=i,this.uniforms.dimensions[1]=l,this.uniforms.aspect=l/i,this.uniforms.time=this.time,this.uniforms.alpha=this.alpha,e.applyFilter(this,n,t,r)},Object.defineProperty(n.prototype,"angle",{get:function(){return this._angle},set:function(e){this._angle=e;var n=e*t.DEG_TO_RAD;this._angleLight.x=Math.cos(n),this._angleLight.y=Math.sin(n)},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"gain",{get:function(){return this.uniforms.gain},set:function(e){this.uniforms.gain=e},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"lacunarity",{get:function(){return this.uniforms.lacunarity},set:function(e){this.uniforms.lacunarity=e},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"alpha",{get:function(){return this.uniforms.alpha},set:function(e){this.uniforms.alpha=e},enumerable:!1,configurable:!0}),n.defaults={angle:30,gain:.5,lacunarity:2.5,time:0,parallel:!0,center:[0,0],alpha:1},n}(n.Filter),j=function(e){function n(n,r,o){void 0===n&&(n=[0,0]),void 0===r&&(r=5),void 0===o&&(o=0);var i=e.call(this,c,"varying vec2 vTextureCoord;\nuniform sampler2D uSampler;\nuniform vec4 filterArea;\n\nuniform vec2 uVelocity;\nuniform int uKernelSize;\nuniform float uOffset;\n\nconst int MAX_KERNEL_SIZE = 2048;\n\n// Notice:\n// the perfect way:\n//    int kernelSize = min(uKernelSize, MAX_KERNELSIZE);\n// BUT in real use-case , uKernelSize < MAX_KERNELSIZE almost always.\n// So use uKernelSize directly.\n\nvoid main(void)\n{\n    vec4 color = texture2D(uSampler, vTextureCoord);\n\n    if (uKernelSize == 0)\n    {\n        gl_FragColor = color;\n        return;\n    }\n\n    vec2 velocity = uVelocity / filterArea.xy;\n    float offset = -uOffset / length(uVelocity) - 0.5;\n    int k = uKernelSize - 1;\n\n    for(int i = 0; i < MAX_KERNEL_SIZE - 1; i++) {\n        if (i == k) {\n            break;\n        }\n        vec2 bias = velocity * (float(i) / float(k) + offset);\n        color += texture2D(uSampler, vTextureCoord + bias);\n    }\n    gl_FragColor = color / float(uKernelSize);\n}\n")||this;return i.kernelSize=5,i.uniforms.uVelocity=new Float32Array(2),i._velocity=new t.ObservablePoint(i.velocityChanged,i),i.setVelocity(n),i.kernelSize=r,i.offset=o,i}return u(n,e),n.prototype.apply=function(e,n,t,r){var o=this.velocity,i=o.x,l=o.y;this.uniforms.uKernelSize=0!==i||0!==l?this.kernelSize:0,e.applyFilter(this,n,t,r)},Object.defineProperty(n.prototype,"velocity",{get:function(){return this._velocity},set:function(e){this.setVelocity(e)},enumerable:!1,configurable:!0}),n.prototype.setVelocity=function(e){if(Array.isArray(e)){var n=e[0],t=e[1];this._velocity.set(n,t)}else this._velocity.copyFrom(e)},n.prototype.velocityChanged=function(){this.uniforms.uVelocity[0]=this._velocity.x,this.uniforms.uVelocity[1]=this._velocity.y,this.padding=1+(Math.max(Math.abs(this._velocity.x),Math.abs(this._velocity.y))>>0)},Object.defineProperty(n.prototype,"offset",{get:function(){return this.uniforms.uOffset},set:function(e){this.uniforms.uOffset=e},enumerable:!1,configurable:!0}),n}(n.Filter),M=function(e){function n(n,t,r){void 0===t&&(t=.05),void 0===r&&(r=n.length);var o=e.call(this,c,"varying vec2 vTextureCoord;\nuniform sampler2D uSampler;\n\nuniform float epsilon;\n\nconst int MAX_COLORS = %maxColors%;\n\nuniform vec3 originalColors[MAX_COLORS];\nuniform vec3 targetColors[MAX_COLORS];\n\nvoid main(void)\n{\n    gl_FragColor = texture2D(uSampler, vTextureCoord);\n\n    float alpha = gl_FragColor.a;\n    if (alpha < 0.0001)\n    {\n      return;\n    }\n\n    vec3 color = gl_FragColor.rgb / alpha;\n\n    for(int i = 0; i < MAX_COLORS; i++)\n    {\n      vec3 origColor = originalColors[i];\n      if (origColor.r < 0.0)\n      {\n        break;\n      }\n      vec3 colorDiff = origColor - color;\n      if (length(colorDiff) < epsilon)\n      {\n        vec3 targetColor = targetColors[i];\n        gl_FragColor = vec4((targetColor + colorDiff) * alpha, alpha);\n        return;\n      }\n    }\n}\n".replace(/%maxColors%/g,r.toFixed(0)))||this;return o._replacements=[],o._maxColors=0,o.epsilon=t,o._maxColors=r,o.uniforms.originalColors=new Float32Array(3*r),o.uniforms.targetColors=new Float32Array(3*r),o.replacements=n,o}return u(n,e),Object.defineProperty(n.prototype,"replacements",{get:function(){return this._replacements},set:function(e){var n=this.uniforms.originalColors,t=this.uniforms.targetColors,r=e.length;if(r>this._maxColors)throw new Error("Length of replacements ("+r+") exceeds the maximum colors length ("+this._maxColors+")");n[3*r]=-1;for(var i=0;i<r;i++){var l=e[i],a=l[0];"number"==typeof a?a=o.hex2rgb(a):l[0]=o.rgb2hex(a),n[3*i]=a[0],n[3*i+1]=a[1],n[3*i+2]=a[2];var s=l[1];"number"==typeof s?s=o.hex2rgb(s):l[1]=o.rgb2hex(s),t[3*i]=s[0],t[3*i+1]=s[1],t[3*i+2]=s[2]}this._replacements=e},enumerable:!1,configurable:!0}),n.prototype.refresh=function(){this.replacements=this._replacements},Object.defineProperty(n.prototype,"maxColors",{get:function(){return this._maxColors},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"epsilon",{get:function(){return this.uniforms.epsilon},set:function(e){this.uniforms.epsilon=e},enumerable:!1,configurable:!0}),n}(n.Filter),R=function(e){function n(t,r){void 0===r&&(r=0);var o=e.call(this,c,"varying vec2 vTextureCoord;\nuniform sampler2D uSampler;\nuniform vec4 filterArea;\nuniform vec2 dimensions;\n\nuniform float sepia;\nuniform float noise;\nuniform float noiseSize;\nuniform float scratch;\nuniform float scratchDensity;\nuniform float scratchWidth;\nuniform float vignetting;\nuniform float vignettingAlpha;\nuniform float vignettingBlur;\nuniform float seed;\n\nconst float SQRT_2 = 1.414213;\nconst vec3 SEPIA_RGB = vec3(112.0 / 255.0, 66.0 / 255.0, 20.0 / 255.0);\n\nfloat rand(vec2 co) {\n    return fract(sin(dot(co.xy, vec2(12.9898, 78.233))) * 43758.5453);\n}\n\nvec3 Overlay(vec3 src, vec3 dst)\n{\n    // if (dst <= 0.5) then: 2 * src * dst\n    // if (dst > 0.5) then: 1 - 2 * (1 - dst) * (1 - src)\n    return vec3((dst.x <= 0.5) ? (2.0 * src.x * dst.x) : (1.0 - 2.0 * (1.0 - dst.x) * (1.0 - src.x)),\n                (dst.y <= 0.5) ? (2.0 * src.y * dst.y) : (1.0 - 2.0 * (1.0 - dst.y) * (1.0 - src.y)),\n                (dst.z <= 0.5) ? (2.0 * src.z * dst.z) : (1.0 - 2.0 * (1.0 - dst.z) * (1.0 - src.z)));\n}\n\n\nvoid main()\n{\n    gl_FragColor = texture2D(uSampler, vTextureCoord);\n    vec3 color = gl_FragColor.rgb;\n\n    if (sepia > 0.0)\n    {\n        float gray = (color.x + color.y + color.z) / 3.0;\n        vec3 grayscale = vec3(gray);\n\n        color = Overlay(SEPIA_RGB, grayscale);\n\n        color = grayscale + sepia * (color - grayscale);\n    }\n\n    vec2 coord = vTextureCoord * filterArea.xy / dimensions.xy;\n\n    if (vignetting > 0.0)\n    {\n        float outter = SQRT_2 - vignetting * SQRT_2;\n        vec2 dir = vec2(vec2(0.5, 0.5) - coord);\n        dir.y *= dimensions.y / dimensions.x;\n        float darker = clamp((outter - length(dir) * SQRT_2) / ( 0.00001 + vignettingBlur * SQRT_2), 0.0, 1.0);\n        color.rgb *= darker + (1.0 - darker) * (1.0 - vignettingAlpha);\n    }\n\n    if (scratchDensity > seed && scratch != 0.0)\n    {\n        float phase = seed * 256.0;\n        float s = mod(floor(phase), 2.0);\n        float dist = 1.0 / scratchDensity;\n        float d = distance(coord, vec2(seed * dist, abs(s - seed * dist)));\n        if (d < seed * 0.6 + 0.4)\n        {\n            highp float period = scratchDensity * 10.0;\n\n            float xx = coord.x * period + phase;\n            float aa = abs(mod(xx, 0.5) * 4.0);\n            float bb = mod(floor(xx / 0.5), 2.0);\n            float yy = (1.0 - bb) * aa + bb * (2.0 - aa);\n\n            float kk = 2.0 * period;\n            float dw = scratchWidth / dimensions.x * (0.75 + seed);\n            float dh = dw * kk;\n\n            float tine = (yy - (2.0 - dh));\n\n            if (tine > 0.0) {\n                float _sign = sign(scratch);\n\n                tine = s * tine / period + scratch + 0.1;\n                tine = clamp(tine + 1.0, 0.5 + _sign * 0.5, 1.5 + _sign * 0.5);\n\n                color.rgb *= tine;\n            }\n        }\n    }\n\n    if (noise > 0.0 && noiseSize > 0.0)\n    {\n        vec2 pixelCoord = vTextureCoord.xy * filterArea.xy;\n        pixelCoord.x = floor(pixelCoord.x / noiseSize);\n        pixelCoord.y = floor(pixelCoord.y / noiseSize);\n        // vec2 d = pixelCoord * noiseSize * vec2(1024.0 + seed * 512.0, 1024.0 - seed * 512.0);\n        // float _noise = snoise(d) * 0.5;\n        float _noise = rand(pixelCoord * noiseSize * seed) - 0.5;\n        color += _noise * noise;\n    }\n\n    gl_FragColor.rgb = color;\n}\n")||this;return o.seed=0,o.uniforms.dimensions=new Float32Array(2),"number"==typeof t?(o.seed=t,t=void 0):o.seed=r,Object.assign(o,n.defaults,t),o}return u(n,e),n.prototype.apply=function(e,n,t,r){var o,i;this.uniforms.dimensions[0]=null===(o=n.filterFrame)||void 0===o?void 0:o.width,this.uniforms.dimensions[1]=null===(i=n.filterFrame)||void 0===i?void 0:i.height,this.uniforms.seed=this.seed,e.applyFilter(this,n,t,r)},Object.defineProperty(n.prototype,"sepia",{get:function(){return this.uniforms.sepia},set:function(e){this.uniforms.sepia=e},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"noise",{get:function(){return this.uniforms.noise},set:function(e){this.uniforms.noise=e},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"noiseSize",{get:function(){return this.uniforms.noiseSize},set:function(e){this.uniforms.noiseSize=e},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"scratch",{get:function(){return this.uniforms.scratch},set:function(e){this.uniforms.scratch=e},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"scratchDensity",{get:function(){return this.uniforms.scratchDensity},set:function(e){this.uniforms.scratchDensity=e},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"scratchWidth",{get:function(){return this.uniforms.scratchWidth},set:function(e){this.uniforms.scratchWidth=e},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"vignetting",{get:function(){return this.uniforms.vignetting},set:function(e){this.uniforms.vignetting=e},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"vignettingAlpha",{get:function(){return this.uniforms.vignettingAlpha},set:function(e){this.uniforms.vignettingAlpha=e},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"vignettingBlur",{get:function(){return this.uniforms.vignettingBlur},set:function(e){this.uniforms.vignettingBlur=e},enumerable:!1,configurable:!0}),n.defaults={sepia:.3,noise:.3,noiseSize:1,scratch:.5,scratchDensity:.3,scratchWidth:1,vignetting:.3,vignettingAlpha:1,vignettingBlur:.3},n}(n.Filter),E=function(e){function n(t,r,o){void 0===t&&(t=1),void 0===r&&(r=0),void 0===o&&(o=.1);var i=e.call(this,c,"varying vec2 vTextureCoord;\nuniform sampler2D uSampler;\n\nuniform vec2 thickness;\nuniform vec4 outlineColor;\nuniform vec4 filterClamp;\n\nconst float DOUBLE_PI = 3.14159265358979323846264 * 2.;\n\nvoid main(void) {\n    vec4 ownColor = texture2D(uSampler, vTextureCoord);\n    vec4 curColor;\n    float maxAlpha = 0.;\n    vec2 displaced;\n    for (float angle = 0.; angle <= DOUBLE_PI; angle += ${angleStep}) {\n        displaced.x = vTextureCoord.x + thickness.x * cos(angle);\n        displaced.y = vTextureCoord.y + thickness.y * sin(angle);\n        curColor = texture2D(uSampler, clamp(displaced, filterClamp.xy, filterClamp.zw));\n        maxAlpha = max(maxAlpha, curColor.a);\n    }\n    float resultAlpha = max(maxAlpha, ownColor.a);\n    gl_FragColor = vec4((ownColor.rgb + outlineColor.rgb * (1. - ownColor.a)) * resultAlpha, resultAlpha);\n}\n".replace(/\$\{angleStep\}/,n.getAngleStep(o)))||this;return i._thickness=1,i.uniforms.thickness=new Float32Array([0,0]),i.uniforms.outlineColor=new Float32Array([0,0,0,1]),Object.assign(i,{thickness:t,color:r,quality:o}),i}return u(n,e),n.getAngleStep=function(e){var t=Math.max(e*n.MAX_SAMPLES,n.MIN_SAMPLES);return(2*Math.PI/t).toFixed(7)},n.prototype.apply=function(e,n,t,r){this.uniforms.thickness[0]=this._thickness/n._frame.width,this.uniforms.thickness[1]=this._thickness/n._frame.height,e.applyFilter(this,n,t,r)},Object.defineProperty(n.prototype,"color",{get:function(){return o.rgb2hex(this.uniforms.outlineColor)},set:function(e){o.hex2rgb(e,this.uniforms.outlineColor)},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"thickness",{get:function(){return this._thickness},set:function(e){this._thickness=e,this.padding=e},enumerable:!1,configurable:!0}),n.MIN_SAMPLES=1,n.MAX_SAMPLES=100,n}(n.Filter),I=function(e){function n(n){void 0===n&&(n=10);var t=e.call(this,c,"precision mediump float;\n\nvarying vec2 vTextureCoord;\n\nuniform vec2 size;\nuniform sampler2D uSampler;\n\nuniform vec4 filterArea;\n\nvec2 mapCoord( vec2 coord )\n{\n    coord *= filterArea.xy;\n    coord += filterArea.zw;\n\n    return coord;\n}\n\nvec2 unmapCoord( vec2 coord )\n{\n    coord -= filterArea.zw;\n    coord /= filterArea.xy;\n\n    return coord;\n}\n\nvec2 pixelate(vec2 coord, vec2 size)\n{\n\treturn floor( coord / size ) * size;\n}\n\nvoid main(void)\n{\n    vec2 coord = mapCoord(vTextureCoord);\n\n    coord = pixelate(coord, size);\n\n    coord = unmapCoord(coord);\n\n    gl_FragColor = texture2D(uSampler, coord);\n}\n")||this;return t.size=n,t}return u(n,e),Object.defineProperty(n.prototype,"size",{get:function(){return this.uniforms.size},set:function(e){"number"==typeof e&&(e=[e,e]),this.uniforms.size=e},enumerable:!1,configurable:!0}),n}(n.Filter),k=function(e){function n(n,t,r,o){void 0===n&&(n=0),void 0===t&&(t=[0,0]),void 0===r&&(r=5),void 0===o&&(o=-1);var i=e.call(this,c,"varying vec2 vTextureCoord;\nuniform sampler2D uSampler;\nuniform vec4 filterArea;\n\nuniform float uRadian;\nuniform vec2 uCenter;\nuniform float uRadius;\nuniform int uKernelSize;\n\nconst int MAX_KERNEL_SIZE = 2048;\n\nvoid main(void)\n{\n    vec4 color = texture2D(uSampler, vTextureCoord);\n\n    if (uKernelSize == 0)\n    {\n        gl_FragColor = color;\n        return;\n    }\n\n    float aspect = filterArea.y / filterArea.x;\n    vec2 center = uCenter.xy / filterArea.xy;\n    float gradient = uRadius / filterArea.x * 0.3;\n    float radius = uRadius / filterArea.x - gradient * 0.5;\n    int k = uKernelSize - 1;\n\n    vec2 coord = vTextureCoord;\n    vec2 dir = vec2(center - coord);\n    float dist = length(vec2(dir.x, dir.y * aspect));\n\n    float radianStep = uRadian;\n    if (radius >= 0.0 && dist > radius) {\n        float delta = dist - radius;\n        float gap = gradient;\n        float scale = 1.0 - abs(delta / gap);\n        if (scale <= 0.0) {\n            gl_FragColor = color;\n            return;\n        }\n        radianStep *= scale;\n    }\n    radianStep /= float(k);\n\n    float s = sin(radianStep);\n    float c = cos(radianStep);\n    mat2 rotationMatrix = mat2(vec2(c, -s), vec2(s, c));\n\n    for(int i = 0; i < MAX_KERNEL_SIZE - 1; i++) {\n        if (i == k) {\n            break;\n        }\n\n        coord -= center;\n        coord.y *= aspect;\n        coord = rotationMatrix * coord;\n        coord.y /= aspect;\n        coord += center;\n\n        vec4 sample = texture2D(uSampler, coord);\n\n        // switch to pre-multiplied alpha to correctly blur transparent images\n        // sample.rgb *= sample.a;\n\n        color += sample;\n    }\n\n    gl_FragColor = color / float(uKernelSize);\n}\n")||this;return i._angle=0,i.angle=n,i.center=t,i.kernelSize=r,i.radius=o,i}return u(n,e),n.prototype.apply=function(e,n,t,r){this.uniforms.uKernelSize=0!==this._angle?this.kernelSize:0,e.applyFilter(this,n,t,r)},Object.defineProperty(n.prototype,"angle",{get:function(){return this._angle},set:function(e){this._angle=e,this.uniforms.uRadian=e*Math.PI/180},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"center",{get:function(){return this.uniforms.uCenter},set:function(e){this.uniforms.uCenter=e},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"radius",{get:function(){return this.uniforms.uRadius},set:function(e){(e<0||e===1/0)&&(e=-1),this.uniforms.uRadius=e},enumerable:!1,configurable:!0}),n}(n.Filter),L=function(e){function n(t){var r=e.call(this,c,"varying vec2 vTextureCoord;\nuniform sampler2D uSampler;\n\nuniform vec4 filterArea;\nuniform vec4 filterClamp;\nuniform vec2 dimensions;\n\nuniform bool mirror;\nuniform float boundary;\nuniform vec2 amplitude;\nuniform vec2 waveLength;\nuniform vec2 alpha;\nuniform float time;\n\nfloat rand(vec2 co) {\n    return fract(sin(dot(co.xy, vec2(12.9898, 78.233))) * 43758.5453);\n}\n\nvoid main(void)\n{\n    vec2 pixelCoord = vTextureCoord.xy * filterArea.xy;\n    vec2 coord = pixelCoord / dimensions;\n\n    if (coord.y < boundary) {\n        gl_FragColor = texture2D(uSampler, vTextureCoord);\n        return;\n    }\n\n    float k = (coord.y - boundary) / (1. - boundary + 0.0001);\n    float areaY = boundary * dimensions.y / filterArea.y;\n    float v = areaY + areaY - vTextureCoord.y;\n    float y = mirror ? v : vTextureCoord.y;\n\n    float _amplitude = ((amplitude.y - amplitude.x) * k + amplitude.x ) / filterArea.x;\n    float _waveLength = ((waveLength.y - waveLength.x) * k + waveLength.x) / filterArea.y;\n    float _alpha = (alpha.y - alpha.x) * k + alpha.x;\n\n    float x = vTextureCoord.x + cos(v * 6.28 / _waveLength - time) * _amplitude;\n    x = clamp(x, filterClamp.x, filterClamp.z);\n\n    vec4 color = texture2D(uSampler, vec2(x, y));\n\n    gl_FragColor = color * _alpha;\n}\n")||this;return r.time=0,r.uniforms.amplitude=new Float32Array(2),r.uniforms.waveLength=new Float32Array(2),r.uniforms.alpha=new Float32Array(2),r.uniforms.dimensions=new Float32Array(2),Object.assign(r,n.defaults,t),r}return u(n,e),n.prototype.apply=function(e,n,t,r){var o,i;this.uniforms.dimensions[0]=null===(o=n.filterFrame)||void 0===o?void 0:o.width,this.uniforms.dimensions[1]=null===(i=n.filterFrame)||void 0===i?void 0:i.height,this.uniforms.time=this.time,e.applyFilter(this,n,t,r)},Object.defineProperty(n.prototype,"mirror",{get:function(){return this.uniforms.mirror},set:function(e){this.uniforms.mirror=e},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"boundary",{get:function(){return this.uniforms.boundary},set:function(e){this.uniforms.boundary=e},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"amplitude",{get:function(){return this.uniforms.amplitude},set:function(e){this.uniforms.amplitude[0]=e[0],this.uniforms.amplitude[1]=e[1]},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"waveLength",{get:function(){return this.uniforms.waveLength},set:function(e){this.uniforms.waveLength[0]=e[0],this.uniforms.waveLength[1]=e[1]},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"alpha",{get:function(){return this.uniforms.alpha},set:function(e){this.uniforms.alpha[0]=e[0],this.uniforms.alpha[1]=e[1]},enumerable:!1,configurable:!0}),n.defaults={mirror:!0,boundary:.5,amplitude:[0,20],waveLength:[30,100],alpha:[1,1],time:0},n}(n.Filter),N=function(e){function n(n,t,r){void 0===n&&(n=[-10,0]),void 0===t&&(t=[0,10]),void 0===r&&(r=[0,0]);var o=e.call(this,c,"precision mediump float;\n\nvarying vec2 vTextureCoord;\n\nuniform sampler2D uSampler;\nuniform vec4 filterArea;\nuniform vec2 red;\nuniform vec2 green;\nuniform vec2 blue;\n\nvoid main(void)\n{\n   gl_FragColor.r = texture2D(uSampler, vTextureCoord + red/filterArea.xy).r;\n   gl_FragColor.g = texture2D(uSampler, vTextureCoord + green/filterArea.xy).g;\n   gl_FragColor.b = texture2D(uSampler, vTextureCoord + blue/filterArea.xy).b;\n   gl_FragColor.a = texture2D(uSampler, vTextureCoord).a;\n}\n")||this;return o.red=n,o.green=t,o.blue=r,o}return u(n,e),Object.defineProperty(n.prototype,"red",{get:function(){return this.uniforms.red},set:function(e){this.uniforms.red=e},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"green",{get:function(){return this.uniforms.green},set:function(e){this.uniforms.green=e},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"blue",{get:function(){return this.uniforms.blue},set:function(e){this.uniforms.blue=e},enumerable:!1,configurable:!0}),n}(n.Filter),X=function(e){function n(t,r,o){void 0===t&&(t=[0,0]),void 0===o&&(o=0);var i=e.call(this,c,"varying vec2 vTextureCoord;\nuniform sampler2D uSampler;\nuniform vec4 filterArea;\nuniform vec4 filterClamp;\n\nuniform vec2 center;\n\nuniform float amplitude;\nuniform float wavelength;\n// uniform float power;\nuniform float brightness;\nuniform float speed;\nuniform float radius;\n\nuniform float time;\n\nconst float PI = 3.14159;\n\nvoid main()\n{\n    float halfWavelength = wavelength * 0.5 / filterArea.x;\n    float maxRadius = radius / filterArea.x;\n    float currentRadius = time * speed / filterArea.x;\n\n    float fade = 1.0;\n\n    if (maxRadius > 0.0) {\n        if (currentRadius > maxRadius) {\n            gl_FragColor = texture2D(uSampler, vTextureCoord);\n            return;\n        }\n        fade = 1.0 - pow(currentRadius / maxRadius, 2.0);\n    }\n\n    vec2 dir = vec2(vTextureCoord - center / filterArea.xy);\n    dir.y *= filterArea.y / filterArea.x;\n    float dist = length(dir);\n\n    if (dist <= 0.0 || dist < currentRadius - halfWavelength || dist > currentRadius + halfWavelength) {\n        gl_FragColor = texture2D(uSampler, vTextureCoord);\n        return;\n    }\n\n    vec2 diffUV = normalize(dir);\n\n    float diff = (dist - currentRadius) / halfWavelength;\n\n    float p = 1.0 - pow(abs(diff), 2.0);\n\n    // float powDiff = diff * pow(p, 2.0) * ( amplitude * fade );\n    float powDiff = 1.25 * sin(diff * PI) * p * ( amplitude * fade );\n\n    vec2 offset = diffUV * powDiff / filterArea.xy;\n\n    // Do clamp :\n    vec2 coord = vTextureCoord + offset;\n    vec2 clampedCoord = clamp(coord, filterClamp.xy, filterClamp.zw);\n    vec4 color = texture2D(uSampler, clampedCoord);\n    if (coord != clampedCoord) {\n        color *= max(0.0, 1.0 - length(coord - clampedCoord));\n    }\n\n    // No clamp :\n    // gl_FragColor = texture2D(uSampler, vTextureCoord + offset);\n\n    color.rgb *= 1.0 + (brightness - 1.0) * p * fade;\n\n    gl_FragColor = color;\n}\n")||this;return i.center=t,Object.assign(i,n.defaults,r),i.time=o,i}return u(n,e),n.prototype.apply=function(e,n,t,r){this.uniforms.time=this.time,e.applyFilter(this,n,t,r)},Object.defineProperty(n.prototype,"center",{get:function(){return this.uniforms.center},set:function(e){this.uniforms.center=e},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"amplitude",{get:function(){return this.uniforms.amplitude},set:function(e){this.uniforms.amplitude=e},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"wavelength",{get:function(){return this.uniforms.wavelength},set:function(e){this.uniforms.wavelength=e},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"brightness",{get:function(){return this.uniforms.brightness},set:function(e){this.uniforms.brightness=e},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"speed",{get:function(){return this.uniforms.speed},set:function(e){this.uniforms.speed=e},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"radius",{get:function(){return this.uniforms.radius},set:function(e){this.uniforms.radius=e},enumerable:!1,configurable:!0}),n.defaults={amplitude:30,wavelength:160,brightness:1,speed:500,radius:-1},n}(n.Filter),B=function(e){function n(n,t,r){void 0===t&&(t=0),void 0===r&&(r=1);var o=e.call(this,c,"varying vec2 vTextureCoord;\nuniform sampler2D uSampler;\nuniform sampler2D uLightmap;\nuniform vec4 filterArea;\nuniform vec2 dimensions;\nuniform vec4 ambientColor;\nvoid main() {\n    vec4 diffuseColor = texture2D(uSampler, vTextureCoord);\n    vec2 lightCoord = (vTextureCoord * filterArea.xy) / dimensions;\n    vec4 light = texture2D(uLightmap, lightCoord);\n    vec3 ambient = ambientColor.rgb * ambientColor.a;\n    vec3 intensity = ambient + light.rgb;\n    vec3 finalColor = diffuseColor.rgb * intensity;\n    gl_FragColor = vec4(finalColor, diffuseColor.a);\n}\n")||this;return o._color=0,o.uniforms.dimensions=new Float32Array(2),o.uniforms.ambientColor=new Float32Array([0,0,0,r]),o.texture=n,o.color=t,o}return u(n,e),n.prototype.apply=function(e,n,t,r){var o,i;this.uniforms.dimensions[0]=null===(o=n.filterFrame)||void 0===o?void 0:o.width,this.uniforms.dimensions[1]=null===(i=n.filterFrame)||void 0===i?void 0:i.height,e.applyFilter(this,n,t,r)},Object.defineProperty(n.prototype,"texture",{get:function(){return this.uniforms.uLightmap},set:function(e){this.uniforms.uLightmap=e},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"color",{get:function(){return this._color},set:function(e){var n=this.uniforms.ambientColor;"number"==typeof e?(o.hex2rgb(e,n),this._color=e):(n[0]=e[0],n[1]=e[1],n[2]=e[2],n[3]=e[3],this._color=o.rgb2hex(n))},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"alpha",{get:function(){return this.uniforms.ambientColor[3]},set:function(e){this.uniforms.ambientColor[3]=e},enumerable:!1,configurable:!0}),n}(n.Filter),G=function(e){function n(n,r,o,i){void 0===n&&(n=100),void 0===r&&(r=600);var l=e.call(this,c,"varying vec2 vTextureCoord;\n\nuniform sampler2D uSampler;\nuniform float blur;\nuniform float gradientBlur;\nuniform vec2 start;\nuniform vec2 end;\nuniform vec2 delta;\nuniform vec2 texSize;\n\nfloat random(vec3 scale, float seed)\n{\n    return fract(sin(dot(gl_FragCoord.xyz + seed, scale)) * 43758.5453 + seed);\n}\n\nvoid main(void)\n{\n    vec4 color = vec4(0.0);\n    float total = 0.0;\n\n    float offset = random(vec3(12.9898, 78.233, 151.7182), 0.0);\n    vec2 normal = normalize(vec2(start.y - end.y, end.x - start.x));\n    float radius = smoothstep(0.0, 1.0, abs(dot(vTextureCoord * texSize - start, normal)) / gradientBlur) * blur;\n\n    for (float t = -30.0; t <= 30.0; t++)\n    {\n        float percent = (t + offset - 0.5) / 30.0;\n        float weight = 1.0 - abs(percent);\n        vec4 sample = texture2D(uSampler, vTextureCoord + delta / texSize * percent * radius);\n        sample.rgb *= sample.a;\n        color += sample * weight;\n        total += weight;\n    }\n\n    color /= total;\n    color.rgb /= color.a + 0.00001;\n\n    gl_FragColor = color;\n}\n")||this;return l.uniforms.blur=n,l.uniforms.gradientBlur=r,l.uniforms.start=o||new t.Point(0,window.innerHeight/2),l.uniforms.end=i||new t.Point(600,window.innerHeight/2),l.uniforms.delta=new t.Point(30,30),l.uniforms.texSize=new t.Point(window.innerWidth,window.innerHeight),l.updateDelta(),l}return u(n,e),n.prototype.updateDelta=function(){this.uniforms.delta.x=0,this.uniforms.delta.y=0},Object.defineProperty(n.prototype,"blur",{get:function(){return this.uniforms.blur},set:function(e){this.uniforms.blur=e},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"gradientBlur",{get:function(){return this.uniforms.gradientBlur},set:function(e){this.uniforms.gradientBlur=e},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"start",{get:function(){return this.uniforms.start},set:function(e){this.uniforms.start=e,this.updateDelta()},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"end",{get:function(){return this.uniforms.end},set:function(e){this.uniforms.end=e,this.updateDelta()},enumerable:!1,configurable:!0}),n}(n.Filter),K=function(e){function n(){return null!==e&&e.apply(this,arguments)||this}return u(n,e),n.prototype.updateDelta=function(){var e=this.uniforms.end.x-this.uniforms.start.x,n=this.uniforms.end.y-this.uniforms.start.y,t=Math.sqrt(e*e+n*n);this.uniforms.delta.x=e/t,this.uniforms.delta.y=n/t},n}(G),q=function(e){function n(){return null!==e&&e.apply(this,arguments)||this}return u(n,e),n.prototype.updateDelta=function(){var e=this.uniforms.end.x-this.uniforms.start.x,n=this.uniforms.end.y-this.uniforms.start.y,t=Math.sqrt(e*e+n*n);this.uniforms.delta.x=-n/t,this.uniforms.delta.y=e/t},n}(G),W=function(e){function n(n,t,r,o){void 0===n&&(n=100),void 0===t&&(t=600);var i=e.call(this)||this;return i.tiltShiftXFilter=new K(n,t,r,o),i.tiltShiftYFilter=new q(n,t,r,o),i}return u(n,e),n.prototype.apply=function(e,n,t,r){var o=e.getFilterTexture();this.tiltShiftXFilter.apply(e,n,o,1),this.tiltShiftYFilter.apply(e,o,t,r),e.returnFilterTexture(o)},Object.defineProperty(n.prototype,"blur",{get:function(){return this.tiltShiftXFilter.blur},set:function(e){this.tiltShiftXFilter.blur=this.tiltShiftYFilter.blur=e},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"gradientBlur",{get:function(){return this.tiltShiftXFilter.gradientBlur},set:function(e){this.tiltShiftXFilter.gradientBlur=this.tiltShiftYFilter.gradientBlur=e},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"start",{get:function(){return this.tiltShiftXFilter.start},set:function(e){this.tiltShiftXFilter.start=this.tiltShiftYFilter.start=e},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"end",{get:function(){return this.tiltShiftXFilter.end},set:function(e){this.tiltShiftXFilter.end=this.tiltShiftYFilter.end=e},enumerable:!1,configurable:!0}),n}(n.Filter),Y=function(e){function n(t){var r=e.call(this,c,"varying vec2 vTextureCoord;\n\nuniform sampler2D uSampler;\nuniform float radius;\nuniform float angle;\nuniform vec2 offset;\nuniform vec4 filterArea;\n\nvec2 mapCoord( vec2 coord )\n{\n    coord *= filterArea.xy;\n    coord += filterArea.zw;\n\n    return coord;\n}\n\nvec2 unmapCoord( vec2 coord )\n{\n    coord -= filterArea.zw;\n    coord /= filterArea.xy;\n\n    return coord;\n}\n\nvec2 twist(vec2 coord)\n{\n    coord -= offset;\n\n    float dist = length(coord);\n\n    if (dist < radius)\n    {\n        float ratioDist = (radius - dist) / radius;\n        float angleMod = ratioDist * ratioDist * angle;\n        float s = sin(angleMod);\n        float c = cos(angleMod);\n        coord = vec2(coord.x * c - coord.y * s, coord.x * s + coord.y * c);\n    }\n\n    coord += offset;\n\n    return coord;\n}\n\nvoid main(void)\n{\n\n    vec2 coord = mapCoord(vTextureCoord);\n\n    coord = twist(coord);\n\n    coord = unmapCoord(coord);\n\n    gl_FragColor = texture2D(uSampler, coord );\n\n}\n")||this;return Object.assign(r,n.defaults,t),r}return u(n,e),Object.defineProperty(n.prototype,"offset",{get:function(){return this.uniforms.offset},set:function(e){this.uniforms.offset=e},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"radius",{get:function(){return this.uniforms.radius},set:function(e){this.uniforms.radius=e},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"angle",{get:function(){return this.uniforms.angle},set:function(e){this.uniforms.angle=e},enumerable:!1,configurable:!0}),n.defaults={radius:200,angle:4,padding:20,offset:new t.Point},n}(n.Filter),Z=function(e){function n(t){var r,o=Object.assign(n.defaults,t),i=o.maxKernelSize,l=function(e,n){var t={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&n.indexOf(r)<0&&(t[r]=e[r]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var o=0;for(r=Object.getOwnPropertySymbols(e);o<r.length;o++)n.indexOf(r[o])<0&&Object.prototype.propertyIsEnumerable.call(e,r[o])&&(t[r[o]]=e[r[o]])}return t}(o,["maxKernelSize"]);return r=e.call(this,c,"varying vec2 vTextureCoord;\nuniform sampler2D uSampler;\nuniform vec4 filterArea;\n\nuniform vec2 uCenter;\nuniform float uStrength;\nuniform float uInnerRadius;\nuniform float uRadius;\n\nconst float MAX_KERNEL_SIZE = ${maxKernelSize};\n\n// author: http://byteblacksmith.com/improvements-to-the-canonical-one-liner-glsl-rand-for-opengl-es-2-0/\nhighp float rand(vec2 co, float seed) {\n    const highp float a = 12.9898, b = 78.233, c = 43758.5453;\n    highp float dt = dot(co + seed, vec2(a, b)), sn = mod(dt, 3.14159);\n    return fract(sin(sn) * c + seed);\n}\n\nvoid main() {\n\n    float minGradient = uInnerRadius * 0.3;\n    float innerRadius = (uInnerRadius + minGradient * 0.5) / filterArea.x;\n\n    float gradient = uRadius * 0.3;\n    float radius = (uRadius - gradient * 0.5) / filterArea.x;\n\n    float countLimit = MAX_KERNEL_SIZE;\n\n    vec2 dir = vec2(uCenter.xy / filterArea.xy - vTextureCoord);\n    float dist = length(vec2(dir.x, dir.y * filterArea.y / filterArea.x));\n\n    float strength = uStrength;\n\n    float delta = 0.0;\n    float gap;\n    if (dist < innerRadius) {\n        delta = innerRadius - dist;\n        gap = minGradient;\n    } else if (radius >= 0.0 && dist > radius) { // radius < 0 means it's infinity\n        delta = dist - radius;\n        gap = gradient;\n    }\n\n    if (delta > 0.0) {\n        float normalCount = gap / filterArea.x;\n        delta = (normalCount - delta) / normalCount;\n        countLimit *= delta;\n        strength *= delta;\n        if (countLimit < 1.0)\n        {\n            gl_FragColor = texture2D(uSampler, vTextureCoord);\n            return;\n        }\n    }\n\n    // randomize the lookup values to hide the fixed number of samples\n    float offset = rand(vTextureCoord, 0.0);\n\n    float total = 0.0;\n    vec4 color = vec4(0.0);\n\n    dir *= strength;\n\n    for (float t = 0.0; t < MAX_KERNEL_SIZE; t++) {\n        float percent = (t + offset) / MAX_KERNEL_SIZE;\n        float weight = 4.0 * (percent - percent * percent);\n        vec2 p = vTextureCoord + dir * percent;\n        vec4 sample = texture2D(uSampler, p);\n\n        // switch to pre-multiplied alpha to correctly blur transparent images\n        // sample.rgb *= sample.a;\n\n        color += sample * weight;\n        total += weight;\n\n        if (t > countLimit){\n            break;\n        }\n    }\n\n    color /= total;\n    // switch back from pre-multiplied alpha\n    // color.rgb /= color.a + 0.00001;\n\n    gl_FragColor = color;\n}\n".replace("${maxKernelSize}",i.toFixed(1)))||this,Object.assign(r,l),r}return u(n,e),Object.defineProperty(n.prototype,"center",{get:function(){return this.uniforms.uCenter},set:function(e){this.uniforms.uCenter=e},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"strength",{get:function(){return this.uniforms.uStrength},set:function(e){this.uniforms.uStrength=e},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"innerRadius",{get:function(){return this.uniforms.uInnerRadius},set:function(e){this.uniforms.uInnerRadius=e},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"radius",{get:function(){return this.uniforms.uRadius},set:function(e){(e<0||e===1/0)&&(e=-1),this.uniforms.uRadius=e},enumerable:!1,configurable:!0}),n.defaults={strength:.1,center:[0,0],innerRadius:0,radius:-1,maxKernelSize:32},n}(n.Filter);return e.AdjustmentFilter=m,e.AdvancedBloomFilter=h,e.AsciiFilter=g,e.BevelFilter=v,e.BloomFilter=y,e.BulgePinchFilter=b,e.CRTFilter=z,e.ColorMapFilter=x,e.ColorOverlayFilter=_,e.ColorReplaceFilter=C,e.ConvolutionFilter=S,e.CrossHatchFilter=F,e.DotFilter=O,e.DropShadowFilter=P,e.EmbossFilter=A,e.GlitchFilter=T,e.GlowFilter=w,e.GodrayFilter=D,e.KawaseBlurFilter=d,e.MotionBlurFilter=j,e.MultiColorReplaceFilter=M,e.OldFilmFilter=R,e.OutlineFilter=E,e.PixelateFilter=I,e.RGBSplitFilter=N,e.RadialBlurFilter=k,e.ReflectionFilter=L,e.ShockwaveFilter=X,e.SimpleLightmapFilter=B,e.TiltShiftAxisFilter=G,e.TiltShiftFilter=W,e.TiltShiftXFilter=K,e.TiltShiftYFilter=q,e.TwistFilter=Y,e.ZoomBlurFilter=Z,Object.defineProperty(e,"__esModule",{value:!0}),e}({},PIXI,PIXI,PIXI,PIXI.utils,PIXI,PIXI.filters,PIXI.filters);Object.assign(PIXI.filters,__filters);
//# sourceMappingURL=pixi-filters.js.map


// Generated by CoffeeScript 2.6.1
// ==========================================================================
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ KDCore.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
// * LIBRARY WITH MZ AND MZ SUPPORT
//! {OUTER FILE}

//?rev 07.02.24
var KDCore;

window.Imported = window.Imported || {};

Imported.KDCore = true;

KDCore = KDCore || {};

// * Двузначные числа нельзя в версии, сравнение идёт по первой цифре поулчается (3.43 - нельзя, можно 3.4.3)
//%[МЕНЯТЬ ПРИ ИЗМЕНЕНИИ]
KDCore._fileVersion = '3.3.2';

// * Методы и библиотеки данной версии
KDCore._loader = 'loader_' + KDCore._fileVersion;

KDCore[KDCore._loader] = [];

// * Добавить библиотеку на загрузку
KDCore.registerLibraryToLoad = function(lib) {
  return KDCore[KDCore._loader].push(lib);
};

if ((KDCore.Version != null) && KDCore.Version >= KDCore._fileVersion) {
  // * ПРОПУСКАЕМ ЗАГРУЗКУ, так как уже загруженна более новая
  console.log('XDev KDCore ' + KDCore._fileVersion + ' skipped by new or exists version');
  KDCore._requireLoadLibrary = false;
} else {
  KDCore.Version = KDCore._fileVersion;
  KDCore.LIBS = KDCore.LIBS || {};
  KDCore.register = function(library) {
    return this.LIBS[library.name] = library;
  };
  window.KDCore = KDCore;
  // * ТРЕБУЕТСЯ ЗАГРУЗКА БИБЛИОТЕК
  KDCore._requireLoadLibrary = true;
}


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  Array.prototype.delete = function() {
    var L, a, ax, what;
    what = void 0;
    a = arguments;
    L = a.length;
    ax = void 0;
    while (L && this.length) {
      what = a[--L];
      while ((ax = this.indexOf(what)) !== -1) {
        this.splice(ax, 1);
      }
    }
    return this;
  };
  Array.prototype.max = function() {
    return Math.max.apply(null, this);
  };
  Array.prototype.min = function() {
    return Math.min.apply(null, this);
  };
  Array.prototype.sample = function() {
    if (this.length === 0) {
      return [];
    }
    return this[KDCore.SDK.rand(0, this.length - 1)];
  };
  Array.prototype.first = function() {
    return this[0];
  };
  Array.prototype.last = function() {
    return this[this.length - 1];
  };
  Array.prototype.shuffle = function() {
    var k, n, v;
    n = this.length;
    while (n > 1) {
      n--;
      k = KDCore.SDK.rand(0, n + 1);
      v = this[k];
      this[k] = this[n];
      this[n] = v;
    }
  };
  Array.prototype.count = function() {
    return this.length;
  };
  Array.prototype.isEmpty = function() {
    return this.length === 0;
  };
  // * Ищет элемент, у которого поле ID == id
  Array.prototype.getById = function(id) {
    return this.getByField('id', id);
  };
  // * Ищет элемент, у которого поле FIELD (имя поля) == value
  Array.prototype.getByField = function(field, value) {
    var e;
    try {
      return this.find(function(item) {
        return item[field] === value;
      });
    } catch (error) {
      e = error;
      console.warn(e);
      return null;
    }
  };
  Object.defineProperty(Array.prototype, "delete", {
    enumerable: false
  });
  Object.defineProperty(Array.prototype, "max", {
    enumerable: false
  });
  Object.defineProperty(Array.prototype, "min", {
    enumerable: false
  });
  Object.defineProperty(Array.prototype, "sample", {
    enumerable: false
  });
  Object.defineProperty(Array.prototype, "first", {
    enumerable: false
  });
  Object.defineProperty(Array.prototype, "last", {
    enumerable: false
  });
  Object.defineProperty(Array.prototype, "shuffle", {
    enumerable: false
  });
  Object.defineProperty(Array.prototype, "count", {
    enumerable: false
  });
  Object.defineProperty(Array.prototype, "isEmpty", {
    enumerable: false
  });
  Object.defineProperty(Array.prototype, "getById", {
    enumerable: false
  });
  return Object.defineProperty(Array.prototype, "getByField", {
    enumerable: false
  });
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  Number.prototype.do = function(method) {
    return KDCore.SDK.times(this, method);
  };
  Number.prototype.clamp = function(min, max) {
    return Math.min(Math.max(this, min), max);
  };
  return Number.prototype.any = function(number) {
    return (number != null) && number > 0;
  };
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  String.prototype.toCss = function() {
    return KDCore.Color.FromHex(this).CSS;
  };
  String.prototype.toCSS = function() {
    return this.toCss();
  };
  String.prototype.isEmpty = function() {
    return this.length === 0 || !this.trim();
  };
  String.isNullOrEmpty = function(str) {
    if (str != null) {
      return str.toString().isEmpty();
    } else {
      return true;
    }
  };
  String.any = function(str) {
    return !String.isNullOrEmpty(str);
  };
  return String.prototype.replaceAll = function(search, replacement) {
    var target;
    target = this;
    return target.split(search).join(replacement);
  };
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  KDCore.isMV = function() {
    return Utils.RPGMAKER_NAME.contains("MV");
  };
  KDCore.isMZ = function() {
    return !KDCore.isMV();
  };
  KDCore.warning = function(msg, error) {
    if (msg != null) {
      console.warn(msg);
    }
    if (error != null) {
      console.warn(error);
    }
  };
  KDCore.makeid = function(length) {
    var characters, charactersLength, i, result;
    result = '';
    characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    charactersLength = characters.length;
    i = 0;
    while (i < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      i++;
    }
    return result;
  };
  return KDCore.makeId = function() {
    return KDCore.makeid(...arguments);
  };
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  var SDK;
  //?[DEPRECATED]
  // * SDK
  //------------------------------------------------------------------------------
  SDK = function() {
    throw new Error('This is a static class');
  };
  SDK.rand = function(min, max) {
    return Math.round(Math.random() * (max - min)) + min;
  };
  SDK.setConstantToObject = function(object, constantName, constantValue) {
    object[constantName] = constantValue;
    if (typeof object[constantName] === 'object') {
      Object.freeze(object[constantName]);
    }
    Object.defineProperty(object, constantName, {
      writable: false
    });
  };
  SDK.convertBitmapToBase64Data = function(bitmap) {
    return bitmap._canvas.toDataURL('image/png');
  };
  SDK.times = function(times, method) {
    var i, results;
    i = 0;
    results = [];
    while (i < times) {
      method(i);
      results.push(i++);
    }
    return results;
  };
  SDK.toGlobalCoord = function(layer, coordSymbol = 'x') {
    var node, t;
    t = layer[coordSymbol];
    node = layer;
    while (node) {
      t -= node[coordSymbol];
      node = node.parent;
    }
    return (t * -1) + layer[coordSymbol];
  };
  SDK.canvasToLocalX = function(layer, x) {
    while (layer) {
      x -= layer.x;
      if ((layer.scale != null) && layer.scale.x !== 0) {
        x /= layer.scale.x;
      }
      layer = layer.parent;
    }
    return x;
  };
  SDK.canvasToLocalY = function(layer, y) {
    while (layer) {
      y -= layer.y;
      if ((layer.scale != null) && layer.scale.y !== 0) {
        y /= layer.scale.y;
      }
      layer = layer.parent;
    }
    return y;
  };
  SDK.isInt = function(n) {
    return Number(n) === n && n % 1 === 0;
  };
  SDK.isFloat = function(n) {
    return Number(n) === n && n % 1 !== 0;
  };
  SDK.checkSwitch = function(switchValue) {
    if (switchValue === 'A' || switchValue === 'B' || switchValue === 'C' || switchValue === 'D') {
      return true;
    }
    return false;
  };
  SDK.toNumber = function(string, none = 0) {
    var number;
    if (string == null) {
      return none;
    }
    number = Number(string);
    if (isNaN(number)) {
      return none;
    }
    return number;
  };
  SDK.isString = function(value) {
    return typeof value === "string";
  };
  SDK.isArray = function(value) {
    return Array.isArray(value);
  };
  //@[EXTEND]
  return KDCore.SDK = SDK;
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  var __alias_Bitmap_blt_kdCore, __alias_Bitmap_fillAll_kdCore;
  //@[ALIAS]
  __alias_Bitmap_fillAll_kdCore = Bitmap.prototype.fillAll;
  Bitmap.prototype.fillAll = function(color) {
    if (color instanceof KDCore.Color) {
      return this.fillRect(0, 0, this.width, this.height, color.CSS);
    } else {
      return __alias_Bitmap_fillAll_kdCore.call(this, color);
    }
  };
  //@[ALIAS]
  __alias_Bitmap_blt_kdCore = Bitmap.prototype.blt;
  Bitmap.prototype.blt = function(source, sx, sy, sw, sh, dx, dy, dw, dh) {
    if (this._needModBltDWH > 0) {
      dh = dw = this._needModBltDWH;
      __alias_Bitmap_blt_kdCore.call(this, source, sx, sy, sw, sh, dx, dy, dw, dh);
      this._needModBltDWH = null;
    } else {
      __alias_Bitmap_blt_kdCore.call(this, ...arguments);
    }
  };
  Bitmap.prototype.drawIcon = function(x, y, icon, size = 32, noSmoth = false) {
    var bitmap;
    bitmap = null;
    if (icon instanceof Bitmap) {
      bitmap = icon;
    } else {
      bitmap = KDCore.BitmapSrc.LoadFromIconIndex(icon).bitmap;
    }
    this._context.imageSmoothingEnabled = !noSmoth;
    this.drawOnMe(bitmap, x, y, size, size);
    this._context.imageSmoothingEnabled = true;
  };
  Bitmap.prototype.drawOnMe = function(bitmap, x = 0, y = 0, sw = 0, sh = 0) {
    if (sw <= 0) {
      sw = bitmap.width;
    }
    if (sh <= 0) {
      sh = bitmap.height;
    }
    this.blt(bitmap, 0, 0, bitmap.width, bitmap.height, x, y, sw, sh);
  };
  Bitmap.prototype.drawInMe = function(bitmap) {
    return Bitmap.prototype.drawOnMe(bitmap, 0, 0, this.width, this.height);
  };
  return Bitmap.prototype.drawTextFull = function(text, position = 'center') {
    return this.drawText(text, 0, 0, this.width, this.height, position);
  };
});


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_CharacterBase.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Game_CharacterBase.prototype;
  // * Нахожусь ли Я в точке по диагонале (рядом), относительно char
  _.kdInDiagonalPointRelativeTo = function(char) {
    var e, x, y;
    try {
      if (char == null) {
        return false;
      }
      ({x, y} = char);
      if (x === this.x - 1 && ((y === this.y - 1) || (y === this.y + 1))) {
        return true; // * left up or down
      }
      if (x === this.x + 1 && (y === this.y - 1 || y === this.y + 1)) {
        return true; // * right up or down
      }
    } catch (error) {
      e = error;
      KDCore.warning(e);
    }
    return false;
  };
})();

// ■ END Game_CharacterBase.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  // * В MZ нету данной функции, а она часто используется в моих плагинах
  if (!KDCore.isMZ()) {
    return;
  }
  //?[NEW] (from MV)
  return ImageManager.loadEmptyBitmap = function() {
    if (this._emptyBitmap != null) {
      return this._emptyBitmap;
    } else {
      return new Bitmap();
    }
  };
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  var _input_onKeyDown, _input_onKeyUp, i, j, k, l;
  Input.KeyMapperPKD = {};
//Numbers
  for (i = j = 48; j <= 57; i = ++j) {
    Input.KeyMapperPKD[i] = String.fromCharCode(i);
  }
//Letters Upper
  for (i = k = 65; k <= 90; i = ++k) {
    Input.KeyMapperPKD[i] = String.fromCharCode(i).toLowerCase();
  }
//Letters Lower (for key code events)
  for (i = l = 97; l <= 122; i = ++l) {
    Input.KeyMapperPKD[i] = String.fromCharCode(i).toLowerCase();
  }
  
  //@[ALIAS]
  _input_onKeyDown = Input._onKeyDown;
  Input._onKeyDown = function(event) {
    _input_onKeyDown.call(this, event);
    if (Input.keyMapper[event.keyCode]) {
      return;
    }
    Input._setStateWithMapperPKD(event.keyCode);
  };
  //@[ALIAS]
  _input_onKeyUp = Input._onKeyUp;
  Input._onKeyUp = function(event) {
    _input_onKeyUp.call(this, event);
    if (Input.keyMapper[event.keyCode]) {
      return;
    }
    Input._setStateWithMapperPKD(event.keyCode, false);
  };
  //?NEW
  Input._setStateWithMapperPKD = function(keyCode, state = true) {
    var symbol;
    symbol = Input.KeyMapperPKD[keyCode];
    if (symbol != null) {
      return this._currentState[symbol] = state;
    }
  };
  //?NEW
  Input.isCancel = function() {
    return Input.isTriggered('cancel') || TouchInput.isCancelled();
  };
  //?NEW
  return TouchInput.toPoint = function() {
    return new KDCore.Point(TouchInput.x, TouchInput.y);
  };
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  PluginManager.getPluginParametersByRoot = function(rootName) {
    var pluginParameters, property;
    for (property in this._parameters) {
      if (this._parameters.hasOwnProperty(property)) {
        pluginParameters = this._parameters[property];
        if (PluginManager.isPluginParametersContentKey(pluginParameters, rootName)) {
          return pluginParameters;
        }
      }
    }
    return PluginManager.parameters(rootName);
  };
  return PluginManager.isPluginParametersContentKey = function(pluginParameters, key) {
    return pluginParameters[key] != null;
  };
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  var ___Sprite_alias_Move_KDCORE_2;
  Sprite.prototype.moveToCenter = function(dx = 0, dy = 0) {
    return this.move(-this.bitmap.width / 2 + dx, -this.bitmap.height / 2 + dy);
  };
  Sprite.prototype.setStaticAnchor = function(floatX = 1, floatY = 1) {
    this.x -= Math.round(this.width * floatX);
    this.y -= Math.round(this.height * floatY);
  };
  Sprite.prototype.moveToParentCenter = function() {
    if (!this.parent) {
      return;
    }
    return this.move(this.parent.width / 2, this.parent.height / 2);
  };
  ___Sprite_alias_Move_KDCORE_2 = Sprite.prototype.move;
  Sprite.prototype.move = function(x, y) {
    if (x instanceof Array) {
      return ___Sprite_alias_Move_KDCORE_2.call(this, x[0], x[1]);
    } else if (x instanceof KDCore.Point || ((x != null ? x.x : void 0) != null)) {
      return ___Sprite_alias_Move_KDCORE_2.call(this, x.x, x.y);
    } else if ((x != null) && (x._x != null)) {
      return ___Sprite_alias_Move_KDCORE_2.call(this, x._x, x._y);
    } else {
      return ___Sprite_alias_Move_KDCORE_2.call(this, x, y);
    }
  };
  Sprite.prototype.isContainsPoint = function(point) {
    var rect, rx, ry;
    if (this.width === 0 || this.height === 0) {
      return false;
    }
    rx = KDCore.SDK.toGlobalCoord(this, 'x');
    ry = KDCore.SDK.toGlobalCoord(this, 'y');
    rect = this._getProperFullRect(rx, ry);
    return rect.contains(point.x, point.y);
  };
  // * Возвращает Rect с учётом Scale и Anchor спрайта
  Sprite.prototype._getProperFullRect = function(rx, ry) {
    var height, width, x, y;
    width = this.width * Math.abs(this.scale.x);
    height = this.height * Math.abs(this.scale.y);
    x = rx - this.anchor.x * width;
    y = ry - this.anchor.y * height;
    if (this.anchor.x === 0 && this.scale.x < 0) {
      x += this.width * this.scale.x;
    }
    if (this.anchor.y === 0 && this.scale.y < 0) {
      y += this.height * this.scale.y;
    }
    return new PIXI.Rectangle(x, y, width, height);
  };
  Sprite.prototype.fillAll = function(color) {
    if (color != null) {
      return this.bitmap.fillAll(color);
    } else {
      return this.fillAll(KDCore.Color.WHITE);
    }
  };
  return Sprite.prototype.removeFromParent = function() {
    if (this.parent != null) {
      return this.parent.removeChild(this);
    }
  };
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  return TouchInput.toMapPoint = function() {
    return this.toPoint().convertToMap();
  };
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  KDCore.Utils = KDCore.Utils || {};
  return (function() {
    var _;
    _ = KDCore.Utils;
    _.getJDataById = function(id, source) {
      var d, j, len;
      for (j = 0, len = source.length; j < len; j++) {
        d = source[j];
        if (d.id === id) {
          return d;
        }
      }
      return null;
    };
    _.hasMeta = function(symbol, obj) {
      return (obj != null) && (obj.meta != null) && (obj.meta[symbol] != null);
    };
    _.getValueFromMeta = function(symbol, obj) {
      if (!_.hasMeta(symbol, obj)) {
        return null;
      }
      return obj.meta[symbol];
    };
    _.getNumberFromMeta = function(symbol, obj) {
      var value;
      if (!_.hasMeta(symbol, obj)) {
        return null;
      }
      if (obj.meta[symbol] === true) {
        return 0;
      } else {
        value = KDCore.SDK.toNumber(obj.meta[symbol], 0);
      }
      return value;
    };
    _.isSceneMap = function() {
      try {
        return !SceneManager.isSceneChanging() && SceneManager._scene instanceof Scene_Map;
      } catch (error) {
        return false;
      }
    };
    _.isMapScene = function() {
      return this.isSceneMap();
    };
    _.isSceneBattle = function() {
      try {
        return !SceneManager.isSceneChanging() && SceneManager._scene instanceof Scene_Battle;
      } catch (error) {
        return false;
      }
    };
    _.isBattleScene = function() {
      return this.isSceneBattle();
    };
    _.getEventCommentValue = function(commentCode, list) {
      var comment, e, i, item;
      try {
        if (list && list.length > 1) {
          i = 0;
          while (i < list.length) {
            item = list[i++];
            if (!item) {
              continue;
            }
            if (item.code === 108) {
              comment = item.parameters[0];
              if (comment.contains(commentCode)) {
                return comment;
              }
            }
          }
        }
      } catch (error) {
        e = error;
        console.warn(e);
      }
      return null;
    };
    _.getEventCommentValueArray = function(commentCode, list) {
      var comment, comments, e, i, item;
      try {
        comments = [];
        if (list && list.length > 1) {
          i = 0;
          while (i < list.length) {
            item = list[i++];
            if (!item) {
              continue;
            }
            if (item.code === 108) {
              comment = item.parameters[0];
              if (comment.contains(commentCode)) {
                comments.push(comment);
              }
            }
          }
        }
      } catch (error) {
        e = error;
        console.warn(e);
      }
      return comments;
    };
    _.getPositionPointFromJSON = function(jsonSettings) {
      return _.convertPositionPointFromJSON(jsonSettings.position);
    };
    _.convertPositionPointFromJSON = function(position) {
      var e, x, y;
      try {
        x = position[0];
        y = position[1];
        if (!KDCore.SDK.isInt(x)) {
          x = eval(x);
        }
        if (!KDCore.SDK.isInt(y)) {
          y = eval(y);
        }
        return new KDCore.Point(x, y);
      } catch (error) {
        e = error;
        console.warn('Utils.getPositionPointFromJSON', e);
        return KDCore.Point.Empty;
      }
    };
    _.jsonPos = function(jsonPosition) {
      return _.convertPositionPointFromJSON(jsonPosition);
    };
    _.jsonPosXY = function(jsonPosition) {
      var e, x, y;
      try {
        ({x, y} = jsonPosition);
        return new KDCore.Point(eval(x), eval(y));
      } catch (error) {
        e = error;
        console.warn('Utils.jsonPosXY', e);
        return KDCore.Point.Empty;
      }
    };
    _.getVar = function(id) {
      return $gameVariables.value(id);
    };
    _.setVar = function(id, value) {
      return $gameVariables.setValue(id, value);
    };
    _.addToVar = function(id, value) {
      var prevVal;
      prevVal = _.getVar(id);
      return _.setVar(id, prevVal + value);
    };
    _.playSE = function(seFileName, pitch = 100, volume = 100) {
      var sound;
      if (seFileName == null) {
        return;
      }
      if (seFileName === "") {
        return;
      }
      sound = {
        name: seFileName,
        pan: 0,
        pitch: pitch,
        volume: volume
      };
      AudioManager.playStaticSe(sound);
    };
    _.getItemTypeId = function(item) {
      if (DataManager.isWeapon(item)) {
        return Math.max(1, Math.min(Graphics.width / 1280, Graphics.height / 720));
      } else if (DataManager.isArmor(item)) {
        return 2;
      }
      return 0;
    };
    _.getItemByType = function(itemId, typeId) {
      var data, e;
      try {
        if ((typeId != null) && !isFinite(typeId) && KDCore.SDK.isString(typeId) && String.any(typeId)) {
          if (typeId[0] === "w") {
            typeId = 1;
          } else if (typeId[0] === "a") {
            typeId = 2;
          } else {
            typeId = 0;
          }
        }
        data = [$dataItems, $dataWeapons, $dataArmors];
        return data[typeId][itemId];
      } catch (error) {
        e = error;
        KDCore.warning(e);
        return null;
      }
    };
    _.loadFont = function(name) {
      if (typeof FontManager === "undefined" || FontManager === null) {
        return;
      }
      if (String.isNullOrEmpty(name)) {
        return;
      }
      if (FontManager._states[name] != null) {
        return;
      }
      FontManager.load(name, name + ".ttf");
    };
    _.convertTimeShort = function(seconds) {
      var e;
      try {
        if (seconds > 59) {
          return Math.floor(seconds / 60) + 'm';
        } else {
          return seconds;
        }
      } catch (error) {
        e = error;
        console.warn(e);
        return seconds;
      }
    };
    _.isPointInScreen = function(point, margin = 10) {
      var maxH, maxW, screenMargin, x, y;
      ({x, y} = point);
      maxW = Graphics.width;
      maxH = Graphics.height;
      // * Граница от краёв экрана
      screenMargin = margin;
      if (x < screenMargin) {
        return false;
      }
      if (y < screenMargin) {
        return false;
      }
      if (x > (maxW - screenMargin)) {
        return false;
      }
      if (y > (maxH - screenMargin)) {
        return false;
      }
      return true;
    };
    // * Ассинхронная загрузка изображения, возвращает bitmap, когда загружен
    // * Пример использования loadImageAsync(a, b).then(метод)
    // в метод будет передан bitmap первым аргументом
    _.loadImageAsync = async function(folder, filename) {
      var promise;
      promise = new Promise(function(resolve, reject) {
        var b;
        b = ImageManager.loadBitmap("img/" + folder + "/", filename);
        return b.addLoadListener(function() {
          return resolve(b);
        });
      });
      return (await promise);
    };
    // * Преобразовать расширенное значение
    // * Значение может быть X -> X
    // * "X" -> X (цифра)
    // * "X,Y,Z,..." -> [X, Y, Z]
    // * "[X, Y, Z,...]" -> [X, Y, Z]
    // * "X|V" -> из переменной X
    // * [Y] -> случайное число из массива (рекурсивно)
    //@[2.8.1] since
    _.getEValue = function(value) {
      var e, items, randomValue, variableId;
      try {
        if (value == null) {
          return null;
        }
        if (KDCore.SDK.isString(value)) {
          if (isFinite(value)) { // * Число представленно строкой
            return Number(value);
          }
          // * Массив представлен строкой (может быть без квадратных скобок)
          if (value.contains(',') || (value.contains("[") && value.contains("]"))) {
            value = value.replace("[", "");
            value = value.replace("]", "");
            // * Преобразуем в число или строку (например если extended |V)
            items = value.split(",").map(function(item) {
              var itemT;
              itemT = item.trim();
              if (isFinite(itemT)) {
                return Number(itemT);
              } else {
                return itemT;
              }
            });
            // * Вызываем снова эту функцию, но уже с массивом
            return KDCore.Utils.getEValue(items);
          }
          if (value.contains("|V")) {
            variableId = parseInt(value);
            return $gameVariables.value(variableId);
          }
          return value; // * Просто значение в итоге
        } else if (KDCore.SDK.isArray(value)) {
          randomValue = value.sample();
          return KDCore.Utils.getEValue(randomValue);
        } else {
          return value;
        }
      } catch (error) {
        e = error;
        KDCore.warning(e);
        return value;
      }
    };
    //@[2.8.2] since
    _.isChanceIsGood = function(chance) {
      var e;
      try {
        if (chance > 1) {
          chance /= 100;
        }
        return chance > Math.random();
      } catch (error) {
        e = error;
        KDCore.warning(e);
        return false;
      }
    };
    //@[2.8.2] since
    //KEY:w:3:1:50 , KEY:i:10:2:1|V
    //OUTPUT: [GameItem, COUNT]
    _.parseItemFromConditionStr = function(conditionLine) {
      var amount, e, itemChance, itemId, parts, typeId;
      try {
        if (!conditionLine.contains(":")) {
          return null;
        }
        parts = conditionLine.split(":");
        typeId = parts[1];
        itemId = KDCore.Utils.getEValue(parts[2]);
        amount = KDCore.Utils.getEValue(parts[3]);
        if (amount <= 0) {
          return null;
        }
        try {
          itemChance = String.any(parts[4]) ? parts[4] : 100;
          itemChance = KDCore.Utils.getEValue(itemChance) / 100;
        } catch (error) {
          e = error;
          KDCore.warning(e);
          itemChance = 0;
        }
        if (itemChance <= 0) {
          return null;
        }
        if (KDCore.Utils.isChanceIsGood(itemChance)) {
          return [KDCore.Utils.getItemByType(itemId, typeId), amount];
        } else {
          return null;
        }
      } catch (error) {
        e = error;
        KDCore.warning(e);
        return null;
      }
    };
    //@[3.2.1] since
    _.isValidCE = function(commonEventId) {
      var e;
      try {
        return commonEventId > 0 && ($dataCommonEvents[commonEventId] != null);
      } catch (error) {
        e = error;
        KDCore.warning(e);
        return false;
      }
    };
    //@[3.2.1] since
    _.startCE = function(commonEventId) {
      var e;
      try {
        if (this.isValidCE(commonEventId)) {
          return $gameTemp.reserveCommonEvent(commonEventId);
        }
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    };
    //@[3.2.1] since
    _.checkSwitch = function(value) {
      if (value == null) {
        return false;
      }
      if (isFinite(value)) {
        return false;
      }
      return KDCore.SDK.checkSwitch(value);
    };
    //@[3.2.1] since
    // * Вызвать с задержкой в time миллисекунд
    // * Не забываем про bind
    _.callDelayed = function(method, time = 1) {
      var e;
      try {
        if (method == null) {
          return;
        }
        setTimeout((function() {
          var e;
          try {
            return method();
          } catch (error) {
            e = error;
            return KDCore.warning(e);
          }
        }), time);
      } catch (error) {
        e = error;
        KDCore.warning(e);
      }
    };
    //@[3.2.1] since
    //<meta:1,2,3,4> -> [1,2,3,4]
    _.getArrayOfNumbersFromMeta = function(symbol, obj) {
      var e, values;
      try {
        values = this.getArrayOfValuesFromMeta(symbol, obj);
        return values.map(function(v) {
          return Number(v);
        });
      } catch (error) {
        e = error;
        KDCore.warning(e);
        return [];
      }
    };
    //@[3.2.1] since
    //<meta:a,b,c> -> ["a", "b", "c"]
    //<meta:a> -> ["a"]
    _.getArrayOfValuesFromMeta = function(symbol, obj) {
      var e, items, values;
      try {
        values = this.getValueFromMeta(symbol, obj);
        if (String.any(values)) {
          if (values.contains(',')) {
            items = values.split(',');
            return items || [];
          } else {
            return [values];
          }
        }
      } catch (error) {
        e = error;
        KDCore.warning(e);
        return [];
      }
    };
    //@[3.2.1] since
    // * Когда содержит одинаковый набор ключей
    //<meta:value1>
    //<meta:value2>
    //...
    // -> [value1,value2,...]
    _.getArrayOfValuesOfSameMeta = function(symbol, obj) {
      var e, j, len, line, lines, result;
      try {
        if (!this.hasMeta(symbol, obj)) {
          return [];
        }
        lines = obj.note.split("\n").filter(function(l) {
          return l.contains(symbol);
        });
        result = [];
        for (j = 0, len = lines.length; j < len; j++) {
          line = lines[j];
          try {
            line = line.replace("<" + symbol + ":", "");
            line = line.replace(">", "");
            result.push(line);
          } catch (error) {
            e = error;
            KDCore.warning(e);
          }
        }
        return result;
      } catch (error) {
        e = error;
        KDCore.warning(e);
      }
      return [];
    };
    //@[3.2.7] since
    _.getIndexIn2DArrayByIJ = function(row, col, cols) {
      return row * cols + col;
    };
    //@[3.2.7] since
    // * row - строка
    // * col - столбец
    _.getIJByIndexIn2DArray = function(index, cols) {
      var col, e, row;
      try {
        row = Math.floor(index / cols);
        col = index % cols;
        return [row, col];
      } catch (error) {
        e = error;
        KDCore.warning(e);
        return [0, 0];
      }
    };
    //@[3.2.7] since
    _.isSwitchIsTRUE = function(switchId) {
      var e;
      if (switchId == null) {
        return true;
      }
      if (switchId <= 0) {
        return true;
      }
      try {
        return $gameSwitches.value(switchId) === true;
      } catch (error) {
        e = error;
        KDCore.warning(e);
      }
      return false;
    };
    //@[2.9.7] since
    // * Shrink number 100000 to "100k" and ect, returns STRING
    _.formatNumberToK = function(num) {
      var e;
      try {
        if (num >= 1000000000) {
          return (num / 1000000000).toFixed(1).replace(/\.0$/, '') + 'G';
        }
        if (num >= 1000000) {
          return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
        }
        if (num >= 1000) {
          return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
        }
        return num;
      } catch (error) {
        e = error;
        KDCore.warning(e);
        return num;
      }
    };
  })();
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  return Window_Base.prototype.drawFaceWithCustomSize = function(faceName, faceIndex, x, y, finalSize) {
    this.contents._needModBltDWH = finalSize;
    this.drawFace(faceName, faceIndex, x, y);
  };
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  return (function() {    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ Window_Selectable.coffee
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var ALIAS__select, _;
    //@[DEFINES]
    _ = Window_Selectable.prototype;
    //@[ALIAS]
    ALIAS__select = _.select;
    _.select = function(index) {
      var e;
      ALIAS__select.call(this, ...arguments);
      try {
        return this._pOnSelectionChanged(index);
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    };
    _._pOnSelectionChanged = function(newIndex) {
      var e;
      try {
        if (this._pkdLastSelectedIndex == null) {
          this._pkdLastSelectedIndex = newIndex;
          return this.pOnSelectionChanged();
        } else {
          if (this._pkdLastSelectedIndex !== newIndex) {
            this._pkdLastSelectedIndex = newIndex;
            return this.pOnSelectionChanged();
          }
        }
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    };
    _.safeSelect = function(index = 0) {
      var e;
      try {
        if (this.maxItems() > index) {
          return this.select(index);
        } else {
          return this.select(-1);
        }
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    };
    
    // * Called only when new (different) index is selected
    _.pOnSelectionChanged = function() {};
  })();
});

// ■ END Window_Selectable.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  return (function() {    // * Input Extension: KDGamepad
    //------------------------------------------------------------------------------
    // * Поддержка расширенного управления через геймпад (свой модуль)
    var ALIAS___updateGamepadState, _;
    //@[DEFINES]
    _ = Input;
    // * Активировать работу модуля KDGamepad
    _.activateExtendedKDGamepad = function() {
      return _._kdIsGamepadExtended = true;
    };
    //@[ALIAS]
    ALIAS___updateGamepadState = _._updateGamepadState;
    _._updateGamepadState = function(gamepad) {
      if (Input._kdIsGamepadExtended === true) {
        KDGamepad.update();
      }
      if ((typeof $gameTemp !== "undefined" && $gameTemp !== null ? $gameTemp.__kdgpStopDefaultGamepad : void 0) === true) {
        return;
      }
      // * Режим перемещения без DPad
      // * В оригинале игрок также ходит по DPad клавишам, что может быть не удобно
      // * например при работе с инвентарём
      if (KDGamepad.isNoDPadMoving()) {
        if (KDGamepad.isDPadAny()) {
          Input.clear();
          return;
        }
      }
      ALIAS___updateGamepadState.call(this, gamepad);
    };
    window.KDGamepad = function() {
      return new Error("This is static class");
    };
    window.addEventListener("gamepadconnected", function(event) {
      var e;
      try {
        return KDGamepad.refresh();
      } catch (error) {
        // * Можно напрямую
        //unless KDGamepad.isExists()
        //    if event.gamepad? and event.gamepad.mapping == 'standard'
        //        KDGamepad.init(event.gamepad)
        e = error;
        KDCore.warning(e);
        return KDGamepad.stop();
      }
    });
    window.addEventListener("gamepaddisconnected", function(event) {
      var e;
      if (!KDGamepad.isExists()) {
        return;
      }
      try {
        if ((event.gamepad != null) && event.gamepad === KDGamepad.gamepad) {
          return KDGamepad.stop();
        }
      } catch (error) {
        e = error;
        KDCore.warning(e);
        return KDGamepad.stop();
      }
    });
    KDGamepad.stopDefaultGamepad = function() {
      $gameTemp.__kdgpStopDefaultGamepad = true;
    };
    KDGamepad.resumeDefaultGamepad = function() {
      $gameTemp.__kdgpStopDefaultGamepad = null;
    };
    // * Ссылка на геймпад
    KDGamepad.gamepad = null;
    // * Подключён ли Gamepad ?
    KDGamepad.isExists = function() {
      return KDGamepad.gamepad != null;
    };
    // * Инициализация состояния кнопок
    // * Этот метод вызывается автоматически из Refresh или при подключении Gamepad
    KDGamepad.init = function(gamepad) {
      KDGamepad.gamepad = gamepad;
      this._isActive = true;
      this.buttonNames = [
        'A', // 0
        'B', // 1
        'X', // 2
        'Y', // 3
        'LB', // 4
        'RB', // 5
        'LTrigger', // 6
        'RTrigger', // 7
        'Back', // 8
        'Start', // 9
        'LStick', // 10
        'RStick', // 11
        'dUp', // 12
        'dDown', // 13
        'dLeft', // 14
        'dRight' // 15
      ];
      this.reset();
    };
    // * Аналог Input.clear
    KDGamepad.clear = function() {
      return KDGamepad.reset();
    };
    // * Сбросить состояние кнопок
    KDGamepad.reset = function() {
      this.leftStick = {
        x: 0,
        y: 0
      };
      this.rightStick = {
        x: 0,
        y: 0
      };
      this.buttons = {};
      this.buttonsPressed = {};
      this.prevButtons = {};
    };
    
    // * Остановить учёт геймпада
    KDGamepad.stop = function() {
      KDGamepad.reset();
      KDGamepad.gamepad = null;
    };
    // * Функция проверки что нажата кнопка на геймпаде
    KDGamepad._buttonPressed = function(gamepad, index) {
      var b, e;
      try {
        if (!gamepad || !gamepad.buttons || index >= gamepad.buttons.length) {
          return false;
        }
        b = gamepad.buttons[index];
        if (b == null) {
          return false;
        }
        if (typeof b === 'object') {
          // * Можно упростить
          return b.pressed;
        }
        return b === 1.0;
      } catch (error) {
        e = error;
        KDCore.warning(e);
        return false;
      }
    };
    // * Каждый кадр (обновление состояний)
    KDGamepad.update = function() {
      var e, gp, i, isDown, j, len, name, ref;
      if (!KDGamepad.isActive()) {
        return;
      }
      KDGamepad.refresh();
      if (!KDGamepad.isExists()) {
        return;
      }
      try {
        gp = KDGamepad.gamepad;
        ref = this.buttonNames;
        // * Проверка состояний кнопок
        for (i = j = 0, len = ref.length; j < len; i = ++j) {
          name = ref[i];
          this.buttons[name] = false;
          isDown = KDGamepad._buttonPressed(gp, i);
          if (isDown === true) {
            this.prevButtons[name] = true;
          } else {
            // * Срабатываение только при нажал - отпустил
            if (this.prevButtons[name] === true) {
              this.buttons[name] = true;
              this.prevButtons[name] = false;
            }
          }
        }
        // * Проверка стиков
        this.leftStick.x = gp.axes[0];
        this.leftStick.y = gp.axes[1];
        this.rightStick.x = gp.axes[2];
        this.rightStick.y = gp.axes[3];
      } catch (error) {
        e = error;
        KDCore.warning(e);
        KDGamepad.stop();
      }
    };
    // * Обновить и проверить состояние Gamepad
    // * Надо каждый раз это вызывать
    KDGamepad.refresh = function() {
      var e, gamepads, gp, i, isGamepadRefreshed, j, ref;
      try {
        isGamepadRefreshed = false;
        if (navigator.getGamepads) {
          gamepads = navigator.getGamepads();
        } else if (navigator.webkitGetGamepads) {
          gamepads = navigator.webkitGetGamepads();
        }
        if (gamepads != null) {
          for (i = j = 0, ref = gamepads.length; (0 <= ref ? j < ref : j > ref); i = 0 <= ref ? ++j : --j) {
            gp = gamepads[i];
            if ((gp != null) && gp.mapping === 'standard') {
              isGamepadRefreshed = true;
              if (KDGamepad.buttonNames != null) {
                KDGamepad.gamepad = gp;
              } else {
                KDGamepad.init(gp);
              }
              break;
            }
          }
        }
        if (!isGamepadRefreshed) {
          // * Если не был найден не один gamepad - отключаем систему
          KDGamepad.stop();
        }
      } catch (error) {
        e = error;
        KDCore.warning(e);
        KDGamepad.stop();
      }
    };
    // * Любое нажатие кнопки
    KDGamepad.isKeyAny = function(name) {
      return KDGamepad.isKey(name) || KDGamepad.isKeyPressed(name);
    };
    // * Нажата ли кнопка (trigger нажал - отпустил)
    KDGamepad.isKey = function(name) {
      if (!KDGamepad.isExists()) {
        return false;
      }
      if (this.buttons == null) {
        return false;
      }
      return this.buttons[name] === true;
    };
    // * Нажата ли кнопка (continues зажата)
    KDGamepad.isKeyPressed = function(name) {
      if (!KDGamepad.isExists()) {
        return false;
      }
      if (this.buttons == null) {
        return false;
      }
      return this.prevButtons[name] === true;
    };
    KDGamepad.isDPadAny = function() {
      return KDGamepad.isKeyAny("dLeft") || KDGamepad.isKeyAny("dRight") || KDGamepad.isKeyAny("dUp") || KDGamepad.isKeyAny("dDown");
    };
    KDGamepad.isActive = function() {
      return this._isActive === true;
    };
    // * Временно отключить обработку KDGamepad
    KDGamepad.setActive = function(_isActive) {
      this._isActive = _isActive;
      if (KDGamepad.isActive()) {
        KDGamepad.refresh();
      } else {
        KDGamepad.stop();
      }
    };
    // * Отключить перемещение игрока на DPad
    KDGamepad.setNoDPadMovingMode = function(_noDpadMoving) {
      this._noDpadMoving = _noDpadMoving;
    };
    return KDGamepad.isNoDPadMoving = function() {
      return this._noDpadMoving === true;
    };
  })();
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  var BitmapSrc;
  BitmapSrc = (function() {
    //?[DEPRECATED]
    class BitmapSrc {
      constructor() {
        this.bitmap = null;
      }

      static LoadFromIconIndex(iconIndex) {
        var bs, icon_bitmap, iconset, ph, pw, sx, sy;
        bs = new BitmapSrc();
        if (BitmapSrc.CACHE[iconIndex] == null) {
          iconset = ImageManager.loadSystem('IconSet');
          if (KDCore.isMV()) {
            pw = Window_Base._iconWidth;
            ph = Window_Base._iconHeight;
          } else {
            pw = ImageManager.iconWidth;
            ph = ImageManager.iconHeight;
          }
          sx = iconIndex % 16 * pw;
          sy = Math.floor(iconIndex / 16) * ph;
          icon_bitmap = new Bitmap(pw, ph);
          icon_bitmap.addLoadListener(function() {
            icon_bitmap.blt(iconset, sx, sy, pw, ph, 0, 0);
          });
          BitmapSrc.CACHE[iconIndex] = icon_bitmap;
        }
        bs.bitmap = BitmapSrc.CACHE[iconIndex];
        return bs;
      }

      static LoadFromImageFolder(filename) {
        var bs;
        bs = new BitmapSrc();
        bs.bitmap = ImageManager.loadPicture(filename);
        return bs;
      }

      static LoadFromBase64(data, name) {
        var bs;
        bs = new BitmapSrc();
        if (name != null) {
          if (BitmapSrc.CACHE[name] != null) {
            bs.bitmap = BitmapSrc.CACHE[name];
          } else {
            BitmapSrc.CACHE[name] = Bitmap.load(data);
            bs.bitmap = BitmapSrc.CACHE[name];
          }
        } else {
          bs.bitmap = Bitmap.load(data);
        }
        return bs;
      }

      static LoadFromMemory(symbol) {
        var bs;
        bs = new BitmapSrc();
        if (BitmapSrc.CACHE[symbol] != null) {
          bs.bitmap = BitmapSrc.CACHE[symbol];
        } else {
          bs.bitmap = ImageManager.loadEmptyBitmap();
        }
        return bs;
      }

    };

    BitmapSrc.CACHE = {};

    return BitmapSrc;

  }).call(this);
  //@[EXTEND]
  return KDCore.BitmapSrc = BitmapSrc;
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  var Changer;
  // * Класс который может плавно изменять какой-либо параметр
  // * Работает в стиле chain методов

    // * ------------------ ПРИМЕР ----------------------------------

    // * Меняем прозрачность 4 раза, туда-сюда, затем выводим done в консоль

    //@changer = new AA.Changer(someSprite)
  //@changer.change('opacity').from(255)
  //            .to(0).step(5).speed(1).delay(30).repeat(4).reverse()
  //            .start().done(() -> console.log('done'))
  //@changer.update()

    // * -------------------------------------------------------------
  Changer = class Changer {
    constructor(obj) {
      this.obj = obj;
      // * Количество кадров, в которые будет обновление
      this._field = null; // * название поля
      this._speed = 1; // * frames
      this._step = 1; // * шаг изменения значения
      this._from = 0; // * Начальное значение
      this._to = 0; // * Конечное значение
      this._thread = null;
      this._orienation = true; // * Направление + или - step (true = +)
      this._delay = 0; // * Задержка старта
      this._changer = null; // * Ссылка на следующий changer
      this._isRepeat = false; // * Надо ли поторить себя снова
      this._onDoneMethod = null; // * Метод будет выполнен в конце (при завершении)
      this._isPrepared = false; // * Элемента был подготовлен (установлено значение from)
    }

    start() {
      if (this._field == null) {
        return;
      }
      if (this._from === this._to) {
        return;
      }
      if (this._delay > 0) {
        this._delayThread = new KDCore.TimedUpdate(this._delay, this._startThread.bind(this));
        this._delayThread.once();
      } else {
        this._startThread();
      }
      return this;
    }

    isStarted() {
      return (this._thread != null) || (this._delayThread != null);
    }

    from(_from) {
      this._from = _from;
      return this;
    }

    to(_to) {
      this._to = _to;
      return this;
    }

    step(_step) {
      this._step = _step;
      return this;
    }

    speed(_speed) {
      this._speed = _speed;
      return this;
    }

    change(_field) {
      this._field = _field;
      return this;
    }

    // * Снова повторить (не совместим с then)
    // * Если ничего не указать, или <= 0 -> то бескончно
    repeat(_repeatCount = 0) {
      this._repeatCount = _repeatCount;
      if (this._repeatCount <= 0) {
        this._repeatCount = null;
      }
      this._isRepeat = true;
      this._changer = null;
      return this;
    }

    // * Снова повторить, но поменять местами to и from (работает только с repeat >= 2)
    reverse() {
      this._isReverse = true;
      return this;
    }

    isDone() {
      if (!this._isPrepared) {
        // * Чтобы не было выхода пока ждёт Delay
        return false;
      }
      // * Если от 255 до 0 (например)
      if (this._orienation === false) {
        // * То может быть меньше нуля (т.к. @step динамический)
        return this.value() <= this._to;
      } else {
        return this.value() >= this._to;
      }
    }

    value() {
      return this.obj[this._field];
    }

    stop() {
      this._thread = null;
      this._delayThread = null;
      if (this._changer == null) {
        // * Если есть связанный Changer, то не выполняем метод завршения
        return this._callDoneMethod();
      }
    }

    // * При ожидании, значения устанавливаются не сразу
    delay(_delay) {
      this._delay = _delay;
      return this;
    }

    // * Выполнить другой Changer после этого
    // * Не совместим с Repeat
    // * НЕЛЬЗЯ зацикливать, не будет работать
    // * Соединённый не надо обновлять вне, он обновляется в этом
    then(_changer) {
      this._changer = _changer;
      this._isRepeat = false;
      return this;
    }

    // * Этот метод будт выполнене в конце
    done(_onDoneMethod) {
      this._onDoneMethod = _onDoneMethod;
      return this;
    }

    // * Шаг можно выполнить и в ручную
    makeStep() {
      if (!this.isStarted()) {
        this._prepare();
      }
      this._makeStep();
      return this;
    }

    update() {
      var ref;
      if (this.isStarted()) {
        if (this._delay > 0) {
          if ((ref = this._delayThread) != null) {
            ref.update();
          }
        }
        if (this._thread != null) {
          this._updateMainThread();
        }
      } else {
        // * Если хоть раз был запущен
        if (this._isBeenStarted === true) {
          if (this._changer != null) {
            this._updateChainedChanger();
          }
        }
      }
    }

    static CreateForOpacityUp(sprite, step = 35, onDone = null, isAutoStart = true) {
      var changer;
      changer = new Changer(sprite);
      changer.change('opacity').from(0).to(255).step(step);
      changer.done(function() {
        sprite.opacity = 255;
        if (onDone != null) {
          return onDone();
        }
      });
      if (isAutoStart) {
        changer.start();
      }
      return changer;
    }

    static CreateForOpacityDown(sprite, step = 35, onDone = null, isAutoStart = true) {
      var changer;
      changer = new Changer(sprite);
      changer.change('opacity').from(sprite.opacity).to(0).step(step);
      changer.done(function() {
        sprite.opacity = 0;
        if (onDone != null) {
          return onDone();
        }
      });
      if (isAutoStart) {
        changer.start();
      }
      return changer;
    }

  };
  (function() {    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ Changer.coffee
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var _;
    //@[DEFINES]
    _ = Changer.prototype;
    _._prepare = function() {
      if (this._field == null) {
        return;
      }
      this._orienation = this._from < this._to;
      if (!this._orienation) {
        this._step *= -1;
      }
      // * Устанавливаем начальное значение
      this.obj[this._field] = this._from;
      this._isPrepared = true;
    };
    _._makeStep = function() {
      var value;
      if (this.isDone()) {
        return;
      }
      value = this.value();
      value += this._step;
      this.obj[this._field] = value;
    };
    _._startThread = function() {
      this._prepare();
      if (this.isDone()) {
        return;
      }
      this._thread = new KDCore.TimedUpdate(this._speed, this._makeStep.bind(this));
      return this._isBeenStarted = true;
    };
    _._updateChainedChanger = function() {
      if (this._changer.isStarted()) {
        this._changer.update();
        if (this._changer.isDone()) {
          this._callDoneMethod();
          this._changer.stop();
          return this._changer = null;
        }
      } else {
        return this._changer.start();
      }
    };
    _._restart = function() {
      if (!this._isCanRepeatMore()) {
        return;
      }
      if (this._repeatCount == null) {
        // * Если указано! число повторений, то onDone метод не вызываем
        this._callDoneMethod();
      }
      if (this._isReverse === true) {
        this._swapFromTo();
      }
      this._prepare();
      return this.start();
    };
    _._swapFromTo = function() {
      var t;
      t = this._from;
      this._from = this._to;
      this._to = t;
      // * Инвентируем число step
      this._step *= -1;
    };
    _._callDoneMethod = function() {
      if (this._onDoneMethod != null) {
        return this._onDoneMethod();
      }
    };
    _._isCanRepeatMore = function() {
      if (this._repeatCount == null) {
        return true;
      }
      this._repeatCount--;
      if (this._repeatCount <= 0) {
        this.stop();
        return false;
      }
      return true;
    };
    _._updateMainThread = function() {
      this._thread.update();
      if (this.isDone()) {
        if (this._isRepeat === true) {
          this._restart();
        } else {
          if (this._changer != null) {
            this._updateChainedChanger();
          }
          this.stop();
        }
      }
    };
  })();
  // ■ END Changer.coffee
  //---------------------------------------------------------------------------

  //@[EXTEND]
  return KDCore.Changer = Changer;
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  var Color;
  Color = (function() {
    class Color {
      constructor(r1 = 255, g1 = 255, b1 = 255, a1 = 255) {
        this.r = r1;
        this.g = g1;
        this.b = b1;
        this.a = a1;
      }

      getLightestColor(lightLevel) {
        var bf, newColor, p;
        bf = 0.3 * this.R + 0.59 * this.G + 0.11 * this.B;
        p = 0;
        newColor = [0, 0, 0, 0];
        if (bf - lightLevel >= 0) {
          if (bf >= 0) {
            p = Math.abs(bf - lightLevel) / lightLevel;
          }
          newColor = this.ARR.map(function(c) {
            return c - (p * c);
          });
        } else {
          if (bf >= 0) {
            p = (lightLevel - bf) / (255 - bf);
          }
          newColor = this.ARR.map(function(c) {
            return [(255 - c) * p + c, 255].min();
          });
        }
        return new Color(newColor[0], newColor[1], newColor[2], newColor[3]);
      }

      clone() {
        return this.reAlpha(this.a);
      }

      reAlpha(newAlpha) {
        return new Color(this.r, this.g, this.b, newAlpha || 255);
      }

      static AddConstantColor(name, color) {
        color.toHex();
        color.toArray();
        color.toCSS();
        KDCore.SDK.setConstantToObject(Color, name, color);
      }

      toHex() {
        var b, g, r;
        if (this._colorHex != null) {
          return this._colorHex;
        }
        r = Math.floor(this.r).toString(16).padZero(2);
        g = Math.floor(this.g).toString(16).padZero(2);
        b = Math.floor(this.b).toString(16).padZero(2);
        return this._colorHex = '#' + r + g + b;
      }

      toArray() {
        if (this._colorArray != null) {
          return this._colorArray;
        }
        return this._colorArray = [this.r, this.g, this.b, this.a];
      }

      toCSS() {
        var na, nb, ng, nr;
        if (this._colorCss != null) {
          return this._colorCss;
        }
        nr = Math.round(this.r);
        ng = Math.round(this.g);
        nb = Math.round(this.b);
        na = this.a / 255;
        return this._colorCss = `rgba(${nr},${ng},${nb},${na})`;
      }

      toNumber() {
        return Number(this.toHex().replace("#", "0x"));
      }

      static Random() {
        var a, b, c;
        a = KDCore.SDK.rand(1, 254);
        b = KDCore.SDK.rand(1, 254);
        c = KDCore.SDK.rand(1, 254);
        return new Color(a, b, c, 255);
      }

      static FromHex(hexString) {
        var color, result;
        result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hexString);
        color = null;
        if (result != null) {
          color = {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
          };
        }
        if (color != null) {
          return new Color(color.r, color.g, color.b, 255);
        } else {
          return Color.NONE;
        }
      }

    };

    Object.defineProperties(Color.prototype, {
      R: {
        get: function() {
          return this.r;
        },
        configurable: true
      },
      G: {
        get: function() {
          return this.g;
        },
        configurable: true
      },
      B: {
        get: function() {
          return this.b;
        },
        configurable: true
      },
      A: {
        get: function() {
          return this.a;
        },
        configurable: true
      },
      ARR: {
        get: function() {
          return this.toArray();
        },
        configurable: true
      },
      CSS: {
        get: function() {
          return this.toCSS();
        },
        configurable: true
      },
      HEX: {
        get: function() {
          return this.toHex();
        },
        configurable: true
      },
      OX: {
        get: function() {
          return this.toNumber();
        },
        configurable: true
      }
    });

    Color.AddConstantColor('NONE', new Color(0, 0, 0, 0));

    Color.AddConstantColor('BLACK', new Color(0, 0, 0, 255));

    Color.AddConstantColor('WHITE', new Color(255, 255, 255, 255));

    Color.AddConstantColor('RED', new Color(255, 0, 0, 255));

    Color.AddConstantColor('GREEN', new Color(0, 255, 0, 255));

    Color.AddConstantColor('BLUE', new Color(0, 0, 255, 255));

    Color.AddConstantColor('AQUA', new Color(128, 255, 255, 255));

    Color.AddConstantColor('MAGENTA', new Color(128, 0, 128, 255));

    Color.AddConstantColor('YELLOW', new Color(255, 255, 0, 255));

    Color.AddConstantColor('ORANGE', new Color(255, 128, 0, 255));

    return Color;

  }).call(this);
  //@[EXTEND]
  return KDCore.Color = Color;
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  var Color, DevLog, __TMP_LOGS__;
  Color = KDCore.Color;
  __TMP_LOGS__ = [];
  DevLog = class DevLog {
    constructor(prefix = "") {
      this.prefix = prefix;
      this._isShow = typeof DEV !== 'undefined';
      this._color = Color.BLACK;
      this._backColor = Color.WHITE;
      __TMP_LOGS__.push(this);
    }

    on() {
      this._isShow = true;
      return this;
    }

    off() {
      this._isShow = false;
      return this;
    }

    applyRandomColors() {
      this.applyRandomWithoutBackgroundColors();
      this.setBackColor(Color.Random());
      return this;
    }

    applyRandomWithoutBackgroundColors() {
      this.setColor(Color.Random());
      return this;
    }

    setColor(color) {
      this._color = color;
      return this;
    }

    setBackColor(backColor) {
      this._backColor = backColor;
      return this;
    }

    applyLibraryColors() {
      this.setColors(new Color(22, 120, 138, 0), Color.BLACK);
      return this;
    }

    setColors(color, backColor) {
      this.setColor(color);
      this.setBackColor(backColor);
      return this;
    }

    applyExtensionColors() {
      this.setColors(new Color(22, 143, 137, 0), Color.BLACK.getLightestColor(60));
      return this;
    }

    applyWarningColors() {
      this.setColors(Color.ORANGE, Color.BLACK.getLightestColor(100));
      return this;
    }

    p(text) {
      if (!this._isShow) {
        return;
      }
      if (text == null) {
        console.log("");
      }
      this._printText(text);
    }

    _printText(text) {
      text = this.prefix + " : " + text;
      if (this._isUsingColor()) {
        return this._printTextWithColors(text);
      } else {
        return console.log(text);
      }
    }

    _isUsingColor() {
      return this._color !== Color.BLACK || this._backColor !== Color.WHITE;
    }

    _printTextWithColors(text) {
      var args;
      args = ['%c' + text, `color: ${this._color.HEX} ; background: ${this._backColor.HEX};`];
      return window.console.log.apply(console, args);
    }

    static CreateForLib(library) {
      var dlog;
      dlog = new DevLog(library.name);
      dlog.applyLibraryColors();
      return dlog;
    }

    static EnableAllLogs() {
      return __TMP_LOGS__.forEach(function(log) {
        return log.on();
      });
    }

  };
  //@[EXTEND]
  return KDCore.DevLog = DevLog;
});


// Generated by CoffeeScript 2.6.1
// * Класс для глобального события игры (НЕ события на карте)
KDCore.registerLibraryToLoad(function() {
  //@[AUTO EXTEND]
  return KDCore.GEvent = class GEvent {
    constructor(name) {
      this.name = name;
      this.clear();
    }

    addListener(listener, isSingle = false) {
      if (listener == null) {
        return;
      }
      if (isSingle === true) {
        this.listeners = [listener];
      } else {
        this.listeners.push(listener);
      }
    }

    removeListener(listener) {
      if (listener == null) {
        return;
      }
      return this.listener.delete(listener);
    }

    call() {
      var i, l, len, ref;
      ref = this.listeners;
      for (i = 0, len = ref.length; i < len; i++) {
        l = ref[i];
        l();
      }
    }

    clear() {
      return this.listeners = [];
    }

  };
});


// Generated by CoffeeScript 2.6.1
// * Менеджер для управления глобальными событиями игры (GEvent) (НЕ события на карте)
KDCore.registerLibraryToLoad(function() {
  var GEventsManager;
  // * Данный менеджер глобальный, т.е. с ним работают ВСЕ плагины, которые его используют!
  GEventsManager = function() {};
  (function() {
    var _;
    _ = GEventsManager;
    // * Существует ли событие с данным именем
    _.isEventExists = function(gEventName) {
      return this._getEventByName(gEventName) != null;
    };
    // * Получить список всех зарегестрированных событий (имён)
    _.getAllEvents = function() {
      if (this.events == null) {
        return [];
      }
      return this.events.map(function(ev) {
        return ev.name;
      });
    };
    // * Зарегестрировать событие (используется только имя события)
    _.register = function(gEventName) {
      if (this.events == null) {
        this.events = [];
      }
      this.events.push(new KDCore.GEvent(gEventName));
    };
    // * Подписаться на событие (имя события) и слушатель
    // * если isSingle == true - то у события может быть только один исполнитель
    _.subscribeFor = function(evName, listener, isSingle = false) {
      var ref;
      return (ref = this._getEventByName(evName)) != null ? ref.addListener(listener, isSingle) : void 0;
    };
    // * Подписаться на событие (уникально) для объекта
    // * Т.е. при вызове этого метода ещё раз, если объект
    // * уже подписан на событие, ничего не будет (без дубликатов)
    //? ВНИМАНИЕ ! Если объект подписался через subscribeForX, то
    // выполнив clear по данному evName, он уже не подпишится!
    _.subscribeForX = function(context, evName, listener) {
      var e, key;
      try {
        key = "__kdCoreGEvent_" + evName;
        if (context[key] == null) {
          this.subscribeFor(evName, listener);
          return context[key] = true;
        }
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    };
    // * Вызвать событие (по имени)
    _.call = function(evName) {
      var ref;
      return (ref = this._getEventByName(evName)) != null ? ref.call() : void 0;
    };
    _.clear = function(evName) {
      var ref;
      return (ref = this._getEventByName(evName)) != null ? ref.clear() : void 0;
    };
    _._getEventByName = function(name) {
      if (!this.events) {
        return null;
      }
      return this.events.find(function(ev) {
        return ev.name === name;
      });
    };
  })();
  //@[EXTEND]
  return KDCore.GEventsManager = GEventsManager;
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  //@[AUTO EXTEND]
  //?[DEPRECATED]
  return KDCore.ParametersManager = class ParametersManager {
    constructor(pluginName) {
      this.pluginName = pluginName;
      this._cache = {};
      this._parameters = PluginManager.getPluginParametersByRoot(this.pluginName);
    }

    isLoaded() {
      return (this._parameters != null) && this._parameters.hasOwnProperty(this.pluginName);
    }

    isHasParameter(name) {
      return this._parameters[name] != null;
    }

    getString(name) {
      return this._parameters[name];
    }

    convertField(object, fieldName) {
      var e;
      try {
        object[fieldName] = JSON.parse(object[fieldName] || 'false');
      } catch (error) {
        e = error;
        console.error('Error while convert field ' + e.name);
        object[fieldName] = false;
      }
      return object;
    }

    convertImage(object, fieldName) {
      return object[fieldName] = this.loadImage(object[fieldName]);
    }

    loadImage(filename, smooth) {
      var e, path;
      try {
        if (filename) {
          path = filename.split('/');
          filename = path.last();
          path = path.first() + '/';
          return ImageManager.loadBitmap('img/' + path, filename, 0, smooth || true);
        } else {
          return ImageManager.loadEmptyBitmap();
        }
      } catch (error) {
        e = error;
        console.error(e);
        return ImageManager.loadEmptyBitmap();
      }
    }

    getFromCacheOrInit(name, func) {
      var object;
      if (!this.isInCache(name)) {
        if (func != null) {
          object = func.call(this);
          this.putInCache(name, object);
        }
      }
      return this.getFromCache(name);
    }

    isInCache(name) {
      return this._cache.hasOwnProperty(name);
    }

    putInCache(name, object) {
      return this._cache[name] = object;
    }

    getFromCache(name) {
      return this._cache[name];
    }

    getNumber(name) {
      var number;
      number = this.getObject(name);
      if (KDCore.SDK.isInt(number)) {
        return number;
      }
      return 0;
    }

    getObject(name) {
      if (this.isHasParameter(name)) {
        return JSON.parse(this.getString(name) || '{}');
      } else {
        return {};
      }
    }

    getBoolean(name) {
      if (this.isHasParameter(name)) {
        return JSON.parse(this.getString(name) || false);
      } else {
        return false;
      }
    }

    getBooleanFromCacheWithDefault(name, defaultValue) {
      if (this.isHasParameter(name)) {
        return this.getBooleanFromCache(name);
      } else {
        return defaultValue;
      }
    }

    getNumberFromCacheWithDefault(name, defaultValue) {
      if (this.isHasParameter(name)) {
        return this.getNumberFromCache(name);
      } else {
        return defaultValue;
      }
    }

    getStringFromCacheWithDefault(name, defaultValue) {
      if (this.isHasParameter(name)) {
        return this.getStringFromCache(name);
      } else {
        return defaultValue;
      }
    }

    getBooleanFromCache(name) {
      return this.getFromCacheOrInit(name, function() {
        return this.getBoolean(name);
      });
    }

    getNumberFromCache(name) {
      return this.getFromCacheOrInit(name, function() {
        return this.getNumber(name);
      });
    }

    getStringFromCache(name) {
      return this.getFromCacheOrInit(name, function() {
        return this.getString(name);
      });
    }

  };
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  //@[AUTO EXTEND]
  return KDCore.ParamLoader = class ParamLoader {
    constructor(pluginName) {
      this.pluginName = pluginName;
      this.paramsRaw = PluginManager.getPluginParametersByRoot(this.pluginName);
      this.params = this.parseParameters(this.paramsRaw);
    }

    parseParameters(paramSet) {
      var clearKey, key, params, typeKey, value;
      params = {};
      for (key in paramSet) {
        value = paramSet[key];
        KDCore.__ppNameToParseNext = key;
        clearKey = this.parseKey(key);
        typeKey = this.parseKeyType(key);
        params[clearKey] = this.parseParamItem(typeKey, value);
      }
      return params;
    }

    parseKey(keyRaw) {
      return keyRaw.split(":")[0];
    }

    parseKeyType(keyRaw) {
      return keyRaw.split(":")[1];
    }

    writeDetailedError() {
      var e;
      try {
        if (!String.any(KDCore.__ppNameToParseNext)) {
          return;
        }
        return console.warn("Please, check Plugin Parameter " + KDCore.__ppNameToParseNext + " in plugin " + this.pluginName);
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    }

    // * Проверка, загружены ли параметры плагина
    isLoaded() {
      return (this.paramsRaw != null) && this.paramsRaw.hasOwnProperty(this.pluginName);
    }

    // * Имя параметра без ключа
    isHasParameter(paramName) {
      return this.params[paramName] != null;
    }

    
      // * Возвращает значение параметра (def - по умолчанию, если не найден)
    getParam(paramName, def) {
      var value;
      if (this.isHasParameter(paramName)) {
        value = this.params[paramName];
        if (value != null) {
          return value;
        }
      }
      return def;
    }

    // * Данные ключи должны идти после названия параметра через :
    // * Пример: @param ShowDelay:int, @param TestBool:bool
    // * Текстовые параметры, которые надо вернуть как есть, можно без типа (text, file, combo, ...)
    parseParamItem(type, item) {
      var e;
      if (type == null) {
        return item;
      }
      try {
        switch (type) {
          case "int":
          case "i":
            return Number(item);
          case "intA":
            return this.parseArray(item, "int");
          case "bool":
          case "b":
          case "e":
            return eval(item);
          case "struct":
          case "s":
            return this.parseStruct(item);
          case "structA":
            return this.parseStructArray(item);
          case "str":
            return item;
          case "strA":
            return this.parseArray(item, "str");
          case "note":
            return this.parseNote(item);
          case "css":
            return item.toCss();
          case "color":
            return KDCore.Color.FromHex(item);
          case "json":
          case "j":
            return this.parseJson(item);
          case "jA":
            return this.parseArray(item, 'json');
          default:
            return item;
        }
      } catch (error) {
        e = error;
        console.warn(e);
        this.writeDetailedError();
        return item;
      }
    }

    parseArray(items, type) {
      var e, elements, i, len, p, parsed;
      try {
        elements = [];
        parsed = JsonEx.parse(items);
        for (i = 0, len = parsed.length; i < len; i++) {
          p = parsed[i];
          try {
            elements.push(this.parseParamItem(type, p));
          } catch (error) {
            e = error;
            console.warn(e);
          }
        }
      } catch (error) {
        e = error;
        console.warn(e);
        this.writeDetailedError();
      }
      return elements;
    }

    parseStruct(item) {
      var e, parsed;
      try {
        if (item == null) {
          return null;
        }
        if (!String.any(item)) {
          return null;
        }
        parsed = JsonEx.parse(item);
        if (parsed != null) {
          return this.parseParameters(parsed);
        }
      } catch (error) {
        e = error;
        console.warn(e);
        this.writeDetailedError();
      }
      return null;
    }

    parseStructArray(items) {
      var e, elements, i, len, p, parsed;
      try {
        elements = [];
        parsed = JsonEx.parse(items);
        for (i = 0, len = parsed.length; i < len; i++) {
          p = parsed[i];
          try {
            elements.push(this.parseStruct(p));
          } catch (error) {
            e = error;
            console.warn(e);
            this.writeDetailedError();
          }
        }
      } catch (error) {
        e = error;
        console.warn(e);
        this.writeDetailedError();
      }
      return elements;
    }

    parseNote(item) {
      var e, parsed;
      try {
        parsed = JsonEx.parse(item);
        if (parsed != null) {
          return parsed;
        }
      } catch (error) {
        e = error;
        console.warn(e);
        this.writeDetailedError();
      }
      return item;
    }

    parseJson(item) {
      var cx, e, element, elements, i, json, key, len, parsed, value;
      try {
        json = {};
        parsed = JsonEx.parse(item);
        elements = parsed.split('\n');
        for (i = 0, len = elements.length; i < len; i++) {
          element = elements[i];
          cx = "{" + element + "}";
          try {
            item = JsonEx.parse(cx);
            for (key in item) {
              value = item[key];
              json[key] = value;
            }
          } catch (error) {
            e = error;
            KDCore.warning("Parameter " + element + " have syntax errors, ignored");
          }
        }
        return json;
      } catch (error) {
        e = error;
        KDCore.warning(e);
        this.writeDetailedError();
        return null; // * Чтобы default value был возвращён
      }
    }

  };
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  var Point;
  Point = (function() {
    class Point {
      constructor(_x = 0, _y = 0) {
        this._x = _x;
        this._y = _y;
      }

      clone() {
        return new Point(this._x, this._y);
      }

      toString() {
        return "[" + this._x + " ; " + this._y + "]";
      }

      isSame(anotherPoint) {
        return this.x === anotherPoint.x && this.y === anotherPoint.y;
      }

      convertToCanvas() {
        return new Point(Graphics.pageToCanvasX(this._x), Graphics.pageToCanvasY(this._y));
      }

      convertToMap() {
        return new Point($gameMap.canvasToMapX(this._x), $gameMap.canvasToMapY(this._y));
      }

      convertToScreen() {
        return new Point(this.screenX(), this.screenY());
      }

      screenX() {
        var t, tw;
        t = $gameMap.adjustX(this._x);
        tw = $gameMap.tileWidth();
        return Math.round(t * tw + tw / 2);
      }

      screenY() {
        var t, th;
        t = $gameMap.adjustY(this._y);
        th = $gameMap.tileHeight();
        return Math.round(t * th + th);
      }

      round() {
        return new Point(Math.round(this._x), Math.round(this._y));
      }

      floor() {
        return new Point(Math.floor(this._x), Math.floor(this._y));
      }

      mapPointOnScreen() {
        var nx, ny;
        nx = (this._x * $gameMap.tileWidth()) - ($gameMap.displayX() * $gameMap.tileWidth());
        ny = (this._y * $gameMap.tileHeight()) - ($gameMap.displayY() * $gameMap.tileHeight());
        return new Point(nx, ny);
      }

      multiplyBy(val) {
        return new Point(this._x * val, this._y * val);
      }

      simple() {
        return new PIXI.Point(this.x, this.y);
      }

      delta(point) {
        var dx, dy;
        dx = point.x - this._x;
        dy = point.y - this._y;
        return new KDCore.Point(dx, dy);
      }

      static _getEmpty() {
        if (Point._emptyPoint == null) {
          Point._emptyPoint = new Point(0, 0);
        }
        return Point._emptyPoint;
      }

    };

    Object.defineProperties(Point.prototype, {
      x: {
        get: function() {
          return this._x;
        },
        configurable: true
      },
      y: {
        get: function() {
          return this._y;
        },
        configurable: true
      }
    });

    Object.defineProperties(Point, {
      Empty: {
        get: function() {
          return Point._getEmpty();
        },
        configurable: false
      }
    });

    Array.prototype.toPoint = function() {
      return new Point(this[0], this[1]);
    };

    Object.defineProperty(Array.prototype, "toPoint", {
      enumerable: false
    });

    Sprite.prototype.toPoint = function() {
      return new Point(this.x, this.y);
    };

    Game_CharacterBase.prototype.toPoint = function() {
      return new Point(this.x, this.y);
    };

    return Point;

  }).call(this);
  //@[EXTEND]
  return KDCore.Point = Point;
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  return KDCore.Sprite = (function(superClass) {
    //@[AUTO EXTEND]
    class Sprite extends superClass {
      constructor() {
        super(...arguments);
        this.pHandledIndex = 0;
        return;
      }

      pIsSupportKeyboardHandle() {
        return false;
      }

      appear(step, delay = 0) {
        this.opacity = 0;
        this._opChanger = KDCore.Changer.CreateForOpacityUp(this, step, () => {
          this._opChanger = null;
          return this._updateOpChanger = function() {}; // * EMPTY
        }, false); // * Not autostart for Delay
        if (delay > 0) {
          this._opChanger.delay(delay);
        }
        this._opChanger.start();
        this._updateOpChanger = () => {
          var ref;
          return (ref = this._opChanger) != null ? ref.update() : void 0;
        };
      }

      disapper(step, delay = 0) {
        this._opChanger = KDCore.Changer.CreateForOpacityDown(this, step, () => {
          this._opChanger = null;
          return this._updateOpChanger = function() {}; // * EMPTY
        }, false); // * Not autostart for Delay
        if (delay > 0) {
          this._opChanger.delay(delay);
        }
        this._opChanger.start();
        this._updateOpChanger = () => {
          var ref;
          return (ref = this._opChanger) != null ? ref.update() : void 0;
        };
      }

      moveWithAnimation(dx, dy, duration = 30, easingType = 2) {
        var e;
        try {
          this._moveAnimationItem = new Game_Picture();
          this._moveAnimationItem._x = this.x;
          this._moveAnimationItem._y = this.y;
          this._moveAnimationItem.move(0, this.x + dx, this.y + dy, 1, 1, 255, 0, duration, easingType);
          this.updateMovingAnimation = this.updateMovingAnimationBody;
        } catch (error) {
          e = error;
          KDCore.warning(e);
        }
      }

      assignTooltip(content, params) {
        if (this._tooltip != null) {
          this.removeChild(this._tooltip);
        }
        this._tooltip = new KDCore.UI.Sprite_UITooltip(params);
        this._tooltip.addContent(content);
        this.updateTooltip = this.updateTooltipBody;
      }

      destroyTooltip() {
        if (this._tooltip == null) {
          return;
        }
        this.hideTooltip();
        this.removeChild(this._tooltip);
        this._tooltip = null;
        return this.updateTooltip = function() {}; // * EMPTY
      }

      showTooltip() {
        if (this._tooltip == null) {
          return;
        }
        // * Position 0, 0, becouse cursorRelative by default
        this._tooltip.activateTooltip(0, 0, this);
      }

      hideTooltip() {
        if (this._tooltip == null) {
          return;
        }
        this._tooltip.deactivateTooltip();
      }

      //@[DYNAMIC]
      updateTooltip() {} // * EMPTY

      updateTooltipBody() {
        if (this.isUnderMouse()) {
          if (this._tooltip.isTooltipActive()) {

          } else {
            if (this.isReady() && this.visible === true && this.opacity >= 255) {
              return this.showTooltip();
            }
          }
        } else {
          if (this._tooltip.isTooltipActive()) {
            return this.hideTooltip();
          }
        }
      }

      //@[DYNAMIC]
      updateMovingAnimation() {} // * EMPTY

      updateMovingAnimationBody() {
        var e;
        try {
          if (this._moveAnimationItem == null) {
            return;
          }
          this._moveAnimationItem.update();
          this.x = this._moveAnimationItem._x;
          this.y = this._moveAnimationItem._y;
          if (this._moveAnimationItem._duration <= 0) {
            this._moveAnimationItem = null;
            this.updateMovingAnimation = function() {};
          }
        } catch (error) {
          e = error;
          KDCore.warning(e);
          this.updateMovingAnimation = function() {};
        }
      }

      update() {
        super.update();
        this._updateOpChanger();
        this.updateTooltip();
        if (this.updateMovingAnimation != null) {
          this.updateMovingAnimation();
        }
        if (this.pIsHandlerActive()) {
          this._pHandleKeyboardInputs();
        }
      }

      //@[DYNAMIC]
      _updateOpChanger() {} // * EMPTY

      b() {
        return this.bitmap;
      }

      clear() {
        return this.bitmap.clear();
      }

      add() {
        return this.addChild(...arguments);
      }

      bNew(w, h) {
        if (h == null) {
          h = w;
        }
        return this.bitmap = new Bitmap(w, h);
      }

      bImg(filename, sourceFolder) {
        var getterFunc;
        getterFunc = function(filename) {
          return ImageManager.loadPicture(filename);
        };
        if (sourceFolder != null) {
          getterFunc = function(filename) {
            return ImageManager.loadBitmap("img/" + sourceFolder + "/", filename);
          };
        }
        return this.bitmap = getterFunc(filename);
      }

      onReady(method) {
        if (method != null) {
          return this.bitmap.addLoadListener(method);
        }
      }

      drawText() {
        return this.bitmap.drawText(...arguments);
      }

      drawTextFull(text, position = "center") {
        if (this.textSettingsPosition != null) {
          position = this.textSettingsPosition;
        }
        return this.bitmap.drawTextFull(text, position);
      }

      //?DEPRECATED
      drawTextWithSettings(text) {
        this.clear();
        this.drawTextFull(text, this.textSettingsPosition);
      }

      //? x, y, icon, size
      drawIcon() {
        return this.bitmap.drawIcon(...arguments);
      }

      moveByJson(settings) {
        var pos;
        pos = KDCore.Utils.getPositionPointFromJSON(settings);
        return this.move(pos.x, pos.y);
      }

      applyTextSettingsByJson(sprite, settings) {
        this.applyTextSettingsByExtraSettings(sprite, settings.text);
      }

      applyTextSettingsByExtraSettings(sprite, s) {
        sprite.move(s.marginX, s.marginY);
        sprite.b().fontSize = s.fontSize;
        sprite.b().textColor = KDCore.Color.FromHex(s.textColor).CSS;
        sprite.b().outlineWidth = s.outlineWidth;
        if (s.outlineColor != null) {
          sprite.b().outlineColor = KDCore.Color.FromHex(s.outlineColor).CSS;
        }
        if (s.fontFace != null) {
          sprite.b().fontFace = s.fontFace;
        }
        sprite.b().fontItalic = s.fontItalic;
        sprite.visible = s.visible;
      }

      isReady() {
        var i, j, ref;
        if (this.bitmap != null) {
          if (!this.bitmap.isReady()) {
            return false;
          }
        }
        for (i = j = 0, ref = this.children.length; (0 <= ref ? j < ref : j > ref); i = 0 <= ref ? ++j : --j) {
          if (!this.children[i].bitmap.isReady()) {
            return false;
          }
        }
        return true;
      }

      isCheckAlpha() {
        return false;
      }

      inPosition(point) {
        var e, gx, gy, pixel, result, x, y;
        result = this.isContainsPoint(point);
        if (result && this.isCheckAlpha()) {
          try {
            ({x, y} = point);
            gx = KDCore.SDK.toGlobalCoord(this, 'x');
            gy = KDCore.SDK.toGlobalCoord(this, 'y');
            pixel = this.bitmap.getAlphaPixel(x - gx, y - gy);
            result = pixel > 100;
          } catch (error) {
            e = error;
            KDCore.warning(e);
            result = true; // * ignor Alpha if error
          }
        }
        return result;
      }

      isUnderMouse() {
        return this.inPosition(TouchInput);
      }

      // * Из параметров плагина
      applyFontParam(font) {
        var b;
        if (font == null) {
          return;
        }
        b = this.b();
        if (font.size != null) {
          b.fontSize = font.size;
        }
        if (!String.isNullOrEmpty(font.face)) {
          b.fontFace = font.face;
        }
        if (font.italic != null) {
          b.fontItalic = font.italic;
        }
      }

      applyOutlineParam(outline) {
        var b;
        if (outline == null) {
          return;
        }
        b = this.b();
        if (outline.width != null) {
          b.outlineWidth = outline.width;
        }
        if (!String.isNullOrEmpty(outline.color)) {
          b.outlineColor = outline.color;
        }
      }

      activateHandlerManagment() {
        var e;
        try {
          this.handleUpAction = this.selectPreviousHandlerItem;
          this.handleDownAction = this.selectNextHandlerItem;
          return this._handleManagerActive = true;
        } catch (error) {
          e = error;
          return KDCore.warning(e);
        }
      }

      deactivateHandlerManagment() {
        var ref;
        this._handleManagerActive = false;
        this.handleUpAction = function() {}; // * EMPTY
        this.handleDownAction = function() {}; // * EMPTY
        if ((ref = $gameTemp.__pkdActiveKeyboardHandler) != null) {
          ref.pDeactivateHandler();
        }
        $gameTemp.__pkdActiveKeyboardHandler = null;
      }

      addChild(item) {
        var c, handlers;
        c = super.addChild(...arguments);
        if (item instanceof KDCore.Sprite && (item.pIsSupportKeyboardHandle != null) && item.pIsSupportKeyboardHandle()) {
          handlers = this._pGetAllHandlers();
          item.pHandledIndex = handlers.length - 1;
        }
        return c;
      }

      pIsAnyHandlerSelected() {
        return $gameTemp.__pkdActiveKeyboardHandler != null;
      }

      selectPreviousHandlerItem() {
        var e;
        try {
          if (!this.pIsAnyHandlerSelected()) {
            return this._trySelectHandler(0);
          } else {
            return this._trySelectHandler(this._selectedHandlerIndex() - 1);
          }
        } catch (error) {
          e = error;
          return KDCore.warning(e);
        }
      }

      _selectedHandlerIndex() {
        return $gameTemp.__pkdActiveKeyboardHandler.pHandledIndex;
      }

      _trySelectHandler(index) {
        var e, handlerItemToSelect;
        try {
          handlerItemToSelect = this._pGetAllHandlers().find(function(i) {
            return i.pHandledIndex === index;
          });
          if (handlerItemToSelect != null) {
            handlerItemToSelect.pActivateHandler();
          }
          return this._pOnHandled();
        } catch (error) {
          e = error;
          return KDCore.warning(e);
        }
      }

      _pGetAllHandlers() {
        return this.children.filter(function(i) {
          return i instanceof KDCore.Sprite && (i.pIsSupportKeyboardHandle != null) && i.pIsSupportKeyboardHandle();
        });
      }

      selectNextHandlerItem() {
        var e;
        try {
          if (!this.pIsAnyHandlerSelected()) {
            return this._trySelectHandler(0);
          } else {
            return this._trySelectHandler(this._selectedHandlerIndex() + 1);
          }
        } catch (error) {
          e = error;
          return KDCore.warning(e);
        }
      }

      activeItemFilterOptions() {
        return {
          distance: 15,
          outerStrength: 4
        };
      }

      pIsHandlerActive() {
        return this._handleManagerActive === true || this._handlerActive === true;
      }

      destroy() {
        if ($gameTemp.__pkdActiveKeyboardHandler === this) {
          $gameTemp.__pkdActiveKeyboardHandler = null;
        }
        return super.destroy();
      }

      _pOnHandled() {
        return Input.clear();
      }

      _pHandleKeyL() {
        var e;
        try {
          if (this.handleLeftAction != null) {
            this.handleLeftAction();
            return this._pOnHandled();
          }
        } catch (error) {
          e = error;
          return KDCore.warning(e);
        }
      }

      _pHandleKeyR() {
        var e;
        try {
          if (this.handleRightAction != null) {
            this.handleRightAction();
            return this._pOnHandled();
          }
        } catch (error) {
          e = error;
          return KDCore.warning(e);
        }
      }

      _pHandleKeyU() {
        var e;
        try {
          if (this.handleUpAction != null) {
            this.handleUpAction();
            return this._pOnHandled();
          }
        } catch (error) {
          e = error;
          return KDCore.warning(e);
        }
      }

      _pHandleKeyD() {
        var e;
        try {
          if (this.handleDownAction != null) {
            this.handleDownAction();
            return this._pOnHandled();
          }
        } catch (error) {
          e = error;
          return KDCore.warning(e);
        }
      }

      _pHandleKeyOK() {
        var e;
        try {
          if (this.handleOKAction != null) {
            this.handleOKAction();
            return this._pOnHandled();
          }
        } catch (error) {
          e = error;
          return KDCore.warning(e);
        }
      }

      pActivateHandler() {
        if (!this.pIsSupportKeyboardHandle()) {
          return;
        }
        if (($gameTemp.__pkdActiveKeyboardHandler != null) && $gameTemp.__pkdActiveKeyboardHandler !== this) {
          $gameTemp.__pkdActiveKeyboardHandler.pDeactivateHandler();
        }
        this._handlerActive = true;
        this._activateHandlerVisually();
        $gameTemp.__pkdActiveKeyboardHandler = this;
      }

      _activateHandlerVisually() {
        var e;
        try {
          //@filters = [new PIXI.filters.OutlineFilter(0.8, 0x99ff99, 0.5)]
          //@filters = [new PIXI.filters.GlowFilter(2, 0.8, 0, 0x09f9, 0.5)]
          return this.filters = [new PIXI.filters.GlowFilter(this.activeItemFilterOptions())];
        } catch (error) {
          e = error;
          return KDCore.warning(e);
        }
      }

      pDeactivateHandler() {
        if ($gameTemp.__pkdActiveKeyboardHandler === this) {
          $gameTemp.__pkdActiveKeyboardHandler = null;
        }
        this._handlerActive = false;
        this.filters = [];
      }

      _pHandleKeyboardInputs() {
        var e;
        try {
          if (Input.isTriggered('left')) {
            return this._pHandleKeyL();
          } else if (Input.isTriggered('right')) {
            return this._pHandleKeyR();
          } else if (Input.isTriggered('up')) {
            return this._pHandleKeyU();
          } else if (Input.isTriggered('down')) {
            return this._pHandleKeyD();
          } else if (Input.isTriggered('ok')) {
            return this._pHandleKeyOK();
          }
        } catch (error) {
          e = error;
          return KDCore.warning(e);
        }
      }

      static FromImg(filename, sourceFolder) {
        var s;
        s = new KDCore.Sprite();
        s.bImg(filename, sourceFolder);
        return s;
      }

      static FromBitmap(w, h) {
        var s;
        s = new KDCore.Sprite();
        s.bNew(w, h);
        return s;
      }

      static FromTextSettings(settings) {
        var s;
        s = KDCore.Sprite.FromBitmap(settings.textBoxWidth, settings.textBoxHeight);
        s.applyTextSettingsByExtraSettings(s, settings);
        s.textSettingsPosition = settings.position;
        return s;
      }

      // * Загрузчик из параметров плагина (безопасный)
      static FromParams(pluginParams) {
        var e, h, margins, s, size, w;
        try {
          size = pluginParams.size;
          ({w, h} = size);
          try {
            if (String.any(w)) {
              if (isFinite(w)) {
                w = Number(w);
              } else {
                w = eval(w);
              }
            }
          } catch (error) {
            e = error;
            KDCore.warning(e);
            w = 100;
          }
          try {
            if (String.any(h)) {
              if (isFinite(h)) {
                h = Number(h);
              } else {
                h = eval(h);
              }
            }
          } catch (error) {
            e = error;
            KDCore.warning(e);
            h = 100;
          }
          s = KDCore.Sprite.FromBitmap(w, h);
          s.textSettingsPosition = pluginParams.alignment;
          margins = pluginParams.margins;
          if (margins != null) {
            s.move(margins.x, margins.y);
          }
          s.applyFontParam(pluginParams.font);
          s.applyOutlineParam(pluginParams.outline);
          if (!String.isNullOrEmpty(pluginParams.textColor)) {
            s.b().textColor = pluginParams.textColor;
          }
          if (pluginParams.visible != null) {
            s.visible = pluginParams.visible;
          }
          return s;
        } catch (error) {
          e = error;
          console.warn('Something wrong with Text Settings!', e);
          return KDCore.Sprite.FromBitmap(60, 30);
        }
      }

    };

    return Sprite;

  }).call(this, Sprite);
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  //@[AUTO EXTEND]
  return KDCore.TimedUpdate = class TimedUpdate {
    constructor(interval, method) {
      this.interval = interval;
      this.method = method;
      this._timer = 0;
      this._once = false;
    }

    update() {
      if (this.interval == null) {
        return;
      }
      if (this._timer++ >= this.interval) {
        this.call();
        this._timer = 0;
        if (this._once === true) {
          return this.stop();
        }
      }
    }

    once() {
      return this._once = true;
    }

    onUpdate(method) {
      this.method = method;
    }

    stop() {
      return this.interval = null;
    }

    isAlive() {
      return this.interval != null;
    }

    // * Рандомизировать интервал @interval (-min, +max)
    applyTimeRange(min, max) {
      var value;
      if (!this.isAlive()) {
        return;
      }
      value = KDCore.SDK.rand(min, max);
      return this.interval += value;
    }

    call() {
      if (this.method != null) {
        return this.method();
      }
    }

  };
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  
    // * Button (Sprite_XButton)

    //@[AUTO EXTEND]
  //?DEPRECATED
  return KDCore.Button = class Button extends Sprite {
    constructor() {
      super();
      this._mouseIn = false;
      this._touching = false;
      this._slowUpdateActive = false;
      this._localMode = false;
      this._images = [];
      this._checkAlpha = false;
      this._textSprite = null;
      this._textPosition = 0;
      this._override = false; // * TouchClick in game messages not work anymore if TRUE
      this._clickHandlers = [];
      this._manualHided = false;
      this._manualDisabled = false;
      this._condition = null; // * Условие для Visible
      this._condition2 = null; // * Условие для Enable \ Disable
      this._disabled = false;
      this._infoData = null;
      this._isNeedShowText = false;
      return;
    }

    isMouseInButton() {
      return this._mouseIn === true;
    }

    isActive() {
      return this.visible === true;
    }

    activateSlowUpdate() {
      return this._slowUpdateActive = true;
    }

    setLocalMode() {
      this._realX = this.x;
      this._realY = this.y;
      return this._localMode = true;
    }

    setAlphaMode() {
      return this._checkAlpha = true;
    }

    // * above, below
    setTextPosition(position) {
      return this._textPosition = position;
    }

    setHelpText(text, size) {
      return this._createText(text, size);
    }

    setInfoData(data) {
      return this._infoData = data;
    }

    setOverrideMode() {
      return this._override = true;
    }

    isOverride() {
      return this._override === true && this.isActive() && this.touchInButton();
    }

    isDisabled() {
      return this._disabled === true;
    }

    isEnabled() {
      return !this.isDisabled();
    }

    isNeedShowText() {
      return this._isNeedShowText === true;
    }

    addClickHandler(method) {
      return this._clickHandlers.push(method);
    }

    clearClickHandlers() {
      return this._clickHandlers = [];
    }

    isLocalMode() {
      return this._localMode === true;
    }

    setCondition(method) {
      return this._condition = method;
    }

    setConditionForDisable(method) {
      return this._condition2 = method;
    }

    getInfoData() {
      return this._infoData;
    }

    simulateClick() { //?NEW
      return this.applyClickedState();
    }

    simulateClickManual() { //?NEW
      this.simulateClick();
      return setTimeout((() => {
        try {
          return this.applyNormalState();
        } catch (error) {

        }
      }), 50);
    }

    prepare() { //?NEW
      return this.slowUpdate();
    }

    realX() {
      if (this.isLocalMode()) {
        return this._realX;
      } else {
        return this.x;
      }
    }

    realY() {
      if (this.isLocalMode()) {
        return this._realY;
      } else {
        return this.y;
      }
    }

    show() {
      this.visible = true;
      return this._manualHided = false;
    }

    hide() {
      this.visible = false;
      return this._manualHided = true;
    }

    disable() {
      this._disabled = true;
      this._manualDisabled = true;
      this.refreshEnDisState();
      return this._mouseIn = false;
    }

    enable() {
      this._disabled = false;
      this._manualDisabled = false;
      return this.refreshEnDisState();
    }

    update() {
      super.update();
      if (this._destroyed === true) {
        return;
      }
      this.updateMouseClick();
      this.updatePosition();
      if (!this._slowUpdateActive) {
        this.slowUpdate();
      }
      return this.updateComplexTextVisible();
    }

    slowUpdate() {
      if (this._destroyed === true) {
        return;
      }
      this.updateMouseTracking();
      this.updateConditionForVisible();
      return this.updateConditionForEnabling();
    }

    updateMouseTracking() {
      if (!this.isActive()) {
        return;
      }
      if (this.isDisabled()) {
        return;
      }
      if (this.cursorInButton()) {
        this._onMouseEnter();
        return this._mouseIn = true;
      } else {
        this._onMouseLeave();
        return this._mouseIn = false;
      }
    }

    // * In MZ TouchInput always have X,Y
    cursorInButton() {
      return this.touchInButton();
    }

    xyInButton(x, y) {
      var bounds, inRect, localPoint;
      bounds = this.getBounds();
      inRect = bounds.contains(x, y);
      if (inRect === true && this._checkAlpha === true) {
        localPoint = this.toLocal(new PIXI.Point(x, y));
        return this._checkAlphaPixel(localPoint.x, localPoint.y);
      } else {
        return inRect;
      }
    }

    _realWidth() {
      if (this._hasImage()) {
        return this._mainImage().width;
      } else {
        return this.width;
      }
    }

    _hasImage() {
      return this._mainImage() != null;
    }

    _mainImage() {
      return this._images[0];
    }

    _realHeight() {
      if (this._hasImage()) {
        return this._mainImage().height;
      } else {
        return this.height;
      }
    }

    _checkAlphaPixel(x, y) {
      var pixel;
      pixel = this._hasImage() ? this._mainImage().bitmap.getAlphaPixel(x, y) : this.bitmap.getAlphaPixel(x, y);
      return pixel >= 200;
    }

    _onMouseEnter() {
      if (this._mouseIn === true) {
        return;
      }
      if (!this.isDisabled()) {
        this.applyCoverState();
      }
      this._showText();
      if (this.getInfoData() != null) {
        return this._startComplexTimer();
      }
    }

    _onMouseLeave() {
      if (this._mouseIn === false) {
        return;
      }
      if (!this.isDisabled()) {
        this.applyNormalState();
      }
      this._hideText();
      return this._stopComplexTimer();
    }

    _showText() {
      if (this._textSprite == null) {
        return;
      }
      this._updateTextPosition();
      return this._textSprite.visible = true;
    }

    _hideText() {
      if (this._textSprite == null) {
        return;
      }
      return this._textSprite.visible = false;
    }

    _startComplexTimer() {
      this._stopComplexTimer();
      return this._cTimer = setTimeout((() => {
        if (this._mouseIn === true) {
          return this._isNeedShowText = true;
        }
      }), 1000);
    }

    _stopComplexTimer() {
      if (this._cTimer != null) {
        clearTimeout(this._cTimer);
      }
      return this._isNeedShowText = false;
    }

    updateMouseClick() {
      if (!this.isActive()) {
        this._unTouch();
        return;
      }
      if (this.isDisabled()) {
        return;
      }
      if (TouchInput.isTriggered() && this.touchInButton()) {
        this._touching = true;
        this.applyClickedState();
      }
      if (this._touching === true) {
        if (TouchInput.isReleased() || !this.touchInButton()) {
          this._unTouch();
          if (TouchInput.isReleased()) {
            return this.callClickHandler();
          }
        }
      }
    }

    _unTouch() {
      this._touching = false;
      if (this.touchInButton()) {
        return this.applyCoverState();
      } else {
        return this.applyNormalState();
      }
    }

    touchInButton() {
      return this.xyInButton(TouchInput.x, TouchInput.y);
    }

    callClickHandler() {
      if (this._clickHandlers.length > 0) {
        return this._clickHandlers.forEach(function(method) {
          return method();
        });
      }
    }

    updatePosition() {
      var p;
      if (!this._localMode) {
        return;
      }
      p = new KDCore.Point(this._realX, this._realY);
      return this.move(p.screenX(), p.screenY());
    }

    updateConditionForVisible() {
      var result;
      if (this._condition == null) {
        return;
      }
      if (this._manualHided === true) {
        return;
      }
      try {
        result = this._condition();
        return this.visible = !result;
      } catch (error) {
        console.warn('wrong condition in button');
        return this.visible = true;
      }
    }

    updateConditionForEnabling() {
      if (!this._condition2) {
        return;
      }
      if (this._manualDisabled === true) {
        return;
      }
      try {
        this._disabled = this._condition2();
        return this.refreshEnDisState();
      } catch (error) {
        console.warn('wrong condition in button for enable state');
        return this.disable();
      }
    }

    setButtonImages(img1, img2, img3, img4) {
      if (this._images != null) {
        this._images.forEach(function(img) {
          if (img != null) {
            return img.parent.removeChild(img);
          }
        });
      }
      this._images = [new Sprite(img1), img2 != null ? new Sprite(img2) : void 0, img3 != null ? new Sprite(img3) : void 0, img4 != null ? new Sprite(img4) : void 0];
      this._images.forEach((img) => {
        if (img != null) {
          return this.addChild(img);
        }
      });
      return this.applyNormalState();
    }

    applyNormalState() {
      var ref;
      this.refreshImages();
      return (ref = this._images[0]) != null ? ref.visible = true : void 0;
    }

    refreshImages() {
      return this._images.forEach(function(img) {
        return img != null ? img.visible = false : void 0;
      });
    }

    applyCoverState() {
      this.refreshImages();
      if (this._images[1] != null) {
        return this._images[1].visible = true;
      } else {
        return this.applyNormalState();
      }
    }

    applyClickedState() {
      this.refreshImages();
      if (this._images[2] != null) {
        return this._images[2].visible = true;
      } else {
        return this.applyNormalState();
      }
    }

    _createText(text, size) {
      var h, w;
      if (this._textSprite) {
        this.removeChild(this._textSprite);
      }
      w = Math.round(((size / 10) + 1) * 5 * text.length);
      h = size + 4;
      this._textSprite = new Sprite(new Bitmap(w, h));
      this._textSprite.bitmap.fontSize = size;
      this._textSprite.bitmap.drawText(text, 0, h / 2, w, 1, 'center');
      this._textSprite.visible = false;
      return this.addChild(this._textSprite);
    }

    _updateTextPosition() {
      var nx, ny;
      if (!this._textSprite) {
        return;
      }
      nx = this._realWidth() / 2 - this._textSprite.width / 2;
      if (this._textPosition === 0) {
        ny = -this._textSprite.height;
      } else {
        ny = this._realHeight() + this._textSprite.height / 2;
      }
      return this._textSprite.move(nx, ny);
    }

    applyDisableState() {
      var ref;
      this.refreshImages();
      return (ref = this._images[3]) != null ? ref.visible = true : void 0;
    }

    refreshEnDisState() {
      if (this.isDisabled()) {
        this.applyDisableState();
        return this._hideText();
      } else {
        if (this._mouseIn === false) {
          return this.applyNormalState();
        }
      }
    }

    //else
    //    do @applyCoverState
    updateComplexTextVisible() {}

    applyScale(mod) {
      var i, img, len, ref;
      ref = this._images;
      for (i = 0, len = ref.length; i < len; i++) {
        img = ref[i];
        if (img != null) {
          img.scale.x = mod;
          img.scale.y = mod;
        }
      }
    }

    static FromSet(imgName, sourceFolder = null) {
      var button, getterFunc, img0, img1;
      getterFunc = function(filename) {
        return ImageManager.loadPicture(filename);
      };
      if (sourceFolder != null) {
        getterFunc = function(filename) {
          return ImageManager.loadBitmap("img/" + sourceFolder + "/", filename);
        };
      }
      img0 = getterFunc(imgName + "_00");
      img1 = getterFunc(imgName + "_01");
      button = new KDCore.Button();
      button.setButtonImages(img0, img1, img0, img0);
      return button;
    }

    static FromSetFull(imgName, sourceFolder = null) {
      var button, getterFunc, img0, img1, img2, img3;
      getterFunc = function(filename) {
        return ImageManager.loadPicture(filename);
      };
      if (sourceFolder != null) {
        getterFunc = function(filename) {
          return ImageManager.loadBitmap("img/" + sourceFolder + "/", filename);
        };
      }
      img0 = getterFunc(imgName + "_00");
      img1 = getterFunc(imgName + "_01");
      img2 = getterFunc(imgName + "_02");
      img3 = getterFunc(imgName + "_03");
      button = new KDCore.Button();
      button.setButtonImages(img0, img1, img2, img3);
      return button;
    }

  };
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  var Sprite_ButtonsGroup;
  // * Класс для реализации набора кнопок переключателей (Tabs)
  // * Когда только одна кнопка может быть нажата (выбрана)

    //rev 07.10.21
  Sprite_ButtonsGroup = class Sprite_ButtonsGroup extends KDCore.Sprite {
    // buttonsArray = [
    //       {image: NAME, position: [X,Y]}, ...
    //    ]
    constructor(buttonsArray, activeIndex, clickCallback) {
      var button, i, len;
      super();
      this.clickCallback = clickCallback;
      this._buttons = [];
      for (i = 0, len = buttonsArray.length; i < len; i++) {
        button = buttonsArray[i];
        this._createButton(button);
      }
      this._onButtonClick(activeIndex);
      return;
    }

    getSelectedIndex() {
      return this._buttons.findIndex(function(btn) {
        return !btn.isEnabled();
      });
    }

  };
  (function() {    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ PRIVATE
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var _;
    //@[DEFINES]
    _ = Sprite_ButtonsGroup.prototype;
    _._createButton = function({image, position}) {
      var btn, index, method;
      // * Так как кнопки работают как переключатели, то 03 должен быть всегда
      index = this._buttons.length;
      btn = new KDCore.ButtonM(image, true, "Alpha");
      btn.move(position);
      method = () => {
        return this._onButtonClick(index);
      };
      btn.addClickHandler(method);
      this._buttons.push(btn);
      this.add(btn);
    };
    _._onButtonClick = function(index = 0) {
      var ref;
      this._resetAllButtons();
      if ((ref = this._buttons[index]) != null) {
        ref.disable(); // * Нажата
      }
      if (this.clickCallback != null) {
        this.clickCallback(index);
      }
    };
    _._resetAllButtons = function() {
      var btn, i, len, ref;
      ref = this._buttons;
      for (i = 0, len = ref.length; i < len; i++) {
        btn = ref[i];
        if (btn != null) {
          btn.enable();
        }
      }
    };
  })();
  // ■ END PRIVATE
  //---------------------------------------------------------------------------
  return KDCore.Sprite_ButtonsGroup = Sprite_ButtonsGroup;
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  var Sprite_ButtonsGroupHandler;
  // * Класс для реализации набора кнопок переключателей (Tabs)
  // * Когда только одна кнопка может быть нажата (выбрана)
  // * В отличии от Sprite_ButtonsGroup, принимает массив
  // * уже созданных кнопок

    //rev 10.07.22
  Sprite_ButtonsGroupHandler = class Sprite_ButtonsGroupHandler extends KDCore.Sprite {
    // _buttons = [Button object with enable, disable, isEnable, addClickHandler methods]
    constructor(_buttons, clickCallback, activeIndex = 0) {
      var button, i, index, len, ref;
      super();
      this._buttons = _buttons;
      this.clickCallback = clickCallback;
      ref = this._buttons;
      for (index = i = 0, len = ref.length; i < len; index = ++i) {
        button = ref[index];
        this._processButton(button, index);
      }
      this._onButtonClick(activeIndex);
      return;
    }

    getSelectedIndex() {
      return this._buttons.findIndex(function(btn) {
        return !btn.isEnabled();
      });
    }

  };
  (function() {    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ PRIVATE
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var _;
    //@[DEFINES]
    _ = Sprite_ButtonsGroupHandler.prototype;
    _._processButton = function(btn, index) {
      var method;
      // * Так как кнопки работают как переключатели, то 03 должен быть всегда
      method = () => {
        return this._onButtonClick(index);
      };
      btn.addClickHandler(method);
      this.add(btn);
    };
    _._onButtonClick = function(index = 0) {
      var ref;
      this._resetAllButtons();
      if ((ref = this._buttons[index]) != null) {
        ref.disable(); // * Нажата
      }
      if (this.clickCallback != null) {
        this.clickCallback(index);
      }
    };
    _._resetAllButtons = function() {
      var btn, i, len, ref;
      ref = this._buttons;
      for (i = 0, len = ref.length; i < len; i++) {
        btn = ref[i];
        if (btn != null) {
          btn.enable();
        }
      }
    };
  })();
  // ■ END PRIVATE
  //---------------------------------------------------------------------------
  return KDCore.Sprite_ButtonsGroupHandler = Sprite_ButtonsGroupHandler;
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  var Sprite_ItemsList;
  // * Класс который позволяет сделать список (на основе Window_Selectable), но из Sprite элементов, а не Draw на Bitmap

    //rev 08.02.24

    //TODO: Dynamic items height, controls handlers support
  Sprite_ItemsList = class Sprite_ItemsList extends Window_Selectable {
    constructor(r) {
      if (KDCore.isMV()) {
        super(r.x, r.y, r.width, r.height);
      } else {
        super(r);
      }
      this._prevSelectedIndex = -1;
      this._createItemsContainer();
      this._createWindowContentMask();
      this._setupBackgroundType();
      return;
    }

    activate(index) {
      var e;
      try {
        this.refresh();
        if (index != null) {
          this.safeSelect(index);
        }
      } catch (error) {
        e = error;
        KDCore.warning(e);
      }
      return super.activate();
    }

    maxItems() {
      return this.getAllItems().length;
    }

    getAllItems() {
      return this.itemsSet || [];
    }

    setItems(itemsSet, singleItemHeight = null) {
      this.itemsSet = itemsSet;
      this.singleItemHeight = singleItemHeight;
      this._clearPreviousItems();
      if (this.singleItemHeight == null) {
        this._adjustAutoItemsHeight(this.itemsSet[0]);
      }
      this.refresh();
      this._drawNewItems();
    }

    itemAt(index) {
      return this.getAllItems()[index];
    }

    isNeedScaleItemsW() {
      return false;
    }

    isNeedScaleItemsH() {
      return false;
    }

    lineHeight() {
      return this.singleItemHeight || 36;
    }

    isDrawWindowDefaultItemsBack() {
      return false;
    }

    //$[OVER]
    _updateCursor() {
      return this._cursorSprite.visible = false;
    }

    update() {
      super.update();
      this._itemsContainer.y = -this._scrollY;
      return this._updateItemsSelectionState();
    }

  };
  (function() {    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ PRIVATE
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var _;
    //@[DEFINES]
    _ = Sprite_ItemsList.prototype;
    _._createItemsContainer = function() {
      if (!this.isDrawWindowDefaultItemsBack()) {
        this._contentsBackSprite.visible = false;
      }
      this._windowItemsContentLayer = new Sprite();
      this._windowItemsContentLayer.move(this._padding, this._padding);
      this.addChild(this._windowItemsContentLayer);
      this._itemsContainer = new KDCore.Sprite();
      this._windowItemsContentLayer.addChild(this._itemsContainer);
      this.addChild(this._downArrowSprite);
      return this.addChild(this._upArrowSprite);
    };
    _._setupBackgroundType = function() {
      return this.setBackgroundType(2);
    };
    _._createWindowContentMask = function() {
      var e, m, maskBitmap;
      try {
        maskBitmap = new Bitmap(this.width - this._padding * 2, this.height - this._padding * 2);
        maskBitmap.fillAll("#FFF");
        m = new Sprite(maskBitmap);
        this._windowItemsContentLayer.mask = m;
        return this._windowItemsContentLayer.addChild(m);
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    };
    _._adjustAutoItemsHeight = function(item) {
      var e;
      try {
        if (item == null) {
          this.singleItemHeight = 36;
          return;
        }
        if (item.realHeight != null) {
          this.singleItemHeight = item.realHeight();
        } else {
          if (item.height > 0) {
            this.singleItemHeight = item.height;
          }
        }
        if (this.singleItemHeight === 0 || !this.singleItemHeight) {
          return this.singleItemHeight = 36;
        }
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    };
    _._clearPreviousItems = function() {
      var c, e, i, j, len, len1, ref, results, toRemove;
      try {
        toRemove = [];
        ref = this._itemsContainer.children;
        for (i = 0, len = ref.length; i < len; i++) {
          c = ref[i];
          toRemove.push(c);
        }
        results = [];
        for (j = 0, len1 = toRemove.length; j < len1; j++) {
          c = toRemove[j];
          results.push(c.removeFromParent());
        }
        return results;
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    };
    _._drawNewItems = function() {
      var e, i, index, item, len, ref, results;
      try {
        ref = this.getAllItems();
        results = [];
        for (index = i = 0, len = ref.length; i < len; index = ++i) {
          item = ref[index];
          results.push(this._addNewItemToList(item, index));
        }
        return results;
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    };
    _._addNewItemToList = function(item, index) {
      var e, rect;
      try {
        if (item == null) {
          return;
        }
        rect = this.itemRect(index);
        item.x = rect.x;
        item.y = rect.y;
        this._adjustItemWidthAndHeight(item);
        return this._itemsContainer.addChild(item);
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    };
    _._adjustItemWidthAndHeight = function(item) {
      var e, scaleFactor;
      try {
        if (item == null) {
          return;
        }
        if (this.isNeedScaleItemsW()) {
          scaleFactor = this._defaultItemWidth() / this._getItemWidth(item);
          item.scale.x = scaleFactor;
        }
        if (this.isNeedScaleItemsH()) {
          scaleFactor = this.lineHeight() / this._getItemHeight(item);
          return item.scale.y = scaleFactor;
        }
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    };
    _._getItemWidth = function(item) {
      var e, v;
      v = this._defaultItemWidth();
      try {
        if (item == null) {
          return v;
        }
        if (item.realWidth != null) {
          v = item.realWidth();
        } else {
          if (item.width > 0) {
            v = item.width;
          }
        }
        if (v === 0 || !v) {
          v = this._defaultItemWidth();
        }
      } catch (error) {
        e = error;
        KDCore.warning(e);
      }
      return v;
    };
    _._defaultItemWidth = function() {
      return this.width - this._padding * 2;
    };
    _._getItemHeight = function(item) {
      var e, v;
      v = 36;
      try {
        if (item == null) {
          return v;
        }
        if (item.realHeight != null) {
          v = item.realHeight();
        } else {
          if (item.height > 0) {
            v = item.height;
          }
        }
        if (v === 0 || !v) {
          v = 36;
        }
      } catch (error) {
        e = error;
        KDCore.warning(e);
      }
      return v;
    };
    _._updateItemsSelectionState = function() {
      var e;
      try {
        if (!this.active || this.index() < 0 || !this.cursorVisible) {
          this._disableSelectionForAll();
          return;
        }
        return this._selectItemAtIndex(this.index());
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    };
    _._disableSelectionForAll = function() {
      var e, i, item, len, ref, results;
      try {
        this._prevSelectedIndex = -1;
        ref = this.getAllItems();
        results = [];
        for (i = 0, len = ref.length; i < len; i++) {
          item = ref[i];
          results.push(this._deselectItem(item));
        }
        return results;
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    };
    _._selectItem = function(item) {
      var e;
      try {
        if (item == null) {
          return;
        }
        if ((this._prevSelectedIndex != null) && this._prevSelectedIndex >= 0) {
          this._deselectItem(this.itemAt(this._prevSelectedIndex));
        }
        if (item.activateInList != null) {
          return item.activateInList();
        } else {
          return this._selectItemVisually(item);
        }
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    };
    _._selectItemVisually = function(item) {
      var e;
      try {
        if (item == null) {
          return;
        }
        return item.filters = [
          new PIXI.filters.GlowFilter({
            distance: 15,
            outerStrength: 4
          })
        ];
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    };
    _._deselectItem = function(item) {
      var e;
      try {
        if (item == null) {
          return;
        }
        if (item.deactivateInList != null) {
          return item.deactivateInList();
        } else {
          return this._deselectItemVisually(item);
        }
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    };
    _._deselectItemVisually = function(item) {
      var e;
      try {
        if (item == null) {
          return;
        }
        return item.filters = [];
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    };
    _._selectItemAtIndex = function(index) {
      var e, item;
      try {
        if (this._prevSelectedIndex !== index) {
          item = this.itemAt(index);
          if (item == null) {
            return;
          }
          this._selectItem(item);
          return this._prevSelectedIndex = index;
        }
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    };
  })();
  // ■ END PRIVATE
  //---------------------------------------------------------------------------
  return KDCore.Sprite_ItemsList = Sprite_ItemsList;
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad((function() {
  var Sprite_TilingFrame;
  Sprite_TilingFrame = class Sprite_TilingFrame extends KDCore.Sprite {
    constructor(width, height, skinBitmap) {
      super();
      this.width = width;
      this.height = height;
      this.skinBitmap = skinBitmap;
      this._createParts();
      this._refreshAll();
    }

    _createParts() {
      var i, j;
      this.backSprite = new Sprite();
      this.addChild(this.backSprite);
      this.content = new Sprite();
      this.addChild(this.content);
      this._outFrame = new Sprite();
      for (i = j = 0; j < 8; i = ++j) {
        this._outFrame.addChild(new Sprite());
      }
      return this.addChild(this._outFrame);
    }

    // * Отступ, чтобы за рамку не выходить
    _fillPadding() {
      return 2;
    }

    // * Размер частей на картинке
    _fillImagePartWidth() {
      return 96;
    }

    _fillImagePartHeight() {
      return 96;
    }

    // * Толщина рамки
    _frameThickness() {
      return 12;
    }

    _refreshAll() {
      this._refreshBack();
      return this._refreshTFrame();
    }

    _refreshBack() {
      var fh, fw, h, m, sprite, w;
      m = this._fillPadding();
      w = Math.max(0, this.width - m * 2);
      h = Math.max(0, this.height - m * 2);
      sprite = this.backSprite;
      sprite.bitmap = this.skinBitmap;
      // * Координаты фона из картинки
      fw = this._fillImagePartWidth();
      fh = this._fillImagePartHeight();
      sprite.setFrame(0, 0, fw, fh);
      sprite.move(m, m);
      sprite.scale.x = w / fw;
      return sprite.scale.y = h / fh;
    }

    _refreshTFrame() {
      var drect, fh, fw, j, len, m, ref, spr, srect;
      fw = this._fillImagePartWidth();
      fh = this._fillImagePartHeight();
      // * Положение назначения
      drect = {
        x: 0,
        y: 0,
        width: this.width,
        height: this.height
      };
      // * Координаты рамки на картинке
      srect = {
        x: fw,
        y: 0,
        width: fw,
        height: fh
      };
      m = this._frameThickness(); // * Толщина
      ref = this._outFrame.children;
      for (j = 0, len = ref.length; j < len; j++) {
        spr = ref[j];
        spr.bitmap = this.skinBitmap;
      }
      if (KDCore.isMZ()) {
        Window.prototype._setRectPartsGeometry.call(this, this._outFrame, srect, drect, m);
      } else {
        this._setRectPartsGeometry(this._outFrame, srect, drect, m);
      }
    }

    // * Этот метод существует в MZ, но нет в MV
    //? From MZ
    _setRectPartsGeometry(sprite, srect, drect, m) {
      var child, children, dh, dmh, dmw, dw, dx, dy, j, len, sh, smh, smw, sw, sx, sy;
      sx = srect.x;
      sy = srect.y;
      sw = srect.width;
      sh = srect.height;
      dx = drect.x;
      dy = drect.y;
      dw = drect.width;
      dh = drect.height;
      smw = sw - m * 2;
      smh = sh - m * 2;
      dmw = dw - m * 2;
      dmh = dh - m * 2;
      children = sprite.children;
      sprite.setFrame(0, 0, dw, dh);
      sprite.move(dx, dy);
      // corner
      children[0].setFrame(sx, sy, m, m);
      children[1].setFrame(sx + sw - m, sy, m, m);
      children[2].setFrame(sx, sy + sw - m, m, m);
      children[3].setFrame(sx + sw - m, sy + sw - m, m, m);
      children[0].move(0, 0);
      children[1].move(dw - m, 0);
      children[2].move(0, dh - m);
      children[3].move(dw - m, dh - m);
      // edge
      children[4].move(m, 0);
      children[5].move(m, dh - m);
      children[6].move(0, m);
      children[7].move(dw - m, m);
      children[4].setFrame(sx + m, sy, smw, m);
      children[5].setFrame(sx + m, sy + sw - m, smw, m);
      children[6].setFrame(sx, sy + m, m, smh);
      children[7].setFrame(sx + sw - m, sy + m, m, smh);
      children[4].scale.x = dmw / smw;
      children[5].scale.x = dmw / smw;
      children[6].scale.y = dmh / smh;
      children[7].scale.y = dmh / smh;
      // center
      if (children[8] != null) {
        children[8].setFrame(sx + m, sy + m, smw, smh);
        children[8].move(m, m);
        children[8].scale.x = dmw / smw;
        children[8].scale.y = dmh / smh;
      }
      for (j = 0, len = children.length; j < len; j++) {
        child = children[j];
        child.visible = dw > 0 && dh > 0;
      }
    }

  };
  return KDCore.Sprite_TilingFrame = Sprite_TilingFrame;
}));


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  var Window_ExtTextLineBase;
  // * Данное окно используется как основа для Sprite_UITextExt
  //rev 07.10.21
  Window_ExtTextLineBase = class Window_ExtTextLineBase extends Window_Base {
    constructor(rect, fontSettings) {
      super(rect);
      this.fontSettings = fontSettings;
      this.createContents();
      // * Всегда прозрачное окно
      this.setBackgroundType(2);
    }

    // * Нет отступов
    updatePadding() {
      return this.padding = 0;
    }

    // * Нет отступов
    itemPadding() {
      return 0;
    }

    textPadding() {
      return 0;
    }

    standardPadding() {
      return 0;
    }

    contentsWidth() {
      return this.width;
    }

    contentsHeight() {
      return this.height;
    }

    // * Более гибкая настройка размера текста при { }
    makeFontBigger() {
      return this.contents.fontSize += 1;
    }

    makeFontSmaller() {
      if (this.contents.fontSize > 1) {
        return this.contents.fontSize -= 1;
      }
    }

    // * Применение своих шрифта и размера текста
    resetFontSettings() {
      super.resetFontSettings();
      if (this.fontSettings == null) {
        return;
      }
      if (String.any(this.fontSettings.face)) {
        this.contents.fontFace = this.fontSettings.face;
      }
      if (this.fontSettings.size > 0) {
        this.contents.fontSize = this.fontSettings.size;
      }
      if (this.fontSettings.italic != null) {
        this.contents.fontItalic = this.fontSettings.italic;
      }
    }

  };
  return KDCore.Window_ExtTextLineBase = Window_ExtTextLineBase;
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  // * Button M
  //------------------------------------------------------------------------------
  //@[AUTO EXTEND]
  // * Button Mini - упрощённый класс Sprite_XButton (KDCore.Button)

    // * Принимает название файла изображения кнопки без _00
  // * Названия изображения должны быть в стандартном формате _00, _01, [_03]
  // * _02 - не используются в этом классе

    // * Класс использует глобальную временную переменную для определения находится ли мышь в зоне кнопки

    //TODO: ADD ALPHA CHECK!

    // * Если isFull - true, значит нужен _03
  KDCore.ButtonM = class ButtonM extends KDCore.Sprite {
    constructor(filename, isFull = false, sourceFolder = null) {
      super();
      this._bitmaps = [];
      this._disabled = false;
      this._isTriggered = false;
      // * Когда произошло нажатие на кнопку
      this._handler = null;
      this._isCanBeClicked = true;
      this._isManualHoverMode = false;
      this._isManualSelected = false;
      this._loadBitmaps(filename, isFull, sourceFolder);
      this._setImageState(0);
      this._createThread();
    }

    setManualHover() {
      return this._isManualHoverMode = true;
    }

    disableManualHover() {
      return this._isManualHoverMode = false;
    }

    setManualSelected(_isManualSelected) {
      this._isManualSelected = _isManualSelected;
    }

    enableClick() {
      return this._isCanBeClicked = true;
    }

    disableClick() {
      return this._isCanBeClicked = false;
    }

    desaturate() {
      this.filters = [new PIXI.filters.ColorMatrixFilter()];
      this.filters[0].desaturate();
    }

    isMouseIn() {
      if (this._isManualHoverMode === true) {
        return this._isManualSelected;
      } else {
        return this.isUnderMouse() && this.visible === true;
      }
    }

    isActive() {
      if (this._isCanBeClicked === false) {
        return false;
      }
      if (this.parent != null) {
        return this.parent.visible === true && this.visible === true;
      } else {
        return this.visible === true;
      }
    }

    isDisabled() {
      return this._disabled === true;
    }

    addClickHandler(_handler) {
      this._handler = _handler;
    }

    clearClickHandler() {
      return this._handler = null;
    }

    // * Воспроизводит визуальный эффект нажатия
    simulateClick() {
      if (!this.isActive()) {
        return;
      }
      if (this.isDisabled()) {
        return;
      }
      if (this.isMouseIn()) {
        return;
      }
      this._startSimulation();
    }

    isEnabled() {
      return !this.isDisabled();
    }

    refreshState(isEnable = true) {
      if (isEnable === true) {
        if (this.isDisabled()) {
          this.enable();
        }
      } else {
        if (this.isEnabled()) {
          this.disable();
        }
      }
    }

    disable() {
      this._disabled = true;
      return this._setImageState(2);
    }

    enable() {
      this._disabled = false;
      return this._setImageState(0);
    }

    click() {
      if (this._handler != null) {
        return this._handler();
      }
    }

    update() {
      super.update();
      return this._updateMain();
    }

  };
  return (function() {    
    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ ButtonM Implementation
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var _, alias_SM_isAnyButtonPressed, alias_SM_onMapLoaded;
    //@[DEFINES]
    _ = KDCore.ButtonM.prototype;
    _._loadBitmaps = function(filename, isFull = false, sourceFolder = null) {
      var getterFunc;
      getterFunc = this._getGetter(sourceFolder);
      this._bitmaps.push(getterFunc(filename + '_00'));
      this._bitmaps.push(getterFunc(filename + '_01'));
      if (isFull) {
        this._bitmaps.push(getterFunc(filename + '_03'));
      }
    };
    _._getGetter = function(sourceFolder = null) {
      var getterFunc;
      getterFunc = function(filename) {
        return ImageManager.loadPicture(filename);
      };
      if (sourceFolder !== null) {
        getterFunc = function(filename) {
          return ImageManager.loadBitmap('img/' + sourceFolder + '/', filename);
        };
      }
      return getterFunc;
    };
    _._setImageState = function(index = 0) {
      if (this._bitmaps[index] == null) {
        index = 0;
      }
      this.bitmap = this._bitmaps[index];
      this._lastState = index;
    };
    _._createThread = function() {
      this.hoverThread = new KDCore.TimedUpdate(3, this._updateHover.bind(this));
      this.hoverThread.applyTimeRange(-1, 1);
      this.hoverThread.call();
    };
    //?[DYNAMIC]
    _._updateMain = function() {
      this._updateMouseLogic();
      if (!this.isActive()) {
        if (($gameTemp.kdButtonUnderMouse != null) && $gameTemp.kdButtonUnderMouse === this) {
          return $gameTemp.kdButtonUnderMouse = null;
        }
      }
    };
    _._updateMouseLogic = function() {
      this.hoverThread.update();
      return this._updateMouseClick();
    };
    _._updateHover = function() {
      if (!this.isActive()) {
        return;
      }
      // * чтобы эффект нажатия не прекратить
      if (this._isTriggered === true) {
        return;
      }
      if (this.isMouseIn()) {
        if (this._lastState !== 1) {
          if (!this.isDisabled()) {
            this._setImageState(1);
          }
          $gameTemp.kdButtonUnderMouse = this;
        }
      } else {
        if (this._lastState !== 0) {
          if (!this.isDisabled()) {
            this._setImageState(0);
          }
          if ($gameTemp.kdButtonUnderMouse === this) {
            $gameTemp.kdButtonUnderMouse = null;
          }
        } else if ($gameTemp.kdButtonUnderMouse === this) {
          $gameTemp.kdButtonUnderMouse = null;
        }
      }
    };
    _._updateMouseClick = function() {
      if (!this.isActive()) {
        return;
      }
      if (this.isDisabled()) {
        return;
      }
      if (TouchInput.isTriggered() && this.isUnderMouse()) {
        this._isTriggered = true;
        this._setImageState(0);
      }
      if (this._isTriggered === true) {
        if (TouchInput.isReleased()) {
          this._isTriggered = false;
          if (this.isMouseIn()) {
            this.click();
          }
        }
      }
    };
    _._startSimulation = function() {
      this._setImageState(1);
      this._simulateThread = new KDCore.TimedUpdate(10, () => {
        return this._setImageState(0);
      });
      this._simulateThread.once();
      return this._updateMain = this._updateMouseClickSimulated;
    };
    _._updateMouseClickSimulated = function() {
      this._simulateThread.update();
      if (!this._simulateThread.isAlive()) {
        this._simulateThread = null;
        this._updateMain = this._updateMouseLogic;
      }
    };
    // * Теперь при нажатии на любую кнопку, игрок не будет ходить по карте

    //@[ALIAS]
    alias_SM_isAnyButtonPressed = Scene_Map.prototype.isAnyButtonPressed;
    Scene_Map.prototype.isAnyButtonPressed = function() {
      if ($gameTemp.kdButtonUnderMouse != null) {
        return true;
      } else {
        return alias_SM_isAnyButtonPressed.call(this);
      }
    };
    //TODO: Добавить доп. проверку?
    //@[ALIAS]
    alias_SM_onMapLoaded = Scene_Map.prototype.onMapLoaded;
    Scene_Map.prototype.onMapLoaded = function() {
      $gameTemp.kdButtonUnderMouse = null;
      setTimeout((function() {
        return $gameTemp.kdButtonUnderMouse = null;
      }), 50);
      return alias_SM_onMapLoaded.call(this);
    };
  })();
});

// ■ END ButtonM Implementation
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  // * Button Mini User - класс с определением файла каждого состояния отдельно
  // * Принимает теже аргументы, только заместо имени файла, три изображения (имени)
  // ? states = { main, hover, disabled }
  return KDCore.ButtonMU = class ButtonMU extends KDCore.ButtonM {
    constructor() {
      super(...arguments);
    }

    //$[OVER]
    _loadBitmaps(states, isFull = true, sourceFolder = null) {
      var getterFunc;
      getterFunc = this._getGetter(sourceFolder);
      this._bitmaps.push(getterFunc(states.main));
      this._bitmaps.push(getterFunc(states.hover));
      // * Optional 03
      if (String.any(states.disabled)) {
        this._bitmaps.push(getterFunc(states.disabled));
      }
    }

  };
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  var Sprite_TilingLine;
  Sprite_TilingLine = class Sprite_TilingLine extends KDCore.Sprite_TilingFrame {
    constructor() {
      super(...arguments);
    }

    //$[OVER BASE ALL BELOW]
    _fillPadding() {
      return 0;
    }

    _refreshTFrame() {} // * EMPTY

    _fillImagePartWidth() {
      return 4;
    }

    _fillImagePartHeight() {
      return 26;
    }

  };
  return KDCore.Sprite_TilingLine = Sprite_TilingLine;
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  // * Пространство имён для всех UIElements
  KDCore.UI = KDCore.UI || {};
  (function() {    // * Общий класс для всех UI элементов
    //?rev 07.02.2024
    var Sprite_UIElement;
    Sprite_UIElement = (function() {
      // * ABSTRACT значит что класс сам по себе ничего не создаёт, не хранит данные
      //@[ABSTRACT]
      class Sprite_UIElement extends KDCore.Sprite {
        constructor(params) {
          super();
          this.params = params;
          this._init();
        }

        // * Стандартный набор настроек
        defaultParams() {
          return {
            visible: true
          };
        }

        // * Общий метод (есть у всех элементов)
        // * По умолчанию вызывает drawText, но потомки могут переопределить
        draw() {
          return this.drawText(...arguments);
        }

        // * Общий метод
        drawText() {} // * EMPTY

        
          // * Если изначально невидимый (из параметров), то не активный вообще
        isActive() {
          return this.params.visible === true;
        }

        rootImageFolder() {
          if (String.any(this.params.rootImageFolder)) {
            return this.params.rootImageFolder;
          } else {
            return Sprite_UIElement.RootImageFolder;
          }
        }

        // * Сделать чёрно белым
        desaturate() {
          this.filters = [new PIXI.filters.ColorMatrixFilter()];
          this.filters[0].desaturate();
        }

        clearFilters() {
          return this.filters = [];
        }

        // * Общий метод (можно ли редактировать визуально)
        isCanBeEdited() {
          return false;
        }

        // * Общий метод (надо ли скрывать при игровом сообщнии)
        isHaveHideWithMessageFlag() {
          return false;
        }

        // * Общий метод (находится ли объект под мышкой)
        isUnderMouse() {
          var ref;
          return ((ref = this.zeroChild()) != null ? ref.isUnderMouse() : void 0) && this.isFullVisible();
        }

        // * Полностью ли виден объект? (включае всех его родителей)
        isFullVisible() {
          return this.visible === true && this.allParentsIsVisible();
        }

        // * Все ли родители объекта видимы
        allParentsIsVisible() {
          var e, p;
          if (!this.visible) {
            return false;
          }
          try {
            if (this.parent != null) {
              p = this.parent;
              while (p != null) {
                if (p.visible === true) {
                  p = p.parent;
                } else {
                  return false;
                }
              }
              return true;
            } else {
              return this.visible === true;
            }
          } catch (error) {
            e = error;
            KDCore.warning(e);
            return true;
          }
        }

        // * Параметры первого элемента (если он есть)
        realWidth() {
          var child;
          child = this.zeroChild();
          if (child != null) {
            if (child instanceof KDCore.UI.Sprite_UIElement) {
              return child.realWidth();
            } else {
              return child.width;
            }
          }
          return 0;
        }

        realHeight() {
          var child;
          child = this.zeroChild();
          if (child != null) {
            if (child instanceof KDCore.UI.Sprite_UIElement) {
              return child.realHeight();
            } else {
              return child.height;
            }
          }
          return 0;
        }

        // * Первый "физический" элемент (спрайт)
        zeroChild() {
          return this.children[0];
        }

        // * Метод восстановления значения на стандартные настройки
        reset(property) {
          var e;
          try {
            switch (property) {
              case "position":
                this._resetPosition();
                break;
              default:
                this[property] = this.params[property];
            }
          } catch (error) {
            e = error;
            KDCore.warning(e);
          }
        }

      };

      // * Корневая директория для изображений
      Sprite_UIElement.RootImageFolder = "Alpha";

      return Sprite_UIElement;

    }).call(this);
    KDCore.UI.Sprite_UIElement = Sprite_UIElement;
  })();
  return (function() {    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ PRIVATE.coffee
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var _;
    //@[DEFINES]
    _ = KDCore.UI.Sprite_UIElement.prototype;
    _._init = function() {
      var e;
      this._prepare();
      try {
        return this._createContent();
      } catch (error) {
        e = error;
        KDCore.warning(e);
        // * Если при создании произошла ошибка, отключаем элемент
        return this.isActive = function() {
          return false;
        };
      }
    };
    
    // * Подготовка элемента (проверка параметров)
    _._prepare = function() {
      //@params = @defaultParams() unless @params?
      this.params = Object.assign({}, this.defaultParams(), this.params);
      if (this.params.visible != null) {
        this.visible = this.params.visible;
      }
    };
    // * Наследники создают свои элементы в этом методе
    _._createContent = function() {}; // * EMPTY
    
    // * Сброс позиции
    _._resetPosition = function() {
      var e, x, y;
      if (this.params.position == null) {
        return;
      }
      try {
        ({x, y} = this.params.position);
        if (isFinite(x) && isFinite(y)) {
          x = Number(x);
          y = Number(y);
        } else {
          x = Number(eval(x));
          y = Number(eval(y));
        }
        this.move(x, y);
      } catch (error) {
        e = error;
        KDCore.warning(e);
        this.move(0, 0);
      }
    };
  })();
});

// ■ END PRIVATE.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  (function() {
    var Sprite_UIButton;
    // * Кнопка на экране, можно нажимать
    Sprite_UIButton = class Sprite_UIButton extends KDCore.UI.Sprite_UIElement {
      constructor() {
        super(...arguments);
      }

      // * Стандартный набор настроек
      defaultParams() {
        return {
          visible: true,
          image: "Button_Inventory",
          isHaveDisabled: true,
          rootImageFolder: null, //?optional
          click: "console.log('click')" // * число или код
        };
      }

      // * Кнопка не поддерживает перерисовку
      draw() {} // * EMPTY

      disable() {
        var ref;
        return (ref = this.button) != null ? ref.disable() : void 0;
      }

      enable() {
        var ref;
        return (ref = this.button) != null ? ref.enable() : void 0;
      }

      setState(isEnabled) {
        if (isEnabled) {
          return this.enable();
        } else {
          return this.disable();
        }
      }

      
        // * Просто вызов метода
      call() {
        var ref;
        return (ref = this.button) != null ? ref.click() : void 0;
      }

      // * Вызов метода с симуляцией нажатия
      click() {
        var ref, ref1;
        if ((ref = this.button) != null) {
          ref.click();
        }
        return (ref1 = this.button) != null ? ref1.simulateClick() : void 0;
      }

    };
    KDCore.UI.Sprite_UIButton = Sprite_UIButton;
  })();
  return (function() {    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ PRIVATE.coffee
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var _;
    //@[DEFINES]
    _ = KDCore.UI.Sprite_UIButton.prototype;
    //$[OVER]
    _._createContent = function() {
      if (this.params.image.isEmpty()) {
        KDCore.warning('You try create Button without image');
        return;
      }
      this.button = new KDCore.ButtonM(this.params.image, this.params.isHaveDisabled, this.rootImageFolder());
      this.add(this.button);
      return this._registerClickMethod();
    };
    _._registerClickMethod = function() {
      var commonEventId, e, method, ref, script;
      if (!String.any(this.params.click)) {
        return;
      }
      method = null;
      try {
        // * Если число, то значит общее событие
        if (isFinite(this.params.click)) {
          commonEventId = parseInt(this.params.click);
          if (commonEventId > 0) {
            method = function() {
              return $gameTemp.reserveCommonEvent(commonEventId);
            };
          }
        } else {
          // * Иначе скрипт
          script = this.params.click;
          method = function() {
            return eval(script);
          };
        }
        return this.button.addClickHandler(method);
      } catch (error) {
        e = error;
        KDCore.warning(e);
        return (ref = this.button) != null ? ref.clearClickHandler() : void 0;
      }
    };
  })();
});

// ■ END PRIVATE.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  (function() {    // * Рисует лицо персонажа (из папки Faces)
    var Sprite_UIFace;
    Sprite_UIFace = class Sprite_UIFace extends KDCore.UI.Sprite_UIElement {
      constructor() {
        super(...arguments);
      }

      // * Стандартный набор настроек
      defaultParams() {
        return {
          visible: true,
          faceName: "Actor1",
          faceIndex: 0,
          mirror: false,
          size: 144
        };
      }

      draw() {
        return this.drawFace(...arguments);
      }

      drawFace(faceName, faceIndex) {
        return this._drawFaceWhenReady(faceName, faceIndex);
      }

    };
    KDCore.UI.Sprite_UIFace = Sprite_UIFace;
  })();
  return (function() {    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ PRIVATE.coffee
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var _;
    //@[DEFINES]
    _ = KDCore.UI.Sprite_UIFace.prototype;
    //$[OVER]
    _._createContent = function() {
      return this._createFaceSprite();
    };
    _._createFaceSprite = function() {
      this._faceSpr = KDCore.Sprite.FromBitmap(this.params.size);
      if (this.params.mirror === true) {
        this._flipFaceSpr();
      }
      this.add(this._faceSpr);
      this._drawFaceWhenReady(this.params.faceName, this.params.faceIndex);
    };
    _._flipFaceSpr = function() {
      this._faceSpr.scale.x = -1;
      this._faceSpr.x = this.params.size;
    };
    _._drawFaceWhenReady = function(name, index = 0) {
      var ref;
      if ((ref = this._faceSpr) != null) {
        ref.clear();
      }
      if (!String.any(name)) {
        return;
      }
      if (index < 0) {
        return;
      }
      this._drawOnReady = {name, index};
      this._faceSourceBitmap = ImageManager.loadFace(name);
      this._faceSourceBitmap.addLoadListener(this._drawFace.bind(this));
      this._drawFace();
    };
    _._drawFace = function() {
      var fh, fw, size, sx, sy;
      if (this._faceSpr == null) {
        return;
      }
      this._faceSpr.clear();
      if (!String.any(this._drawOnReady.name)) {
        return;
      }
      if (KDCore.isMZ()) {
        fw = ImageManager.faceWidth;
        fh = ImageManager.faceHeight;
      } else {
        fw = Window_Base._faceWidth;
        fh = Window_Base._faceHeight;
      }
      size = this.params.size;
      sx = (this._drawOnReady.index % 4) * fw;
      sy = Math.floor(this._drawOnReady.index / 4) * fh;
      this._faceSpr.bitmap.blt(this._faceSourceBitmap, sx, sy, fw, fh, 0, 0, size, size);
    };
  })();
});

// ■ END PRIVATE.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  (function() {
    var Sprite_UIGauge;
    Sprite_UIGauge = class Sprite_UIGauge extends KDCore.UI.Sprite_UIElement {
      constructor() {
        super(...arguments);
      }

      // * Стандартный набор настроек
      defaultParams() {
        return {
          visible: true,
          fill: "",
          foreground: "",
          mask: "",
          backColor: "#000000".toCss(),
          backOpacity: 255,
          vertical: false,
          rootImageFolder: null //?optional
        };
      }

      draw() {
        return this.drawGauge(...arguments);
      }

      drawGauge(percent = 1) {
        this._lastValue = percent;
        return this._drawGauge(percent);
      }

      isVertical() {
        return this.params.vertical === true;
      }

    };
    KDCore.UI.Sprite_UIGauge = Sprite_UIGauge;
  })();
  return (function() {    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ PRIVATE.coffee
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var _;
    //@[DEFINES]
    _ = KDCore.UI.Sprite_UIGauge.prototype;
    //$[OVER]
    _._createContent = function() {
      // * Загружается главное изображение, затем уже все остальные, т.к. нужны размеры
      return this._loadFillImage();
    };
    _._loadFillImage = function() {
      // * Главное изображение, поэтому если не указано, то ничего
      if (this.params.fill.isEmpty()) {
        KDCore.warning('You try create Gauge without fill image');
        return;
      }
      KDCore.Utils.loadImageAsync(this.rootImageFolder(), this.params.fill).then(this._createParts.bind(this));
    };
    // * Получаем изображение заполнения и создаём части (т.к. есть размеры)
    _._createParts = function(fillBitmap) {
      this.fillBitmap = fillBitmap;
      this._createBackground();
      this._createFillLayer();
      this._loadForeground();
      this._loadMask();
      return this._onReady();
    };
    _._createBackground = function() {
      this.background = KDCore.Sprite.FromBitmap(this.fillBitmap.width, this.fillBitmap.height);
      this.background.b().fillAll(this.params.backColor);
      this.background.opacity = this.params.backOpacity;
      return this.add(this.background);
    };
    _._createFillLayer = function() {
      this.fillLayer = KDCore.Sprite.FromBitmap(this.fillBitmap.width, this.fillBitmap.height);
      return this.add(this.fillLayer);
    };
    _._loadForeground = function() {
      var fore;
      if (String.isNullOrEmpty(this.params.foreground)) {
        return;
      }
      fore = KDCore.Sprite.FromImg(this.params.foreground, this.rootImageFolder());
      return this.add(fore);
    };
    _._loadMask = function() {
      var mask;
      if (String.isNullOrEmpty(this.params.mask)) {
        return;
      }
      mask = KDCore.Sprite.FromImg(this.params.mask, this.rootImageFolder());
      this.mask = mask;
      return this.add(mask);
    };
    // * Если что-то было до готовности, нарисовать
    _._onReady = function() {
      this.drawGauge(this._lastValue);
    };
    _._drawGauge = function(percent) {
      if (this.fillLayer == null) {
        return;
      }
      this.fillLayer.clear();
      if (this.isVertical()) {
        return this._drawVerGauge(percent);
      } else {
        return this._drawHorGauge(percent);
      }
    };
    _._drawHorGauge = function(percent) {
      var w;
      w = this.fillBitmap.width * percent;
      return this.fillLayer.b().blt(this.fillBitmap, 0, 0, w, this.fillLayer.height, 0, 0);
    };
    _._drawVerGauge = function(percent) {
      var h, hy;
      h = this.fillBitmap.height * percent;
      hy = this.fillBitmap.height - h;
      this.fillLayer.b().blt(this.fillBitmap, 0, 0, this.fillLayer.width, h, 0, hy);
    };
  })();
});

// ■ END PRIVATE.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  (function() {
    var Sprite_UIIcon;
    Sprite_UIIcon = class Sprite_UIIcon extends KDCore.UI.Sprite_UIElement {
      constructor() {
        super(...arguments);
      }

      // * Стандартный набор настроек
      defaultParams() {
        return {
          visible: true,
          index: 0,
          size: 32,
          rootImageFolder: null //?optional
        };
      }

      draw() {
        return this.drawIcon(...arguments);
      }

      drawIcon(index = 0, noSmoth = false) {
        this._lastValue = index;
        return this._drawIcon(index, noSmoth);
      }

    };
    KDCore.UI.Sprite_UIIcon = Sprite_UIIcon;
  })();
  return (function() {    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ PRIVATE.coffee
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var _;
    //@[DEFINES]
    _ = KDCore.UI.Sprite_UIIcon.prototype;
    //$[OVER]
    _._createContent = function() {
      this._createIcon();
      return this._drawIcon(this.params.index);
    };
    _._createIcon = function() {
      this._icon = KDCore.Sprite.FromBitmap(this.params.size, this.params.size);
      this.add(this._icon);
      return this._onReady();
    };
    _._onReady = function() {
      return this.drawIcon(this._lastValue);
    };
    _._drawIcon = function(index, noSmoth = false) {
      this._icon.clear();
      if (KDCore.SDK.isString(index)) {
        this._drawImageIcon(index, noSmoth);
      } else {
        if (index <= 0) {
          return;
        }
        this._icon.drawIcon(0, 0, index, this.params.size, noSmoth);
      }
    };
    _._drawImageIcon = function(imageName, noSmoth = false) {
      return KDCore.Utils.loadImageAsync(this.rootImageFolder(), imageName).then((bitmap) => {
        return this._icon.drawIcon(0, 0, bitmap, this.params.size, noSmoth);
      });
    };
  })();
});

// ■ END PRIVATE.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  (function() {
    var Sprite_UIImage;
    Sprite_UIImage = class Sprite_UIImage extends KDCore.UI.Sprite_UIElement {
      constructor() {
        super(...arguments);
      }

      // * Стандартный набор настроек
      defaultParams() {
        return {
          visible: true,
          image: "",
          rootImageFolder: null //?optional
        };
      }

      draw() {
        return this.drawImage(...arguments);
      }

      drawImage(image) {
        return this._drawImage(image);
      }

    };
    KDCore.UI.Sprite_UIImage = Sprite_UIImage;
  })();
  return (function() {    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ PRIVATE.coffee
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var _;
    //@[DEFINES]
    _ = KDCore.UI.Sprite_UIImage.prototype;
    //$[OVER]
    _._createContent = function() {
      return this._drawImage(this.params.image);
    };
    _._drawImage = function(image) {
      this._clearImage();
      if (!String.isNullOrEmpty(image)) {
        this._image = KDCore.Sprite.FromImg(image, this.rootImageFolder());
        this.add(this._image);
      }
    };
    _._clearImage = function() {
      if (this._image == null) {
        return;
      }
      this._image.visible = false;
      this.removeChild(this._image);
      return this._image = null;
    };
  })();
});

// ■ END PRIVATE.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  (function() {
    var Sprite_UIRect;
    Sprite_UIRect = class Sprite_UIRect extends KDCore.UI.Sprite_UIElement {
      constructor() {
        super(...arguments);
      }

      // * Стандартный набор настроек
      defaultParams() {
        return {
          visible: true,
          size: {
            w: 60,
            h: 20
          },
          fillColor: "#FFFFFF".toCss(),
          fillOpacity: 255,
          borderColor: "#000000".toCss(),
          borderThickness: 1,
          borderOpacity: 255
        };
      }

      draw() {
        return this.fill(...arguments);
      }

      fill(color, opacity = 255) {
        return this._fill(color, opacity);
      }

      drawBorder(color, thickness = 1, opacity = 255) {
        return this._drawBorder(color, thickness, opacity);
      }

    };
    KDCore.UI.Sprite_UIRect = Sprite_UIRect;
  })();
  return (function() {    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ PRIVATE.coffee
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var _;
    //@[DEFINES]
    _ = KDCore.UI.Sprite_UIRect.prototype;
    //$[OVER]
    _._createContent = function() {
      if (String.any(this.params.fillColor)) {
        this._createFill();
        this.fill(this.params.fillColor, this.params.fillOpacity);
      }
      if (String.any(this.params.borderColor) && this.params.borderThickness > 0) {
        this._createBorder();
        return this.drawBorder(this.params.borderColor, this.params.borderThickness, this.params.borderOpacity);
      }
    };
    _._createFill = function() {
      this._fillSpr = KDCore.Sprite.FromBitmap(this.params.size.w, this.params.size.h);
      return this.addChild(this._fillSpr);
    };
    _._createBorder = function() {
      this._borderSprite = KDCore.Sprite.FromBitmap(this.params.size.w, this.params.size.h);
      return this.addChild(this._borderSprite);
    };
    _._fill = function(color, opacity) {
      if (this._fillSpr == null) {
        return;
      }
      this._fillSpr.fillAll(color);
      this._fillSpr.opacity = opacity;
    };
    _._drawBorder = function(color, thickness, opacity) {
      var b;
      if (this._borderSprite == null) {
        return;
      }
      this._borderSprite.clear();
      b = this._borderSprite.b();
      // * Top line
      b.fillRect(0, 0, b.width, thickness, color);
      // * Bottom line
      b.fillRect(0, b.height - thickness, b.width, thickness, color);
      // * Left line
      b.fillRect(0, 0, thickness, b.height, color);
      // * Right line
      b.fillRect(b.width - thickness, 0, thickness, b.height, color);
      return this._borderSprite.opacity = opacity;
    };
  })();
});

// ■ END PRIVATE.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  (function() {    //rev 17.11.22
    var Sprite_UIText;
    Sprite_UIText = class Sprite_UIText extends KDCore.UI.Sprite_UIElement {
      constructor() {
        super(...arguments);
      }

      // * Стандартный набор настроек
      defaultParams() {
        return {
          visible: true,
          size: {
            w: 60,
            h: 20
          },
          alignment: "center",
          font: {
            face: null,
            size: 18,
            italic: false
          },
          margins: {
            x: 0,
            y: 0
          },
          outline: {
            color: null,
            width: 2
          },
          textColor: "#FFFFFF".toCss(),
          // ? can be Null or not exists
          shadow: {
            color: "#000",
            opacity: 200,
            margins: {
              x: 1,
              y: 1
            }
          }
        };
      }

      //?DYNAMIC
      // * Сперва рисуем по готовности, а как загрузился спрайт, меняем
      drawText(text) {
        return this._drawTextWhenReady(text);
      }

      // * Сборка текста с учётом формата
      // * Заменить вхождения %1, %2 на значения параметров
      drawTextWithFormat(/*format string, arguments parameters... */) {
        var text;
        text = this._convertFormatedString(...arguments);
        this.drawText(text);
      }

      // * Пишет текст с определённым цветом (один раз)
      drawTextColor(text, colorCss) {
        if (this._textSpr == null) {
          return;
        }
        this._textSpr.b().textColor = colorCss;
        this.drawText(text);
        this._textSpr.b().textColor = this.params.textColor;
      }

    };
    KDCore.UI.Sprite_UIText = Sprite_UIText;
  })();
  return (function() {    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ PRIVATE.coffee
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var _;
    //@[DEFINES]
    _ = KDCore.UI.Sprite_UIText.prototype;
    //$[OVER]
    _._createContent = function() {
      if (this.params.shadow != null) {
        this._createShadow();
      }
      return this._createTextSprite();
    };
    _._createTextSprite = function() {
      this._textSpr = KDCore.Sprite.FromParams(this.params);
      this._textSpr.onReady(this._onReady.bind(this));
      return this.add(this._textSpr);
    };
    // * Выполнить по готовности
    _._onReady = function() {
      // * Переключить метод, так как уже готов
      this.drawText = this._drawText;
      // * Написать то что нужно было до готовности (если есть)
      if (this._drawOnReady == null) {
        return;
      }
      this.drawText(this._drawOnReady);
      this._drawOnReady = null;
    };
    _._drawText = function(text) {
      if (this._textSpr == null) {
        return;
      }
      this._textSpr.clear();
      if (text != null) {
        this._textSpr.drawTextFull(text);
      }
      if (this._shadowSpr != null) {
        this._shadowSpr.clear();
        if (text != null) {
          this._shadowSpr.drawTextFull(text);
        }
      }
    };
    // * Написать текст когда будет готов
    _._drawTextWhenReady = function(text) {
      this._drawOnReady = text;
      return this._drawText(text);
    };
    
    // * Заменить вхождения %1, %2 на значения параметров
    _._convertFormatedString = function(/*text, args...*/) {
      var e, i, j, ref, text;
      try {
        text = arguments[0];
        for (i = j = 1, ref = arguments.length; (1 <= ref ? j < ref : j > ref); i = 1 <= ref ? ++j : --j) {
          try {
            if (arguments[i] == null) {
              continue;
            }
            text = text.replace("%" + i, arguments[i]);
          } catch (error) {
            e = error;
            KDCore.warning(e);
            text = "[wrong format text input]";
          }
        }
        return text;
      } catch (error) {
        e = error;
        KDCore.warning(e);
        return "[wrong format text input]";
      }
    };
    _._createShadow = function() {
      this._shadowSpr = KDCore.Sprite.FromParams(this.params);
      this._shadowSpr.bitmap.textColor = this.params.shadow.color;
      this._shadowSpr.opacity = this.params.shadow.opacity;
      this._shadowSpr.x += this.params.shadow.margins.x;
      this._shadowSpr.y += this.params.shadow.margins.y;
      return this.add(this._shadowSpr);
    };
  })();
});

// ■ END PRIVATE.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  (function() {    //rev 30.12.21
    var Sprite_UITextExt;
    Sprite_UITextExt = class Sprite_UITextExt extends KDCore.UI.Sprite_UIText {
      constructor() {
        super(...arguments);
      }

      // * Стандартный набор настроек
      defaultParams() {
        return {
          visible: true,
          size: {
            w: 200,
            h: 60
          },
          font: {
            face: null,
            size: 14,
            italic: false
          },
          margins: {
            x: 0,
            y: 0
          },
          // * новые параметры (KDCore 2.7)
          //?null могут быть
          singleLine: false,
          forceCentered: false
        };
      }

      //$[OVER]
      // * Данный метод не поддерживается, так как тут основа не Sprite, а Window
      drawTextColor() {
        return this.drawText(...arguments);
      }

    };
    KDCore.UI.Sprite_UITextExt = Sprite_UITextExt;
  })();
  return (function() {    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ PRIVATE.coffee
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var _;
    //@[DEFINES]
    _ = KDCore.UI.Sprite_UITextExt.prototype;
    //$[OVER]
    _._createTextSprite = function() {
      var rect;
      rect = new Rectangle(0, 0, this.params.size.w, this.params.size.h);
      this._textSpr = new KDCore.Window_ExtTextLineBase(rect, this.params.font);
      this._textSpr.x = this.params.margins.x || 0;
      this._textSpr.y = this.params.margins.y || 0;
      this.add(this._textSpr);
      // * На следующий кадр, чтобы не было потери текста (опасно)
      //setTimeout (=> @_onReady() ), 10
      this._onReady(); // * Сразу
    };
    
    //$[OVER]
    _._drawText = function(text) {
      if (this._textSpr == null) {
        return;
      }
      this._textSpr.contents.clear();
      if (this.params.forceCentered === true) {
        this._textSpr.drawTextExInCenter(text, 0, 0, this._textSpr.width, this._textSpr.height);
      } else {
        if (this.params.singleLine === true) {
          this._textSpr.drawTextEx(text, 0, 0, this._textSpr.width);
        } else {
          // * По умолчанию
          this._textSpr.drawTextExWithWordWrap(text, 0, 0, this._textSpr.width);
        }
      }
    };
  })();
});

// ■ END PRIVATE.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  (function() {
    var Sprite_UITextWithBack;
    Sprite_UITextWithBack = class Sprite_UITextWithBack extends KDCore.UI.Sprite_UIElement {
      constructor() {
        super(...arguments);
      }

      // * Стандартный набор настроек
      defaultParams() {
        return {
          visible: true,
          text: {
            visible: true,
            size: {
              w: 60,
              h: 20
            },
            alignment: "center",
            font: {
              face: null,
              size: 18,
              italic: false
            },
            margins: {
              x: 0,
              y: 0
            },
            outline: {
              color: null,
              width: 2
            },
            textColor: "#000000".toCss()
          },
          rect: {
            visible: true,
            size: {
              w: 60,
              h: 20
            },
            fillColor: "#FFFFFF".toCss(),
            fillOpacity: 255,
            borderColor: "#000000".toCss(),
            borderThickness: 1,
            borderOpacity: 255
          },
          textMargins: {
            x: 0,
            y: 0
          }
        };
      }

      draw() {
        return this.drawText(...arguments);
      }

      // * Aргументы смотри в Sprite_UIText
      drawText() {
        return this.text.draw(...arguments);
      }

      drawTextColor() {
        return this.text.drawTextColor(...arguments);
      }

      // * Аргументы смотри в Sprite_UIRect
      fill() {
        return this.rect.fill(...arguments);
      }

      drawBorder() {
        return this.rect.drawBorder(...arguments);
      }

      //$[OVER]
      isUnderMouse() {
        return this.rect.isUnderMouse();
      }

    };
    KDCore.UI.Sprite_UITextWithBack = Sprite_UITextWithBack;
  })();
  return (function() {    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ PRIVATE.coffee
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var _;
    //@[DEFINES]
    _ = KDCore.UI.Sprite_UITextWithBack.prototype;
    //$[OVER]
    _._createContent = function() {
      this._createRect();
      return this._createText();
    };
    _._createRect = function() {
      this.rect = new KDCore.UI.Sprite_UIRect(this.params.rect);
      return this.addChild(this.rect);
    };
    _._createText = function() {
      var x, y;
      this.text = new KDCore.UI.Sprite_UIText(this.params.text);
      ({x, y} = this.params.textMargins);
      this.text.move(x, y);
      return this.addChild(this.text);
    };
  })();
});

// ■ END PRIVATE.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  (function() {
    var Sprite_UIColorGauge;
    Sprite_UIColorGauge = class Sprite_UIColorGauge extends KDCore.UI.Sprite_UIGauge {
      constructor() {
        super(...arguments);
      }

      // * Стандартный набор настроек
      defaultParams() {
        return {
          visible: true,
          size: {
            w: 100,
            h: 40
          },
          fill: "#FFFFFF", // * В отличии от Gauge, тут цвет, а не картинка
          foreground: "", // картинка
          mask: "", // картинка
          backColor: "#000000".toCss(),
          backOpacity: 255,
          vertical: false,
          rootImageFolder: null //?optional
        };
      }

    };
    KDCore.UI.Sprite_UIColorGauge = Sprite_UIColorGauge;
  })();
  return (function() {    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ PRIVATE.coffee
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var _;
    //@[DEFINES]
    _ = KDCore.UI.Sprite_UIColorGauge.prototype;
    //$[OVER]
    // * Заместо изображения используем простой Bitmap с заливкой цвета
    _._loadFillImage = function() {
      var fillBitmap;
      fillBitmap = new Bitmap(this.params.size.w, this.params.size.h);
      fillBitmap.fillAll(this.params.fill);
      this._createParts(fillBitmap);
    };
  })();
});

// ■ END PRIVATE.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  (function() {    // * Данный UI Элемент является только контейнером
    // * Он ничего не рисует, нужно добавлять в него
    // * контент методом addContent

    //rev 17.11.22
    var Sprite_UITooltip;
    Sprite_UITooltip = class Sprite_UITooltip extends KDCore.UI.Sprite_UIElement {
      constructor() {
        super(...arguments);
        this.opacity = 0;
      }

      isTooltipActive() {
        return (this._opThread != null) || (this._opChanger != null) || this.opacity > 0;
      }

      activateTooltip(x, y, parent) {
        if (this.isTooltipActive()) {
          return;
        }
        this.deactivateTooltip();
        this.move(x, y);
        this._opThread = new KDCore.TimedUpdate(this.params.delay, this.showTooltip.bind(this));
        if (!this.params.isGlobal && (parent != null)) {
          parent.addChild(this);
        } else {
          // * Always on Top on Scene  (if Global)
          SceneManager._scene.addChild(this);
        }
      }

      deactivateTooltip() {
        this._opThread = null;
        this._opChanger = null;
        return this.opacity = 0;
      }

      showTooltip() {
        this._opThread = null;
        this.appear(this.params.opacityChangeStep);
        if (this.params.cursorRelative === true) {
          return this.toCursor();
        }
      }

      update() {
        var ref;
        super.update();
        if ((ref = this._opThread) != null) {
          ref.update();
        }
        if (this.isTooltipActive() && this.params.cursorRelative === true) {
          return this.toCursor();
        }
      }

      // * Стандартный набор настроек
      defaultParams() {
        return {
          visible: true,
          delay: 30,
          opacityChangeStep: 35,
          margins: {
            x: 8,
            y: 8
          },
          isGlobal: true,
          cursorRelative: true
        };
      }

      toCursor() {
        var x, y;
        ({x, y} = this.params.margins);
        return this.move(TouchInput.x + x, TouchInput.y + y);
      }

      // * Основной метод, нужно добавить контент
      addContent(content) {
        return this.add(content);
      }

    };
    KDCore.UI.Sprite_UITooltip = Sprite_UITooltip;
  })();
  return (function() {    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ PRIVATE.coffee
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var _;
    //@[DEFINES]
    _ = KDCore.UI.Sprite_UITooltip.prototype;
  })();
});

// ■ END PRIVATE.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  var ALIAS__processEscapeCharacter, _;
  //@[DEFINES]
  _ = Window_Base.prototype;
  //@[ALIAS]
  ALIAS__processEscapeCharacter = _.processEscapeCharacter;
  _.processEscapeCharacter = function(code, textState) {
    switch (code) {
      case 'CHEX':
        this.pProcessColorChangeHex(this.pObtainEscapeParamHexColor(textState));
        break;
      case 'ISZ':
        this.pProcessDrawIconSized(this.pObtainEscapeParamIconArr(textState), textState);
        break;
      case 'PSZ':
        this.pProcessDrawPictureSized(this.pObtainEscapeParamImgArr(textState), textState, false);
        break;
      case 'PSB':
        this.pProcessDrawPictureSized(this.pObtainEscapeParamImgArr(textState), textState, true);
        break;
      default:
        ALIAS__processEscapeCharacter.call(this, code, textState);
    }
  };
  //?NEW
  _.pObtainEscapeParamHexColor = function(textState) {
    var arr, regExp, textPart;
    regExp = /^\[(#?([0-9a-fA-F]{2}){3}|([0-9a-fA-F]){3})\]/;
    textPart = textState.text.slice(textState.index);
    arr = regExp.exec(textPart);
    if (arr != null) {
      textState.index += arr[0].length;
      return arr[1];
    } else {
      return "";
    }
  };
  //?NEW
  _.pObtainEscapeParamIconArr = function(textState) {
    var arr, params, regExp, textPart;
    regExp = /^\[(\d+,\s*\d+,\s*-?\d+,\s*-?\d+)\]/;
    textPart = textState.text.slice(textState.index);
    arr = regExp.exec(textPart);
    if (arr != null) {
      textState.index += arr[0].length;
      if (arr[1] != null) {
        params = arr[1].split(",").map(function(i) {
          return parseInt(i.trim());
        });
        return params;
      }
    }
    return [];
  };
  //?NEW
  _.pObtainEscapeParamImgArr = function(textState) {
    var arr, params, regExp, textPart;
    regExp = /^\[(\w+,\s*\d+,\s*\d+,\s*-?\d+,\s*-?\d+)\]/;
    textPart = textState.text.slice(textState.index);
    arr = regExp.exec(textPart);
    if (arr != null) {
      textState.index += arr[0].length;
      if (arr[1] != null) {
        params = arr[1].split(",").map(function(i) {
          if (isFinite(i)) {
            return parseInt(i.trim());
          } else {
            return i;
          }
        });
        return params;
      }
    }
    return [];
  };
  //?NEW
  _.pProcessColorChangeHex = function(colorHex) {
    var e;
    try {
      this.changeTextColor(colorHex);
    } catch (error) {
      e = error;
      KDCore.warning(e);
      this.resetTextColor();
    }
  };
  //?NEW
  //?params: [INDEX, SIZE, DX, DY]
  _.pProcessDrawIconSized = function(params, textState) {
    var dx, dy, e, iconIndex, size, staticMargin, x, y;
    try {
      if (params == null) {
        return;
      }
      if (params.isEmpty()) {
        return;
      }
      size = params[1];
      if (params[1] == null) {
        if (KDCore.isMZ()) {
          size = ImageManager.iconWidth;
        } else {
          size = Window_Base._iconWidth;
        }
      }
      if (params[2] == null) {
        params[2] = 0;
      }
      if (params[3] == null) {
        params[3] = 0;
      }
      iconIndex = params[0];
      dx = params[2];
      dy = params[3];
      staticMargin = 2;
      x = textState.x + staticMargin + dx;
      y = textState.y + staticMargin + dy;
      if (KDCore.isMZ()) {
        if (textState.drawing === true) {
          // * Только в режиме рисования
          this.contents.drawIcon(x, y, iconIndex, size);
        }
      } else {
        this.contents.drawIcon(x, y, iconIndex, size);
      }
      textState.x += size + (staticMargin * 2) + dx;
    } catch (error) {
      e = error;
      KDCore.warning(e);
    }
  };
  //?NEW
  //?params: [NAME, W, H, DX, DY]
  _.pProcessDrawPictureSized = function(params, textState, isUnderText = false) {
    var drawBitmap, drawProcess, e, height, name, source, width, x, y;
    try {
      if (params == null) {
        return;
      }
      if (params.isEmpty()) {
        return;
      }
      name = params[0];
      if (!String.any(name)) {
        return;
      }
      width = params[1];
      height = params[2];
      if (params[3] == null) {
        params[3] = 0;
      }
      if (params[4] == null) {
        params[4] = 0;
      }
      x = textState.x + 2 + params[3];
      y = textState.y + 2 + params[4];
      drawBitmap = this.contents;
      source = this.pGetSourceImageForDrawPictureSized(name);
      if ((KDCore.isMZ() && textState.drawing === true) || KDCore.isMV()) {
        drawProcess = function() {
          var e;
          try {
            if (drawBitmap == null) {
              return;
            }
            return drawBitmap.drawOnMe(source, x, y, width, height);
          } catch (error) {
            e = error;
            return KDCore.warning(e);
          }
        };
        source.addLoadListener(drawProcess);
      }
      if (isUnderText !== true) {
        // * Вариант, что текст не будет "перескакивать" за ширину картинки а пойдёт поверх (т.е. фоновая картинка)
        // * Если картине не preload, то может "вылезти" на текст потом, так как рисоваться будет позже
        textState.x += width + 4 + params[3];
      }
    } catch (error) {
      e = error;
      KDCore.warning(e);
    }
  };
  // * Данный метод вынесен отдельно, чтобы можно было переопределять папки
  return _.pGetSourceImageForDrawPictureSized = function(name) {
    return ImageManager.loadPicture(name);
  };
});


// Generated by CoffeeScript 2.6.1



// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  var FloatingWindow;
  
    // * Общий класс для всех окон на карте
  /*parameters
      {
          draggable: true,
          closeButton: true,
          moveToCenter: true,
          alwaysOnTop: true,
          header: true
      }
  */
  FloatingWindow = class FloatingWindow extends KDCore.Sprite {
    constructor(mainParent, windowW, windowH, parameters) {
      super();
      this.mainParent = mainParent;
      this.windowW = windowW;
      this.windowH = windowH;
      this.parameters = parameters;
      this._init();
      return;
    }

    static StaticSettings() {
      return {
        draggable: false,
        closeButton: false,
        moveToCenter: false,
        alwaysOnTop: false,
        header: false
      };
    }

    // * Статическое окно с дочерним
    static StaticWindow(parent, sub) {
      var p, w;
      p = KDCore.FloatingWindow.StaticSettings();
      w = new KDCore.FloatingWindow(parent, sub.width, sub.height, p);
      w.setSubWindow(sub);
      w.open();
      return w;
    }

    isActive() {
      return this.visible === true;
    }

    isReady() {
      return this._isReady === true;
    }

    isMouseIn() {
      return this.inPosition(TouchInput);
    }

    isOpen() {
      return this.isActive();
    }

    // * Дочернее окно (если есть)
    sub() {
      return this._subw;
    }

    setOnReadyHandler(_readyHandler) {
      this._readyHandler = _readyHandler;
      if ((this._readyHandler != null) && this._isReady === true) {
        return this._readyHandler();
      }
    }

    isDraggable() {
      return this._isDraggable === true && (this._headerSpr != null) && this._headerSpr.visible === true && this.isOpen();
    }

    setCloseHandler(_closeHandler) {
      this._closeHandler = _closeHandler;
    }

    callCloseHandler() {
      if (this._closeHandler != null) {
        return this._closeHandler();
      }
    }

    setDraggingHandler(_dragHandler) {
      this._dragHandler = _dragHandler;
    }

    setDragEndHandler(_dragEndHandler) {
      this._dragEndHandler = _dragEndHandler;
    }

    hideHeader() {} //TODO:

    hideCloseButton() {} //TODO:

    
      // * Сдвиг заголовка по X, чтобы рамку не задевал
    headerMarginX() {
      return 2;
    }

    // * Сдвиг заголовка по Y, чтобы рамку не задевал
    headerMarginY() {
      return 0;
    }

    // * Стандартная позиция кнопки "закрыть"
    closeButtonPosition() {
      return {
        x: this.width - 24,
        y: 4
      };
    }

    open() {
      if (this.isOpen()) {
        return;
      }
      this._open();
      this._afterOpen();
    }

    close() {
      if (!this.isOpen()) {
        return;
      }
      this._close();
      this._afterClose();
    }

    rootImageFolder() {
      return "Alpha/Windows";
    }

    update() {
      super.update();
      this._updateMouseCheckThread();
      this._updateDragging();
    }

    // * Добавить спрайт на специальный слой контента
    addContent(sprite) {
      return this._contentLayer.addChild(sprite);
    }

    // * Добавить дочернее окно
    setSubWindow(w) {
      this._subw = w;
      this.addContent(w);
    }

    destroy() {
      this._close();
      return Sprite.prototype.destroy.call(this);
    }

  };
  (function() {    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ PRIVATE.coffee
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var _;
    //@[DEFINES]
    _ = FloatingWindow.prototype;
    _._init = function() {
      var ref;
      // * Окно всегда закрыто
      this.visible = false;
      // * Контент прогрузился?
      this._isReady = false;
      this._applyParameters();
      if (this._isAlwaysOnTop === false) {
        // * Если не всегда поверх окон, то добавляем сразу к родителю (один раз)
        if ((ref = this.mainParent) != null) {
          ref.addChild(this);
        }
      }
      this._initFloatingSystem();
      this._createLayers();
      this._loadWindowFrame();
    };
    // * Тут ничего не создавать, не двигать, так как
    // * конент создаётся Async, см. метод _createCustomElements
    _._applyParameters = function() {
      var p;
      this._applyDefaults();
      if (this.parameters == null) {
        return;
      }
      p = this.parameters;
      if (p.draggable != null) {
        this._isDraggable = p.draggable;
      }
      if (p.moveToCenter != null) {
        this._isMoveToCenter = p.moveToCenter;
      }
      if (p.header != null) {
        this._isHeaderVisible = p.header;
      }
      if (p.closeButton != null) {
        this._isHaveCloseButton = p.closeButton;
      }
      if (p.alwaysOnTop != null) {
        this._isAlwaysOnTop = p.alwaysOnTop;
      }
    };
    _._applyDefaults = function() {
      // * Окно можно перетаскивать мышкой (по умолчанию - да)
      this._isDraggable = true;
      this._isMoveToCenter = true;
      this._isHeaderVisible = true;
      this._isHaveCloseButton = true;
      this._isAlwaysOnTop = true;
    };
    _._initFloatingSystem = function() {
      if ($gameTemp._floatingWindows == null) {
        // * Создаём массив окон, он нужен для правильного
        // закрытия окон (по очереди) и перемещения drag and drop
        // с учётом верхнего окна
        $gameTemp._floatingWindows = [];
      }
      // * Вспомогательная переменная, чтобы не вызывать методы каждый кадр
      this._mouseIn = false;
      // * Тоже вспомогательная переменная
      this._dragging = false;
    };
    _._moveToStartPosition = function() {
      if (this._isMoveToCenter === true) {
        return this.moveToCenter(Graphics.width / 2, Graphics.height / 2);
      }
    };
    _._closeButtonClick = function() {
      // * При исчезании, кнопка не успевает себя "удалить"
      $gameTemp.kdButtonUnderMouse = null;
      this.callCloseHandler();
      return this.close();
    };
    (function() {      // * DRAGGING
      // -----------------------------------------------------------------------
      _._updateDragging = function() {
        if (!this.isDraggable()) {
          return;
        }
        // * Если мы уже двигаем окно, но мышка вышла за границы, то можно дальше двигать
        // * Только если мышка не в окне и не двигали ранее, то не проверяем
        if (this._mouseIn === false && this._dragging === false) {
          return;
        }
        // * Если существует объект который сейчас dragging
        if ($gameTemp.pkdDraggableInstance != null) {
          // * Если этот объект не этот объект, то выходим из метода
          if ($gameTemp.pkdDraggableInstance !== this) {
            return;
          }
        }
        if (TouchInput.isLongPressed()) {
          if (this._dragging === false) {
            this._onDragStart();
          } else {
            this._onDragging();
          }
        } else {
          this._stopDragging();
        }
      };
      _._onDragStart = function() {
        // * Проверка, в области Header или нет
        if (!this._isMouseInHeader()) {
          return;
        }
        // * Разница в координатах курсора и объекта, чтобы убрать эффект "прыжка"
        this.opacity = 200;
        this._deltaXY = this.getDeltaXY();
        this._dragging = true;
        // * Устанавливаем глобальную ссылку на объект перемещения
        $gameTemp.pkdDraggableInstance = this;
      };
      _.getDeltaXY = function() {
        var p;
        p = new KDCore.Point(this.x, this.y);
        return p.delta(TouchInput);
      };
      _._onDragging = function() {
        // * Защита от перетаскивания за края экрана
        if (!this._isNewMousePositionOnScreen()) {
          return;
        }
        this.move(TouchInput.x - this._deltaXY.x, TouchInput.y - this._deltaXY.y);
        if (this._dragHandler != null) {
          return this._dragHandler();
        }
      };
      _._stopDragging = function() {
        if (this._dragging === true) {
          this._dragging = false;
          this.opacity = 255;
          this._clearDraggableGlocalInstance();
          if (this._dragEndHandler != null) {
            this._dragEndHandler();
          }
        }
      };
      // * Освобождаем глобальную ссылку
      _._clearDraggableGlocalInstance = function() {
        if ($gameTemp.pkdDraggableInstance === this) {
          return $gameTemp.pkdDraggableInstance = null;
        }
      };
      _._isMouseInHeader = function() {
        if (this._headerSpr == null) {
          return false;
        }
        return this._headerSpr.isContainsPoint(TouchInput);
      };
      _._isNewMousePositionOnScreen = function() {
        return KDCore.Utils.isPointInScreen(TouchInput, 10);
      };
    })();
    (function() {      // -----------------------------------------------------------------------

      // * CREATE ELEMENTS
      // -----------------------------------------------------------------------
      
      // * Слои нужны, так как изображения загружаються асинхронно
      _._createLayers = function() {
        this._mainLayer = new Sprite();
        this._contentLayer = new Sprite();
        this._headerLayer = new Sprite();
        this._closeButtonLayer = new Sprite();
        this.addChild(this._mainLayer);
        this.addChild(this._contentLayer);
        this.addChild(this._headerLayer);
        this.addChild(this._closeButtonLayer);
      };
      _._loadWindowFrame = function() {
        return KDCore.Utils.loadImageAsync(this.rootImageFolder(), "windowFrame").then(this._createWindow.bind(this));
      };
      _._createWindow = function(frameImage) {
        this.bitmap = new Bitmap(this.windowW, this.windowH);
        this.wFrame = new KDCore.Sprite_TilingFrame(this.windowW, this.windowH, frameImage);
        this._mainLayer.addChild(this.wFrame);
        this._createParts();
      };
      _._createParts = function() {
        this._loadHeader();
        if (this._isHaveCloseButton === true) {
          this._createCloseButton();
        }
        this._moveToStartPosition();
        this._createCustomElements();
        // * Окно готово
        this._isReady = true;
        if (this._readyHandler != null) {
          this._readyHandler();
        }
      };
      _._loadHeader = function() {
        return KDCore.Utils.loadImageAsync(this.rootImageFolder(), "headerLine").then(this._createHeader.bind(this));
      };
      _._createHeader = function(headerLineImage) {
        var w;
        w = this.windowW - (this.headerMarginX() * 2);
        this._headerSpr = new KDCore.Sprite_TilingLine(w, headerLineImage.height, headerLineImage);
        this._headerSpr.x = this.headerMarginX();
        this._headerSpr.y = this.headerMarginY();
        this._headerLayer.addChild(this._headerSpr);
        if (this._isHeaderVisible === true) {
          // * Сдвигаем контент, чтобы было начало под заголовком
          this._contentLayer.y += headerLineImage.height + this.headerMarginY();
        } else {
          this._headerSpr.visible = false;
        }
      };
      _._createCloseButton = function() {
        this._closeButton = new KDCore.ButtonM("windowCloseButton", false, this.rootImageFolder());
        this._closeButtonLayer.addChild(this._closeButton);
        this._closeButton.move(this.closeButtonPosition());
        this._closeButton.addClickHandler(this._closeButtonClick.bind(this));
      };
      //%[FOR CHILDRENS]
      // * Наследники создают свои элементы в этом методе
      // * Есть специальный метод addContent()
      _._createCustomElements = function() {}; // * EMPTY
    })();
    (function() {      // -----------------------------------------------------------------------

      // * MOUSE
      // -----------------------------------------------------------------------
      
      // * Определение если мышка в области окна
      //TODO: Есть проблема при открытии окна сразу под курсором
      _._registerMouseInOut = function() {
        if (!this.isOpen()) {
          return;
        }
        if (this.isMouseIn()) {
          if (this._mouseIn === false) {
            this._mouseIn = true;
            this._onMouseIn();
          }
        } else {
          if (this._mouseIn === true) {
            this._mouseIn = false;
            this._onMouseOut();
          }
        }
      };
      // * Используется похожая система что и в KDCore.ButtonM
      _._onMouseIn = function() {
        return $gameTemp.floatingWindowUnderMouse = this;
      };
      _._onMouseOut = function() {
        if ($gameTemp.floatingWindowUnderMouse === this) {
          return $gameTemp.floatingWindowUnderMouse = null;
        }
      };
      // * Будем проверять мышка ли в окне только при открытом окне
      _._createMouseCheckThread = function() {
        this._mouseCheckThread = new KDCore.TimedUpdate(1, this._registerMouseInOut.bind(this));
        this._updateMouseCheckThread = () => {
          return this._mouseCheckThread.update();
        };
        return this._mouseCheckThread.call();
      };
      // * Когда окно закрывается, никаких проверок, обнуляем метод
      _._destroyMouseCheckThread = function() {
        this._mouseCheckThread = null;
        return this._updateMouseCheckThread = function() {};
      };
      //?DYNAMIC
      _._updateMouseCheckThread = function() {}; // * EMPTY
    })();
    (function() {      // -----------------------------------------------------------------------

      // * OPEN OR CLOSE
      // -----------------------------------------------------------------------
      _._open = function() {
        var ref, ref1;
        this.visible = true;
        if ((ref = $gameTemp._floatingWindows) != null) {
          ref.push(this);
        }
        if (this._isAlwaysOnTop === true) {
          // * Окно, которое открывается, всегда снова выше остальных (опция)
          if ((ref1 = this.mainParent) != null) {
            ref1.addChild(this);
          }
        }
        return this._createMouseCheckThread();
      };
      _._afterOpen = function() {}; // * EMPTY
      _._close = function() {
        this.visible = false;
        if (this._isAlwaysOnTop === true) {
          this.removeFromParent();
        }
        this._clearDraggableGlocalInstance();
        $gameTemp._floatingWindows.delete(this);
        this._onMouseOut();
        return this._destroyMouseCheckThread();
      };
      _._afterClose = function() {}; // * EMPTY
    })();
  })();
  (function() {    // ■ END PRIVATE.coffee
    //---------------------------------------------------------------------------

    // * Если окно под курсором, нельзя нажимать на карте для движения игрока
    // -----------------------------------------------------------------------
    (function() {      //╒═════════════════════════════════════════════════════════════════════════╛
      // ■ Scene_Map.coffee
      //╒═════════════════════════════════════════════════════════════════════════╛
      //---------------------------------------------------------------------------
      var ALIAS__isAnyButtonPressed, ALIAS__processMapTouch, _;
      
      //@[DEFINES]
      _ = Scene_Map.prototype;
      if (KDCore.isMZ()) {
        //@[ALIAS]
        ALIAS__isAnyButtonPressed = _.isAnyButtonPressed;
        _.isAnyButtonPressed = function() {
          if ($gameTemp.floatingWindowUnderMouse != null) {
            return true;
          } else {
            return ALIAS__isAnyButtonPressed.call(this);
          }
        };
      } else {
        //@[ALIAS]
        ALIAS__processMapTouch = _.processMapTouch;
        _.processMapTouch = function() {
          if ($gameTemp.floatingWindowUnderMouse != null) {
            return;
          }
          return ALIAS__processMapTouch.call(this);
        };
      }
    })();
  })();
  //@[EXTEND]
  // ■ END Scene_Map.coffee
  //---------------------------------------------------------------------------
  return KDCore.FloatingWindow = FloatingWindow;
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  var HUI;
  // * Html UI Manager
  // * Набор инструментов для работы с HTML элементами интерфейса
  HUI = function() {};
  (function() {
    var _;
    //@[DEFINES]
    _ = HUI;
    _.init = function() {
      // * Данный набор инструментов могут использовать многие плагины, поэтому проверка
      if (this.isInited()) {
        return;
      }
      this._createMainParentInHtml();
      this._extendGraphicsClass();
      this.refresh();
    };
    // * Был ли создан (инициализирован) основной элемент
    _.isInited = function() {
      return this.parent() != null;
    };
    // * Основной элемент родитель для всех элементов UI
    _.parent = function() {
      return this._parent;
    };
    _.refresh = function() {
      if (!this.isInited()) {
        return;
      }
      Graphics._centerElement(this._parent);
      this._parent.style.zIndex = 2;
      this._parent.style.width = Graphics._canvas.style.width;
      this._parent.style.height = Graphics._canvas.style.height;
    };
    _.initReactComponents = function(withBabel = true) {
      var e;
      try {
        if (withBabel) {
          this._loadBabel();
        }
        return this._loadReact();
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    };
    _._loadBabel = function() {
      var e;
      try {
        return this._loadScript('https://unpkg.com/babel-standalone@6/babel.min.js');
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    };
    _._loadReact = function() {
      var e;
      try {
        this._loadScript('https://unpkg.com/react@18/umd/react.production.min.js');
        return this._loadScript('https://unpkg.com/react-dom@18/umd/react-dom.production.min.js');
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    };
    _._loadScript = function(src, isReact = false) {
      var e, script;
      try {
        script = document.createElement("script");
        if (isReact === true) {
          script.type = "text/babel";
        } else {
          script.type = "text/javascript";
          script.crossorigin = true;
        }
        script.src = src;
        script.async = false;
        script.defer = true;
        script.onerror = function(e) {
          KDCore.warning('HUI: Failed to load script');
          return KDCore.warning(e);
        };
        document.body.appendChild(script);
        if (isReact === true) {
          return window.dispatchEvent(new Event('DOMContentLoaded'));
        }
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    };
    _.loadReactComponent = function(componentName, folder = 'data/uiComponents') {
      var e, src;
      try {
        src = folder + "/" + componentName + ".js";
        return this._loadScript(src, true);
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    };
    _.addReactComponent = function(componentName, props, uniqueId = null) {
      var e, element, reactElement, root;
      try {
        if (window[componentName] == null) {
          KDCore.warning("Cant find " + componentName + ", make sure to load it first");
          return null;
        }
        if (uniqueId == null) {
          uniqueId = componentName;
        }
        // * Создаём отдельный DIV для каждого элемента (чтобы можно было удалять)
        element = this._getElementForReactComponent(uniqueId);
        root = ReactDOM.createRoot(element);
        reactElement = React.createElement(window[componentName], props);
        root.render(reactElement);
        return KDCore.HUI.getElement(uniqueId);
      } catch (error) {
        e = error;
        KDCore.warning(e);
        return null;
      }
    };
    // * Simple React Component (without JSX!)
    _.loadReactComponentFromFile = function(filename, props, uniqueId, handler, folder = "data/uiComponents") {
      var e, url, xhr;
      try {
        xhr = new XMLHttpRequest();
        url = folder + "/" + filename + ".js";
        xhr.open("GET", url);
        xhr.overrideMimeType("plain/text");
        xhr.onload = function() {
          var e, element;
          eval(xhr.responseText);
          element = KDCore.HUI.addReactComponent(filename, props, uniqueId);
          try {
            if (handler != null) {
              return handler(element, filename);
            }
          } catch (error) {
            e = error;
            return KDCore.warning(e);
          }
        };
        return xhr.send();
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    };
    _._getElementForReactComponent = function(componentId) {
      var e, element;
      try {
        this.removeElementById(componentId);
        element = this.addElement(componentId, '', null);
        return element;
      } catch (error) {
        e = error;
        KDCore.warning(e);
      }
      return null;
    };
    _.loadElementFromFile = function(filename, handler, folder = "data/uiComponents") {
      var e, url, xhr;
      try {
        xhr = new XMLHttpRequest();
        url = folder + "/" + filename + ".html";
        xhr.open("GET", url);
        xhr.overrideMimeType("plain/text");
        xhr.onload = function() {
          var e, element, htmlElementText;
          // * Хотел отдельные данные передавать и заменять в HTML текст
          // * Но если у нас есть React компоненты, то это не надо
          //htmlElementText = @convertDataKeys(xhr.responseText, dataKeys)
          htmlElementText = xhr.responseText;
          element = KDCore.HUI.addElement(filename, htmlElementText, null);
          try {
            if (handler != null) {
              return handler(element, filename);
            }
          } catch (error) {
            e = error;
            return KDCore.warning(e);
          }
        };
        return xhr.send();
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    };
    _.addCSS = function(name, folder = "css") {
      var head;
      if (!this.isInited()) {
        this.init();
      }
      head = document.getElementsByTagName("head")[0];
      if (head != null) {
        head.insertAdjacentHTML("beforeend", "<link rel=\"stylesheet\" href=\"$0/$1.css\" />".replace("$0", folder).replace("$1", name));
      }
    };
    _.addElement = function(id, html, classes = null) {
      var cls, element, i, len;
      if (!this.isInited()) {
        this.init();
      }
      element = document.createElement("div");
      element.id = id;
      element.innerHTML = html;
      if (classes != null) {
        for (i = 0, len = classes.length; i < len; i++) {
          cls = classes[i];
          element.classList.add(cls);
        }
      }
      this._parent.appendChild(element);
      return element;
    };
    _.appendElement = function(element) {
      var e;
      try {
        return this._parent.appendChild(element);
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    };
    // * Может быть NULL
    _.getElement = function(id) {
      return document.getElementById(id);
    };
    _.removeElement = function(element) {
      if (element == null) {
        return;
      }
      if (KDCore.SDK.isString(element)) {
        this.removeElementById(element);
      } else {
        this.removeElementById(element.id);
      }
    };
    _.removeElementById = function(elementId) {
      var element;
      if (!this.isInited()) {
        return;
      }
      element = this.getElement(elementId);
      if (element != null) {
        this._parent.removeChild(element);
      }
    };
    // * PRIVATE ------------------------------------------------------------------
    _._createMainParentInHtml = function() {
      this._parent = document.createElement("div");
      this._parent.id = "KDCoreMain";
      document.body.appendChild(this._parent);
    };
    _._extendGraphicsClass = function() {
      var ALIAS___updateCanvas;
      //@[ALIAS]
      ALIAS___updateCanvas = Graphics._updateCanvas;
      Graphics._updateCanvas = function() {
        ALIAS___updateCanvas.call(this);
        return KDCore.HUI.refresh();
      };
    };
  })();
  //@[EXTEND]
  return KDCore.HUI = HUI;
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  var ALIAS___onMouseUp, ALIAS___onRightButtonDown, ALIAS__clear, ALIAS__update, _;
  // * Right mouse pressed
  // * Определение когда правая (вторая) кнопка мыши зажата и удерживается

  //@[DEFINES]
  _ = TouchInput;
  //@[ALIAS]
  ALIAS__clear = _.clear;
  _.clear = function() {
    ALIAS__clear.call(this);
    this._kdMousePressed2 = false;
    this._kdPressedTime2 = 0;
  };
  //@[ALIAS]
  ALIAS___onRightButtonDown = _._onRightButtonDown;
  _._onRightButtonDown = function(event) {
    var check;
    ALIAS___onRightButtonDown.call(this, event);
    // * Это значит что ALIAS метод прошёл (верные X и Y в Canvas)
    if (KDCore.isMZ()) {
      check = this._newState.cancelled === true;
    } else {
      check = this._events.cancelled === true;
    }
    if (check === true) {
      this._kdMousePressed2 = true;
      this._kdPressedTime2 = 0;
    }
  };
  //@[ALIAS]
  ALIAS___onMouseUp = _._onMouseUp;
  _._onMouseUp = function(event) {
    ALIAS___onMouseUp.call(this, event);
    if (event.button === 2) {
      this._kdMousePressed2 = false;
    }
  };
  //@[ALIAS]
  ALIAS__update = _.update;
  _.update = function() {
    ALIAS__update.call(this);
    if (this.kdIsPressed2()) {
      return this._kdPressedTime2++;
    }
  };
  //?[NEW]
  return _.kdIsPressed2 = function() {
    return this._kdMousePressed2 === true;
  };
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  // * Методы из RPG Maker MZ которых нет в RPG Maker MV
  if (KDCore.isMZ()) {
    return;
  }
  (function() {    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ Scene_Base.coffee
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var _;
    
    //@[DEFINES]
    _ = Scene_Base.prototype;
    _.calcWindowHeight = function(numLines, selectable) {
      if (selectable === true) {
        return Window_Selectable.prototype.fittingHeight(numLines);
      } else {
        return Window_Base.prototype.fittingHeight(numLines);
      }
    };
  })();
  (function() {    // ■ END Scene_Base.coffee
    //---------------------------------------------------------------------------

    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ Window_Selectable.coffee
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var _;
    
    //@[DEFINES]
    _ = Window_Selectable.prototype;
    _.itemLineRect = function(index) {
      return this.itemRect(index);
    };
  })();
  (function() {    // ■ END Window_Selectable.coffee
    //---------------------------------------------------------------------------

    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ Window_Base.coffee
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var ALIAS__initialize, ALIAS__processEscapeCharacter, _;
    //@[DEFINES]
    _ = Window_Base.prototype;
    // * Чтоб можно было Rectangle принимать в конструктор
    //@[ALIAS]
    ALIAS__initialize = _.initialize;
    _.initialize = function(x, y, w, h) {
      if (x instanceof PIXI.Rectangle || x instanceof Rectangle) {
        return ALIAS__initialize.call(this, x.x, x.y, x.width, x.height);
      } else {
        return ALIAS__initialize.call(this, ...arguments);
      }
    };
    
    // * В MZ используется FS для изменения размера шрифта в тексте
    //@[ALIAS]
    ALIAS__processEscapeCharacter = _.processEscapeCharacter;
    _.processEscapeCharacter = function(code, textState) {
      if (code === "FS") {
        this.contents.fontSize = this.obtainEscapeParam(textState);
      } else {
        ALIAS__processEscapeCharacter.call(this, code, textState);
      }
    };
  })();
  (function() {    // ■ END Window_Base.coffee
    //---------------------------------------------------------------------------

    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ Spriteset_Map.coffee
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var _;
    
    //@[DEFINES]
    _ = Spriteset_Map.prototype;
    _.findTargetSprite = function(target) {
      return this._characterSprites.find(function(sprite) {
        return sprite.checkCharacter(target);
      });
    };
  })();
  return (function() {    // ■ END Spriteset_Map.coffee
    //---------------------------------------------------------------------------

    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ Sprite_Character.coffee
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var _;
    
    //@[DEFINES]
    _ = Sprite_Character.prototype;
    _.checkCharacter = function(character) {
      return this._character === character;
    };
  })();
});

// ■ END Sprite_Character.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  var alias_SM_processMapTouch, alias_TIOMM;
  //?SMouse better alternative
  if (KDCore.isMZ()) {
    return;
  }
  // * Для ButtonM
  //@[ALIAS]
  alias_SM_processMapTouch = Scene_Map.prototype.processMapTouch;
  Scene_Map.prototype.processMapTouch = function() {
    if ($gameTemp.kdButtonUnderMouse != null) {
      if ($gameTemp.kdButtonUnderMouse.parent == null) {
        return $gameTemp.kdButtonUnderMouse = null;
      } else {

      }
    } else {
      return alias_SM_processMapTouch.call(this);
    }
  };
  //@[ALIAS]
  alias_TIOMM = TouchInput._onMouseMove;
  TouchInput._onMouseMove = function(event) {
    var x, y;
    alias_TIOMM.call(this, event);
    x = Graphics.pageToCanvasX(event.pageX);
    y = Graphics.pageToCanvasY(event.pageY);
    if (Graphics.isInsideCanvas(x, y)) {
      return this._onHover(x, y);
    }
  };
  
  //?NEW, from MZ
  return TouchInput._onHover = function(_x, _y) {
    this._x = _x;
    this._y = _y;
  };
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  var ALIAS__clear, ALIAS__update, _;
  if (KDCore.isMZ()) {
    return;
  }
  //@[DEFINES]
  _ = Input;
  //@[ALIAS]
  ALIAS__clear = _.clear;
  _.clear = function() {
    ALIAS__clear.call(this);
    return this._virtualButton = null;
  };
  //@[ALIAS]
  ALIAS__update = _.update;
  _.update = function() {
    ALIAS__update.call(this);
    if (this._virtualButton == null) {
      return;
    }
    this._latestButton = this._virtualButton;
    this._pressedTime = 0;
    return this._virtualButton = null;
  };
  return _.virtualClick = function(buttonName) {
    return this._virtualButton = buttonName;
  };
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  var ALIAS___startLoading, _;
  // * В версии RPG Maker MZ 1.5.0 появился баг что картинки не успевают прогрузится
  // * Данный фикс, возвращает старое поведение
  if (!KDCore.isMZ()) {
    return;
  }
  //@[DEFINES]
  _ = Bitmap.prototype;
  //@[ALIAS]
  ALIAS___startLoading = _._startLoading;
  return _._startLoading = function() {
    if (Utils.hasEncryptedImages()) {
      ALIAS___startLoading.call(this, ...arguments);
    } else {
      // * Это из RPG Maker MZ до версии 1.5
      this._image = new Image();
      this._image.onload = this._onLoad.bind(this);
      this._image.onerror = this._onError.bind(this);
      this._destroyCanvas();
      this._loadingState = "loading";
      this._image.src = this._url;
    }
  };
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  var alias_WBDTEX_KDCore29122021;
  // * <center>, для RPG Maker MZ и если нету Visu Message Core
  if (KDCore.isMZ()) {
    alias_WBDTEX_KDCore29122021 = Window_Base.prototype.drawTextEx;
    Window_Base.prototype.drawTextEx = function(text, x, y, width) {
      var e, newText;
      try {
        if (Imported.VisuMZ_1_MessageCore !== true) { // * В Visu уже есть <center>
          if (String.any(text) && text.contains("<center>")) {
            if (text[0] === "<" && text[1] === "c") { // * Должен быть в начале строки
              newText = text.replace("<center>", "");
              return this.drawTextExInCenter(newText, x, y, width);
            }
          }
        }
      } catch (error) {
        e = error;
        KDCore.warning(e);
      }
      return alias_WBDTEX_KDCore29122021.call(this, ...arguments);
    };
  }
  //?NEW
  Window_Base.prototype.drawTextExInCenter = function(text, x, y, width, height) {
    var e, newX, newY, textSize;
    try {
      if (KDCore.isMV()) { // * В MV нет поддержки данного метода
        this.drawTextEx(...arguments);
        return;
      }
      textSize = this.textSizeEx(text);
      newX = x + width / 2 - textSize.width / 2;
      if ((height != null) && height > 0) {
        newY = y + height / 2 - textSize.height / 2;
      } else {
        newY = y;
      }
      return this.drawTextEx(text, newX, newY, width);
    } catch (error) {
      e = error;
      KDCore.warning(e);
      return this.drawTextEx(text, x, y, width);
    }
  };
  //?NEW
  Window_Base.prototype.drawTextExWithWordWrap = function(text, x, y, width, maxLines) {
    var maxWidth, wrappedText;
    this.drawTextEx("", 0, 0, 100);
    maxWidth = this.contentsWidth();
    wrappedText = Window_Message.prototype.pWordWrap.call(this, text, width || maxWidth, maxLines);
    return this.drawTextEx(wrappedText, x, y, width);
  };
  //?NEW
  return Window_Message.prototype.pWordWrap = function(text, maxWidth, maxLines) {
    var i, j, k, l, line, lines, newLines, ref, ref1, result, spaceLeft, spaceWidth, wordWidth, wordWidthWithSpace, words;
    lines = text.split('\n');
    maxWidth = maxWidth;
    spaceWidth = this.contents.measureTextWidth(' ');
    result = '';
    newLines = 1;
    for (i = k = 0, ref = lines.length; (0 <= ref ? k < ref : k > ref); i = 0 <= ref ? ++k : --k) {
      spaceLeft = maxWidth;
      line = lines[i];
      words = line.split(' ');
      for (j = l = 0, ref1 = words.length; (0 <= ref1 ? l < ref1 : l > ref1); j = 0 <= ref1 ? ++l : --l) {
        wordWidth = this.contents.measureTextWidth(words[j].replaceAll(/\\C\[\d+\]/g, ""));
        wordWidthWithSpace = wordWidth + spaceWidth;
        if (j === 0 || wordWidthWithSpace > spaceLeft) {
          if (j > 0) {
            if (maxLines === newLines) {
              return result;
            }
            result += '\n';
            newLines++;
          }
          result += words[j];
          spaceLeft = maxWidth - wordWidth;
          if (j === 0 && line.match(/\\n\w*\s*<\s*\\n\[\w*\s*\]\s*>*/gi)) {
            spaceLeft += 200;
          }
        } else {
          spaceLeft -= wordWidthWithSpace;
          result += ' ' + words[j];
        }
      }
      if (i < lines.length - 1) {
        result += '\n';
      }
    }
    return result;
  };
});


// Generated by CoffeeScript 2.6.1
// * Последний файл (после всех классов)
// * Загружает библиотеки
var i, len, lib, ref, text;

if (KDCore._requireLoadLibrary === true) {
  ref = KDCore[KDCore._loader];
  for (i = 0, len = ref.length; i < len; i++) {
    lib = ref[i];
    lib();
  }
  KDCore[KDCore._loader] = [];
  text = "%c  KDCore is loaded " + KDCore.Version;
  console.log(text, 'background: #222; color: #82b2ff');
}

// ==========================================================================
// ==========================================================================

//   END OF PLUGINS CORE LIBRARY
//   (Next code is this plugin code)

// ==========================================================================
// ==========================================================================

//Plugin KDCore builded by PKD PluginBuilder 2.2 - 09.02.2024

// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ API: Phone
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = window.PKD_PhoneMenu;
  _.Show = function(isAnimated = true) {
    var activeUserId;
    if ($gameSystem._pkdPhoneDisabled === true) {
      return;
    }
    activeUserId = $gameSystem.pkdGetActivePhoneUser();
    if ($gameSystem.pkdIsPhoneLocked(activeUserId)) {
      if (!$gameSystem.pkdRequestPhoneUnlock(activeUserId)) {
        SoundManager.playBuzzer();
        return;
      }
    }
    $gameSystem._pkdPhoneDisableStartAnimation = !isAnimated;
    SceneManager.push(PKD_ScenePhone);
  };
  _.ShowInstantly = function() {
    var e;
    try {
      return PKD_PhoneMenu.Show(false);
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  };
  _.OpenApp = function(appId, isAnimated) {
    var e;
    try {
      if (PKD_PhoneMenu.Utils.isPhoneScene()) {
        return this.StartApp(appName);
      } else {
        $gameTemp.pkdPhonePreloadAppAtStartup = appId;
        return this.Show(isAnimated);
      }
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  };
  _.Hide = function() {
    var e;
    try {
      if (PKD_PhoneMenu.Utils.isPhoneScene()) {
        return SceneManager._scene.popScene();
      }
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  };
  _.Disable = function() {
    $gameSystem._pkdPhoneDisabled = true;
    PKD_PhoneMenu.Hide();
  };
  _.Enable = function() {
    return $gameSystem._pkdPhoneDisabled = null;
  };
  _.AddMessage = function(avatar, name, evId, fromMap = false) {
    var e;
    try {
      $gameSystem.pkdAddNewPhoneMessage(avatar, name, evId, fromMap);
      if (KDCore.Utils.isSceneMap()) {
        SceneManager._scene.pkdRefreshPhoneIcon();
      }
      PKD_PhoneMenu.Utils.refreshMessagesAppAlert();
      if (PKD_PhoneMenu.PP.isShowNotifyOnNewMessage()) {
        return PKD_PhoneMenu.Utils.showNewMessageNotify(name);
      }
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  };
  _.DeleteConversation = function(name) {
    var e, history, messages;
    try {
      history = $gameSystem.pkdGetMessagesHistory();
      if (history != null) {
        delete history[name];
      }
      messages = $gameSystem.pkdGetPhoneMessagesList();
      return $gameSystem.pkdSetPhoneMessagesList(messages.filter(function(msg) {
        return msg.name !== name;
      }));
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  };
  _.CreateUser = function(userId, phoneType = null, pinCode = null) {
    var data, e;
    try {
      data = $gameSystem.pkdGetPhoneUserData(userId);
      if (String.any(phoneType)) {
        $gameSystem.pkdSetPhoneType(userId, phoneType);
      }
      if (String.any(pinCode)) {
        $gameSystem.pkdSetPhonePin(userId, pinCode);
      }
      return data;
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  };
  _.SetUser = function(userId) {
    var e;
    try {
      return $gameSystem.pkdSetActivePhoneUser(userId);
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  };
  _.GetUser = function() {
    var e;
    try {
      return $gameSystem.pkdGetActivePhoneUser();
    } catch (error) {
      e = error;
      KDCore.warning(e);
    }
    return "player_01";
  };
  _.SetPlayerUser = function(userId) {
    var e;
    try {
      return $gameSystem.pkdSetPhoneHotkeyUser(userId);
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  };
  _.GetPlayerUser = function() {
    var e;
    try {
      return $gameSystem.pkdGetPhoneHotkeyUser();
    } catch (error) {
      e = error;
      KDCore.warning(e);
    }
    return "player_01";
  };
  _.SetPin = function(userId, pinCode) {
    var e;
    try {
      return $gameSystem.pkdSetPhonePin(userId, pinCode);
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  };
  _.SetPhoneType = function(userId, type) {
    var e;
    try {
      return $gameSystem.pkdSetPhoneType(userId, type);
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  };
  _.GetPhoneType = function(userId = null) {
    var e;
    try {
      return $gameSystem.pkdGetPhoneType(userId);
    } catch (error) {
      e = error;
      KDCore.warning(e);
    }
    return "android";
  };
  _.SetupCharacterProfile = function(userId, settings = {}) {
    var e;
    try {
      if (settings == null) {
        settings = {};
      }
      return $gameSystem.pkdSetupPhoneUserProfile(userId, settings);
    } catch (error) {
      e = error;
      KDCore.warning(e);
    }
    return null;
  };
  _.ConfigureInstagram = function(userId, settings = {}) {
    var e;
    try {
      if (settings == null) {
        settings = {};
      }
      return $gameSystem.pkdConfigureInstagramEnv(userId, settings);
    } catch (error) {
      e = error;
      KDCore.warning(e);
    }
    return null;
  };
  _.OpenInstagram = function(section = "feed", userId = null) {
    var e;
    try {
      if ($gameSystem.pkdOpenInstagramSection(section, userId)) {
        return true;
      }
      return PKD_PhoneMenu.Utils.onInstagramSectionEmpty(section);
    } catch (error) {
      e = error;
      KDCore.warning(e);
    }
    return false;
  };
  _.OpenInstagramProfile = function(targetUserId, section = "feed") {
    var e;
    try {
      if (!String.any(targetUserId)) {
        return false;
      }
      $gameSystem.pkdSetActivePhoneUser(targetUserId);
      return _.OpenInstagram(section, targetUserId);
    } catch (error) {
      e = error;
      KDCore.warning(e);
    }
    return false;
  };
  _.InstagramMenu = function(menu = "main") {
    var context, e;
    try {
      if (!PKD_PhoneMenu.Utils.isPhoneScene()) {
        return false;
      }
      context = SceneManager._scene._currentContext;
      if ((context == null) || !(context instanceof PKD_SpritePhoneAppInstagramContext)) {
        return false;
      }
      if (String(menu).toLowerCase().trim() === "profiles") {
        context.showProfilesMenu();
      } else {
        context.showMainMenu();
      }
      return true;
    } catch (error) {
      e = error;
      KDCore.warning(e);
    }
    return false;
  };
  _.IsHaveNewMessages = function() {
    var e;
    try {
      return $gameSystem.pkdIsHaveAnyUnreadMessage();
    } catch (error) {
      e = error;
      KDCore.warning(e);
    }
    return false;
  };
  _.AddApp = function(name) {
    var apps, e;
    try {
      apps = $gameSystem.pkdGetPhone().apps;
      if (apps.contains(name)) {
        return;
      }
      apps.push(name);
    } catch (error) {
      e = error;
      KDCore.warning(e);
    }
  };
  _.RemoveApp = function(name) {
    var e;
    try {
      $gameSystem.pkdGetPhone().apps.delete(name);
    } catch (error) {
      e = error;
      KDCore.warning(e);
    }
  };
  _.ChangePhone = function(imageName) {
    var e;
    try {
      if (!String.any(imageName)) {
        return;
      }
      return $gameSystem.pkdGetPhone().image = imageName;
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  };
  _.ChangeWallpaper = function(imageName) {
    var e;
    try {
      if (!String.any(imageName)) {
        return;
      }
      return $gameSystem.pkdGetPhone().wallpaper = imageName;
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  };
  _.ChangeMessageWallpaper = function(imageName) {
    var e;
    try {
      if (!String.any(imageName)) {
        return;
      }
      return $gameSystem.pkdGetPhone().messagesWallpaper = imageName;
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  };
  _.ChangeGalleryWallpaper = function(imageName) {
    var e;
    try {
      if (!String.any(imageName)) {
        return;
      }
      return $gameSystem.pkdGetPhone().galleryWallpaper = imageName;
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  };
  _.ShowModalMessage = function(titleText, optionText = "OK") {
    var e;
    try {
      return PKD_PhoneMenu.Utils.RequestModalMenuForData({
        titleText,
        options: [
          {
            title: optionText,
            action: null
          }
        ]
      });
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  };
  // * Example: Phone.ShowModalQuestion("Do you want?", "Yes", 5, "No", "console.log(123)")
  // * Example: Phone.ShowModalQuestion("Load autosave?", "Yes", 0, "No", 0)
  _.ShowModalQuestion = function(titleText, optionAText, optionAScriptOrEv, optionBText, optionBScriptOrEv) {
    var e;
    try {
      return PKD_PhoneMenu.Utils.RequestModalMenuForData({
        titleText,
        options: [
          {
            title: optionAText,
            action: optionAScriptOrEv
          },
          {
            title: optionBText,
            action: optionBScriptOrEv
          }
        ]
      });
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  };
  _.ShowModalMenu = function(titleText, eventId, fromMap = false) {
    var data, e;
    try {
      data = {
        titleText,
        options: PKD_PhoneMenu.Utils.ConvertEventBodyToModalMenuChoices(eventId, fromMap)
      };
      if (data.options != null) {
        //console.log(data)
        return PKD_PhoneMenu.Utils.RequestModalMenuForData(data); // * Can be NULL
      }
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  };
  _.UnlockGalleryPicture = function(pictureName) {
    var e;
    try {
      return $gamePlayer.pkdOpenPhoneGalleryPic(pictureName);
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  };
  //?params: {image: "", text: "", textPos: [0, 0], se: ""}
  _.Notify = function(params) {
    var e;
    try {
      if (params == null) {
        return;
      }
      if (!String.any(params.image)) {
        console.warn("Notify require Image!");
        return;
      }
      if (params.textPos == null) {
        params.textPos = [0, 0];
      }
      if (params.text == null) {
        params.text = "";
      }
      return PKD_PhoneMapNotifyManager.pushToQueue(params);
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  };
  //?Inner
  _.StartApp = function(id) {
    var e;
    try {
      if (!PKD_PhoneMenu.Utils.isPhoneScene()) {
        console.warn("Phone Apps can be started only inside Phone Scene!");
      } else {
        return SceneManager._scene.setPhoneAppContext(id);
      }
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  };
  //?Inner
  _.ExecuteSingleCmdInMessage = function(commandList) {
    var e;
    try {
      if (commandList == null) {
        return;
      }
      if (!PKD_PhoneMenu.Utils.isPhoneScene()) {
        return;
      }
      return SceneManager._scene._startInnerCe(commandList);
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  };
})();

(function() {  // ■ END Phone
  //---------------------------------------------------------------------------

  //╒═════════════════════════════════════════════════════════════════════════╛
  // ■ API: Phone Map
  //╒═════════════════════════════════════════════════════════════════════════╛
  //---------------------------------------------------------------------------
  var _;
  // * Скрипты для иконки телефона на сцене карты
  window.PKD_PhoneMenu.Map = {};
  window.PhoneIcon = window.PKD_PhoneMenu.Map;
  //@[DEFINES]
  _ = window.PKD_PhoneMenu.Map;
  _.Show = function() {
    var e;
    try {
      if (PKD_PhoneMenu.PP.getPhoneSettings().isShowMapIcon !== true) {
        return;
      }
      if ($gameSystem._pkdPhoneIconDisabled === true) {
        return;
      }
      if (!KDCore.Utils.isSceneMap()) {
        return;
      }
      return SceneManager._scene.pkdShowPhoneIcon();
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  };
  _.Hide = function() {
    var e;
    try {
      if (!KDCore.Utils.isSceneMap()) {
        return;
      }
      return SceneManager._scene.pkdHidePhoneIcon();
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  };
  _.Disable = function() {
    $gameSystem._pkdPhoneIconDisabled = true;
    PKD_PhoneMenu.Map.Hide();
  };
  _.Enable = function() {
    return $gameSystem._pkdPhoneIconDisabled = null;
  };
})();

// ■ END API: Phone Map
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
(function() {
  var _;
  //@[DEFINES]
  _ = PKD_PhoneMenu.PP;
  
  // * paramName, defaultValue
  _.getLoaderParam = function() {
    var e;
    try {
      if (this._loader == null) {
        PKD_PhoneMenu.LoadPluginSettings();
      }
      return this._loader.getParam(...arguments);
    } catch (error) {
      e = error;
      KDCore.warning(e);
    }
    return null;
  };
  _.getMessagesMapId = function() {
    return this.getLoaderParam("messagesMapId", 0);
  };
  _.getPhoneSettings = function() {
    return this.getLoaderParam("phoneSettings", {
      openPhoneKey: "p",
      screenSize: {
        w: 278,
        h: 434
      },
      screenOffset: {
        x: 16,
        y: 86
      },
      phonePosition: {
        x: "Graphics.width * 0.5 - 155 * Math.max(1, Math.min(Graphics.width / 1280, Graphics.height / 720))",
        y: "Math.max(20, Graphics.height * 0.03)"
      },
      appsGrid: {
        x: 3,
        y: 4
      },
      isAnimate: true,
      animationSpeed: 24,
      appBackgroundColor: "#FFF",
      image: "PhoneFace",
      wallpaper: "Wallpaper1",
      isShowMapIcon: true,
      mapIconPosition: {
        x: 4,
        y: 120
      },
      uiScale: "Math.max(1, Math.min(Graphics.width / 1280, Graphics.height / 720))"
    });
  };
  _.isUseAsMainMenu = function() {
    return this.getLoaderParam("isUseAsMainMenu", false);
  };
  _.getNotificationSettings = function() {
    return this.getLoaderParam("notifySettings", {
      position: {
        x: "Graphics.width / 2",
        y: 0
      },
      stayTime: 120,
      appearSpeed: 40,
      disappearSpeed: 55,
      moveOutSpeed: 6,
      initialScale: 0.8,
      finalScale: 1.0,
      isMoveDownWhenMoveOut: false,
      defaultFontSize: 18
    });
  };
  _.isShowNotifyOnNewMessage = function() {
    return this.getLoaderParam("isShowNotifyOnNewMsg", true);
  };
  _.getNewMessageNotifySettings = function() {
    return this.getLoaderParam("newMsgNotifyConfig", {
      image: "Notify_NewMessage",
      text: "New message from \\C[1]$1",
      textPos: {
        x: 30,
        y: 40
      },
      se: "Recovery"
    });
  };
  _.getMessagesStyleSettings = function() {
    return this.getLoaderParam("messagesStyle", {
      playerMessagePosition: 'right',
      playerMessageFontSize: 14,
      playerMessageTextColor: "#00ff00",
      playerBackRectColor: "rgba(0,0,0,0)",
      charMessagePosition: 'left',
      charMessageFontSize: 12,
      charMessageTextColor: "#FFFFFF",
      charBackRectColor: "rgba(0,0,0,0.7)"
    });
  };
  _.getPhoneAppNameTextSettings = function() {
    return $ppJson_AppNameTestSettings;
  };
  _.getPhoneDefaultApps = function() {
    // * ID через запятую
    return this.getLoaderParam("phoneDefaultAppsList", "messagesApp, saveApp, loadApp, galleryApp, contactsApp, settingsApp");
  };
  _.getPhoneAppDataById = function(appId) {
    var e, userData;
    try {
      userData = this.getPhoneApps().getById(appId);
      // * Попытка получить стандартное значение
      if (userData == null) {
        userData = this.getDefaultAppDataById(appId);
      }
    } catch (error) {
      e = error;
      KDCore.warning(e);
      return null;
    }
    return userData;
  };
  _.getPhoneApps = function() {
    return this.getLoaderParam("phoneApps", [this.getDefaultAppDataById("messagesApp"), this.getDefaultAppDataById("saveApp"), this.getDefaultAppDataById("loadApp"), this.getDefaultAppDataById("settingsApp"), this.getDefaultAppDataById("galleryApp"), this.getDefaultAppDataById("contactsApp")]);
  };
  _.getGalleryAppSettings = function() {
    return this.getLoaderParam("galleryAppSettings", {
      previewImageHeight: 144,
      gridCols: 2
    });
  };
  _.isBigModeForGallery = function() {
    return this.getLoaderParam("galleryBigMode", true);
  };
  _.isKeepAspectRatioOnPreview = function() {
    return this.getLoaderParam("galleryKeepAspect", true);
  };
  _.getGalleryAppButtonsSettings = function() {
    return this.getLoaderParam("galleryAppButtonsSettings", {
      backButtonIsVisible: true,
      backButtonPosition: {
        x: 2,
        y: 2
      },
      zoomInButtonIsVisible: true,
      zoomInButtonPosition: {
        x: 228,
        y: 2
      }
    });
  };
  _.getGalleryItems = function() {
    return this.getLoaderParam("galleryItems", []);
  };
  _.getModalMenuSettings = function() {
    return this.getLoaderParam("modalMenuSettings", {
      width: 200,
      optionLineHeight: 40,
      titleHeight: 60,
      padding: 10,
      menuColor: "#FFFFFF"
    });
  };
  _.getContactsItems = function() {
    return this.getLoaderParam("contacts", []);
  };
  _.getCustomAppContexts = function() {
    return this.getLoaderParam("customContext", []);
  };
  // * Update 1.1 ====================================================================
  _.isUseLegacyMessageScreen = function() {
    return !this.getLoaderParam("isUseNewMessageScreen", true);
  };
  _.getNewMessagesAppSettings = function() {
    return this.getLoaderParam("newMessagesAppSettings", {
      defaultMessageHeight: 30,
      spaceBetweenMessages: 6,
      nextMessageShowDelayMs: 400,
      defaultMessagesFont: {
        face: null,
        size: 14,
        italic: false
      },
      defaultChoiceTextFont: {
        face: null,
        size: 16,
        italic: false
      },
      addMessageSE: "Cursor3"
    });
  };
  _.getNewMessageNPCMessageConfig = function() {
    return this.getLoaderParam("newNPCMessageConfig", {
      image: "messageBackground1",
      tx: 6,
      ty: 3,
      dx: 0
    });
  };
  _.getNewMessagePlayerMessageConfig = function() {
    return this.getLoaderParam("newPlayerMessageConfig", {
      image: "messageBackground0",
      tx: 116,
      ty: 3,
      dx: 0
    });
  };
  // * Update 1.2 ====================================================================
  _.getSettingsAppOptions = function() {
    return this.getLoaderParam("settingsAppOptionsList", [
      {
        type: "switch",
        position: {
          x: 200,
          y: 8
        },
        titleImg: "optionTitle_alwaysDash",
        titlePosition: {
          x: 20,
          y: 10
        },
        configManagerField: "alwaysDash",
        condition: ""
      },
      {
        type: "switch",
        position: {
          x: 200,
          y: 46
        },
        titleImg: "optionTitle_commandRemember",
        titlePosition: {
          x: 20,
          y: 48
        },
        configManagerField: "commandRemember",
        condition: ""
      },
      {
        type: "switch",
        position: {
          x: 200,
          y: 84
        },
        titleImg: "optionTitle_touchUI",
        titlePosition: {
          x: 20,
          y: 86
        },
        configManagerField: "touchUI",
        condition: "KDCore.isMZ()"
      },
      {
        type: "slider",
        position: {
          x: 148,
          y: 182
        },
        titleImg: "optionTitle_bgmVolume",
        titlePosition: {
          x: 4,
          y: 180
        },
        configManagerField: "bgmVolume",
        condition: ""
      },
      {
        type: "slider",
        position: {
          x: 148,
          y: 232
        },
        titleImg: "optionTitle_bgsVolume",
        titlePosition: {
          x: 4,
          y: 230
        },
        configManagerField: "bgsVolume",
        condition: ""
      },
      {
        type: "slider",
        position: {
          x: 148,
          y: 282
        },
        titleImg: "optionTitle_meVolume",
        titlePosition: {
          x: 4,
          y: 280
        },
        configManagerField: "meVolume",
        condition: ""
      },
      {
        type: "slider",
        position: {
          x: 148,
          y: 332
        },
        titleImg: "optionTitle_meVolume",
        titlePosition: {
          x: 4,
          y: 330
        },
        configManagerField: "meVolume",
        condition: ""
      }
    ]);
  };
})();


// Generated by CoffeeScript 2.6.1
var PKD_SpritePhoneAppContext;

PKD_SpritePhoneAppContext = class PKD_SpritePhoneAppContext extends KDCore.Sprite {
  constructor() {
    super();
    this._appData = this._loadAppData();
    this._scaleFactor = 0.3;
    this._isReady = false;
    this._create();
    this._createContent();
    this._animateAppear();
  }

  _loadAppData() {
    return {
      name: "App"
    };
  }

  backHandler(phone) {
    return phone != null ? phone.closeAppContext() : void 0;
  }

  onClosing() {}

  update() {
    super.update();
    if (this._changer != null) {
      this._updateAnimation();
    }
    if (this._isReady === true) {
      return this._updateInteractions();
    }
  }

  _updateAnimation() {
    this._changer.update();
    return this._fitContextBackground();
  }

  _updateInteractions() {}

  //TODO:
  getTopHeaderText() {
    return this._appData.name;
  }

  screenSize() {
    var screenSize;
    ({screenSize} = PKD_PhoneMenu.PP.getPhoneSettings());
    return screenSize;
  }

  getAppRect() {
    return PKD_PhoneMenu.Utils.getAppRect();
  }

  _create() {
    var screenSize;
    ({screenSize} = PKD_PhoneMenu.PP.getPhoneSettings());
    this._contextBack = new KDCore.Sprite(this._defaultAppBackgroundBitmap());
    this._contextBack.opacity = 0;
    this._contextBack.anchor.set(0.5);
    this._contextBack.scale.set(0.3);
    this._contextBack.x = screenSize.w / 2;
    this._contextBack.y = screenSize.h / 2;
    this.addChild(this._contextBack);
    return this._setupContextBackgroundBounds();
  }

  _setupContextBackgroundBounds() {
    var screenSize;
    ({screenSize} = PKD_PhoneMenu.PP.getPhoneSettings());
    this._contextBounds = {
      w: screenSize.w,
      h: screenSize.h
    };
    if (this._contextMask == null) {
      this._contextMask = new Sprite(new Bitmap(screenSize.w, screenSize.h));
      this._contextMask.bitmap.fillAll("#FFFFFF");
      this.addChild(this._contextMask);
      this._contextBack.mask = this._contextMask;
    }
    return this._fitContextBackground();
  }

  _fitContextBackground() {
    var b, bitmap, h, scale, sourceRect, srcH, srcW, w, yShift;
    bitmap = this._contextBack.bitmap;
    if ((bitmap == null) || !bitmap.isReady()) {
      if (bitmap != null) {
        bitmap.addLoadListener((() => {
          return this._fitContextBackground();
        }));
      }
      return;
    }
    ({w, h} = this._contextBounds);
    this._contextBack.anchor.set(0.5);
    this._contextBack.x = w / 2;
    yShift = this._getTemplateVerticalShift();
    this._contextBack.y = h / 2 + yShift;
    if (bitmap.width <= 0 || bitmap.height <= 0) {
      return;
    }
    sourceRect = this._resolvePhoneTemplateSourceRect(bitmap);
    srcW = sourceRect.sw;
    srcH = sourceRect.sh;
    scale = Math.max(w / srcW, h / srcH);
    this._contextBack.setFrame(sourceRect.sx, sourceRect.sy, srcW, srcH);
    this._contextBack.scale.set(scale * this._scaleFactor);
    b = this._contextBack.bitmap;
    if ((b != null) && b.isReady()) {
      return this._contextBack.setFrame(sourceRect.sx, sourceRect.sy, srcW, srcH);
    }
  }

  _getTemplateVerticalShift() {
    return -10;
  }

  _resolvePhoneTemplateSourceRect(bitmap) {
    var screenOffset, screenSize, sourceRect, x, y;
    sourceRect = {
      sx: 0,
      sy: 0,
      sw: bitmap.width,
      sh: bitmap.height
    };
    if (!this._isPhoneTemplateBitmap(bitmap)) {
      return sourceRect;
    }
    ({screenOffset, screenSize} = PKD_PhoneMenu.PP.getPhoneSettings());
    ({x, y} = screenOffset);
    x = eval(x);
    y = eval(y);
    sourceRect.sx = Math.max(0, Math.floor(x));
    sourceRect.sy = Math.max(0, Math.floor(y));
    sourceRect.sw = Math.min(bitmap.width - sourceRect.sx, Math.floor(screenSize.w));
    sourceRect.sh = Math.min(bitmap.height - sourceRect.sy, Math.floor(screenSize.h));
    return sourceRect;
  }

  _isPhoneTemplateBitmap(bitmap) {
    var ratio, templateRatio;
    if ((bitmap == null) || bitmap.width <= 0 || bitmap.height <= 0) {
      return false;
    }
    ratio = bitmap.width / bitmap.height;
    templateRatio = 310 / 585;
    return bitmap.width >= 310 && bitmap.height >= 585 && Math.abs(ratio - templateRatio) < 0.04;
  }

  _defaultAppBackgroundBitmap() {
    var appBackgroundColor, b, h, screenSize, w;
    ({screenSize, appBackgroundColor} = PKD_PhoneMenu.PP.getPhoneSettings());
    ({w, h} = screenSize);
    b = new Bitmap(w, h);
    b.fillAll(appBackgroundColor);
    return b;
  }

  _animateAppear() {
    this._contextBack.appear(45);
    this._changer = new KDCore.Changer(this);
    this._changer.change('_scaleFactor').from(0.3).to(1.0).step(0.15).done(() => {
      return this.onAnimatinDone();
    });
    this._changer.start();
  }

  onAnimatinDone() {
    this._isReady = true;
    this._changer = null;
    this._contextBack.opacity = 255;
    this._fitContextBackground();
    return setTimeout((() => {
      var e;
      try {
        return this.showContent();
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    }), 100);
  }

  _createContent() {} // * FOR CHILDRENS

  showContent() {} // * FOR CHILDRENS

};


// Generated by CoffeeScript 2.6.1
var PKD_SpritePhoneItem_Slider;

PKD_SpritePhoneItem_Slider = class PKD_SpritePhoneItem_Slider extends KDCore.Sprite {
  constructor(config) {
    super();
    this.config = config;
    this.varId = this.config.variableId;
    this._create();
    return;
  }

  getVariableValue() {
    if (this.varId > 0) {
      return KDCore.Utils.getVar(this.varId).clamp(0, 100);
    } else {
      return 0;
    }
  }

  setVariableValue(newValue) {
    if (this.varId > 0) {
      return KDCore.Utils.setVar(this.varId, newValue);
    }
  }

  setValue(percent, isOnlyValue = true) {
    if (this.sliderKnob == null) {
      return;
    }
    if (percent > 1) {
      //console.log("VALUE OF SLIDER " + percent)
      percent / 100;
    }
    this.sliderKnob.x = this._convertPercentToMoveX(percent);
    if (isOnlyValue !== true && this.varId > 0) {
      this.setVariableValue(Math.round(percent * 100).clamp(0, 100));
    }
  }

  update() {
    super.update();
    return this._updateMouseControl();
  }

  _create() {
    return this._createSliderBack();
  }

  _createSliderBack() {
    var backImage, sliderBackBitmap;
    backImage = this.config.sliderBackImg;
    sliderBackBitmap = ImageManager.loadPictureForPhone(backImage);
    if (sliderBackBitmap.isReady()) {
      this._onSliderLoaded(sliderBackBitmap);
    } else {
      KDCore.Utils.loadImageAsync("pPhoneMenu", backImage).then(this._onSliderLoaded.bind(this));
    }
  }

  _onSliderLoaded(bitmap) {
    this.sliderBack = new KDCore.Sprite(bitmap);
    this._maxMoveWidth = bitmap.width;
    this.addChild(this.sliderBack);
    return this._createSliderKnob();
  }

  _createSliderKnob() {
    this.knobContainer = new Sprite();
    this.knobContainer.x -= 14;
    this.knobContainer.y -= 8;
    this.sliderKnob = new KDCore.Sprite(ImageManager.loadPictureForPhone(this.config.sliderKnobImg));
    this.sliderBack.addChild(this.knobContainer);
    this.knobContainer.addChild(this.sliderKnob);
    return this._readInitialValue();
  }

  _readInitialValue() {
    if (!(this.varId > 0)) {
      return;
    }
    return this.setValue(this.getVariableValue() / 100, true);
  }

  _globalStartX() {
    return KDCore.SDK.toGlobalCoord(this.sliderBack, 'x');
  }

  _globalEndX() {
    return this._globalStartX() + this._maxMoveWidth;
  }

  _convertPercentToMoveX(percent) {
    var current, single;
    single = this._maxMoveWidth / 100;
    current = single * (percent * 100);
    return current;
  }

  _percentPoint(x) {
    var dx;
    x = TouchInput.x;
    if (x < this._globalStartX()) {
      return 0;
    } else if (x > this._globalEndX()) {
      return 1;
    } else {
      dx = x - this._globalStartX();
      return dx / this._maxMoveWidth;
    }
  }

  _updateMouseControl() {
    if (this.sliderKnob == null) {
      return;
    }
    if (!this.visible) {
      return;
    }
    if (TouchInput.isPressed()) {
      if (this.sliderKnob.isUnderMouse() || this._knobPressed === true) {
        this._knobPressed = true;
        this.setValue(this._percentPoint(TouchInput.x), false);
        return;
      }
    } else {
      this._knobPressed = false;
    }
    if (TouchInput.isTriggered()) {
      if (this.sliderBack.isUnderMouse()) {
        this.setValue(this._percentPoint(TouchInput.x), false);
      }
    }
  }

};


// Generated by CoffeeScript 2.6.1
var PKD_SpritePhoneItem_SwitchButton;

PKD_SpritePhoneItem_SwitchButton = class PKD_SpritePhoneItem_SwitchButton extends KDCore.Sprite {
  constructor(config) {
    super();
    this.config = config;
    this._create();
    return;
  }

  getValue() {
    return $gameSwitches.value(this.config.switchId);
  }

  update() {
    super.update();
    return this._updateMouseControl();
  }

  _updateMouseControl() {
    if (!this.visible) {
      return;
    }
    if (TouchInput.isTriggered()) {
      if (this._buttonSpr.isUnderMouse()) {
        return this.switchValue();
      }
    }
  }

  switchValue() {
    var currentValue, newValue;
    currentValue = this.getValue();
    newValue = !currentValue;
    return this.setValue(newValue);
  }

  setValue(value) {
    $gameSwitches.setValue(this.config.switchId, value);
    return this._refreshState();
  }

  _create() {
    this._buttonSpr = new KDCore.Sprite();
    this._stateOnBitmap = ImageManager.loadPictureForPhone(this.config.onImage);
    this._stateOffBitmap = ImageManager.loadPictureForPhone(this.config.offImage);
    this.addChild(this._buttonSpr);
    this._refreshState();
  }

  _refreshState() {
    var value;
    value = this.getValue();
    if (value === true) {
      this._buttonSpr.bitmap = this._stateOnBitmap;
    } else {
      this._buttonSpr.bitmap = this._stateOffBitmap;
    }
  }

};


// Generated by CoffeeScript 2.6.1
(function() {
  var _;
  //$[ENCODE]

  //@[DEFINES]
  _ = PKD_PhoneMenu.Utils;
  _.makeNewPhone = function() {
    var apps, e, image, wallpaper;
    ({image, wallpaper} = PKD_PhoneMenu.PP.getPhoneSettings());
    try {
      apps = PKD_PhoneMenu.PP.getPhoneDefaultApps().split(",").map(function(i) {
        return i.trim();
      });
    } catch (error) {
      e = error;
      apps = [];
      KDCore.warning(e);
    }
    return {
      isEnabled: true,
      image,
      wallpaper,
      apps
    };
  };
  _.refreshMessagesAppAlert = function() {
    var app, e;
    try {
      app = PKD_PhoneMenu.PP.getPhoneAppDataById("messagesApp");
      if ((app != null) && app.alertSwitchId > 0) {
        return $gameSwitches.setValue(app.alertSwitchId, PKD_PhoneMenu.IsHaveNewMessages());
      }
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  };
  _.isPhoneScene = function() {
    return !SceneManager.isSceneChanging() && SceneManager._scene instanceof PKD_ScenePhone;
  };
  _.screenSize = function() {
    return PKD_PhoneMenu.PP.getPhoneSettings().screenSize;
  };
  _.showNewMessageNotify = function(name) {
    var e, image, se, text, textPos;
    try {
      ({image, text, textPos, se} = PKD_PhoneMenu.PP.getNewMessageNotifySettings());
      if (!String.any(name)) {
        name = "";
      }
      textPos = [textPos.x, textPos.y];
      text = text.replace("$1", name);
      return PKD_PhoneMenu.Notify({image, text, textPos, se});
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  };
  _.isSwitchIsTRUE = function(switchId) {
    var e;
    if (switchId == null) {
      return true;
    }
    if (switchId === 0) {
      return true;
    }
    try {
      return $gameSwitches.value(switchId) === true;
    } catch (error) {
      e = error;
      KDCore.warning(e);
    }
    return false;
  };
  _.getAllGalleryAlbums = function() {
    var albumName, albums, image, j, len, openedImages;
    openedImages = this.getAllOpenedImagesInGallery();
    albums = [];
    for (j = 0, len = openedImages.length; j < len; j++) {
      image = openedImages[j];
      if (image == null) {
        continue;
      }
      ({albumName} = image);
      if (String.any(albumName) && !albums.contains(albumName)) {
        albums.push(image.albumName);
      }
    }
    return albums;
  };
  _.getAllContacts = function() {
    var data, e;
    try {
      data = PKD_PhoneMenu.PP.getContactsItems();
      data = data.filter((item) => {
        return (item != null) && this.isSwitchIsTRUE(item.enabledSwitchId);
      });
      return data;
    } catch (error) {
      e = error;
      KDCore.warning(e);
      return [];
    }
  };
  _.getAppRect = function() {
    var e, h, screenSize, w;
    try {
      ({screenSize} = PKD_PhoneMenu.PP.getPhoneSettings());
      ({w, h} = screenSize);
      return {
        x: 0,
        y: 0,
        width: w,
        height: h
      };
    } catch (error) {
      e = error;
      KDCore.warning(e);
      return {
        x: 0,
        y: 0,
        width: 200,
        height: 400
      };
    }
  };
  _.getAllOpenedImagesInGallery = function() {
    var allImages, e, imageData, j, len, openedImages;
    try {
      allImages = PKD_PhoneMenu.PP.getGalleryItems();
      openedImages = [];
      for (j = 0, len = allImages.length; j < len; j++) {
        imageData = allImages[j];
        if (!this.isGalleryItemVisibleForCurrentUser(imageData)) {
          continue;
        }
        if (this.isSwitchIsTRUE(imageData.enabledSwitchId)) {
          openedImages.push(imageData);
        } else if (this.isGalleryItemPicOpensDynamic(imageData.picName)) {
          openedImages.push(imageData);
        }
      }
      return openedImages;
    } catch (error) {
      e = error;
      KDCore.warning(e);
      return [];
    }
  };
  _.isGalleryItemVisibleForCurrentUser = function(imageData) {
    var activeUserId, e, ownerId;
    try {
      if ((imageData == null) || !String.any(imageData.ownerId)) {
        return true;
      }
      ownerId = String(imageData.ownerId).trim();
      if (!String.any(ownerId)) {
        return true;
      }
      activeUserId = $gameSystem.pkdGetActivePhoneUser();
      return ownerId === activeUserId;
    } catch (error) {
      e = error;
      KDCore.warning(e);
    }
    return true;
  };
  _.isGalleryItemPicOpensDynamic = function(picName) {
    var e, openedPics;
    try {
      openedPics = $gamePlayer.pkdGetOpenedPhoneGalleryPics();
      return openedPics.contains(picName);
    } catch (error) {
      e = error;
      KDCore.warning(e);
    }
    return false;
  };
  _.getOpenedImagesCountPerAlbum = function(albumName) {
    var count, e, image, j, len, openedImages;
    try {
      openedImages = PKD_PhoneMenu.Utils.getAllOpenedImagesInGallery();
      count = 0;
      for (j = 0, len = openedImages.length; j < len; j++) {
        image = openedImages[j];
        if ((image != null) && image.albumName === albumName) {
          count++;
        }
      }
      return count;
    } catch (error) {
      e = error;
      KDCore.warning(e);
      return 0;
    }
  };
  _.isSystemApp = function(appId) {
    return ["modalMenu", "messagesApp", "galleryApp", "contactsApp", "settingsApp", "socialApp", "instagramApp"].contains(appId);
  };
  _.getSystemAppContext = function(appId) {
    switch (appId) {
      case "modalMenu":
        return new PKD_SpritePhoneModalMenuContext();
      case "messagesApp":
        return new PKD_SpritePhoneAppMessagesContext();
      case "galleryApp":
        return new PKD_SpritePhoneAppGalleryContext();
      case "contactsApp":
        return new PKD_SpritePhoneAppContactsContext();
      case "settingsApp":
        return new PKD_SpritePhoneAppSettingsContext();
      case "socialApp":
      case "instagramApp":
        return new PKD_SpritePhoneAppInstagramContext();
      default:
        return new PKD_SpritePhoneAppContext();
    }
  };
  _.getUserAppContextData = function(appId) {
    var e, userContext;
    try {
      userContext = PKD_PhoneMenu.PP.getCustomAppContexts();
      return userContext.getById(appId);
    } catch (error) {
      e = error;
      KDCore.warning(e);
      return null;
    }
  };
  _.GetAppData = function(appId) {
    return PKD_PhoneMenu.PP.getPhoneAppDataById(appId);
  };
  // * not public
  _.SetPhoneTopText = function(text) {
    var e;
    try {
      if (!PKD_PhoneMenu.Utils.isPhoneScene()) {
        return;
      }
      return SceneManager._scene.drawTopText(text);
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  };
  _.onInstagramSectionEmpty = function(section) {
    var context, e, sectionName;
    try {
      sectionName = String(section || "feed");
      if (!PKD_PhoneMenu.Utils.isPhoneScene()) {
        return false;
      }
      context = SceneManager._scene._currentContext;
      if ((context != null) && (context.onInstagramSectionEmpty != null)) {
        context.onInstagramSectionEmpty(sectionName);
      }
      return true;
    } catch (error) {
      e = error;
      KDCore.warning(e);
    }
    return false;
  };
  // Support for \V[n] \N[n] \P[n] \G
  _.ConvertEscapeCodes = function(text) {
    var actorName, e, partyMemberName;
    try {
      if (!String.any(text)) {
        return text;
      }
      text = text.replace(/\\/g, "\x1b");
      text = text.replace(/\x1b\x1b/g, "\\");
      // \V[n]
      while (text.match(/\x1bV\[(\d+)\]/gi)) {
        text = text.replace(/\x1bV\[(\d+)\]/gi, function(_, p1) {
          return $gameVariables.value(parseInt(p1));
        });
      }
      actorName = function(n) {
        return Window_Base.prototype.actorName.call(this, n);
      };
      // \N[n]
      text = text.replace(/\x1bN\[(\d+)\]/gi, function(_, p1) {
        return actorName(parseInt(p1));
      });
      partyMemberName = function(n) {
        return Window_Base.prototype.partyMemberName.call(this, n);
      };
      // \P[n]
      text = text.replace(/\x1bP\[(\d+)\]/gi, function(_, p1) {
        return partyMemberName(parseInt(p1));
      });
      // \G
      text = text.replace(/\x1bG/gi, TextManager.currencyUnit);
    } catch (error) {
      e = error;
      KDCore.warning(e);
    }
    return text;
  };
  _.RequestModalMenuForData = function(data) {
    var e;
    try {
      $gameTemp._pkdPhoneModalMenuData = data;
      if (PKD_PhoneMenu.Utils.isPhoneScene()) {
        return Phone.StartApp("modalMenu");
      }
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  };
  _.ConvertEventBodyToModalMenuChoices = function(evId, fromMap) {
    var action, e, eventBodyList, index, innerCommands, item, j, k, len, len1, options, optionsActions, optionsTitles, startCollectInnerCommands, title;
    try {
      if (evId <= 0) {
        return null;
      }
      eventBodyList = null;
      if (fromMap === true) {
        if (DataManager.pkdIsPhoneMessagesMapIsValid()) {
          if ($dataPKDPMsgMap.events[evId] != null) {
            eventBodyList = $dataPKDPMsgMap.events[evId].pages[0].list;
          }
        }
      } else {
        if (KDCore.Utils.isValidCE(evId)) {
          eventBodyList = $dataCommonEvents[evId].list;
        }
      }
      if (eventBodyList == null) {
        return null;
      }
      optionsTitles = [];
      optionsActions = [];
      startCollectInnerCommands = false;
      innerCommands = [];
      for (j = 0, len = eventBodyList.length; j < len; j++) {
        item = eventBodyList[j];
        if (item == null) {
          continue;
        }
        if (startCollectInnerCommands === true) {
          if (item.code === 0) {
            startCollectInnerCommands = false;
            optionsActions.push(innerCommands);
          } else {
            if (item.indent === 1) {
              innerCommands.push(item);
            }
          }
        } else if (item.code === 402) {
          optionsTitles.push(item.parameters[1]);
          innerCommands = [];
          startCollectInnerCommands = true;
        }
      }
      options = [];
      for (index = k = 0, len1 = optionsTitles.length; k < len1; index = ++k) {
        title = optionsTitles[index];
        action = optionsActions[index];
        if (String.any(title) && (action != null)) {
          options.push({title, action});
        }
      }
      
      // * Max 6
      return options.slice(0, 6);
    } catch (error) {
      e = error;
      KDCore.warning(e);
    }
    return null;
  };
  // * Завершение сцены телефона и запуск CE (из User App)
  _.startCEFromUserContext = function(ce) {
    var e;
    try {
      if (!this.isPhoneScene()) {
        return;
      }
      return SceneManager._scene._startCommonEvent(ce, true);
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  };
  // * Запуск общего события (внутри) User App
  _.startCEInUserContext = function(ce) {
    var e;
    try {
      if (!this.isPhoneScene()) {
        return;
      }
      return SceneManager._scene._startCommonEvent(ce, false);
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  };
  // * Переход из одного UserApp в другой контекст (user context also)
  _.forwardUserContext = function(contextId) {
    var e;
    try {
      if ($gameTemp.__pUserCustomContextData == null) {
        return;
      }
      if (!this.isPhoneScene()) {
        return;
      }
      // * If same, then just reload
      if ($gameTemp.__pUserCustomContextData.id === contextId) {
        $gameTemp._pPreviousAppContext = null;
      } else {
        //TODO: Better as Array, becouse Forward -> forward -> ...
        $gameTemp._pPreviousAppContext = $gameTemp.__pUserCustomContextData;
      }
      return SceneManager._scene.setPhoneAppContext(contextId);
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  };
})();


// Generated by CoffeeScript 2.6.1
//TODO: Move to KDCore!
var PKD_ButtonsListChoice;

PKD_ButtonsListChoice = class PKD_ButtonsListChoice {
  constructor() {
    this._buttons = Array.from(arguments);
    this._lastCursorPosXY = null;
    this._selectedIndex = -1;
    return;
  }

  inKeyboardMode() {
    return this._lastCursorPosXY != null;
  }

  addButtons() {
    return this._buttons.push(...arguments);
  }

  currentSelected() {
    if (this._selectedIndex >= 0 && this._selectedIndex < this._buttons.length) {
      return this._buttons[this._selectedIndex];
    } else {
      return null;
    }
  }

  update() {
    if (this.inKeyboardMode()) {
      if (this._isShouldOutFromKeyboardControl()) {
        this._outFromKeyboardControl();
        return;
      }
      this._updateKeyboardControls();
    } else {
      if (this._isShouldInToKeyboardMode()) {
        this._inToKeyboardMode();
      }
    }
  }

  _isShouldOutFromKeyboardControl() {
    return TouchInput.x !== this._lastCursorPosXY.x || TouchInput.y !== this._lastCursorPosXY.y;
  }

  _outFromKeyboardControl() {
    this._lastCursorPosXY = null;
    this._selectedIndex = -1;
    this._disableManualSelectForButtons();
    this._reselectButton();
  }

  _disableManualSelectForButtons() {
    var b, i, len, ref, results;
    ref = this._buttons;
    results = [];
    for (i = 0, len = ref.length; i < len; i++) {
      b = ref[i];
      results.push(b != null ? b.disableManualHover() : void 0);
    }
    return results;
  }

  _enableManualSelectForButtons() {
    var b, i, len, ref, results;
    ref = this._buttons;
    results = [];
    for (i = 0, len = ref.length; i < len; i++) {
      b = ref[i];
      results.push(b != null ? b.setManualHover() : void 0);
    }
    return results;
  }

  _reselectButton() {
    var b, i, len, ref, results;
    ref = this._buttons;
    results = [];
    for (i = 0, len = ref.length; i < len; i++) {
      b = ref[i];
      if (b.isMouseIn()) {
        results.push(b != null ? b._updateHover() : void 0);
      } else {
        results.push(void 0);
      }
    }
    return results;
  }

  _isShouldInToKeyboardMode() {
    return Input.isTriggered('up') || Input.isTriggered('down');
  }

  _inToKeyboardMode() {
    var ref, x, y;
    ({x, y} = TouchInput);
    this._lastCursorPosXY = {x, y};
    this._selectedIndex = this._getCurrentSelectedIndex();
    this._enableManualSelectForButtons();
    if ((ref = this.currentSelected()) != null) {
      ref.setManualSelected(true);
    }
  }

  _getCurrentSelectedIndex() {
    var b, i, index, len, ref;
    ref = this._buttons;
    for (index = i = 0, len = ref.length; i < len; index = ++i) {
      b = ref[index];
      if (b.isMouseIn()) {
        return index;
      }
    }
    return 0;
  }

  _updateKeyboardControls() {
    if (Input.isTriggered('up')) {
      this._moveUp();
    } else if (Input.isTriggered('down')) {
      this._moveDown();
    } else if (Input.isTriggered('ok')) {
      this._pressOnButton();
    }
  }

  _moveUp() {
    var ref;
    this._resetManualSelection();
    if (this._selectedIndex < 0) {
      this._selectedIndex = 0;
    } else {
      this._selectedIndex--;
    }
    if (this.currentSelected() == null) {
      this._selectedIndex = this._buttons.length - 1;
    }
    if ((ref = this.currentSelected()) != null) {
      ref.setManualSelected(true);
    }
    Input.clear();
  }

  _resetManualSelection() {
    var b, i, len, ref, results;
    ref = this._buttons;
    results = [];
    for (i = 0, len = ref.length; i < len; i++) {
      b = ref[i];
      results.push(b != null ? b.setManualSelected(false) : void 0);
    }
    return results;
  }

  _moveDown() {
    var ref;
    this._resetManualSelection();
    this._selectedIndex++;
    if (this.currentSelected() == null) {
      this._selectedIndex = 0;
    }
    if ((ref = this.currentSelected()) != null) {
      ref.setManualSelected(true);
    }
    Input.clear();
  }

  _pressOnButton() {
    var ref;
    if ((ref = this.currentSelected()) != null) {
      ref.click();
    }
    Input.clear();
    TouchInput.clear();
  }

};


// Generated by CoffeeScript 2.6.1
(function() {
  var _;
  //@[DEFINES]
  _ = PKD_PhoneMenu.PP;
  _.getDefaultAppDataById = function(appId) {
    var methodName;
    methodName = "_get_" + appId + "_Data";
    if (this[methodName] != null) {
      return this[methodName]();
    } else {
      return null;
    }
  };
  _._get_messagesApp_Data = function() {
    return {
      id: "messagesApp",
      name: "Messages",
      icon: "AppIcon_Messages",
      visibleSwitchId: 0,
      enabledSwitchId: 0,
      commonEventId: "Phone.StartApp('messagesApp')",
      isOuterStart: false,
      alertSwitchId: 1
    };
  };
  _._get_saveApp_Data = function() {
    return {
      id: "saveApp",
      name: "Save",
      icon: "AppIcon_SaveGame",
      visibleSwitchId: 0,
      enabledSwitchId: 0,
      commonEventId: "SceneManager.push(Scene_Save)",
      isOuterStart: false,
      alertSwitchId: 2
    };
  };
  _._get_loadApp_Data = function() {
    return {
      id: "loadApp",
      name: "Load",
      icon: "AppIcon_LoadGame",
      visibleSwitchId: 0,
      enabledSwitchId: 0,
      commonEventId: "SceneManager.push(Scene_Load)",
      isOuterStart: false,
      alertSwitchId: 0
    };
  };
  _._get_settingsApp_Data = function() {
    return {
      id: "settingsApp",
      name: "Settings",
      icon: "AppIcon_Settings",
      visibleSwitchId: 0,
      enabledSwitchId: 0,
      commonEventId: "SceneManager.push(Scene_Options)",
      isOuterStart: false,
      alertSwitchId: 0
    };
  };
  _._get_galleryApp_Data = function() {
    return {
      id: "galleryApp",
      name: "Gallery",
      icon: "AppIcon_Gallery",
      visibleSwitchId: 0,
      enabledSwitchId: 0,
      commonEventId: "Phone.StartApp('galleryApp')",
      isOuterStart: false,
      alertSwitchId: 0
    };
  };
  _._get_contactsApp_Data = function() {
    return {
      id: "contactsApp",
      name: "Contacts",
      icon: "AppIcon_Contacts",
      visibleSwitchId: 0,
      enabledSwitchId: 0,
      commonEventId: "Phone.StartApp('contactsApp')",
      isOuterStart: false,
      alertSwitchId: 0
    };
  };
  _._get_socialApp_Data = function() {
    return {
      id: "socialApp",
      name: "Instagram",
      icon: "AppIcon_Contacts",
      visibleSwitchId: 0,
      enabledSwitchId: 0,
      commonEventId: "Phone.StartApp('instagramApp')",
      isOuterStart: false,
      alertSwitchId: 0
    };
  };
  _._get_instagramApp_Data = function() {
    return this._get_socialApp_Data();
  };
})();


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ DataManager.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__loadDataFile, ALIAS__loadDatabase, _;
  //@[DEFINES]
  _ = DataManager;
  DataManager._databaseFiles.push({
    name: "$ppJson_AppNameTestSettings",
    src: "PKD_PhoneMenu/PhoneAppNameTextSettings.json"
  }, {
    name: "$ppJson_ModalMenuOptionSettings",
    src: "PKD_PhoneMenu/PhoneModalMenuOptionTextSettings.json"
  }, {
    name: "$ppJson_ModalMenuTitleTextSettings",
    src: "PKD_PhoneMenu/PhoneModalMenuTitleTextSettings.json"
  });
  //@[ALIAS]
  ALIAS__loadDataFile = _.loadDataFile;
  _.loadDataFile = function(name, src) {
    if (src.contains("Phone")) {
      src = src.replace("Test_", "");
    }
    return ALIAS__loadDataFile.call(this, name, src);
  };
  
  //@[ALIAS]
  ALIAS__loadDatabase = _.loadDatabase;
  _.loadDatabase = function() {
    var e;
    ALIAS__loadDatabase.call(this);
    try {
      return this.pkdLoadPhoneMessagesMap();
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  };
})();

// ■ END DataManager.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ DataManager.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = DataManager;
  _.pkdIsPhoneMessagesMapIsValid = function() {
    return typeof $dataPKDPMsgMap !== "undefined" && $dataPKDPMsgMap !== null;
  };
  _.pkdLoadPhoneMessagesMap = function() {
    var filename, mapId;
    window.$dataPKDPMsgMap = null;
    mapId = PKD_PhoneMenu.PP.getMessagesMapId();
    if (!(mapId > 0)) {
      return;
    }
    filename = 'Map%1.json'.format(mapId.padZero(3));
    this.loadDataFile('$dataPKDPMsgMap', filename);
  };
})();

// ■ END DataManager.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Player.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__update, _;
  //@[DEFINES]
  _ = Game_Player.prototype;
  //@[ALIAS]
  ALIAS__update = _.update;
  _.update = function() {
    ALIAS__update.call(this, ...arguments);
    if (this.pIsCanOpenPhoneNow()) {
      $gameSystem.pkdSetActivePhoneUser($gameSystem.pkdGetPhoneHotkeyUser());
      PKD_PhoneMenu.Show();
    }
  };
})();

// ■ END Game_Player.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Player.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Game_Player.prototype;
  _.pIsCanOpenPhoneNow = function() {
    if ($gameMap.isEventRunning() || $gameMessage.isBusy()) {
      return false;
    }
    if (Input.isTriggered(PKD_PhoneMenu.PP.getPhoneSettings().openPhoneKey)) {
      return true;
    }
  };
  _.pkdGetOpenedPhoneGalleryPics = function() {
    var e;
    try {
      return $gameSystem.pkdGetOpenedPhoneGalleryPics();
    } catch (error) {
      e = error;
      KDCore.warning(e);
      return [];
    }
  };
  _.pkdOpenPhoneGalleryPic = function(name) {
    var e, pics;
    try {
      pics = this.pkdGetOpenedPhoneGalleryPics();
      if (!pics.contains(name)) {
        return pics.push(name);
      }
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  };
})();

// ■ END Game_Player.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_System.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //$[ENCODE]

  //@[DEFINES]
  _ = Game_System.prototype;
  _.pkdGetDefaultPlayerPhoneUserId = function() {
    return "player_01";
  };
  _.pkdNormalizePhoneUserId = function(userId) {
    var id;
    if (!String.any(userId)) {
      return this.pkdGetDefaultPlayerPhoneUserId();
    }
    id = String(userId).trim();
    if (id === "player") {
      return this.pkdGetDefaultPlayerPhoneUserId();
    }
    return id;
  };
  _.pkdGetPhoneUsersData = function() {
    var legacyPlayerData, playerData, playerId;
    if (this._pkdPhoneUsers == null) {
      this._pkdPhoneUsers = {};
    }
    playerId = this.pkdGetDefaultPlayerPhoneUserId();
    if ((this._pkdPhoneUsers[playerId] == null) && (this._pkdPhoneUsers.player != null)) {
      this._pkdPhoneUsers[playerId] = this._pkdPhoneUsers.player;
    }
    if (this._pkdPhoneUsers[playerId] == null) {
      playerData = this.pkdMakePhoneUserData();
      if (this._pkdPhone != null) {
        playerData.phone = this._pkdPhone;
      }
      if (this._pkdPhoneMessages != null) {
        playerData.messages = this._pkdPhoneMessages;
      }
      if (this._pkdPhoneOldMessages != null) {
        playerData.oldMessages = this._pkdPhoneOldMessages;
      }
      if (this._pkdPhoneMessagesHistory != null) {
        playerData.messagesHistory = this._pkdPhoneMessagesHistory;
      }
      if (this._pkdOpenedPhoneGlPics != null) {
        playerData.galleryPics = this._pkdOpenedPhoneGlPics;
      }
      this._pkdPhoneUsers[playerId] = playerData;
    }
    legacyPlayerData = this._pkdPhoneUsers.player;
    if ((legacyPlayerData != null) && (this._pkdPhoneUsers[playerId] == null)) {
      this._pkdPhoneUsers[playerId] = legacyPlayerData;
    }
    if ((this._pkdPhoneUsers.player == null) && (this._pkdPhoneUsers[playerId] != null)) {
      this._pkdPhoneUsers.player = this._pkdPhoneUsers[playerId];
    }
    return this._pkdPhoneUsers;
  };
  _.pkdGetActivePhoneUser = function() {
    if (!String.any(this._pkdActivePhoneUser)) {
      this._pkdActivePhoneUser = this.pkdGetDefaultPlayerPhoneUserId();
    }
    return this._pkdActivePhoneUser;
  };
  _.pkdGetPhoneHotkeyUser = function() {
    if (!String.any(this._pkdPhoneHotkeyUser)) {
      this._pkdPhoneHotkeyUser = this.pkdGetDefaultPlayerPhoneUserId();
    }
    return this._pkdPhoneHotkeyUser;
  };
  _.pkdSetPhoneHotkeyUser = function(userId) {
    this._pkdPhoneHotkeyUser = this.pkdNormalizePhoneUserId(userId);
    this.pkdGetPhoneUserData(this._pkdPhoneHotkeyUser);
    return this._pkdPhoneHotkeyUser;
  };
  _.pkdSetActivePhoneUser = function(userId) {
    this._pkdActivePhoneUser = this.pkdNormalizePhoneUserId(userId);
    this.pkdGetPhoneUserData(this._pkdActivePhoneUser);
    PKD_PhoneMenu.Utils.refreshMessagesAppAlert();
    return this._pkdActivePhoneUser;
  };
  _.pkdMakePhoneUserData = function() {
    return {
      phone: PKD_PhoneMenu.Utils.makeNewPhone(),
      messages: [],
      oldMessages: [],
      messagesHistory: {},
      galleryPics: [],
      pinCode: null,
      phoneType: "android"
    };
  };
  _.pkdGetPhoneUserData = function(userId = null) {
    var id, users;
    users = this.pkdGetPhoneUsersData();
    if (userId == null) {
      id = this.pkdGetActivePhoneUser();
    } else {
      id = this.pkdNormalizePhoneUserId(userId);
    }
    if (users[id] == null) {
      users[id] = this.pkdMakePhoneUserData();
    }
    return users[id];
  };
  _.pkdNormalizePhoneType = function(type) {
    if (!String.any(type)) {
      return "android";
    }
    type = String(type).toLowerCase().trim();
    if (type === "iphone" || type === "ios") {
      return "iphone";
    }
    return "android";
  };
  _.pkdGetPhoneImageByType = function(type) {
    type = this.pkdNormalizePhoneType(type);
    if (type === "iphone") {
      return "PhoneFace2";
    }
    return "PhoneFace";
  };
  _.pkdSetPhoneType = function(userId, type) {
    var data, imageName;
    data = this.pkdGetPhoneUserData(userId);
    type = this.pkdNormalizePhoneType(type);
    data.phoneType = type;
    imageName = this.pkdGetPhoneImageByType(type);
    data.phone.image = imageName;
    return type;
  };
  _.pkdGetPhoneType = function(userId = null) {
    var data, type;
    data = this.pkdGetPhoneUserData(userId);
    type = this.pkdNormalizePhoneType(data.phoneType);
    data.phoneType = type;
    return type;
  };
  _.pkdSetupPhoneUserProfile = function(userId, settings = {}) {
    var appId, data, instagramEnv, phone, pinCode, phoneType;
    data = this.pkdGetPhoneUserData(userId);
    if (settings == null) {
      settings = {};
    }
    phoneType = settings.phoneType != null ? settings.phoneType : settings.type;
    if (String.any(phoneType)) {
      this.pkdSetPhoneType(userId, phoneType);
    }
    if (settings.clearPin === true) {
      this.pkdSetPhonePin(userId, null);
    } else {
      pinCode = settings.pinCode != null ? settings.pinCode : settings.pin;
      if (pinCode != null) {
        this.pkdSetPhonePin(userId, pinCode);
      }
    }
    phone = data.phone;
    if (String.any(settings.phoneImage)) {
      phone.image = String(settings.phoneImage);
    }
    if (String.any(settings.wallpaper)) {
      phone.wallpaper = String(settings.wallpaper);
    }
    if (String.any(settings.messagesWallpaper)) {
      phone.messagesWallpaper = String(settings.messagesWallpaper);
    }
    if (String.any(settings.galleryWallpaper)) {
      phone.galleryWallpaper = String(settings.galleryWallpaper);
    }
    appId = String.any(settings.instagramAppId) ? String(settings.instagramAppId).trim() : "socialApp";
    if (settings.enableInstagram !== false) {
      if ((phone.apps != null) && !phone.apps.contains(appId)) {
        phone.apps.push(appId);
      }
    }
    instagramEnv = Object.assign({
      enabled: settings.enableInstagram !== false,
      appId,
      profileName: settings.instagramProfileName || this.pkdNormalizePhoneUserId(userId),
      feedCommonEventId: Number(settings.instagramFeedCommonEventId || 0),
      dmCommonEventId: Number(settings.instagramDmCommonEventId || 0),
      discoveryCommonEventId: Number(settings.instagramDiscoveryCommonEventId || 0)
    }, settings.instagramEnv || {});
    this.pkdConfigureInstagramEnv(userId, instagramEnv);
    if (settings.isPlayer === true) {
      this.pkdSetPhoneHotkeyUser(userId);
      this.pkdSetActivePhoneUser(userId);
    }
    return data;
  };
  _.pkdGetInstagramEnv = function(userId = null) {
    var data, env;
    data = this.pkdGetPhoneUserData(userId);
    env = data.phone.instagramEnv;
    if (env == null) {
      env = {
        enabled: false,
        appId: "socialApp",
        ownerId: this.pkdNormalizePhoneUserId(userId != null ? userId : this.pkdGetActivePhoneUser()),
        profileName: this.pkdNormalizePhoneUserId(userId != null ? userId : this.pkdGetActivePhoneUser()),
        feedCommonEventId: 0,
        dmCommonEventId: 0,
        discoveryCommonEventId: 0,
        followSwitchId: 0
      };
      data.phone.instagramEnv = env;
    }
    return env;
  };
  _.pkdConfigureInstagramEnv = function(userId, settings = {}) {
    var appId, data, env, phone;
    data = this.pkdGetPhoneUserData(userId);
    phone = data.phone;
    env = this.pkdGetInstagramEnv(userId);
    if (settings == null) {
      settings = {};
    }
    appId = String.any(settings.appId) ? String(settings.appId).trim() : (String.any(settings.instagramAppId) ? String(settings.instagramAppId).trim() : env.appId || "socialApp");
    env.enabled = settings.enabled !== false;
    env.appId = appId;
    env.ownerId = this.pkdNormalizePhoneUserId(userId);
    env.profileName = settings.profileName || settings.instagramProfileName || env.ownerId;
    env.feedCommonEventId = Number(settings.feedCommonEventId || settings.instagramFeedCommonEventId || env.feedCommonEventId || 0);
    env.dmCommonEventId = Number(settings.dmCommonEventId || settings.instagramDmCommonEventId || env.dmCommonEventId || 0);
    env.discoveryCommonEventId = Number(settings.discoveryCommonEventId || settings.instagramDiscoveryCommonEventId || env.discoveryCommonEventId || 0);
    env.followSwitchId = Number(settings.followSwitchId || settings.instagramFollowSwitchId || env.followSwitchId || 0);
    if (env.enabled && (phone.apps != null) && !phone.apps.contains(appId)) {
      phone.apps.push(appId);
    }
    phone.instagramEnv = env;
    return env;
  };
  _.pkdIsInstagramProfileDiscovered = function(userId) {
    var activeUser, env, swId;
    activeUser = this.pkdGetActivePhoneUser();
    userId = this.pkdNormalizePhoneUserId(userId);
    if (userId === activeUser) {
      return true;
    }
    env = this.pkdGetInstagramEnv(userId);
    swId = Number(env.followSwitchId || 0);
    if (swId <= 0) {
      return true;
    }
    return $gameSwitches.value(swId) === true;
  };
  _.pkdGetDiscoveredInstagramProfiles = function() {
    var env, id, result, users;
    users = this.pkdGetPhoneUsersData();
    result = [];
    for (id in users) {
      if (!Object.prototype.hasOwnProperty.call(users, id)) {
        continue;
      }
      env = this.pkdGetInstagramEnv(id);
      if (env.enabled !== true) {
        continue;
      }
      if (!this.pkdIsInstagramProfileDiscovered(id)) {
        continue;
      }
      result.push({
        userId: id,
        profileName: String.any(env.profileName) ? env.profileName : id
      });
    }
    return result;
  };
  _.pkdOpenInstagramSection = function(section = "feed", userId = null) {
    var env, eventId, id, mapScene;
    if (userId != null) {
      id = this.pkdNormalizePhoneUserId(userId);
    } else {
      id = this.pkdGetActivePhoneUser();
    }
    env = this.pkdGetInstagramEnv(id);
    if (env.enabled !== true) {
      return false;
    }
    switch (String(section).toLowerCase().trim()) {
      case "dm":
      case "messages":
        eventId = Number(env.dmCommonEventId || 0);
        break;
      case "discovery":
      case "explore":
        eventId = Number(env.discoveryCommonEventId || 0);
        break;
      case "feed":
      default:
        eventId = Number(env.feedCommonEventId || 0);
    }
    if (eventId <= 0) {
      return false;
    }
    mapScene = KDCore.Utils.isSceneMap();
    if (!mapScene) {
      PKD_PhoneMenu.Hide();
    }
    $gameTemp.reserveCommonEvent(eventId);
    return true;
  };
  _.pkdNormalizePhonePin = function(pinCode) {
    if (!String.any(pinCode)) {
      return null;
    }
    pinCode = String(pinCode).replace(/\D/g, "").slice(0, 4);
    if (pinCode.length !== 4) {
      return null;
    }
    return pinCode;
  };
  _.pkdSetPhonePin = function(userId, pinCode) {
    var data;
    data = this.pkdGetPhoneUserData(userId);
    data.pinCode = this.pkdNormalizePhonePin(pinCode);
    return data.pinCode;
  };
  _.pkdGetPhonePin = function(userId = null) {
    var data;
    data = this.pkdGetPhoneUserData(userId);
    return this.pkdNormalizePhonePin(data.pinCode);
  };
  _.pkdIsHaveHackItem = function() {
    var hackItem, i, len, ref;
    try {
      if (($gameParty == null) || ($dataItems == null)) {
        return false;
      }
      ref = $dataItems;
      for (i = 0, len = ref.length; i < len; i++) {
        hackItem = ref[i];
        if ((hackItem != null) && String.any(hackItem.name) && hackItem.name.toUpperCase() === "HACK") {
          return $gameParty.hasItem(hackItem, false);
        }
      }
    } catch (error) {
      KDCore.warning(error);
    }
    return false;
  };
  _.pkdIsPhoneLocked = function(userId = null) {
    if (this.pkdIsHaveHackItem()) {
      return false;
    }
    return this.pkdGetPhonePin(userId) != null;
  };
  _.pkdRequestPhoneUnlock = function(userId = null) {
    var pin, requestText, value;
    pin = this.pkdGetPhonePin(userId);
    if (pin == null) {
      return true;
    }
    if (this.pkdIsHaveHackItem()) {
      return true;
    }
    requestText = "Enter 4-digit PIN";
    if (typeof window !== "undefined" && window !== null && (window.prompt != null)) {
      value = window.prompt(requestText, "");
      if (value == null) {
        return false;
      }
      value = this.pkdNormalizePhonePin(value);
      return value === pin;
    }
    return false;
  };
  _.pkdGetPhone = function() {
    return this.pkdGetPhoneUserData().phone;
  };
  _.pkdIsHaveAnyUnreadMessage = function() {
    var e, i, item, len, msgs;
    try {
      msgs = this.pkdGetPhoneMessagesList();
      for (i = 0, len = msgs.length; i < len; i++) {
        item = msgs[i];
        if (this.pkdIsNewMessageFrom(item.name)) {
          return true;
        }
      }
    } catch (error) {
      e = error;
      KDCore.warning(e);
    }
    return false;
  };
  _.pkdGetPhoneMessagesList = function() {
    return this.pkdGetPhoneUserData().messages;
  };
  _.pkdSetPhoneMessagesList = function(messages) {
    this.pkdGetPhoneUserData().messages = messages;
    return messages;
  };
  _.pkdAddNewPhoneMessage = function(avatar, name, evId, fromMap) {
    var e, item, msgs;
    try {
      msgs = this.pkdGetPhoneMessagesList();
      // * Тут нельзя использовать pkdIsNewMessageFrom
      // * т.к. игрок может добавить новое сообщение в момент текущего,
      // * а pkdIsNewMessageFrom проверяет прочитано ли, а может быть
      // * ещё не прочитано
      item = msgs.getByField('name', name);
      if (fromMap === true) {
        evId = "fromMap_" + evId;
      }
      if (item == null) {
        return msgs.push({
          avatar,
          name,
          evId: [evId]
        });
      } else {
        if (item != null) {
          if (!item.evId.contains(evId)) {
            return item.evId.push(evId); // * Add new message
          }
        }
      }
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  };
  _.pkdGetOldMessagesList = function() {
    return this.pkdGetPhoneUserData().oldMessages;
  };
  _.pkdIsNewMessageFrom = function(name) {
    var e, item, lastEvId, list;
    try {
      list = this.pkdGetPhoneMessagesList();
      item = list.getByField('name', name);
      if (item == null) {
        return true;
      }
      lastEvId = item.evId.last();
      return !this.pkdGetOldMessagesList().contains(lastEvId);
    } catch (error) {
      e = error;
      KDCore.warning(e);
      return true;
    }
  };
  _.pkdGetMessagesHistory = function() {
    return this.pkdGetPhoneUserData().messagesHistory;
  };
  _.pkdGetOpenedPhoneGalleryPics = function() {
    return this.pkdGetPhoneUserData().galleryPics;
  };
  _.pkdPreparePhoneImages = function() {
    var p;
    p = this.pkdGetPhone();
    ImageManager.loadPictureForPhone(p.image);
    ImageManager.loadPictureForPhone(p.wallpaper);
  };
})();

// ■ END Game_System.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ ImageManager.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = ImageManager;
  _.loadPictureForPhone = function(filename) {
    return this.loadBitmap('img/pPhoneMenu/', filename);
  };
})();

// ■ END ImageManager.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
window.PKD_PhoneMapNotifyManager = function() {};

(function() {
  var _;
  //@[DEFINES]
  _ = window.PKD_PhoneMapNotifyManager;
  _.init = function() {
    if (this.actualNotify() != null) {
      this.destroyActualNotify();
    }
    this.notifyQueque = [];
  };
  _.scene = function() {
    return SceneManager._scene;
  };
  _.isCanShowNotifyNow = function() {
    return KDCore.Utils.isMapScene() || PKD_PhoneMenu.Utils.isPhoneScene();
  };
  //%[MAIN]
  _.pushToQueue = function(item) {
    this.notifyQueque.push(item);
    return this.refresh();
  };
  _.showNewNotify = function() {
    var e, item;
    if (!this.isCanShowNotifyNow()) {
      this.wait();
      return;
    }
    if (this.actualNotify() != null) {
      this.destroyActualNotify();
    }
    if (!this.isHaveAnyNotifyToShow()) {
      return;
    }
    try {
      if (this.isCanShowNotifyNow()) {
        item = this.notifyQueque.shift();
        if (item != null) {
          this.actualNotifySprite = this.scene().pkdShowPhoneNotify(item);
        }
      }
      // * If we have more than one to show, start timer to repeat refresh
      this.wait();
    } catch (error) {
      e = error;
      KDCore.warning(e);
    }
  };
  _.isHaveAnyNotifyToShow = function() {
    var ref;
    return ((ref = this.notifyQueque) != null ? ref.length : void 0) > 0;
  };
  _.refresh = function() {
    var actualNotify, e;
    try {
      actualNotify = this.actualNotify();
      if ((actualNotify != null) && actualNotify.isAlive()) {
        if (actualNotify.parent === null) {
          this.destroyActualNotify();
        }
        this.wait();
        return;
      } else {
        if (this.isHaveAnyNotifyToShow()) {
          this.showNewNotify();
        } else {
          this.clearSounds();
        }
      }
      return;
    } catch (error) {
      e = error;
      KDCore.warning(e);
      this.wait();
    }
  };
  _.wait = function() {
    if (this.isHaveAnyNotifyToShow()) {
      return setTimeout((function() {
        return PKD_PhoneMapNotifyManager.refresh();
      }), 1600);
    } else {
      return this.clearSounds();
    }
  };
  _.clearSounds = function() {
    if ((typeof $gameTemp !== "undefined" && $gameTemp !== null) && ($gameTemp._pkdLastPhoneNotifySoundPlayed != null)) {
      $gameTemp._pkdLastPhoneNotifySoundPlayed = null;
    }
  };
  _.actualNotify = function() {
    return this.actualNotifySprite;
  };
  _.destroyActualNotify = function() {
    var e, ref;
    try {
      if ((ref = this.actualNotify()) != null) {
        ref.destroyNotify();
      }
      return this.actualNotifySprite = null;
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  };
})();


// Generated by CoffeeScript 2.6.1
var PKD_ScenePhone;

PKD_ScenePhone = class PKD_ScenePhone extends Scene_MenuBase {
  constructor() {
    super();
    $gameTemp._pPreviousAppContext = null;
    this._preload();
  }

  _preload() {
    ImageManager.loadPictureForPhone('MessageIcon');
    ImageManager.loadPictureForPhone('MessageIconNew');
    ImageManager.loadPictureForPhone('btnChoice_00');
    ImageManager.loadPictureForPhone('btnDone_00');
    ImageManager.loadPictureForPhone('Fondo');
    PKD_PhoneMenu.Utils.refreshMessagesAppAlert();
  }

  settings() {
    return PKD_PhoneMenu.PP.getPhoneSettings();
  }

  storedConfig() {
    return $gameSystem.pkdGetPhone();
  }

  closePhoneForAppExecution() {
    return this.popScene();
  }

  refresh() {
    var app, e, i, len, ref;
    try {
      ref = this._appItems;
      for (i = 0, len = ref.length; i < len; i++) {
        app = ref[i];
        app.refresh();
      }
      this.refreshWallpapers();
      this.refreshPhoneBaseBackground();
      return this.refreshPhoneFace();
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  }

  create() {
    super.create();
    this._prepareValues();
    this._createPhone();
    this._createScreen();
    this._createApps(); // Apps
    this.refresh();
    this._phoneContainer.y += this._phoneFace.bitmap.height / 2;
  }

  start() {
    super.start();
    this._startInterpreter(); //Intr
    if (this.settings().isAnimate === true && !$gameSystem._pkdPhoneDisableStartAnimation) {
      this._showPhoneAnimated();
    } else {
      this._onAnimationDone();
    }
  }

  update() {
    var ref;
    super.update();
    this._updateInterpreter(); //Intr
    this._updateBackAndClose();
    this._updateKeyboardNavigation(); //Keyb
    if ((ref = this._animationChanger) != null) {
      ref.update();
    }
  }

  _prepareValues() {
    var e, x, y;
    this._kIndex = [0, 0];
    try {
      ({x, y} = this.settings().phonePosition);
      this.phoneScale = this._getPhoneScale();
      this.phoneX = eval(x);
      this.phoneY = eval(y);
    } catch (error) {
      e = error;
      KDCore.warning(e);
      this.phoneScale = 1;
      this.phoneX = 0;
      this.phoneY = 0;
    }
  }


  _getPhoneScale() {
    var e, scaleExpr;
    try {
      scaleExpr = this.settings().uiScale;
      if (typeof scaleExpr === "number") {
        return Math.max(0.6, scaleExpr);
      }
      if (String.any(scaleExpr)) {
        return Math.max(0.6, eval(scaleExpr));
      }
    } catch (error) {
      e = error;
      KDCore.warning(e);
    }
    return Math.max(1, Math.min(Graphics.width / 1280, Graphics.height / 720));
  }

  _createPhone() {
    this._phoneContainer = new KDCore.Sprite();
    this._phoneBaseBackground = new KDCore.Sprite();
    this._wallpaper = new KDCore.Sprite();
    this._phoneContent = new Sprite();
    //@_phoneTopStatus =
    //    new KDCore.Sprite(ImageManager.loadPictureForPhone("PhoneFace_TopStatusBar"))
    this._phoneFace = new KDCore.Sprite();
    this._phoneContainer.addChild(this._phoneBaseBackground);
    this._phoneContainer.addChild(this._wallpaper);
    //@_phoneContainer.addChild @_phoneTopStatus
    this._phoneContainer.addChild(this._phoneContent);
    this._phoneContainer.addChild(this._phoneFace);
    this.addChild(this._phoneContainer);
    this._phoneContainer.scale.x = this.phoneScale;
    this._phoneContainer.scale.y = this.phoneScale;
    this._setPhoneFinalPlace();
  }

  _setPhoneFinalPlace() {
    var correctedX;
    correctedX = this.phoneX - (155 * (this.phoneScale - 1));
    this._phoneContainer.move(correctedX, this.phoneY);
  }

  _createScreen() {
    var e, h, w, x, y;
    ({w, h} = this.settings().screenSize);
    this._phoneScreen = new KDCore.Sprite(new Bitmap(w, h));
    try {
      //@_phoneScreen.fillAll()
      //@_phoneScreen.opacity = 100
      ({x, y} = this.settings().screenOffset);
      this._phoneScreen.move(eval(x), eval(y));
    } catch (error) {
      e = error;
      KDCore.warning(e);
      this._phoneScreen.move(0, 0);
    }
    this._phoneContent.addChild(this._phoneScreen);
    this._setupWallpaperBounds();
  }

  _showPhoneAnimated() {
    var e, endY, speed, startY;
    try {
      this._phoneContainer.appear(25, 0);
      this._animationChanger = new KDCore.Changer(this._phoneContainer);
      startY = this.phoneY + this._phoneFace.bitmap.height / 2;
      endY = this.phoneY;
      speed = this.settings().animationSpeed;
      this._animationChanger.change('y').from(startY).to(endY).step(speed).done(this._onAnimationDone.bind(this));
      this._animationChanger.start();
    } catch (error) {
      e = error;
      KDCore.warning(e);
      this._onAnimationDone();
    }
  }

  _onAnimationDone() {
    this._setPhoneFinalPlace();
    this._showApps(); // Apps
    this.refresh();
    this.checkForModal();
    this.checkForStartupApp();
  }

  checkForModal() {
    var e;
    try {
      if ($gameTemp._pkdPhoneModalMenuData == null) {
        return;
      }
      return setTimeout((function() {
        return Phone.StartApp("modalMenu");
      }), 200);
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  }

  checkForStartupApp() {
    var e;
    try {
      if ($gameTemp.pkdPhonePreloadAppAtStartup == null) {
        return;
      }
      return setTimeout((function() {
        Phone.StartApp($gameTemp.pkdPhonePreloadAppAtStartup);
        return $gameTemp.pkdPhonePreloadAppAtStartup = null;
      }), 200);
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  }

  drawTopText(text) {
    var ref;
    return (ref = this.appTextItem) != null ? ref.draw(text) : void 0;
  }

  refreshWallpapers() {
    var e, wallpaperBitmap;
    try {
      wallpaperBitmap = ImageManager.loadPictureForPhone(this.storedConfig().wallpaper);
      this._wallpaper.bitmap = wallpaperBitmap;
      if (wallpaperBitmap.isReady()) {
        this._placeWallpaperProperly(wallpaperBitmap);
      } else {
        wallpaperBitmap.addLoadListener(() => {
          return this._placeWallpaperProperly(wallpaperBitmap);
        });
      }
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  }

  _setupWallpaperBounds() {
    var e, h, w, x, y;
    try {
      ({w, h} = this.settings().screenSize);
      ({x, y} = this.settings().screenOffset);
      x = eval(x);
      y = eval(y);
    } catch (error) {
      e = error;
      KDCore.warning(e);
      w = 200;
      h = 400;
      x = 0;
      y = 0;
    }
    this._wallpaperBounds = {x, y, w, h};
    if (this._wallpaperMask == null) {
      this._wallpaperMask = new Sprite(new Bitmap(w, h));
      this._wallpaperMask.bitmap.fillAll("#FFFFFF");
      this._phoneContainer.addChild(this._wallpaperMask);
      this._wallpaper.mask = this._wallpaperMask;
    }
    this._wallpaperMask.move(x, y);
    this._wallpaper.move(x, y);
  }

  _getTemplateVerticalShift() {
    return -10;
  }

  _placeWallpaperProperly(bitmap) {
    var b, e, h, scale, scaledH, scaledW, srcH, srcW, sourceRect, w, x, y, yShift;
    try {
      b = this._wallpaperBounds;
      if ((b == null) || (bitmap == null) || bitmap.width <= 0 || bitmap.height <= 0) {
        return;
      }
      ({x, y, w, h} = b);
      sourceRect = this._resolvePhoneTemplateSourceRect(bitmap);
      ({sx: x, sy: y, sw: srcW, sh: srcH} = sourceRect);
      scale = Math.max(w / srcW, h / srcH);
      scaledW = srcW * scale;
      scaledH = srcH * scale;
      yShift = this._getTemplateVerticalShift();
      this._wallpaper.setFrame(sourceRect.sx, sourceRect.sy, srcW, srcH);
      this._wallpaper.scale.set(scale);
      this._wallpaper.move(this._wallpaperBounds.x + (w - scaledW) / 2, this._wallpaperBounds.y + (h - scaledH) / 2 + yShift);
    } catch (error) {
      e = error;
      KDCore.warning(e);
    }
  }

  _resolvePhoneTemplateSourceRect(bitmap) {
    var e, h, screenOffset, screenSize, sourceRect, w, x, y;
    sourceRect = {
      sx: 0,
      sy: 0,
      sw: bitmap.width,
      sh: bitmap.height
    };
    try {
      if (!this._isPhoneTemplateBitmap(bitmap)) {
        return sourceRect;
      }
      ({screenOffset, screenSize} = this.settings());
      ({w, h} = screenSize);
      ({x, y} = screenOffset);
      x = eval(x);
      y = eval(y);
      sourceRect.sx = Math.max(0, Math.floor(x));
      sourceRect.sy = Math.max(0, Math.floor(y));
      sourceRect.sw = Math.min(bitmap.width - sourceRect.sx, Math.floor(w));
      sourceRect.sh = Math.min(bitmap.height - sourceRect.sy, Math.floor(h));
      return sourceRect;
    } catch (error) {
      e = error;
      KDCore.warning(e);
    }
    return sourceRect;
  }

  _isPhoneTemplateBitmap(bitmap) {
    var ratio, templateRatio;
    if ((bitmap == null) || bitmap.width <= 0 || bitmap.height <= 0) {
      return false;
    }
    ratio = bitmap.width / bitmap.height;
    templateRatio = 310 / 585;
    return bitmap.width >= 310 && bitmap.height >= 585 && Math.abs(ratio - templateRatio) < 0.04;
  }

  refreshPhoneFace() {
    var e;
    try {
      return this._phoneFace.bitmap = ImageManager.loadPictureForPhone(this.storedConfig().image);
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  }

  refreshPhoneBaseBackground() {
    var e;
    try {
      this._phoneBaseBackground.bitmap = ImageManager.loadPictureForPhone("Fondo");
      this._phoneBaseBackground.visible = this._isActivePhoneNpc();
    } catch (error) {
      e = error;
      KDCore.warning(e);
    }
  }

  _isActivePhoneNpc() {
    var activeUserId;
    activeUserId = $gameSystem.pkdGetActivePhoneUser();
    return activeUserId !== $gameSystem.pkdGetDefaultPlayerPhoneUserId();
  }

  isCancelInput() {
    return Input.isTriggered(PKD_PhoneMenu.PP.getPhoneSettings().openPhoneKey);
  }

  _updateBackAndClose() {
    // * Close Phone again by "Open Phone" key
    if (this.isCancelInput() && !this.isInAppContext()) {
      this.popScene();
      return;
    }
    if (Input.isCancel()) {
      if (!this.isInAppContext()) {
        this.popScene();
      } else {
        this.appContextBackHandlerCall();
        this.refresh();
      }
    }
  }

};


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ PKD_ScenePhone_Ctx.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = PKD_ScenePhone.prototype;
  _.isInAppContext = function() {
    return this._currentContext != null;
  };
  _.setPhoneAppContext = function(appCtxId) {
    var context, e;
    try {
      if (PKD_PhoneMenu.Utils.isSystemApp(appCtxId)) {
        context = PKD_PhoneMenu.Utils.getSystemAppContext(appCtxId);
      } else {
        context = this.getUserAppContext(appCtxId);
      }
      if (context == null) {
        return;
      }
      return this._startAppContext(context);
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  };
  _.closeAppContext = function() {
    return this._startAppContext(null);
  };
  _.appContextBackHandlerCall = function() {
    var e, ref;
    try {
      return (ref = this._currentContext) != null ? ref.backHandler(this) : void 0;
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  };
  _.getUserAppContext = function(appCtxId) {
    var data, e;
    try {
      data = PKD_PhoneMenu.Utils.getUserAppContextData(appCtxId);
      if (data != null) {
        $gameTemp.__pUserCustomContextData = data;
        return new PKD_SpritePhoneAppUserCustomContext();
      }
    } catch (error) {
      e = error;
      KDCore.warning(e);
    }
    return null;
  };
  _._startAppContext = function(context) {
    this._clearContext();
    this._currentContext = context;
    if (context == null) {
      return;
    }
    this._phoneScreen.addChild(this._currentContext);
    this._disableAppContainer();
    setTimeout((() => {
      return this.drawTopText(context.getTopHeaderText());
    }), 150);
  };
  _._clearContext = function() {
    var app, i, len, ref;
    if (this._currentContext == null) {
      return;
    }
    this._currentContext.onClosing();
    this._phoneScreen.removeChild(this._currentContext);
    this._enableAppContainer();
    ref = this._appItems;
    for (i = 0, len = ref.length; i < len; i++) {
      app = ref[i];
      app.resetAllAnimations();
    }
    this.drawTopText("");
  };
  _._disableAppContainer = function() {
    this._appsContainer.visible = false;
    this._appsContainer.move(Graphics.width + 1000, Graphics.height + 1000);
    return this._appsContainer.opacity = 0;
  };
  _._enableAppContainer = function() {
    this._appsContainer.visible = true;
    this._appsContainer.move(0, 0);
    return this._showApps();
  };
})();

// ■ END PKD_ScenePhone_Ctx.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ PKD_ScenePhone.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = PKD_ScenePhone.prototype;
  _._createApps = function() {
    this._appSlots = [];
    this._appItems = [];
    this._appsContainer = new KDCore.Sprite();
    this._appsContainer.opacity = 0;
    this._phoneScreen.addChild(this._appsContainer);
    this._createGrid();
    this._createAppNameText();
    this._createAppsItems();
  };
  _._createGrid = function() {
    var h, i, j, k, l, ref, ref1, w, x, y;
    ({x, y} = this.settings().appsGrid);
    ({w, h} = this.settings().screenSize);
    this.appItemW = Math.floor(w / x);
    this.appItemH = Math.floor(h / y);
    for (i = k = 0, ref = y; (0 <= ref ? k < ref : k > ref); i = 0 <= ref ? ++k : --k) {
      for (j = l = 0, ref1 = x; (0 <= ref1 ? l < ref1 : l > ref1); j = 0 <= ref1 ? ++l : --l) {
        this._createAppSlot(j * this.appItemW, i * this.appItemH);
      }
    }
  };
  _._createAppSlot = function(x, y) {
    var app;
    app = new KDCore.Sprite(new Bitmap(this.appItemW, this.appItemH));
    //app.fillAll()
    app.move(x, y);
    this._appSlots.push(app);
    return this._appsContainer.addChild(app);
  };
  _._createAppNameText = function() {
    var p;
    p = PKD_PhoneMenu.PP.getPhoneAppNameTextSettings();
    this.appTextItem = new KDCore.UI.Sprite_UITextWithBack(p);
    this.appTextItem.move(p.position);
    this._phoneContainer.addChild(this.appTextItem);
  };
  _._createAppsItems = function() {
    var app, apps, index, item, k, len, ref;
    apps = this._getAllVisibleApps();
    for (index = k = 0, len = apps.length; k < len; index = ++k) {
      app = apps[index];
      item = this._createAppItem(app);
      if (item == null) {
        continue;
      }
      this._appItems.push(item);
      if ((ref = this._appSlots[index]) != null) {
        ref.addChild(item);
      }
      item.alignWithSlot();
    }
  };
  _._createAppItem = function(appSettings) {
    var appItem;
    appItem = new PKD_SpritePhoneAppItem(appSettings);
    appItem.setTextField(this.appTextItem);
    if (!PKD_PhoneMenu.Utils.isSwitchIsTRUE(appSettings.enabledSwitchId)) {
      appItem.disableApp();
    }
    return appItem;
  };
  _._getAllVisibleApps = function() {
    var addedApps, apps, e;
    try {
      addedApps = this.storedConfig().apps;
      apps = addedApps.map(function(id) {
        return PKD_PhoneMenu.PP.getPhoneAppDataById(id);
      });
      apps = apps.filter(function(app) {
        return app != null;
      });
    } catch (error) {
      e = error;
      KDCore.warning(e);
      apps = [];
    }
    return apps.filter(function(app) {
      return (app != null) && PKD_PhoneMenu.Utils.isSwitchIsTRUE(app.visibleSwitchId);
    });
  };
  _._showApps = function() {
    return this._appsContainer.appear(55);
  };
})();

// ■ END PKD_ScenePhone.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ PKD_Scene_Phone .coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = PKD_ScenePhone.prototype;
  _.isInterpreterIsRunning = function() {
    return this._interpreter.isRunning();
  };
  _._startInterpreter = function() {
    this._interpreter = new Game_Interpreter();
  };
  _._updateInterpreter = function() {
    var e;
    this._interpreter.update();
    if (!this.isInterpreterIsRunning()) {
      try {
        this._checkStartedApp();
      } catch (error) {
        e = error;
        KDCore.warning(e);
      }
    }
  };
  _._checkStartedApp = function() {
    var app, i, len, ref;
    ref = this._appItems;
    for (i = 0, len = ref.length; i < len; i++) {
      app = ref[i];
      if (app == null) {
        continue;
      }
      if (app.isCanExecuteAction()) {
        this._startApp(app);
        return;
      }
    }
  };
  _._startApp = function(app) {
    var e, ev, isOuter;
    try {
      if (app == null) {
        return;
      }
      app.onActionExecuted();
      ({ev, isOuter} = app.getActionForExecution());
      if (isFinite(ev)) {
        return this._startCommonEvent(ev, isOuter);
      } else {
        return eval(ev);
      }
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  };
  _._startCommonEvent = function(ev, isOuter) {
    var e, eventData;
    try {
      if (!KDCore.Utils.isValidCE(ev)) {
        return;
      }
      if (isOuter === true) {
        KDCore.Utils.startCE(ev);
        return this.closePhoneForAppExecution();
      } else {
        eventData = $dataCommonEvents[ev];
        return this._startInnerCe(eventData.list);
      }
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  };
  _._startInnerCe = function(list) {
    var e;
    try {
      this._interpreter.setup(list);
      return this._interpreter.update();
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  };
})();

// ■ END PKD_Scene_Phone .coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ PKD_ScenePhone.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = PKD_ScenePhone.prototype;
  _._updateKeyboardNavigation = function() {
    if (this.isInAppContext()) {
      return;
    }
    if (Input.isTriggered('ok')) {
      this._activateAppByKeyb();
      return;
    }
    if ((this._lastMousePos != null) && (this._lastMousePos.x !== TouchInput.x || this._lastMousePos.y !== TouchInput.y)) {
      this._setMouseControl();
    }
    if (Input.isTriggered('left')) {
      this._kIndex[0] -= 1;
      this._setKeyboardControl();
    } else if (Input.isTriggered('right')) {
      this._kIndex[0] += 1;
      this._setKeyboardControl();
    }
    //TODO: Добавить движение по вертикали!
    /*else if Input.isTriggered('up')
        @_kIndex[1] -= 1
        @_setKeyboardControl()
    else if Input.isTriggered('down')
        @_kIndex[1] += 1
        @_setKeyboardControl()*/
    this._refreshKIndex();
  };
  _._setMouseControl = function() {
    var i, j, len, ref;
    this._lastMousePos = null;
    ref = this._appItems;
    for (j = 0, len = ref.length; j < len; j++) {
      i = ref[j];
      i.resetManualHoveredState();
    }
  };
  _._setKeyboardControl = function() {
    var i, index, j, len, ref;
    this._lastMousePos = {};
    this._lastMousePos.x = TouchInput.x;
    this._lastMousePos.y = TouchInput.y;
    ref = this._appItems;
    for (j = 0, len = ref.length; j < len; j++) {
      i = ref[j];
      i.setManualHoveredState();
    }
    index = this._kIndex[0];
    //console.log index
    if (index >= this._appItems.length) {
      index = 0;
    }
    if (index < 0) {
      index = this._appItems.length - 1;
    }
    this._appItems[index].manualSelect();
    this._refreshKIndex();
  };
  _._refreshKIndex = function() {
    var hoveredItem, index;
    hoveredItem = this._appItems.find(function(i) {
      return i.isSelected();
    });
    if (hoveredItem == null) {
      this._kIndex = [0, 0];
    } else {
      index = this._appItems.indexOf(hoveredItem);
      this._kIndex[0] = index;
    }
  };
  //console.log @_kIndex[0]
  _._activateAppByKeyb = function() {
    var e;
    this._refreshKIndex();
    try {
      return this._appItems[this._kIndex[0]].requestActionExecution();
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  };
})();

// ■ END PKD_ScenePhone.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
var PKD_SpriteContactInfoScreen;

PKD_SpriteContactInfoScreen = class PKD_SpriteContactInfoScreen extends KDCore.Sprite {
  constructor(contactData) {
    super();
    this.contactData = contactData;
    this._pictures = [];
    this._gauges = [];
    this._crateBaseParent();
    this._createElements();
  }

  _crateBaseParent() {
    this._content = new Sprite();
    return this.addChild(this._content);
  }

  _createElements() {
    this._createPictures();
    this._createGauges();
    return this._placeElements();
  }

  _createPictures() {
    var e, i, len, p, pic, pictures;
    ({pictures} = this.contactData);
    if (pictures == null) {
      return;
    }
    for (i = 0, len = pictures.length; i < len; i++) {
      p = pictures[i];
      try {
        if (!PKD_PhoneMenu.Utils.isSwitchIsTRUE(p.enabledSwitchId)) {
          continue;
        }
        if (!String.any(p.name)) {
          continue;
        }
        pic = new Sprite(ImageManager.loadPictureForPhone(p.name));
        pic.move(p.margins);
        pic.zIndex = p.zIndex;
        this._pictures.push(pic);
      } catch (error) {
        e = error;
        KDCore.warning(e);
      }
    }
  }

  _createGauges() {
    var e, g, gauge, gauges, i, len, settings;
    ({gauges} = this.contactData);
    if (gauges == null) {
      return;
    }
    for (i = 0, len = gauges.length; i < len; i++) {
      g = gauges[i];
      try {
        if (!PKD_PhoneMenu.Utils.isSwitchIsTRUE(g.enabledSwitchId)) {
          continue;
        }
        settings = {...g.settings};
        settings.visible = true; // * Required field for KDCore UI element
        settings.rootImageFolder = "pPhoneMenu";
        gauge = new KDCore.UI.Sprite_UIGauge(settings);
        gauge.move(g.margins);
        gauge.zIndex = g.zIndex;
        gauge.draw($gameVariables.value(g.currentPercentVarId) / 100);
        this._gauges.push(gauge);
      } catch (error) {
        e = error;
        KDCore.warning(e);
      }
    }
  }

  //TODO: Сортировку по одному целочисленному полю вынести в KDCore
  _placeElements() {
    var allElements, e, i, len;
    allElements = this._pictures.concat(this._gauges);
    allElements.sort(function(a, b) {
      return a.zIndex - b.zIndex;
    });
    for (i = 0, len = allElements.length; i < len; i++) {
      e = allElements[i];
      this._content.addChild(e);
    }
  }

};


// Generated by CoffeeScript 2.6.1
var PKD_SpriteGalleryGridScreen;

PKD_SpriteGalleryGridScreen = class PKD_SpriteGalleryGridScreen extends KDCore.Sprite {
  constructor(albumName) {
    super();
    this.albumName = albumName;
    this._prepare();
    this._create();
  }

  _prepare() {
    PKD_PhoneMenu.Utils.SetPhoneTopText(this.albumName);
    this._isBigMode = false;
  }

  isShowPictureMode() {
    return this._zoomed != null;
  }

  isBigModeEnabled() {
    return PKD_PhoneMenu.PP.isBigModeForGallery();
  }

  isInBigMode() {
    return this._isBigMode === true;
  }

  endShowPicture() {
    PKD_PhoneMenu.Utils.SetPhoneTopText(this.albumName);
    SoundManager.playCancel();
    this._removeZoomPicture();
    this._gridWindow.activate();
    this._isBigMode = false;
  }

  _removeZoomPicture() {
    this._zoomed.removeFromParent();
    return this._zoomed = null;
  }

  _createZoomPicture(imageName) {
    var b, e, picSizeX, picSizeY, picX, picY, rect;
    try {
      b = ImageManager.loadPictureForPhone(imageName);
      rect = PKD_PhoneMenu.Utils.getAppRect();
      picX = rect.x;
      picY = rect.y;
      picSizeX = rect.width;
      picSizeY = rect.height;
      this._zoomed = new Sprite(new Bitmap(picSizeX, picSizeY));
      if (b.isReady()) {
        this._placeZoomPictureProperly(b, picX, picY, picSizeX, picSizeY);
      } else {
        b.addLoadListener(() => {
          return this._placeZoomPictureProperly(b, picX, picY, picSizeX, picSizeY);
        });
      }
      return this.addChild(this._zoomed);
    } catch (error) {
      e = error;
      KDCore.warning(e);
      this.endShowPicture();
      return SoundManager.playBuzzer();
    }
  }

  _placeZoomPictureProperly(b, picX, picY, picSizeX, picSizeY) {
    var height, width;
    if (PKD_PhoneMenu.PP.isKeepAspectRatioOnPreview()) {
      ({width, height} = this._getWHKeepInAspect(picSizeX, picSizeY, b.width, b.height));
    } else {
      width = picSizeX;
      height = picSizeY;
    }
    this._zoomed.bitmap.blt(b, 0, 0, b.width, b.height, picX, picY, width, height);
  }

  _getWHKeepInAspect(containerWidth, containerHeight, width, height) {
    var aspectRatio, containerAspectRatio;
    aspectRatio = width / height;
    containerAspectRatio = containerWidth / containerHeight;
    if (aspectRatio > containerAspectRatio) {
      width = containerWidth;
      height = width / aspectRatio;
    } else {
      height = containerHeight;
      width = height * aspectRatio;
    }
    return {width, height};
  }

  _createBigPicture(imageName) {
    var b, e;
    try {
      if (this._zoomed == null) {
        return;
      }
      b = ImageManager.loadPictureForPhone(imageName);
      this._zoomed.bitmap = b;
      this._zoomed.anchor.set(0);
      this._zoomed.scale.set(1);
      if (b.isReady()) {
        this._placeBigPictureProperly(b);
      } else {
        b.addLoadListener(() => {
          return this._placeBigPictureProperly(b);
        });
      }
      // * Прячем кнопки
      this._zoomed._controls.visible = false;
      this._isBigMode = true;
      return SceneManager._scene.addChild(this._zoomed);
    } catch (error) {
      e = error;
      KDCore.warning(e);
      this.endShowPicture();
      return SoundManager.playBuzzer();
    }
  }

  _placeBigPictureProperly(bitmap) {
    var boostScale, e, fitScale, maxH, maxScale, maxW, minH, minW, scale;
    try {
      if ((bitmap == null) || bitmap.width <= 0 || bitmap.height <= 0) {
        return;
      }
      maxW = Graphics.width * 0.92;
      maxH = Graphics.height * 0.9;
      fitScale = Math.min(maxW / bitmap.width, maxH / bitmap.height);
      minW = Graphics.width * 0.55;
      minH = Graphics.height * 0.55;
      boostScale = Math.max(minW / bitmap.width, minH / bitmap.height);
      scale = Math.min(fitScale, Math.max(1, boostScale));
      maxScale = 2.5;
      scale = Math.min(scale, maxScale);
      if (!isFinite(scale) || scale <= 0) {
        scale = 1;
      }
      this._zoomed.scale.set(scale);
      this._zoomed.x = (Graphics.width - bitmap.width * scale) / 2;
      this._zoomed.y = (Graphics.height - bitmap.height * scale) / 2;
    } catch (error) {
      e = error;
      KDCore.warning(e);
    }
  }

  _createZoomTitle(titleText) {
    var e;
    try {
      return PKD_PhoneMenu.Utils.SetPhoneTopText(titleText);
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  }

  _createControlButtons() {
    var controls, e, params;
    try {
      controls = new Sprite();
      this._zoomed._controls = controls;
      this._zoomed.addChild(controls);
      params = PKD_PhoneMenu.PP.getGalleryAppButtonsSettings();
      if (params == null) {
        return;
      }
      if (params.backButtonIsVisible === true) {
        this._backButton = new KDCore.ButtonM("btnBack", false, "pPhoneMenu");
        this._backButton.addClickHandler(() => {
          return this.endShowPicture();
        });
        if ((params.backButtonPosition != null) && (params.backButtonPosition.x != null)) {
          this._backButton.move(params.backButtonPosition);
        }
        controls.addChild(this._backButton);
      }
      if (params.zoomInButtonIsVisible === true && this.isBigModeEnabled()) {
        this._zoomToBigButton = new KDCore.ButtonM("btnZoom", false, "pPhoneMenu");
        this._zoomToBigButton.addClickHandler(() => {
          return this._requestBigImage();
        });
        if ((params.zoomInButtonPosition != null) && (params.zoomInButtonPosition.x != null)) {
          this._zoomToBigButton.move(params.zoomInButtonPosition);
        }
        return controls.addChild(this._zoomToBigButton);
      }
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  }

  _create() {
    return this._createGalleryGridWindow();
  }

  _createGalleryGridWindow() {
    var r;
    r = PKD_PhoneMenu.Utils.getAppRect();
    if (KDCore.isMZ()) {
      this._gridWindow = new PKD_Window_PhoneGalleryGrid(r);
    } else {
      this._gridWindow = new PKD_Window_PhoneGalleryGrid(r.x, r.y, r.width, r.height);
    }
    this._gridWindow.setHandler('ok', this._requireZoom.bind(this));
    this._gridWindow.setAlbumName(this.albumName);
    this._gridWindow.activate();
    this._gridWindow.safeSelect();
    this.addChild(this._gridWindow);
  }

  _requireZoom() {
    var e, imageData;
    try {
      this._gridWindow.deactivate();
      imageData = this._gridWindow.selectedImage();
      if (imageData != null) {
        SoundManager.playCursor();
        this._createZoomPicture(imageData.picName);
        if (String.any(imageData.title)) {
          this._createZoomTitle(imageData.title);
        }
        return this._createControlButtons();
      } else {
        this.endShowPicture();
        return SoundManager.playBuzzer();
      }
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  }

  update() {
    super.update();
    if (this.isShowPictureMode()) {
      return this._checkRequestBigImage();
    }
  }

  _checkRequestBigImage() {
    if (!this.isBigModeEnabled()) {
      return;
    }
    if (this.isInBigMode()) {
      return;
    }
    if (Input.isTriggered('ok')) {
      this._requestBigImage();
      Input.clear();
    }
  }

  _requestBigImage() {
    var e, imageData;
    try {
      imageData = this._gridWindow.selectedImage();
      if (imageData == null) {
        return;
      }
      if (String.any(imageData.picName)) {
        return this._createBigPicture(imageData.picName);
      }
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  }

};


// Generated by CoffeeScript 2.6.1
var PKD_SpriteMessageScreen;

PKD_SpriteMessageScreen = class PKD_SpriteMessageScreen extends KDCore.Sprite {
  constructor(messageData) {
    super();
    this.messageData = messageData;
    this._prepare();
    this._create();
  }

  isEnded() {
    return this._isEnded === true;
  }

  _prepare() {
    var doneButtonH;
    PKD_PhoneMenu.Utils.SetPhoneTopText(this.messageData.name);
    this._needDrawNextMessage = false;
    this._realMessagesHeight = 0; // * полный размер спрайта (динамически считается)
    this._hSingleMsg = 30;
    this._showMsgTimer = -1; // * Пауза м\у сообщениями
    this._isEnded = false;
    this._canSlideMessage = false; // * Можно прокручивать вниз? (только если есть сообщения)
    this._isInteractiveHistoryMode = false; // * Мы продолжаем читать, т.е. есть старые + новое
    this._isHistoryMode = false; // * Нет новых, просто старые
    // * Отнимаем немного (под размер кнопок)
    doneButtonH = ImageManager.loadPictureForPhone('btnDone_00').height || 30;
    doneButtonH += this._hSingleMsg * 2;
    this._visibleMessagesHeight = (PKD_PhoneMenu.Utils.screenSize().h - doneButtonH) - 20;
    this._msgEvId = this.messageData.evId.last();
    this._prepareMode();
  }

  _prepareMode() {
    var dataBefore;
    this._historyData = [];
    this._historyDataBefore = []; // * Эти сообещния не будут повторно сохраняться в историю при показе
    if (!$gameSystem.pkdIsNewMessageFrom(this.messageData.name)) {
      this._isInteractiveHistoryMode = false;
      this._historyDataBefore = [];
      this._isHistoryMode = true;
      this._historyData = $gameSystem.pkdGetMessagesHistory()[this.messageData.name];
    } else {
      // * Есть новое сообщение и до этого были сообщения
      if (this.messageData.evId.length > 1) {
        dataBefore = $gameSystem.pkdGetMessagesHistory()[this.messageData.name];
        this._historyDataBefore = JsonEx.parse(JsonEx.stringify(dataBefore));
        this._isInteractiveHistoryMode = true;
        this._isHistoryMode = false;
      } else {
        // * Новое (единственное) сообщение
        this._isInteractiveHistoryMode = false;
        this._isHistoryMode = false;
      }
      this._prepareMessages(); //1
    }
  }

  _create() {
    var h, mask, w;
    this.contents = new Sprite();
    this.msgContents = new Sprite();
    ({w, h} = PKD_PhoneMenu.Utils.screenSize());
    mask = new Sprite(new Bitmap(w, h));
    mask.bitmap.fillAll("#FFFFFF");
    this.contents.addChild(mask);
    this.msgContents.mask = mask;
    this.addChild(this.contents);
    this.contents.addChild(this.msgContents);
    this._createDoneButton(); //2
    this._needDrawNextMessage = !this._isHistoryMode;
    if (this._isHistoryMode === true || this._isInteractiveHistoryMode === true) { //3
      this._drawHistoryMessages();
    }
  }

  finish() {
    var e;
    this._isEnded = true;
    this._hidePlayerChoices(); //2
    try {
      this._doneButton.visible = true;
      this._doneButton.appear(45);
    } catch (error) {
      e = error;
      KDCore.warning(e);
    }
  }

  // * Этот метод надо вызывать перед закрытием сообщения
  end() {
    var history, i, j, key, len, ref;
    if (this._isHistoryMode === true) {
      return;
    }
    $gameSystem.pkdGetOldMessagesList().push(this._msgEvId);
    key = this.messageData.name;
    history = $gameSystem.pkdGetMessagesHistory();
    if (history[key] == null) {
      history[key] = [];
    }
    if (this._isInteractiveHistoryMode === true) {
      history[key] = this._historyData;
    } else {
      ref = this._historyData;
      for (j = 0, len = ref.length; j < len; j++) {
        i = ref[j];
        history[key].push(i);
      }
    }
  }

  update() {
    super.update();
    if (this._needDrawNextMessage === true) {
      this._drawChatMessages();
    }
    // * ТОЛЬКО КОГДА СООБЩЕНИЕ ПРОЧИТАНО
    if (this._isEnded === true) {
      if (this._canSlideMessage === true) { //2
        this._slideMessage();
      }
    }
    if (Input.isTriggered('ok')) {
      if (this._isEnded === true) {
        this._onDoneBClick();
      }
    }
    if (this._isWaitPlayerChoice()) {
      this._updateChoiceKeyboardInput();
    }
  }

  _drawChatMessages() {
    this._showMsgTimer--;
    if (this._showMsgTimer <= 0) {
      return this._showNextMessage();
    }
  }

  _showNextMessage() {
    var nextMsg;
    this._needDrawNextMessage = false;
    nextMsg = this._getNextMessage(); //1
    if (nextMsg != null) {
      this._drawChatMsg(nextMsg); //3
      this.nextMsgIndex++;
      this._processNextMessage();
    } else if (this.isNextIsPlayerChoice()) {
      this._showPlayerChoice(); //2
    } else {
      // * END!
      this.finish();
    }
  }

  _processNextMessage() {
    this._needDrawNextMessage = true;
    return this._showMsgTimer = 50;
  }

  isNextIsPlayerChoice() {
    return this._playerChoice != null;
  }

};


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ PKD_SpriteMessageScreen.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //$[ENCODE]

  //@[DEFINES]
  _ = PKD_SpriteMessageScreen.prototype;
  _._prepareMessages = function() {
    this._branch = {};
    this.nextMsgIndex = 0;
    this.indent = 0;
    this._index = 0;
    this.list = this._getProperMessageBody(this._msgEvId);
  };
  _._getProperMessageBody = function(evId) {
    var e;
    try {
      if (isFinite(evId)) {
        return $dataCommonEvents[parseInt(evId)].list;
      } else {
        if (evId.contains("fromMap_")) {
          evId = parseInt(evId.replace("fromMap_", ""));
          if (evId > 0 && DataManager.pkdIsPhoneMessagesMapIsValid()) {
            if ($dataPKDPMsgMap.events[evId] != null) {
              return $dataPKDPMsgMap.events[evId].pages[0].list;
            }
          }
        }
      }
    } catch (error) {
      e = error;
      KDCore.warning(e);
    }
    return [];
  };
  _._getNextMessage = function() {
    var item, text;
    this._skipBadCommands();
    text = null;
    this._playerChoice = null;
    item = this.list[this._index];
    if (item == null) {
      return null;
    }
    if (item.code === 102) {
      this._playerChoice = item;
      this.indent = item.indent;
    } else if (item.code === 401) {
      text = item.parameters[0];
      this.indent = item.indent;
    } else if (item.code === 402) {
      this.indent = item.indent;
      if (this._branch[this.indent] !== item.parameters[0]) {
        this._skipBranch();
      }
      this._index++;
      text = this._getNextMessage();
    }
    this._index++;
    text = PKD_PhoneMenu.Utils.ConvertEscapeCodes(text);
    return text;
  };
  _._skipBranch = function() {
    var results;
    results = [];
    while (this.list[this._index + 1].indent > this.indent) {
      results.push(this._index++);
    }
    return results;
  };
  _._skipBadCommands = function() {
    var item;
    if (this._index >= this.list.length - 1) {
      return;
    }
    item = this.list[this._index];
    if (item == null) {
      return;
    }
    this._executeSpecialCommand(item);
    while (item.code !== 102 && item.code !== 401 && item.code !== 402) {
      this._index++;
      item = this.list[this._index];
      if (item == null) {
        return;
      }
    }
  };
  _._executeSpecialCommand = function(item) {
    var e, singleLineCommand;
    try {
      if (![117, 121, 122, 355, 356].contains(item.code)) {
        return;
      }
      singleLineCommand = this._buildCommandForItem(item);
      if (singleLineCommand != null) {
        return PKD_PhoneMenu.ExecuteSingleCmdInMessage(singleLineCommand);
      }
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  };
  _._buildCommandForItem = function(item) {
    var e, list;
    try {
      list = [item];
      list.push[{
        code: 0,
        indent: 0,
        parameters: []
      }];
      return list;
    } catch (error) {
      e = error;
      KDCore.warning(e);
      return null;
    }
  };
})();

// ■ END PKD_SpriteMessageScreen.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ PKD_SpriteMessageScreen.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //$[ENCODE]

  //@[DEFINES]
  _ = PKD_SpriteMessageScreen.prototype;
  _._slideMessage = function() {
    var threshold;
    threshold = 20;
    if (TouchInput.wheelY >= threshold) {
      this._slideMessageDown();
      return;
    }
    if (TouchInput.wheelY <= -threshold) {
      this._slideMessageUp();
    }
  };
  _._slideMessageUp = function() {
    if (this.msgContents.y < 0) {
      return this.msgContents.y += this._hSingleMsg;
    }
  };
  _._slideMessageDown = function() {
    if (this.msgContents.y > (this._visibleMessagesHeight - this._realMessagesHeight)) {
      this.msgContents.y -= this._hSingleMsg;
    }
  };
  _._showPlayerChoice = function() {
    var t1, t2;
    if (!this._choiceIsCreated) {
      this._createPlayerChoices();
    }
    this._choiceButtonA.visible = true;
    this._choiceButtonB.visible = true;
    this._choiceButtonA.appear(45);
    this._choiceButtonB.appear(45);
    t1 = this._playerChoice.parameters[0][0];
    t2 = this._playerChoice.parameters[0][1];
    if (!String.any(t1)) {
      this._choiceButtonA.disable();
    } else {
      this._choiceButtonA.enable();
    }
    if (!String.any(t2)) {
      this._choiceButtonB.disable();
    } else {
      this._choiceButtonB.enable();
    }
    this._choiceTextA.draw(t1);
    this._choiceTextB.draw(t2);
  };
  _._isWaitPlayerChoice = function() {
    return (this._choiceButtonA != null) && this._choiceButtonA.visible === true;
  };
  _._hidePlayerChoices = function() {
    if (!this._choiceIsCreated) {
      return;
    }
    this._choiceButtonA.visible = false;
    this._choiceButtonB.visible = false;
  };
  _._createPlayerChoices = function() {
    var buttonImage, p, screenSize;
    buttonImage = ImageManager.loadPictureForPhone('btnChoice_00');
    screenSize = PKD_PhoneMenu.Utils.screenSize();
    this._choiceIsCreated = true;
    this._choiceButtonA = new KDCore.ButtonM("btnChoice", false, "pPhoneMenu");
    this._choiceButtonB = new KDCore.ButtonM("btnChoice", false, "pPhoneMenu");
    this._choiceButtonA.addClickHandler(this._onChoiceAClick.bind(this));
    this._choiceButtonB.addClickHandler(this._onChoiceBClick.bind(this));
    this._choiceButtonA.move(0, screenSize.h - buttonImage.height);
    this._choiceButtonB.move(buttonImage.width, this._choiceButtonA.y);
    //TODO: Settings for user?
    p = {
      visible: true,
      size: {
        w: buttonImage.width - 2,
        h: buttonImage.height
      },
      alignment: "center",
      font: {
        face: null,
        size: 16,
        italic: false
      },
      margins: {
        x: 1,
        y: 0
      },
      outline: {
        color: null,
        width: 2
      },
      textColor: "#FFFFFF",
      shadow: {
        color: "#000",
        opacity: 200,
        margins: {
          x: 1,
          y: 1
        }
      }
    };
    this._choiceTextA = new KDCore.UI.Sprite_UIText(p);
    this._choiceTextB = new KDCore.UI.Sprite_UIText(p);
    this._choiceButtonA.addChild(this._choiceTextA);
    this._choiceButtonB.addChild(this._choiceTextB);
    this._choiceButtonA.opacity = 0;
    this._choiceButtonB.opacity = 0;
    this.addChild(this._choiceButtonA);
    this.addChild(this._choiceButtonB);
  };
  _._onChoiceAClick = function() {
    return this._onChoiceClickCommon(0, this._playerChoice.parameters[0][0]);
  };
  _._onChoiceBClick = function() {
    return this._onChoiceClickCommon(1, this._playerChoice.parameters[0][1]);
  };
  _._updateChoiceKeyboardInput = function() {
    if (Input.isTriggered('left')) {
      this._onChoiceAClick();
    } else if (Input.isTriggered('right')) {
      this._onChoiceBClick();
    }
  };
  _._onChoiceClickCommon = function(indent, text) {
    this._branch[this.indent] = indent;
    this._hidePlayerChoices();
    this.drawChatMsgFromPl(text);
    this.nextMsgIndex++;
    this._processNextMessage();
  };
  _._onDoneBClick = function() {
    var e;
    try {
      if (this.backCallback != null) {
        return this.backCallback();
      }
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  };
  _._createDoneButton = function() {
    var buttonImage, screenSize;
    buttonImage = ImageManager.loadPictureForPhone('btnDone_00');
    screenSize = PKD_PhoneMenu.Utils.screenSize();
    this._doneButton = new KDCore.ButtonM("btnDone", false, "pPhoneMenu");
    this._doneButton.addClickHandler(this._onDoneBClick.bind(this));
    this._doneButton.move(0, screenSize.h - buttonImage.height);
    this._doneButton.opacity = 0;
    this._doneButton.visible = false;
    this.addChild(this._doneButton);
  };
})();

// ■ END PKD_SpriteMessageScreen.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ PKD_SpriteMessageScreen.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //$[ENCODE]

  //@[DEFINES]
  _ = PKD_SpriteMessageScreen.prototype;
  _._drawChatMsg = function(text) {
    SoundManager.playCursor();
    return this._drawChatMsgCommon(text, false);
  };
  _.drawChatMsgFromPl = function(text) {
    return this._drawChatMsgCommon(text, true);
  };
  _._drawHistoryMessages = function() {
    var data, i, j, len;
    this.nextMsgIndex = 0;
    data = this._historyData;
    if (this._isInteractiveHistoryMode === true) {
      data = this._historyDataBefore;
    }
    for (j = 0, len = data.length; j < len; j++) {
      i = data[j];
      if (i[1] === 'left') {
        this._drawChatMsgCommon(i[0], false);
      } else {
        this._drawChatMsgCommon(i[0], true);
      }
      this.nextMsgIndex++;
    }
    if (this._isInteractiveHistoryMode === false) {
      this.finish();
    }
  };
  _._drawChatMsgCommon = function(text, isFromPlayer = false) {
    var msg, msgBack, msgBackColor, p, side, w, w2;
    p = PKD_PhoneMenu.PP.getMessagesStyleSettings();
    w = PKD_PhoneMenu.Utils.screenSize().w - 12;
    msgBack = new KDCore.Sprite(new Bitmap(w, this._hSingleMsg));
    msg = new Sprite(new Bitmap(w, this._hSingleMsg));
    if (isFromPlayer === true) {
      msg.bitmap.textColor = p.playerMessageTextColor;
      msg.bitmap.fontSize = p.playerMessageFontSize;
      side = p.playerMessagePosition;
      msg.bitmap.drawTextFull(text, side);
      if (this._isHistoryMode === false) {
        this._historyData.push([text, side]);
      }
    } else {
      side = p.charMessagePosition;
      msg.bitmap.textColor = p.charMessageTextColor;
      msg.bitmap.fontSize = p.charMessageFontSize;
      msg.bitmap.drawTextFull(text, side);
      if (this._isHistoryMode === false) {
        this._historyData.push([text, side]);
      }
    }
    msgBack.y = this.nextMsgIndex * (this._hSingleMsg + 4);
    w2 = msg.bitmap.measureTextWidth(text) + 10;
    msg.x = 5;
    msgBack.addChild(msg);
    if (isFromPlayer === true) {
      msgBackColor = p.playerBackRectColor;
      msgBack.bitmap.fillRect(w - w2, 0, w2, this._hSingleMsg, msgBackColor);
      msgBack.x += 12;
      msg.x -= 10;
    } else {
      msgBackColor = p.charBackRectColor;
      msgBack.bitmap.fillRect(0, 0, w2, this._hSingleMsg, msgBackColor);
    }
    this.msgContents.addChild(msgBack);
    msgBack.appear(45);
    this._realMessagesHeight += this._hSingleMsg;
    return this._moveMessages();
  };
  _._moveMessages = function() {
    var diff;
    if ((this._realMessagesHeight + this._hSingleMsg) >= this._visibleMessagesHeight) {
      this._canSlideMessage = true; // * можем использовать скролл
      diff = this._realMessagesHeight - this._visibleMessagesHeight;
      this.msgContents.y = -diff;
    }
  };
})();

// ■ END PKD_SpriteMessageScreen.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
var PKD_SpriteMessageScreen2;

PKD_SpriteMessageScreen2 = class PKD_SpriteMessageScreen2 extends KDCore.Sprite {
  constructor(messageData) {
    super();
    this.messageData = messageData;
    this._prepare();
    this._create();
    this._start();
  }

  isEnded() {
    return this._isEnded === true;
  }

  settings() {
    return PKD_PhoneMenu.PP.getNewMessagesAppSettings();
  }

  defaultMessageHeight() {
    return this.settings().defaultMessageHeight;
  }

  isHaveNewMessages() {
    return $gameSystem.pkdIsNewMessageFrom(this.messageData.name);
  }

  maxMessagesHeight() {
    // * We don't need scroll
    if (this.lastMessageY() < this.messagesWindowHeight()) {
      return 0;
    } else {
      return this.messagesWindowHeight() - this.lastMessageY();
    }
  }

  messagesWindowHeight() {
    return PKD_PhoneMenu.Utils.screenSize().h;
  }

  messageWindowWidth() {
    return PKD_PhoneMenu.Utils.screenSize().w;
  }

  spaceBetweenMessages() {
    return this.settings().spaceBetweenMessages;
  }

  nextMessageShowDelayMs() {
    return this.settings().nextMessageShowDelayMs;
  }

  end() {} // * Not used, for compatibility with older version

  
    // * pos Y + height
  lastMessageY() {
    var h, l, s, y;
    if (this._messagesSprs.length === 0) {
      return 0;
    } else {
      l = this._messagesSprs.last();
      h = l.height;
      y = l.y;
      s = this.spaceBetweenMessages();
      return h + y + s;
    }
  }

  isScrollAllowed() {
    return this.isEnded();
  }

  scrollMove() {
    return this.defaultMessageHeight();
  }

  update() {
    super.update();
    //if Input.isTriggered('k')
    //    @__lastMessageY = @messagesZone.y
    //    console.log "LAST_MSG_Y " +  @__lastMessageY
    if (this.isScrollAllowed()) {
      this._updateScrolling();
    }
    this._updateChoicesKeyboardInput();
  }

  _prepare() {
    this._messagesSprs = [];
    this._isEnded = false;
    this._msgEvId = this.messageData.evId.last();
    // * New message or History or Both
    this._loadHistory();
    // * Read messages data
    this._prepareMessages(); //1
  }

  _loadHistory() {
    var e;
    try {
      this._historyMessages = this.getStoredHistoryData();
      return this._historyMessageIndex = 0;
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  }

  _start() {
    return this._showNextMessage();
  }

  _create() {
    var e;
    try {
      //screen = new KDCore.Sprite(new Bitmap(@messageWindowWidth(), @messagesWindowHeight()))
      //screen.b().fillAll("#ffffff")
      //@addChild screen
      this._createMessagesZone();
      this._createMaskZone();
      return this._createButtonsAndChoices(); //4
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  }

  _createMessagesZone() {
    var e;
    try {
      this.messagesZone = new KDCore.Sprite(new Bitmap(1, 1));
      return this.addChild(this.messagesZone);
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  }

  _createMaskZone() {
    var e;
    try {
      this.messagesZoneMask = new KDCore.Sprite(new Bitmap(this.messageWindowWidth(), this.messagesWindowHeight()));
      this.messagesZoneMask.b().fillAll("#ffffff");
      this.messagesZone.mask = this.messagesZoneMask;
      return this.addChild(this.messagesZoneMask);
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  }

};


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ PKD_SpriteMessageScreen2.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = PKD_SpriteMessageScreen2.prototype;
  _._prepareMessages = function() {
    var e;
    this._branch = {};
    this.indent = 0;
    this._index = 0;
    try {
      if (this.isHaveNewMessages()) {
        this.list = this._getProperMessageBody(this._msgEvId);
      } else {
        this.list = [];
      }
    } catch (error) {
      e = error;
      KDCore.warning(e);
      this.list = [];
    }
  };
  _._getProperMessageBody = function(evId) {
    var e;
    try {
      if (isFinite(evId)) {
        return $dataCommonEvents[parseInt(evId)].list;
      } else {
        if (evId.contains("fromMap_")) {
          evId = parseInt(evId.replace("fromMap_", ""));
          if (evId > 0 && DataManager.pkdIsPhoneMessagesMapIsValid()) {
            if ($dataPKDPMsgMap.events[evId] != null) {
              return $dataPKDPMsgMap.events[evId].pages[0].list;
            }
          }
        }
      }
    } catch (error) {
      e = error;
      KDCore.warning(e);
    }
    return [];
  };
  _._getNextMessage = function() {
    if (this.isHaveHistoryMessage()) {
      return this._getNextHistoryMessage();
    } else {
      // * Есть ли вообще новые сообщения от данного автора
      if (this.isHaveNewMessages()) {
        return this._getNextNewMessage();
      } else {
        return null;
      }
    }
  };
  _._getNextHistoryMessage = function() {
    var e, messageData;
    try {
      messageData = this._getHistoryMessageData(this._historyMessageIndex);
      this._historyMessageIndex++;
      return messageData;
    } catch (error) {
      e = error;
      KDCore.warning(e);
      this._historyMessageIndex++;
      return "skip";
    }
  };
  _._getNextNewMessage = function() {
    var e, item, messageData, next, text;
    try {
      //console.log(@_index)
      this._skipBadCommands();
      text = null;
      item = this.list[this._index];
      if (item == null) {
        return null;
      }
      if (item.code === 0) {
        return null;
      }
      if (item.code === 102) { // * CHOICE
        this.indent = item.indent;
        return {
          isChoice: true,
          choiceData: item
        };
      } else if (item.code === 401) { // * TEXT
        text = item.parameters[0];
        this.indent = item.indent;
        // * Build multiline messages
        next = this.list[this._index + 1];
        while ((next != null) && next.code === 401) {
          text += '\n' + next.parameters[0];
          this._index++;
          next = this.list[this._index + 1];
        }
      } else if (item.code === 402) { // * CHOICE VARIANT TEXT
        this.indent = item.indent;
        if (this._branch[this.indent] !== item.parameters[0]) {
          this._skipBranch();
        } else {
          this._index += 2;
        }
        return this._getNextMessage();
      }
      messageData = this._getNextMessageDataConfig(text);
      if (this._nextMessageUserExPicture != null) {
        messageData.exPicture = this._nextMessageUserExPicture;
        this._nextMessageUserExPicture = null;
      }
      return messageData;
    } catch (error) {
      e = error;
      KDCore.warning(e);
      this._index++;
      return "skip";
    }
  };
  _._getNextMessageDataConfig = function(text, isFromPlayer = false) {
    var config, e;
    try {
      /*if text.contains("SEND_PICTURE:")
      config = @_getPictureDataConfig(text)
      console.log config
      return config if config?*/
      if (this._nextMessageUserParameters != null) {
        config = this._nextMessageUserParameters;
        config.text = text;
        // * После одного использования, убираем настройку
        this._nextMessageUserParameters = null;
        return config;
      }
      if (isFromPlayer) {
        return this._getDefaultRightMessageConfig(text);
      } else {
        return this._getDefaultLeftMessageConfig(text);
      }
    } catch (error) {
      e = error;
      KDCore.warning(e);
      return this._getDefaultLeftMessageConfig('error');
    }
  };
  // * Не используется, это был отдельный способ отправки изображения
  /*_._getPictureDataConfig = (text) ->
  try
      values = text.replace("SEND_PICTURE:", "").split(",")
      #return null if values.length < 3
      values = values.map (v) -> v.trim()
   * * By default we using TX
      defaultDx = @_getDefaultLeftMessageConfig('').tx
      return {
          text: "",
          isPicture: true,
          image: values[0],
          tx: 0,
          ty: 0,
          dx: Number(values[1]) || defaultDx
      }
  catch e
      KDCore.warning e
  return null */
  // * From NPC (left)
  _._getDefaultLeftMessageConfig = function(text) {
    var p;
    p = JsonEx.parse(JsonEx.stringify(PKD_PhoneMenu.PP.getNewMessageNPCMessageConfig()));
    p.text = text;
    return p;
  };
  // * From Player (right)
  _._getDefaultRightMessageConfig = function(text) {
    var p;
    p = JsonEx.parse(JsonEx.stringify(PKD_PhoneMenu.PP.getNewMessagePlayerMessageConfig()));
    p.text = text;
    return p;
  };
  _._skipBranch = function() {
    var e, results;
    try {
      results = [];
      while (this.list[this._index + 1].indent > this.indent) {
        results.push(this._index++);
      }
      return results;
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  };
  _._skipBadCommands = function() {
    var e, item;
    try {
      if (this._index >= this.list.length - 1) {
        return;
      }
      item = this.list[this._index];
      if (item == null) {
        return;
      }
      this._executeSpecialCommand(item);
      while (item.code === 108) {
        this._readSpecialConfigComment(item);
        this._readSpecialExImageComment(item);
        this._index++;
        item = this.list[this._index];
        if (item == null) {
          return;
        }
      }
      while (item.code !== 102 && item.code !== 401 && item.code !== 402) {
        this._index++;
        item = this.list[this._index];
        if (item == null) {
          return;
        }
      }
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  };
  _._readSpecialConfigComment = function(item) {
    var comment, defaultConfig, dx, e, image, tx, ty, values;
    try {
      if (![108].contains(item.code)) {
        return;
      }
      comment = item.parameters[0];
      if (!String.any(comment)) {
        return;
      }
      if (!comment.contains("config:")) {
        return;
      }
      values = comment.replace("config:", "").split(",");
      if (values.length === 0) {
        return;
      }
      //values = values.map (v) -> v.trim()
      //console.log("COMMENT PARAMETER FOUND:")
      //console.log(comment)
      defaultConfig = this._getDefaultLeftMessageConfig('');
      tx = Number(values[1]) || defaultConfig.tx;
      ty = Number(values[2]) || defaultConfig.ty;
      dx = Number(values[3]) || defaultConfig.dx;
      image = values[0] || defaultConfig.image;
      this._nextMessageUserParameters = {tx, ty, dx, image};
    } catch (error) {
      //console.log(@_nextMessageUserParameters)
      e = error;
      KDCore.warning(e);
      this._nextMessageUserParameters = null;
    }
  };
  _._readSpecialExImageComment = function(item) {
    var comment, dx, dy, e, image, values;
    try {
      if (![108].contains(item.code)) {
        return;
      }
      comment = item.parameters[0];
      if (!String.any(comment)) {
        return;
      }
      if (!comment.contains("msgExtraImage:")) {
        return;
      }
      values = comment.replace("msgExtraImage:", "").split(",");
      if (values.length === 0) {
        return;
      }
      dx = Number(values[1]) || 0;
      dy = Number(values[2]) || 0;
      image = values[0] || "";
      if (String.any(image)) {
        this._nextMessageUserExPicture = {image, dx, dy};
      } else {
        this._nextMessageUserExPicture = null;
      }
    } catch (error) {
      e = error;
      KDCore.warning(e);
      this._nextMessageUserExPicture = null;
    }
  };
  _._executeSpecialCommand = function(item) {
    var e, singleLineCommand;
    try {
      if (![117, 121, 122, 355, 356].contains(item.code)) {
        return;
      }
      singleLineCommand = this._buildCommandForItem(item);
      if (singleLineCommand != null) {
        return PKD_PhoneMenu.ExecuteSingleCmdInMessage(singleLineCommand);
      }
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  };
  _._buildCommandForItem = function(item) {
    var e, list;
    try {
      list = [item];
      list.push[{
        code: 0,
        indent: 0,
        parameters: []
      }];
      return list;
    } catch (error) {
      e = error;
      KDCore.warning(e);
      return null;
    }
  };
})();

// ■ END PKD_SpriteMessageScreen2.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ PKD_SpriteMessageScreen2_2.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = PKD_SpriteMessageScreen2.prototype;
  _._showNextMessage = function() {
    var e, messageData;
    try {
      messageData = this._getNextMessage();
      if (messageData != null) {
        if (messageData === "skip") {
          return this._showNextMessage();
        } else {
          if (messageData.isChoice != null) {
            return this._showChoices(messageData);
          } else {
            return this._showMessage(messageData);
          }
        }
      } else {
        this._finishMessaging();
        return setTimeout((() => {
          if (this.messagesZone.y < this.__lastMessageY) {
            return this._refreshEndScrollPosition();
          }
        }), 100);
      }
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  };
  _._finishMessaging = function() {
    var e;
    try {
      // * END!!!
      //console.log("END!")
      this._saveHistory();
      this._isEnded = true;
      this._refreshEndScrollPosition();
      return this._showDoneButton(); //4
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  };
  _._refreshEndScrollPosition = function() {
    var e, lastMsg;
    try {
      // * For limit scrolling down
      this.__lastMessageY = this.messagesZone.y;
      this.__lastMessageY -= this._getDoneButtonHeight();
      try {
        lastMsg = this._messagesSprs.last();
        if (lastMsg != null) {
          return this.__lastMessageY -= lastMsg.height;
        }
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    } catch (error) {
      //console.log "LAST_MSG_Y " +  @__lastMessageY
      e = error;
      return KDCore.warning(e);
    }
  };
  _._showMessage = function(messageData) {
    var e, image;
    try {
      //console.log messageData
      ({image} = messageData);
      if (String.any(image)) {
        return this._showMessageWithCustomBackImage(messageData);
      } else {
        return this._showMessageWithDefaultBack(messageData);
      }
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  };
  _._showMessageWithCustomBackImage = function(messageData) {
    var e, image;
    try {
      ({image} = messageData);
      return KDCore.Utils.loadImageAsync("pPhoneMenu", image).then(this._createMessageBackFromImage.bind(this, messageData));
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  };
  _._createMessageBackFromImage = function(messageData, bitmap) {
    var e, msgBack;
    try {
      msgBack = new KDCore.Sprite(bitmap);
      messageData.w = msgBack.width;
      messageData.h = msgBack.height;
      this._drawMessageBody(msgBack, messageData);
      return this._onMessageBeenAdded(messageData);
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  };
  // * Not used
  _._showMessageWithDefaultBack = function(messageData) {
    var backColor, e, h, isFromPlayer, msgBack, p, w;
    try {
      p = PKD_PhoneMenu.PP.getMessagesStyleSettings();
      ({isFromPlayer} = messageData);
      w = this.messageWindowWidth();
      h = this.defaultMessageHeight();
      msgBack = new KDCore.Sprite(new Bitmap(w, h));
      if (isFromPlayer) {
        backColor = p.playerBackRectColor;
      } else {
        backColor = p.charBackRectColor;
      }
      msgBack.b().fillRect(0, 0, w, h, backColor);
      this._drawMessageBody(msgBack, messageData);
      return this._onMessageBeenAdded(messageData);
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  };
  _._drawMessageBody = function(backSpr, messageData) {
    var e, exPicture, h, messageContent, spr, y;
    try {
      if (String.any(messageData.text)) {
        messageContent = this._createMessageContentSpr(messageData);
        backSpr.addChild(messageContent);
      }
      this.messagesZone.addChild(backSpr);
      h = backSpr.height;
      if (this._messagesSprs.length === 0) {
        y = 0;
      } else {
        y = this.lastMessageY();
        this._scrollDownAutoBy(h);
      }
      backSpr.y = y;
      backSpr.x = messageData.dx || 0;
      this._messagesSprs.push(backSpr);
      backSpr.appear(55);
      ({exPicture} = messageData);
      if (exPicture != null) {
        spr = this._createExtraPictureForMessage(messageData.exPicture);
        if (spr != null) {
          return backSpr.addChild(spr);
        }
      }
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  };
  _._createExtraPictureForMessage = function({image, dx, dy}) {
    var e, spr;
    try {
      spr = new KDCore.Sprite(ImageManager.loadPictureForPhone(image));
      spr.move(dx || 0, dy || 0);
      return spr;
    } catch (error) {
      e = error;
      KDCore.warning(e);
      return null;
    }
  };
  _._createMessageContentSpr = function(messageData) {
    var e, h, msgSpr, p, p2, tx, ty, w;
    try {
      p = this.settings();
      w = messageData.w;
      h = messageData.h;
      tx = messageData.tx || 0;
      ty = messageData.ty || 0;
      p2 = {
        visible: true,
        size: {
          w: w,
          h: h
        },
        font: p.defaultMessagesFont,
        margins: {
          x: tx,
          y: ty
        }
      };
      msgSpr = new KDCore.UI.Sprite_UITextExt(p2);
      msgSpr.draw(messageData.text);
      return msgSpr;
    } catch (error) {
      e = error;
      KDCore.warning(e);
      return new Sprite();
    }
  };
  _._onMessageBeenAdded = function(messageData) {
    var e;
    try {
      if (!messageData.isHistoryMessage) {
        KDCore.Utils.playSE(this.settings().addMessageSE);
        if (!this.__noRiseIndex) {
          this._index++;
        }
        this.__noRiseIndex = null;
        this._saveMessageToHistory(messageData);
        return setTimeout(this._showNextMessage.bind(this), this.nextMessageShowDelayMs());
      } else {
        return this._showNextMessage();
      }
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  };
})();

// ■ END PKD_SpriteMessageScreen2_2.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ PKD_SpriteMessageScreen2_3.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = PKD_SpriteMessageScreen2.prototype;
  _._updateScrolling = function() {
    var threshold;
    if (Input.isPressed('down')) {
      this._slideMessageDown();
    } else if (Input.isPressed('up')) {
      this._slideMessageUp();
    }
    // * MOUSE
    threshold = 20;
    if (TouchInput.wheelY >= threshold) {
      this._slideMessageDown();
      return;
    }
    if (TouchInput.wheelY <= -threshold) {
      this._slideMessageUp();
      return;
    }
  };
  _._slideMessageUp = function() {
    if (this.messagesZone.y > -this.scrollMove()) {
      this.messagesZone.y = 0;
      return;
    }
    return this.messagesZone.y += this.scrollMove();
  };
  //console.log @messagesZone.y
  _._slideMessageDown = function() {
    if (this.maxMessagesHeight() === 0) {
      return;
    }
    if (this.messagesZone.y < this.__lastMessageY) {
      return;
    }
    this.messagesZone.y -= this.scrollMove();
  };
  // console.log @messagesZone.y
  _._scrollDownAutoBy = function(h) {
    var dh;
    dh = this._scrollAmoutTo(h);
    if (dh > 0) {
      this._scrollDownBy(dh + (this.spaceBetweenMessages() * 2), true);
      return true;
    }
    return false;
  };
  _._scrollAmoutTo = function(h) {
    var spaceLeft, y;
    y = this.lastMessageY();
    if ((y + h) < this.messagesWindowHeight()) {
      return false;
    }
    spaceLeft = y - (0 - this.messagesZone.y);
    spaceLeft = this.messagesWindowHeight() - spaceLeft;
    if (spaceLeft > h) {
      return this.spaceBetweenMessages();
    } else {
      return h - spaceLeft;
    }
  };
  _._scrollDownBy = function(h, isAnimated) {
    if (isAnimated === true) {
      this.messagesZone.moveWithAnimation(0, -h, 10);
    } else {
      this.messagesZone.y -= h;
    }
  };
})();

// ■ END PKD_SpriteMessageScreen2_3.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ PKD_SpriteMessageScreen2.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = PKD_SpriteMessageScreen2.prototype;
  _._createButtonsAndChoices = function() {
    var e;
    try {
      this._createEndButton();
      return this._createChoicesLayer();
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  };
  
  // * END (DONE) BUTTON ==============================
  _._createEndButton = function() {
    var buttonImage, e;
    try {
      this._doneButton = new KDCore.ButtonM("btnDone", false, "pPhoneMenu");
      buttonImage = ImageManager.loadPictureForPhone('btnDone_00');
      buttonImage.addLoadListener(this._refreshDoneButtonPosition.bind(this));
      this._doneButton.addClickHandler(this._onDoneBClick.bind(this));
      this._doneButton.opacity = 0;
      this._doneButton.visible = false;
      this.addChild(this._doneButton);
      return this._refreshDoneButtonPosition();
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  };
  _._refreshDoneButtonPosition = function() {
    var e, screenSize;
    try {
      if (this._doneButton == null) {
        return;
      }
      screenSize = PKD_PhoneMenu.Utils.screenSize();
      return this._doneButton.move(0, screenSize.h - this._getDoneButtonHeight());
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  };
  _._getDoneButtonHeight = function() {
    var e;
    try {
      if (this._doneButton == null) {
        return 0;
      }
      return this._doneButton._bitmaps[0].height;
    } catch (error) {
      e = error;
      KDCore.warning(e);
    }
    return 0;
  };
  _._showDoneButton = function() {
    var e;
    try {
      if (this._doneButton == null) {
        return;
      }
      this._doneButton.visible = true;
      this._doneButton.appear(45);
      if (this._scrollDownAutoBy(this._getDoneButtonHeight())) {
        this._doneButton.height = this._getDoneButtonHeight();
        return this._messagesSprs.push(this._doneButton);
      }
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  };
  _._onDoneBClick = function() {
    var e;
    try {
      if (this.backCallback != null) {
        return this.backCallback();
      }
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  };
  
  // * CHOICES ======================================
  _._createChoicesLayer = function() {
    var e;
    try {
      this._choiceButtonsLayer = new KDCore.Sprite();
      this.addChild(this._choiceButtonsLayer);
      return this._choiceButtonBitmap = ImageManager.loadPictureForPhone('btnChoiceBig_00');
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  };
  _._showChoices = function(messageData) {
    var choiceData, e;
    try {
      if (messageData == null) {
        this._onChoiceMade();
      }
      ({choiceData} = messageData);
      if (choiceData == null) {
        this._onChoiceMade();
      }
      this._isInChoiceMode = true;
      //console.log(choiceData)
      this._createChoicesButtons(choiceData);
      this._refreshChoicesPositionOnScreen();
    } catch (error) {
      e = error;
      KDCore.warning(e);
      this._onChoiceMade();
    }
  };
  _._createChoicesButtons = function(choiceData) {
    var button, choiceImage, choices, createChoiceButton, createChoiceText, e, font, index, j, len, s, text;
    try {
      this._choiceButtonsLayer.activateHandlerManagment();
      this._choiceButtons = [];
      s = this.settings();
      font = s.defaultChoiceTextFont;
      choiceImage = this._choiceButtonBitmap;
      createChoiceText = function(text) {
        var h, p, textSpr, w;
        w = choiceImage.width;
        h = choiceImage.height;
        p = {
          visible: true,
          size: {
            w: w - 2,
            h: h
          },
          font: font,
          margins: {
            x: 1,
            y: 0
          },
          singleLine: true,
          forceCentered: true
        };
        textSpr = new KDCore.UI.Sprite_UITextExt(p);
        textSpr.draw(text);
        return textSpr;
      };
      createChoiceButton = function(text) {
        var button;
        button = new KDCore.ButtonM("btnChoiceBig", false, "pPhoneMenu");
        button.pIsSupportKeyboardHandle = function() {
          return true;
        };
        //convertedText = PKD_PhoneMenu.Utils.ConvertEscapeCodes(text)
        button.addChild(createChoiceText(text));
        button.appear(45, 10);
        button.choiceText = text;
        return button;
      };
      choices = choiceData.parameters[0];
      for (index = j = 0, len = choices.length; j < len; index = ++j) {
        text = choices[index];
        button = createChoiceButton(text);
        button.handleOKAction = this._onChoiceClick.bind(this, index);
        button.addClickHandler(this._onChoiceClick.bind(this, index));
        this._choiceButtons.push(button);
        this._choiceButtonsLayer.addChild(button);
        button.y += index * (choiceImage.height + 1);
      }
    } catch (error) {
      e = error;
      KDCore.warning(e);
      throw e;
    }
  };
  _._refreshChoicesPositionOnScreen = function() {
    var e, h, screenSize;
    try {
      h = (1 + this._choiceButtonBitmap.height) * this._choiceButtons.length;
      screenSize = PKD_PhoneMenu.Utils.screenSize();
      this._choiceButtonsLayer.move(0, screenSize.h - h);
      if (this._scrollDownAutoBy(h)) {
        this._choiceButtonsLayer.height = h;
        this._choicesIsAddedToScroll = true;
        return this._messagesSprs.push(this._choiceButtonsLayer);
      }
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  };
  _._onChoiceMade = function(isShowNext = true) {
    var e;
    try {
      this._isInChoiceMode = false;
      this.__noRiseIndex = true; //???
      this._index += 2;
      if (isShowNext === true) {
        return setTimeout(this._showNextMessage.bind(this), this.nextMessageShowDelayMs());
      }
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  };
  _._removeChoices = function() {
    var c, e, j, last, len, ref;
    try {
      this._choiceButtonsLayer.deactivateHandlerManagment();
      ref = this._choiceButtons;
      for (j = 0, len = ref.length; j < len; j++) {
        c = ref[j];
        c.removeFromParent();
      }
      this._choiceButtons = [];
      if (this._choicesIsAddedToScroll === true) {
        last = this._messagesSprs.last();
        //@messagesZone.y += @_choiceButtonBitmap.height
        this._messagesSprs.delete(last);
        return this._choicesIsAddedToScroll = false;
      }
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  };
  _._onChoiceClick = function(index) {
    var e, text;
    try {
      this._branch[this.indent] = index;
      text = this._choiceButtons[index].choiceText;
      this._removeChoices();
      this._showMessage(this._getNextMessageDataConfig(text, true));
      if (index > 0) {
        this._index += 2;
      }
      return this._onChoiceMade(false);
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  };
  _._updateChoicesKeyboardInput = function() {
    var e, i, j, ref, results;
    try {
      if (!this._isInChoiceMode) {
        return;
      }
      if (this._choiceButtons == null) {
        return;
      }
      if (this._choiceButtons.length === 0) {
        return;
      }
      results = [];
      for (i = j = 1, ref = this._choiceButtons.length; (1 <= ref ? j <= ref : j >= ref); i = 1 <= ref ? ++j : --j) {
        if (Input.isTriggered(i.toString())) {
          this._onChoiceClick(i - 1);
          Input.clear();
          break;
        } else {
          results.push(void 0);
        }
      }
      return results;
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  };
})();

// ■ END PKD_SpriteMessageScreen2.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ PKD_SpriteMessageScreen2.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = PKD_SpriteMessageScreen2.prototype;
  _.isHaveHistoryMessage = function() {
    if (this._historyMessages == null) {
      return false;
    }
    if (this._historyMessages.length <= 0) {
      return false;
    }
    return this._historyMessageIndex <= (this._historyMessages.length - 1);
  };
  _.getStoredHistoryData = function() {
    /*return [
        ["Hello!", "left"],
        ["Hi", "right"]
    ]*/
    var e;
    try {
      return $gameSystem.pkdGetMessagesHistory()[this.messageData.name];
    } catch (error) {
      e = error;
      KDCore.warning(e);
      return [];
    }
  };
  _._getHistoryMessageData = function(index) {
    var e, messageData;
    try {
      messageData = this._historyMessages[index];
      if (this._isOldHistoryFormat(messageData)) {
        messageData = this._convertOldHistoryToNewFormat(messageData);
      }
      return messageData;
    } catch (error) {
      e = error;
      KDCore.warning(e);
      return "skip";
    }
  };
  _._isOldHistoryFormat = function(messageData) {
    return (messageData != null) && messageData instanceof Array;
  };
  _._convertOldHistoryToNewFormat = function(messageData) {
    var e, msg;
    try {
      if (messageData[1] === 'left') {
        msg = this._getDefaultLeftMessageConfig(messageData[0]);
      } else {
        msg = this._getDefaultRightMessageConfig(messageData[0]);
      }
      msg.isHistoryMessage = true;
      return msg;
    } catch (error) {
      e = error;
      KDCore.warning(e);
      return this._getDefaultLeftMessageConfig('error');
    }
  };
  _._saveMessageToHistory = function(messageData) {
    var e;
    try {
      if (this._currentHistory == null) {
        this._currentHistory = [];
      }
      messageData.isHistoryMessage = true;
      return this._currentHistory.push(messageData);
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  };
  _._saveHistory = function() {
    var e, history, i, key, len, messageData, ref, results;
    try {
      if (this._currentHistory == null) {
        return;
      }
      if (!$gameSystem.pkdGetOldMessagesList().contains(this._msgEvId)) {
        $gameSystem.pkdGetOldMessagesList().push(this._msgEvId);
      }
      key = this.messageData.name;
      history = $gameSystem.pkdGetMessagesHistory();
      if (history[key] == null) {
        history[key] = [];
      }
      ref = this._currentHistory;
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        messageData = ref[i];
        results.push(history[key].push(messageData));
      }
      return results;
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  };
})();

// ■ END PKD_SpriteMessageScreen2.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
var PKD_SpritePhoneAppContactsContext;

PKD_SpritePhoneAppContactsContext = class PKD_SpritePhoneAppContactsContext extends PKD_SpritePhoneAppContext {
  constructor() {
    super();
    this._inContactInfo = false;
  }

  _loadAppData() {
    return PKD_PhoneMenu.Utils.GetAppData("contactsApp");
  }

  _defaultAppBackgroundBitmap() {
    return ImageManager.loadPictureForPhone("contactsBackground");
  }

  _createContent() {
    this._createContactsList();
  }

  backHandler(phone) {
    if (!this._inContactInfo) {
      return super.backHandler(phone);
    } else {
      return this._backFromContactScreen();
    }
  }

  _createContactsList() {
    var r;
    r = this.getAppRect();
    if (KDCore.isMZ()) {
      this._contacts = new PKD_Window_PhoneContactsList(r);
    } else {
      this._contacts = new PKD_Window_PhoneContactsList(r.x, r.y, r.width, r.height);
    }
    this._contacts.setHandler('ok', this._onContactSelected.bind(this));
    this._contacts.hide();
    this.addChild(this._contacts);
  }

  _onContactSelected() {
    this._contacts.hide();
    this._inContactInfo = true;
    this._createContactInfoScreen(this._contacts.selectedContact());
  }

  _createContactInfoScreen(contactData) {
    this._contactInfoScreen = new PKD_SpriteContactInfoScreen(contactData);
    this._contactInfoScreen.backCallback = this._backFromContactScreen.bind(this);
    this.addChild(this._contactInfoScreen);
  }

  _backFromContactScreen() {
    this.removeChild(this._contactInfoScreen);
    this._inContactInfo = false;
    this.showContent();
    Input.clear();
    TouchInput.clear();
  }

  showContent() {
    PKD_PhoneMenu.Utils.SetPhoneTopText(this._appData.name);
    this._contacts.refresh();
    this._contacts.safeSelect();
    this._contacts.activate();
    this._contacts.show();
  }

};


// Generated by CoffeeScript 2.6.1
var PKD_SpritePhoneAppInstagramContext;

PKD_SpritePhoneAppInstagramContext = class PKD_SpritePhoneAppInstagramContext extends PKD_SpritePhoneAppContext {
  _loadAppData() {
    var appData;
    appData = PKD_PhoneMenu.Utils.GetAppData("instagramApp");
    if (appData == null) {
      appData = PKD_PhoneMenu.Utils.GetAppData("socialApp");
    }
    if (appData == null) {
      appData = {
        name: "Instagram"
      };
    }
    return appData;
  }

  _defaultAppBackgroundBitmap() {
    var imageName;
    imageName = $gameSystem.pkdGetPhone().galleryWallpaper;
    if (!String.any(imageName)) {
      imageName = $gameSystem.pkdGetPhone().messagesWallpaper;
    }
    if (!String.any(imageName)) {
      imageName = "galleryBackground";
    }
    return ImageManager.loadPictureForPhone(imageName);
  }

  _createContent() {
    this._socialMenu = null;
    this._menuState = "main";
  }

  showContent() {
    if (this._menuState === "profiles") {
      return this.showProfilesMenu();
    }
    return this.showMainMenu();
  }

  showMainMenu() {
    var env, ownerName;
    this._menuState = "main";
    env = $gameSystem.pkdGetInstagramEnv();
    ownerName = String.any(env.profileName) ? env.profileName : env.ownerId;
    PKD_PhoneMenu.Utils.SetPhoneTopText("Instagram @" + ownerName);
    if (this._socialMenu != null) {
      this.removeChild(this._socialMenu);
      this._socialMenu = null;
    }
    this._socialMenu = new PKD_SpritePhoneModalMenu({
      titleText: "Instagram",
      options: [
        {
          title: "Feed",
          action: "Phone.OpenInstagram('feed')"
        },
        {
          title: "Mensajes",
          action: "Phone.OpenInstagram('dm')"
        },
        {
          title: "Discovery",
          action: "Phone.OpenInstagram('discovery')"
        },
        {
          title: "Perfiles",
          action: "Phone.InstagramMenu('profiles')"
        },
        {
          title: "Cerrar",
          action: null
        }
      ],
      keepAppContextOpen: true
    });
    this.addChild(this._socialMenu);
    this._socialMenu._refreshPlacement();
  }

  showProfilesMenu() {
    var env, i, len, list, opt, options, profile;
    this._menuState = "profiles";
    env = $gameSystem.pkdGetInstagramEnv();
    PKD_PhoneMenu.Utils.SetPhoneTopText("Perfiles seguidos");
    if (this._socialMenu != null) {
      this.removeChild(this._socialMenu);
      this._socialMenu = null;
    }
    list = $gameSystem.pkdGetDiscoveredInstagramProfiles();
    options = [];
    for (i = 0, len = list.length; i < len; i++) {
      profile = list[i];
      if (profile.userId === env.ownerId) {
        continue;
      }
      opt = {
        title: "@" + profile.profileName,
        action: "Phone.OpenInstagramProfile('" + profile.userId + "','feed')"
      };
      options.push(opt);
    }
    if (options.length <= 0) {
      options.push({
        title: "Aun no hay nada por aqui",
        action: null
      });
    }
    options.push({
      title: "Volver",
      action: "Phone.InstagramMenu('main')"
    });
    this._socialMenu = new PKD_SpritePhoneModalMenu({
      titleText: "Instagram",
      options,
      keepAppContextOpen: true
    });
    this.addChild(this._socialMenu);
    this._socialMenu._refreshPlacement();
  }

  onInstagramSectionEmpty(section) {
    PKD_PhoneMenu.Utils.SetPhoneTopText("Instagram - " + section);
    Phone.ShowModalMessage("Aun no hay nada por aqui", "OK");
    this.showContent();
  }

};


// Generated by CoffeeScript 2.6.1
var PKD_SpritePhoneAppGalleryContext;

PKD_SpritePhoneAppGalleryContext = class PKD_SpritePhoneAppGalleryContext extends PKD_SpritePhoneAppContext {
  constructor() {
    super();
    this._inAlbum = false;
  }

  _loadAppData() {
    return PKD_PhoneMenu.Utils.GetAppData("galleryApp");
  }

  _defaultAppBackgroundBitmap() {
    var imageName;
    imageName = $gameSystem.pkdGetPhone().galleryWallpaper;
    if (!String.any(imageName)) {
      imageName = "galleryBackground";
    }
    return ImageManager.loadPictureForPhone(imageName);
  }

  _createContent() {
    this._createAlbumsList();
  }

  backHandler(phone) {
    if (!this._inAlbum) {
      return super.backHandler(phone);
    } else {
      return this._backFromAlbumScreen();
    }
  }

  _createAlbumsList() {
    var r;
    r = this.getAppRect();
    if (KDCore.isMZ()) {
      this._albums = new PKD_Window_PhoneGalleryAlbumsList(r);
    } else {
      this._albums = new PKD_Window_PhoneGalleryAlbumsList(r.x, r.y, r.width, r.height);
    }
    this._albums.setHandler('ok', this._onAlbumSelected.bind(this));
    this._albums.hide();
    this.addChild(this._albums);
  }

  _onAlbumSelected() {
    this._albums.hide();
    this._inAlbum = true;
    this._createGalleryGridScreen(this._albums.selectedAlbum());
  }

  _createGalleryGridScreen(albumName) {
    this._galleryGridScreen = new PKD_SpriteGalleryGridScreen(albumName);
    this._galleryGridScreen.backCallback = this._backFromAlbumScreen.bind(this);
    this.addChild(this._galleryGridScreen);
  }

  _backFromAlbumScreen() {
    //* From PICTURE to grid back (if zoomed), then from Grid (if not)
    if (this._galleryGridScreen.isShowPictureMode()) {
      this._galleryGridScreen.endShowPicture();
    } else {
      this.removeChild(this._galleryGridScreen);
      this._inAlbum = false;
      this.showContent();
    }
    Input.clear();
    TouchInput.clear();
  }

  showContent() {
    PKD_PhoneMenu.Utils.SetPhoneTopText(this._appData.name);
    this._albums.refresh();
    this._albums.safeSelect();
    this._albums.activate();
    this._albums.show();
  }

};


// Generated by CoffeeScript 2.6.1
var PKD_SpritePhoneAppItem;

PKD_SpritePhoneAppItem = class PKD_SpritePhoneAppItem extends KDCore.UI.Sprite_UIElement {
  constructor(params) {
    super(params);
    this._isManualHoveredState = false;
    this._isBeenUnderMouse = false;
    this._changer = null;
    this._clickChanger = null;
    this._scaleFactor = this.initialScale();
    this.scale.set(this._scaleFactor);
    this._canExecute = false;
    return;
  }

  update() {
    var ref;
    super.update();
    this._updateHoverUnHoverAnimation();
    if ((ref = this._clickChanger) != null) {
      ref.update();
    }
  }

  initialScale() {
    return 0.85;
  }

  topScale() {
    return 1.0;
  }

  setTextField(textField) {
    this.textField = textField;
  }

  refresh() {
    var e;
    if (this._alertIcon == null) {
      return;
    }
    try {
      return this._alertIcon.visible = $gameSwitches.value(this.params.alertSwitchId);
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  }

  //$[OVER]
  isActive() {
    return true;
  }

  isCanExecuteAction() {
    return this._canExecute === true;
  }

  requestActionExecution() {
    if (this._isDisabled === true) {
      return;
    }
    this.playClickEffect();
  }

  getActionForExecution() {
    return {
      ev: this.params.commonEventId,
      isOuter: this.params.isOuterStart
    };
  }

  onActionExecuted() {
    this._canExecute = false;
    // * Если приложение было запущенно, сбросить переключатель
    if (this.params.alertSwitchId > 0) {
      $gameSwitches.setValue(this.params.alertSwitchId, false);
    }
  }

  //$[OVER]
  rootImageFolder() {
    return "pPhoneMenu";
  }

  alignWithSlot() {
    if (this.parent == null) {
      return;
    }
    this.x = this.parent.width / 2;
    return this.y = this.parent.height / 2;
  }

  //$[OVER]
  _resetPosition() {
    var ref;
    this.x = this.y = 0;
    this.anchor.set(0.5);
    if ((ref = this.zeroChild()) != null) {
      ref.anchor.set(0.5);
    }
  }

  setManualHoveredState() {
    this._isManualSelectedItem = false;
    this._isManualSelectionMode = true;
    this._startAnimateOut();
  }

  resetManualHoveredState() {
    this._isManualSelectedItem = false;
    this._isManualSelectionMode = false;
    this._startAnimateOut();
  }

  isManualSelected() {
    return this._isManualSelectedItem === true;
  }

  manualSelect() {
    this._startAnimateIn();
    this._isManualSelectedItem = true;
  }

  isSelected() {
    return this.isUnderMouse() || this.isManualSelected();
  }

  disableApp() {
    this._isDisabled = true;
    return this.desaturate();
  }

  playClickEffect() {
    var fromY, toY;
    this._clickChanger = new KDCore.Changer(this._appButton);
    this._clickChanger.change('y');
    this._appButton.y = 0;
    fromY = 0;
    toY = 6;
    this._clickChanger.from(fromY).to(toY).step(3).repeat(3).reverse().done(() => {
      this._appButton.y = 0;
      this._canExecute = true;
      return this._clickChanger = null;
    });
    this._clickChanger.start();
  }

  resetAllAnimations() {
    this._changer = null;
    this._clickChanger = null;
    this._appButton.y = 0;
    this.scale.set(this.initialScale());
  }

  _updateHoverUnHoverAnimation() {
    var ref;
    if ((ref = this._changer) != null) {
      ref.update();
    }
    this._updateScaleFactor();
    if (this._isManualSelectionMode === true) {
      return;
    }
    if (this.isUnderMouse()) {
      if (this._isBeenUnderMouse === false) {
        this._isBeenUnderMouse = true;
        this._startAnimateIn();
      }
    } else {
      if (this._isBeenUnderMouse === true) {
        this._startAnimateOut();
        this._isBeenUnderMouse = false;
      }
    }
  }

  _updateScaleFactor() {
    if (this._changer == null) {
      return;
    }
    return this.scale.set(this._scaleFactor);
  }

  _startAnimateIn() {
    var curValue, finalValue;
    // * No moveIn if started!
    if (this._clickChanger != null) {
      return;
    }
    this._changer = new KDCore.Changer(this);
    curValue = this._scaleFactor;
    finalValue = this.topScale();
    this._changer.change('_scaleFactor').from(curValue).to(finalValue).step(0.05);
    this._changer.start();
    this._changer.done(() => {
      this._scaleFactor = this.topScale();
      this._updateScaleFactor();
      return this._changer = null;
    });
    setTimeout((() => {
      var ref;
      return (ref = this.textField) != null ? ref.draw(this.params.name) : void 0;
    }), 100);
  }

  _startAnimateOut() {
    var curValue, finalValue, ref;
    // * No moveOut if started!
    if (this._clickChanger != null) {
      return;
    }
    this._changer = new KDCore.Changer(this);
    curValue = this._scaleFactor;
    finalValue = this.initialScale();
    this._changer.change('_scaleFactor').from(curValue).to(finalValue).step(0.1);
    this._changer.start();
    this._changer.done(() => {
      this._scaleFactor = this.initialScale();
      this._updateScaleFactor();
      return this._changer = null;
    });
    if ((ref = this.textField) != null) {
      ref.draw("");
    }
  }

  _prepare() {
    super._prepare();
    return this.visible = true; // * always
  }

  _createContent() {
    this._createButton();
    this._createAlertIcon();
    return this._resetPosition();
  }

  _createButton() {
    var imageName;
    imageName = this.params.icon;
    this._appButton = new KDCore.ButtonMU({
      main: imageName,
      hover: imageName,
      disabled: imageName
    }, false, this.rootImageFolder());
    this._appButton.addClickHandler(() => {
      return this.requestActionExecution();
    });
    return this.add(this._appButton);
  }

  _createAlertIcon() {
    var e;
    try {
      if (this.params.alertSwitchId <= 0) {
        return;
      }
      this._alertIcon = new KDCore.Sprite(ImageManager.loadPictureForPhone("AppIcon_Alert"));
      this._alertIcon.anchor.set(0.5);
      this._appButton.addChild(this._alertIcon);
      return this.refresh();
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  }

};


// Generated by CoffeeScript 2.6.1
var PKD_SpritePhoneAppMessagesContext;

PKD_SpritePhoneAppMessagesContext = class PKD_SpritePhoneAppMessagesContext extends PKD_SpritePhoneAppContext {
  constructor() {
    super();
    this._inMessage = false;
  }

  _loadAppData() {
    return PKD_PhoneMenu.Utils.GetAppData("messagesApp");
  }

  _defaultAppBackgroundBitmap() {
    var imageName;
    imageName = $gameSystem.pkdGetPhone().messagesWallpaper;
    if (!String.any(imageName)) {
      imageName = "messagesBackground";
    }
    return ImageManager.loadPictureForPhone(imageName);
  }

  _createContent() {
    this._createMessagesList();
  }

  backHandler(phone) {
    PKD_PhoneMenu.Utils.refreshMessagesAppAlert();
    if (!this._inMessage) {
      super.backHandler(phone);
    } else {
      this._backFromMessageScreen();
    }
    Input.clear();
    TouchInput.clear();
  }

  _createMessagesList() {
    var r;
    r = this._getPMLRect();
    if (KDCore.isMZ()) {
      this._messages = new PKD_Window_PhoneMessagesList(r);
    } else {
      this._messages = new PKD_Window_PhoneMessagesList(r.x, r.y, r.width, r.height);
    }
    this._messages.setHandler('ok', this._onMsgSelected.bind(this));
    this._messages.hide();
    this.addChild(this._messages);
  }

  _onMsgSelected() {
    this._messages.hide();
    this._inMessage = true;
    this._createMessageScreen(this._messages.selectedMessage());
  }

  _createMessageScreen(msgData) {
    if (PKD_PhoneMenu.PP.isUseLegacyMessageScreen()) {
      this._messageScreen = new PKD_SpriteMessageScreen(msgData);
    } else {
      this._messageScreen = new PKD_SpriteMessageScreen2(msgData);
    }
    this._messageScreen.backCallback = this._backFromMessageScreen.bind(this);
    this.addChild(this._messageScreen);
  }

  _backFromMessageScreen() {
    if (this._messageScreen.isEnded()) {
      this._messageScreen.end();
      this.removeChild(this._messageScreen);
      this._inMessage = false;
      return this.showContent();
    } else {
      return SoundManager.playBuzzer();
    }
  }

  _getPMLRect() {
    var h, w;
    ({w, h} = this.screenSize());
    return {
      x: 0,
      y: 0,
      width: w,
      height: h
    };
  }

  showContent() {
    PKD_PhoneMenu.Utils.SetPhoneTopText(this._appData.name);
    this._messages.refresh();
    this._messages.safeSelect();
    this._messages.activate();
    return this._messages.show();
  }

};


// Generated by CoffeeScript 2.6.1
var PKD_SpritePhoneAppSettingsContext;

PKD_SpritePhoneAppSettingsContext = class PKD_SpritePhoneAppSettingsContext extends PKD_SpritePhoneAppContext {
  constructor() {
    super();
    this.activateHandlerManagment();
  }

  _loadAppData() {
    return PKD_PhoneMenu.Utils.GetAppData("settingsApp");
  }

  _defaultAppBackgroundBitmap() {
    return ImageManager.loadPictureForPhone("settingsBackground");
  }

  backHandler(phone) {
    var e;
    try {
      ConfigManager.save();
    } catch (error) {
      e = error;
      KDCore.warning(e);
    }
    return super.backHandler(phone);
  }

  _createContent() {
    var e;
    try {
      this._readOptionsItems();
      return this._createOptionsItems();
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  }

  _readOptionsItems() {
    var e;
    try {
      return this._optionsItems = PKD_PhoneMenu.PP.getSettingsAppOptions();
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  }

  _createOptionsItems() {
    var e, i, item, j, len, len1, ref, ref1, results;
    try {
      this._optionsElements = [];
      ref = this._optionsItems;
      for (i = 0, len = ref.length; i < len; i++) {
        item = ref[i];
        this._addOptionItem(item);
      }
      ref1 = this._optionsElements;
      results = [];
      for (j = 0, len1 = ref1.length; j < len1; j++) {
        e = ref1[j];
        results.push(e.opacity = 0);
      }
      return results;
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  }

  _addOptionItem(item) {
    var e;
    try {
      if (String.any(item.condition)) {
        try {
          if (!eval(item.condition)) {
            return;
          }
        } catch (error) {
          e = error;
          KDCore.warning(e);
          return;
        }
      }
      this._addTitle(item);
      switch (item.type) {
        case "slider":
          return this._addSlider(item);
        case "switch":
          return this._addSwitch(item);
      }
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  }

  _addTitle({titleImg, titlePosition}) {
    var e, titleE;
    try {
      if (!String.any(titleImg)) {
        return;
      }
      titleE = new KDCore.Sprite(ImageManager.loadPictureForPhone(titleImg));
      this.addChild(titleE);
      this._optionsElements.push(titleE);
      return titleE.move(titlePosition);
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  }

  _addSlider({position, configManagerField}) {
    var e, slider;
    try {
      slider = new PKD_SpritePhoneItem_OptionSlider(configManagerField);
      this.addChild(slider);
      this._optionsElements.push(slider);
      return slider.move(position);
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  }

  _addSwitch({position, configManagerField}) {
    var e, switchE;
    try {
      switchE = new PKD_SpritePhoneItem_OptionSwitchButton(configManagerField);
      this.addChild(switchE);
      this._optionsElements.push(switchE);
      return switchE.move(position);
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  }

  showContent() {
    var e, i, len, ref, results;
    try {
      ref = this._optionsElements;
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        e = ref[i];
        results.push(e.appear(75));
      }
      return results;
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  }

};


// Generated by CoffeeScript 2.6.1
var PKD_SpritePhoneAppUserCustomContext;

PKD_SpritePhoneAppUserCustomContext = class PKD_SpritePhoneAppUserCustomContext extends PKD_SpritePhoneAppContext {
  constructor() {
    super();
    this._inZoomInMode = false;
  }

  userContextData() {
    return $gameTemp.__pUserCustomContextData;
  }

  showContent() {
    this._baseContent.appear(125);
    PKD_PhoneMenu.Utils.SetPhoneTopText(this._appData.name);
  }

  _loadAppData() {
    var app, id;
    ({id} = this.userContextData());
    app = PKD_PhoneMenu.Utils.GetAppData(id);
    if (app != null) {
      return app;
    } else {
      // * If APP not found, try load APP data from previous Context
      // * Возможно мы делаем Context Forward!
      id = $gameTemp._pPreviousAppContext.id;
      return PKD_PhoneMenu.Utils.GetAppData(id);
    }
  }

  _defaultAppBackgroundBitmap() {
    var backgroundImage;
    ({backgroundImage} = this.userContextData());
    return ImageManager.loadPictureForPhone(backgroundImage);
  }

  _createContent() {
    this._baseContent = new KDCore.Sprite();
    this._baseContent.opacity = 0;
    this.addChild(this._baseContent);
    this._createPictures();
    this._createGauges();
    this._createZoomInPicutures();
    this._createButtons();
    this._createSliders();
    this._createSwitches();
    this._createTextItems();
    this._placeElements();
  }

  _createPictures() {
    var e, j, len, p, pic, pictures;
    this._pictures = [];
    ({pictures} = this.userContextData());
    if (pictures == null) {
      return;
    }
    for (j = 0, len = pictures.length; j < len; j++) {
      p = pictures[j];
      try {
        if (!PKD_PhoneMenu.Utils.isSwitchIsTRUE(p.enabledSwitchId)) {
          continue;
        }
        if (!String.any(p.name)) {
          continue;
        }
        pic = new Sprite(ImageManager.loadPictureForPhone(p.name));
        pic.move(p.margins);
        pic.zIndex = p.zIndex;
        this._pictures.push(pic);
      } catch (error) {
        e = error;
        KDCore.warning(e);
      }
    }
  }

  //TODO:For Update (not need now)
  /*zoomPictures: [
      {
          name: "avaKageDesu",
          zoomedName: "contactsBackground",
          enabledSwitchId: 0,
          margins: { x: 0, y: 0 }
          zIndex: 0
      }
  ],*/
  _createZoomInPicutures() {
    var e, i, j, len, pic, results, zoomPictures;
    this._zoomPictures = [];
    ({zoomPictures} = this.userContextData());
    if (zoomPictures == null) {
      return;
    }
    results = [];
    for (j = 0, len = zoomPictures.length; j < len; j++) {
      i = zoomPictures[j];
      try {
        if (!PKD_PhoneMenu.Utils.isSwitchIsTRUE(i.enabledSwitchId)) {
          continue;
        }
        if (!String.any(i.name)) {
          continue;
        }
        //TODO: sprite that determine click inself!
        pic = new Sprite(ImageManager.loadPictureForPhone(i.name));
        pic.move(i.margins);
        pic.zIndex = i.zIndex;
        results.push(this._zoomPictures.push(pic));
      } catch (error) {
        e = error;
        results.push(KDCore.warning(e));
      }
    }
    return results;
  }

  _createButtons() {
    var button, buttons, ce, e, i, j, len, results;
    this._buttons = [];
    ({buttons} = this.userContextData());
    if (buttons == null) {
      return;
    }
    results = [];
    for (j = 0, len = buttons.length; j < len; j++) {
      i = buttons[j];
      try {
        if (!PKD_PhoneMenu.Utils.isSwitchIsTRUE(i.enabledSwitchId)) {
          continue;
        }
        button = new KDCore.ButtonMU(i, false, 'pPhoneMenu');
        ce = i.commonEventId;
        button._myCommonEventId = ce;
        if (KDCore.Utils.isValidCE(ce)) {
          if (i.isOuterStart === true) {
            button.addClickHandler(function() {
              return PKD_PhoneMenu.Utils.startCEFromUserContext(this._myCommonEventId);
            });
          } else {
            button.addClickHandler(function() {
              return PKD_PhoneMenu.Utils.startCEInUserContext(this._myCommonEventId);
            });
          }
        }
        //TODO: contextForward (for Update)
        //if String.any(i.contextForward)
        //    contextId = i.contextForward
        //    handler = -> PKD_PhoneMenu.Utils.forwardUserContext(contextId)
        button.move(i.margins);
        button.zIndex = i.zIndex;
        results.push(this._buttons.push(button));
      } catch (error) {
        e = error;
        results.push(KDCore.warning(e));
      }
    }
    return results;
  }

  _createSliders() {
    var e, i, j, len, slider, sliders;
    this._sliders = [];
    ({sliders} = this.userContextData());
    if (sliders == null) {
      return;
    }
    for (j = 0, len = sliders.length; j < len; j++) {
      i = sliders[j];
      try {
        if (!PKD_PhoneMenu.Utils.isSwitchIsTRUE(i.enabledSwitchId)) {
          continue;
        }
        slider = new PKD_SpritePhoneItem_Slider(i);
        slider.move(i.margins);
        slider.zIndex = i.zIndex;
        this._sliders.push(slider);
      } catch (error) {
        e = error;
        KDCore.warning(e);
      }
    }
  }

  _createSwitches() {
    var e, i, item, j, len, switches;
    this._switches = [];
    ({switches} = this.userContextData());
    if (switches == null) {
      return;
    }
    for (j = 0, len = switches.length; j < len; j++) {
      i = switches[j];
      try {
        if (!PKD_PhoneMenu.Utils.isSwitchIsTRUE(i.enabledSwitchId)) {
          continue;
        }
        if (i.switchId <= 0) {
          continue;
        }
        item = new PKD_SpritePhoneItem_SwitchButton(i);
        item.move(i.margins);
        item.zIndex = i.zIndex;
        this._switches.push(item);
      } catch (error) {
        e = error;
        KDCore.warning(e);
      }
    }
  }

  _createGauges() {
    var e, g, gauge, gauges, j, len, settings;
    this._gauges = [];
    ({gauges} = this.userContextData());
    if (gauges == null) {
      return;
    }
    for (j = 0, len = gauges.length; j < len; j++) {
      g = gauges[j];
      try {
        if (!PKD_PhoneMenu.Utils.isSwitchIsTRUE(g.enabledSwitchId)) {
          continue;
        }
        settings = {...g.settings};
        settings.visible = true; // * Required field for KDCore UI element
        settings.rootImageFolder = "pPhoneMenu";
        gauge = new KDCore.UI.Sprite_UIGauge(settings);
        gauge.move(g.margins);
        gauge.zIndex = g.zIndex;
        gauge.draw($gameVariables.value(g.currentPercentVarId) / 100);
        this._gauges.push(gauge);
      } catch (error) {
        e = error;
        KDCore.warning(e);
      }
    }
  }

  _createTextItems() {
    var e, element, i, j, len, settings, textItems;
    this._textItems = [];
    ({textItems} = this.userContextData());
    if (textItems == null) {
      return;
    }
    for (j = 0, len = textItems.length; j < len; j++) {
      i = textItems[j];
      try {
        if (!PKD_PhoneMenu.Utils.isSwitchIsTRUE(i.enabledSwitchId)) {
          continue;
        }
        settings = {...i.settings};
        settings.visible = true; // * Required field for KDCore UI element
        settings.margins = i.margins;
        element = new KDCore.UI.Sprite_UITextExt(settings);
        element.zIndex = i.zIndex;
        element.draw(i.text);
        this._textItems.push(element);
      } catch (error) {
        e = error;
        KDCore.warning(e);
      }
    }
  }

  _placeElements() {
    var allElements, e, j, len, results;
    try {
      // * yes, it's funny
      allElements = this._pictures.concat(this._gauges).concat(this._textItems).concat(this._zoomPictures).concat(this._buttons).concat(this._sliders).concat(this._switches);
      allElements.sort(function(a, b) {
        return a.zIndex - b.zIndex;
      });
      results = [];
      for (j = 0, len = allElements.length; j < len; j++) {
        e = allElements[j];
        results.push(this.addElement(e));
      }
      return results;
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  }

  addElement(e) {
    return this._baseContent.addChild(e);
  }

  //TODO: back to Prev.Context (if $gameTemp._pPreviousAppContext?)
  backHandler(phone) {
    if (!this._inZoomInMode) {
      return super.backHandler(phone);
    } else {
      return this._backFromZoomedImage();
    }
  }

  _backFromZoomedImage() {}

};

//TODO: end show zoomed picture


// Generated by CoffeeScript 2.6.1
var PKD_SpritePhoneIcon;

PKD_SpritePhoneIcon = class PKD_SpritePhoneIcon extends KDCore.Sprite {
  constructor() {
    super();
    this._create();
    this.opacity = 0;
    this.refreshAlertSymbol();
    this.appear(50, 10);
    return;
  }

  refreshAlertSymbol() {
    var ref;
    return (ref = this._alertIcon) != null ? ref.visible = PKD_PhoneMenu.IsHaveNewMessages() : void 0;
  }

  _create() {
    var e, mapIconPosition;
    ({mapIconPosition} = PKD_PhoneMenu.PP.getPhoneSettings());
    this._createPhoneButton();
    this._createAlertIcon();
    try {
      this.move(mapIconPosition);
    } catch (error) {
      e = error;
      KDCore.warning(e);
      this.move(0, 0);
    }
  }

  _createPhoneButton() {
    this._button = new KDCore.ButtonM("PhoneIcon", false, "pPhoneMenu");
    this._button.addClickHandler(() => {
      if (this.opacity === 255 && this.visible === true) {
        return PKD_PhoneMenu.Show();
      }
    });
    return this.addChild(this._button);
  }

  _createAlertIcon() {
    this._alertIcon = new Sprite(ImageManager.loadPictureForPhone("PhoneIcon_Alert"));
    return this.addChild(this._alertIcon);
  }

};


// Generated by CoffeeScript 2.6.1
var PKD_SpritePhoneItem_OptionSlider;

PKD_SpritePhoneItem_OptionSlider = class PKD_SpritePhoneItem_OptionSlider extends PKD_SpritePhoneItem_Slider {
  constructor(configManagerField) {
    super({
      variableId: 999999, // * Not used, just for code works
      sliderBackImg: "sliderBack",
      sliderKnobImg: "sliderKnob",
      configManagerField: configManagerField
    });
    this.handleLeftAction = () => {
      return this._changeValue(-5);
    };
    this.handleRightAction = () => {
      return this._changeValue(5);
    };
    return;
  }

  _changeValue(byValue) {
    var e;
    try {
      if (ConfigManager[this.config.configManagerField] == null) {
        return;
      }
      ConfigManager[this.config.configManagerField] += byValue;
      if (ConfigManager[this.config.configManagerField] < 0) {
        ConfigManager[this.config.configManagerField] = 0;
      } else if (ConfigManager[this.config.configManagerField] > 100) {
        ConfigManager[this.config.configManagerField] = 100;
      }
      return this._readInitialValue();
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  }

  pIsSupportKeyboardHandle() {
    return true;
  }

  //$[OVER]
  getVariableValue() {
    var e, value;
    try {
      if (ConfigManager[this.config.configManagerField] != null) {
        value = ConfigManager[this.config.configManagerField];
        return value;
      }
    } catch (error) {
      e = error;
      KDCore.warning(e);
    }
    return 0;
  }

  //$[OVER]
  setVariableValue(newValue) {
    var e;
    try {
      return ConfigManager[this.config.configManagerField] = newValue;
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  }

};


// Generated by CoffeeScript 2.6.1
var PKD_SpritePhoneItem_OptionSwitchButton;

PKD_SpritePhoneItem_OptionSwitchButton = class PKD_SpritePhoneItem_OptionSwitchButton extends PKD_SpritePhoneItem_SwitchButton {
  constructor(configManagerField) {
    super({
      switchId: 0, // * Not used, just for code works
      onImage: "switchButton_1",
      offImage: "switchButton_0",
      configManagerField: configManagerField
    });
    this.handleLeftAction = () => {
      return this.setValue(false);
    };
    this.handleRightAction = () => {
      return this.setValue(true);
    };
    this.handleOKAction = this.switchValue;
    return;
  }

  pIsSupportKeyboardHandle() {
    return true;
  }

  //$[OVER]
  getValue() {
    var e, value;
    try {
      if (ConfigManager[this.config.configManagerField] != null) {
        value = ConfigManager[this.config.configManagerField];
        return value;
      }
    } catch (error) {
      e = error;
      KDCore.warning(e);
    }
    return false;
  }

  //$[OVER]
  setValue(value) {
    var e;
    try {
      ConfigManager[this.config.configManagerField] = value;
      return this._refreshState();
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  }

};


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ PKD_SpritePhoneMapNotify.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
var PKD_SpritePhoneMapNotify;

PKD_SpritePhoneMapNotify = class PKD_SpritePhoneMapNotify extends KDCore.Sprite {
  constructor(params) {
    super();
    this.params = params;
    this._create();
    this._threads = [];
    this._isAlive = true;
    this._isSoundPlayed = false;
    this._scaleFactor = this.getSettings().initialScale;
    this.anchor.x = 0.5;
    this.scale.x = this.scale.y = this._scaleFactor;
    this._refreshInitalPlacement();
    this.appear(this.getSettings().appearSpeed);
    this._initScaleUpThread();
    this._initLiveTimer();
    return;
  }

  destroyNotify() {
    this.visible = false;
    return this.removeFromParent();
  }

  isAlive() {
    return this._isAlive === true;
  }

  _refreshInitalPlacement() {
    var e, x, y;
    ({x, y} = this.getSettings().position);
    try {
      this.x = eval(x);
    } catch (error) {
      e = error;
      KDCore.warning(e);
      this.x = 0;
    }
    try {
      this.y = eval(y);
    } catch (error) {
      e = error;
      KDCore.warning(e);
      this.y = 0;
    }
  }

  update() {
    var i, len, ref, t;
    super.update();
    if (!this.visible) {
      return;
    }
    if (!this._isSoundPlayed) {
      if (this.opacity > 200) {
        this._playSE();
      }
    }
    ref = this._threads;
    for (i = 0, len = ref.length; i < len; i++) {
      t = ref[i];
      if (t != null) {
        t.update();
      }
    }
    this.scale.x = this.scale.y = this._scaleFactor;
  }

  getSettings() {
    return PKD_PhoneMenu.PP.getNotificationSettings();
  }

  _playSE() {
    var e;
    this._isSoundPlayed = true;
    if (!String.any(this.params.se)) {
      return;
    }
    try {
      if ($gameTemp._pkdLastPhoneNotifySoundPlayed == null) {
        KDCore.Utils.playSE(this.params.se);
        return $gameTemp._pkdLastPhoneNotifySoundPlayed = true;
      }
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  }

  _create() {
    var e;
    if (String.any(this.params.image)) {
      this._createBackgroundImage();
    }
    try {
      if (String.any(this.params.text)) {
        this._createText();
      }
    } catch (error) {
      e = error;
      KDCore.warning(e);
    }
  }

  _createBackgroundImage() {
    var image;
    image = this.params.image;
    this.bitmap = ImageManager.loadPictureForPhone(image);
  }

  _createText() {
    var e, fontSize, p, text, textSpr, x, y;
    text = this.params.text;
    x = this.params.textPos[0] || 0;
    y = this.params.textPos[1] || 0;
    fontSize = this.getSettings().defaultFontSize;
    p = {
      visible: true,
      size: {
        w: Graphics.width,
        h: Graphics.height
      },
      font: {
        face: null,
        size: fontSize,
        italic: false
      },
      margins: {
        x: 0,
        y: 0
      },
      singleLine: false,
      forceCentered: false
    };
    textSpr = new KDCore.UI.Sprite_UITextExt(p);
    textSpr.draw(text);
    try {
      textSpr.move(x, y);
    } catch (error) {
      e = error;
      KDCore.warning(e);
    }
    if (this.bitmap.isReady()) {
      textSpr.x -= this.bitmap.width / 2;
    } else {
      this.tSprite = textSpr;
      this.bitmap.addLoadListener(() => {
        return this.tSprite.x -= this.bitmap.width / 2;
      });
    }
    return this.addChild(textSpr);
  }

  _initScaleUpThread() {
    var changer, end, start;
    changer = new KDCore.Changer(this);
    start = this.scale.x;
    end = this.getSettings().finalScale;
    if (start === end) {
      return;
    }
    changer.change("_scaleFactor").from(start).to(end).step(0.05);
    changer.start();
    this._threads.push(changer);
  }

  _initLiveTimer() {
    var liveTime, liveTimeThread;
    liveTime = this.getSettings().stayTime;
    liveTimeThread = new KDCore.TimedUpdate(liveTime, this._onLiveEnd.bind(this));
    liveTimeThread.once();
    return this._threads.push(liveTimeThread);
  }

  _onLiveEnd() {
    this._threads = [];
    this._isAlive = false;
    this._moveOut();
  }

  _moveOut() {
    var changer, changer2, curY, finalY, step;
    if (this.parent === null) {
      return;
    }
    step = this.getSettings().disappearSpeed;
    changer = new KDCore.Changer(this);
    changer.change('opacity').from(255).to(0).step(step).speed(2).done(() => {
      return this.destroyNotify();
    });
    changer.start();
    changer2 = new KDCore.Changer(this);
    curY = this.y;
    if (this.getSettings().isMoveDownWhenMoveOut) {
      finalY = 10000;
    } else {
      finalY = -10000;
    }
    step = this.getSettings().moveOutSpeed;
    changer2.change('y').from(curY).to(finalY).step(step);
    changer2.start();
    this._threads.push(changer);
    this._threads.push(changer2);
  }

};

// ■ END PKD_SpritePhoneMapNotify.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
var PKD_SpritePhoneModalMenu;

PKD_SpritePhoneModalMenu = class PKD_SpritePhoneModalMenu extends KDCore.Sprite {
  constructor(menuData) {
    super();
    this.menuData = menuData;
    this._create();
    this._refreshPlacement();
  }

  getSettings() {
    return PKD_PhoneMenu.PP.getModalMenuSettings();
  }

  getMenuData() {
    return this.menuData;
  }

  update() {
    super.update();
    return this._options.update();
  }

};

(function() {  //╒═════════════════════════════════════════════════════════════════════════╛
  // ■ PKD_SpritePhoneModalMenu.coffee
  //╒═════════════════════════════════════════════════════════════════════════╛
  //---------------------------------------------------------------------------
  var _;
  //@[DEFINES]
  _ = PKD_SpritePhoneModalMenu.prototype;
  _._refreshPlacement = function() {
    var rect;
    rect = PKD_PhoneMenu.Utils.getAppRect();
    this._modalMenuSprite.x = rect.width / 2 - this._modalMenuSprite.width / 2;
    this._modalMenuSprite.y = rect.height / 2 - this._modalMenuSprite.height / 2;
  };
  _._create = function() {
    //@_createBackSprite()
    this._createModalMenuSprite();
    this._createTitleTextSprite();
    this._createOptions();
  };
  /*_._createBackSprite = ->
  rect = PKD_PhoneMenu.Utils.getAppRect()
  @_backSprite = new Sprite(new Bitmap(rect.width, rect.height))
  @_backSprite.bitmap.fillAll @getSettings().backColor
  @_backSprite.opacity = @getSettings().backOpacity
  @addChild @_backSprite*/
  _._createModalMenuSprite = function() {
    var h, w;
    w = this.getSettings().width;
    h = this._calculateTotalHeight();
    this._modalMenuSprite = new Sprite(new Bitmap(w, h));
    this._modalMenuSprite.bitmap.fillAll(this.getSettings().menuColor);
    this.addChild(this._modalMenuSprite);
  };
  _._calculateTotalHeight = function() {
    var e, h, i, j, optionsCount, ref;
    try {
      h = 0;
      h += this.getSettings().titleHeight;
      optionsCount = this.getMenuData().options.length;
      for (i = j = 0, ref = optionsCount; (0 <= ref ? j < ref : j > ref); i = 0 <= ref ? ++j : --j) {
        h += this.getSettings().optionLineHeight;
      }
      return h + (this.getSettings().padding * 2);
    } catch (error) {
      e = error;
      KDCore.warning(e);
      return 300;
    }
  };
  _._createTitleTextSprite = function() {
    var e, p;
    try {
      if ($ppJson_ModalMenuTitleTextSettings) {
        p = $ppJson_ModalMenuTitleTextSettings;
      } else {
        p = {
          visible: true,
          size: {
            w: 200,
            h: 60
          },
          alignment: "center",
          font: {
            face: null,
            size: 18,
            italic: false
          },
          margins: {
            x: 0,
            y: 0
          },
          outline: {
            color: "#000",
            width: 0.5
          },
          textColor: "#000",
          shadow: null
        };
      }
      this.titleText = new KDCore.UI.Sprite_UIText(p);
      this.titleText.draw(this.getMenuData().titleText);
      return this._modalMenuSprite.addChild(this.titleText);
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  };
  _._createOptions = function() {
    var buttons, e, index, item, j, len, option, ref;
    try {
      buttons = [];
      ref = this.getMenuData().options;
      for (index = j = 0, len = ref.length; j < len; index = ++j) {
        option = ref[index];
        item = this._createOptionItem(index, option);
        if (item != null) {
          buttons.push(item);
        }
      }
      return this._options = new PKD_ButtonsListChoice(...buttons);
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  };
  _._createOptionItem = function(index, {title, action}) {
    var e, h, optionButton;
    try {
      optionButton = new KDCore.ButtonM("ModalMenuOptionItem", false, "pPhoneMenu");
      optionButton.optionIndex = index;
      optionButton.addClickHandler(this._onOptionClick.bind(this, action));
      this._createTitleForOptionItem(title, optionButton);
      h = this._calculateYForOption(index);
      optionButton.move(0, h);
      this._modalMenuSprite.addChild(optionButton);
      return optionButton;
    } catch (error) {
      e = error;
      KDCore.warning(e);
      return null;
    }
  };
  _._createTitleForOptionItem = function(title, item) {
    var e, optionTitleText, p;
    try {
      if (typeof $ppJson_ModalMenuOptionSettings !== "undefined" && $ppJson_ModalMenuOptionSettings !== null) {
        p = $ppJson_ModalMenuOptionSettings;
      } else {
        p = {
          visible: true,
          size: {
            w: 200,
            h: 40
          },
          alignment: "center",
          font: {
            face: null,
            size: 12,
            italic: false
          },
          margins: {
            x: 0,
            y: 0
          },
          outline: {
            color: "#3f8ad4",
            width: 0.1
          },
          textColor: "#3f8ad4",
          shadow: null
        };
      }
      optionTitleText = new KDCore.UI.Sprite_UIText(p);
      optionTitleText.draw(title);
      return item.addChild(optionTitleText);
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  };
  _._calculateYForOption = function(index) {
    var h, s;
    s = this.getSettings();
    h = s.padding;
    h += s.titleHeight;
    h += s.optionLineHeight * index;
    return h;
  };
  _._onOptionClick = function(action) {
    var context, e, isKeepAppContextOpen, startCommonEvent;
    try {
      context = SceneManager._scene;
      isKeepAppContextOpen = this.getMenuData().keepAppContextOpen === true;
      if (action == null) {
        if (!isKeepAppContextOpen) {
          context.appContextBackHandlerCall();
        }
        return;
      }
      startCommonEvent = function(list) {
        var e;
        try {
          context._startInnerCe(list);
          return context.refresh();
        } catch (error) {
          e = error;
          return KDCore.warning(e);
        }
      };
      if (typeof action === "string") {
        try {
          if (String.any(action)) {
            eval(action);
          }
        } catch (error) {
          e = error;
          KDCore.warning(e);
        }
      } else if (typeof action === "number") {
        try {
          if (KDCore.Utils.isValidCE(action)) {
            startCommonEvent($dataCommonEvents[action].list);
          }
        } catch (error) {
          e = error;
          KDCore.warning(e);
        }
      } else if (typeof action === "object") {
        // * Already LIST of commands
        startCommonEvent(action);
      } else {
        console.log("Action is of an unknown Action type");
      }
      try {
        // * CLOSING MENU
        if (!isKeepAppContextOpen) {
          return context.appContextBackHandlerCall();
        }
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  };
})();

// ■ END PKD_SpritePhoneModalMenu.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
var PKD_SpritePhoneModalMenuContext;

PKD_SpritePhoneModalMenuContext = class PKD_SpritePhoneModalMenuContext extends PKD_SpritePhoneAppContext {
  constructor() {
    super();
  }

  _loadAppData() {
    return {
      name: ""
    };
  }

  onClosing() {
    return $gameTemp._pkdPhoneModalMenuData = null;
  }

  _defaultAppBackgroundBitmap() {} // * EMPTY

  _animateAppear() {
    return this.onAnimatinDone();
  }

  _createContent() {
    this.modalMenu = new PKD_SpritePhoneModalMenu($gameTemp._pkdPhoneModalMenuData);
    return this.addChild(this.modalMenu);
  }

};


// Generated by CoffeeScript 2.6.1
var PKD_Window_PhoneContactsList;

PKD_Window_PhoneContactsList = class PKD_Window_PhoneContactsList extends Window_Selectable {
  constructor() {
    super(...arguments);
    this.setBackgroundType(2);
    this.refresh();
  }

  maxItems() {
    return PKD_PhoneMenu.Utils.getAllContacts().length;
  }

  itemHeight() {
    return 56;
  }

  safeSelect() {
    if (this.maxItems() > 0) {
      return this.select(0);
    } else {
      return this.select(-1);
    }
  }

  selectedContact() {
    return this.getContactData(this.index());
  }

  drawItem(index) {
    var e, face, iconData, name, rect;
    rect = this.itemRect(index);
    name = this.getContactName(index);
    face = this.getContactPreviewFace(index);
    iconData = this.getContactExtraIconData(index);
    if (!String.any(name)) {
      return;
    }
    try {
      if (iconData != null) {
        this._drawExtraIcon(iconData, rect);
      }
      if (String.any(face)) {
        this._drawFace(face, rect);
      }
      return this._drawContactName(name, rect);
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  }

  _drawExtraIcon(iconData, rect) {
    var dx, dy, iconBit;
    if (!String.any(iconData.name)) {
      return;
    }
    iconBit = ImageManager.loadPictureForPhone(iconData.name);
    dx = iconData.margins.x;
    dy = iconData.margins.y;
    iconBit.addLoadListener(() => {
      return this.contents.blt(iconBit, 0, 0, iconBit.width, iconBit.height, rect.x + dx, rect.y + dy);
    });
  }

  _drawFace(name, rect) {
    var faceBit;
    faceBit = ImageManager.loadPictureForPhone(name);
    faceBit.addLoadListener(() => {
      return this.contents.blt(faceBit, 0, 0, 48, 48, rect.x + 2, rect.y + 2);
    });
  }

  _drawContactName(name, rect) {
    this.contents.fontSize = 18;
    this.drawText(name, rect.x + 60, rect.y + 6);
    return this.resetFontSettings();
  }

  getContactData(index) {
    return PKD_PhoneMenu.Utils.getAllContacts()[index];
  }

  getContactPreviewFace(index) {
    var item;
    item = this.getContactData(index);
    if (item != null) {
      return item.previewImg;
    } else {
      return null;
    }
  }

  getContactName(index) {
    var item;
    item = this.getContactData(index);
    if (item != null) {
      return item.name;
    } else {
      return null;
    }
  }

  getContactExtraIconData(index) {
    var iconData, item;
    item = this.getContactData(index);
    if (item != null) {
      iconData = item.extraPreviewImage;
      // * Только, если Switch включён
      if ((iconData != null) && PKD_PhoneMenu.Utils.isSwitchIsTRUE(iconData.enabledSwitchId)) {
        return iconData;
      }
    }
    return null;
  }

};


// Generated by CoffeeScript 2.6.1
var PKD_Window_PhoneGalleryAlbumsList;

PKD_Window_PhoneGalleryAlbumsList = class PKD_Window_PhoneGalleryAlbumsList extends Window_Selectable {
  constructor() {
    super(...arguments);
    this.setBackgroundType(2);
    this.refresh();
  }

  maxItems() {
    return PKD_PhoneMenu.Utils.getAllGalleryAlbums().length;
  }

  itemHeight() {
    return 54;
  }

  safeSelect() {
    if (this.maxItems() > 0) {
      return this.select(0);
    } else {
      return this.select(-1);
    }
  }

  selectedAlbum() {
    return this.getAlbumName(this.index());
  }

  drawItem(index) {
    var d, e, rect;
    rect = this.itemRect(index);
    d = this.getAlbumName(index);
    if (d == null) {
      return;
    }
    try {
      this._drawAlbumName(d, rect);
      return this._drawAlbumItemsCount(this._imagesCountPerAlbumName(d), rect);
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  }

  _imagesCountPerAlbumName(name) {
    return PKD_PhoneMenu.Utils.getOpenedImagesCountPerAlbum(name);
  }

  _drawAlbumName(name, rect) {
    this.contents.fontSize = 18;
    this.drawText(name, rect.x + 10, rect.y + 7);
    return this.resetFontSettings();
  }

  _drawAlbumItemsCount(count, rect) {
    var dx;
    this.contents.textColor = "#dddddd";
    this.contents.fontSize = 18;
    dx = 36;
    if (count > 999) {
      this.contents.fontSize = 12;
      dx = 44;
    } else if (count > 99) {
      this.contents.fontSize = 14;
      dx = 42;
    } else if (count > 9) {
      this.contents.fontSize = 16;
      dx = 40;
    }
    this.drawText("[" + count + "]", rect.x + rect.width - dx, rect.y);
    return this.resetFontSettings();
  }

  getAlbumName(index) {
    var allMsg;
    allMsg = PKD_PhoneMenu.Utils.getAllGalleryAlbums();
    return allMsg[index];
  }

};


// Generated by CoffeeScript 2.6.1
var PKD_Window_PhoneGalleryGrid;

PKD_Window_PhoneGalleryGrid = class PKD_Window_PhoneGalleryGrid extends Window_Selectable {
  constructor() {
    super(...arguments);
    this.setBackgroundType(2);
    this.refresh();
  }

  setAlbumName(albumName) {
    this.albumName = albumName;
    this._imagesForGrid = this._collectImagesForCurrentAlbum();
    return this.refresh();
  }

  _collectImagesForCurrentAlbum() {
    var allImages, i, image, imagesForThisGallery, len;
    allImages = PKD_PhoneMenu.Utils.getAllOpenedImagesInGallery();
    imagesForThisGallery = [];
    for (i = 0, len = allImages.length; i < len; i++) {
      image = allImages[i];
      if (image == null) {
        continue;
      }
      if (image.albumName === this.albumName) {
        imagesForThisGallery.push(image);
      }
    }
    return imagesForThisGallery;
  }

  maxItems() {
    if (this._imagesForGrid != null) {
      return this._imagesForGrid.length;
    } else {
      return 0;
    }
  }

  maxCols() {
    return PKD_PhoneMenu.PP.getGalleryAppSettings().gridCols;
  }

  itemHeight() {
    return PKD_PhoneMenu.PP.getGalleryAppSettings().previewImageHeight;
  }

  safeSelect() {
    if (this.maxItems() > 0) {
      return this.select(0);
    } else {
      return this.select(-1);
    }
  }

  selectedImage() {
    return this.getImageData(this.index());
  }

  drawItem(index) {
    var d, e, imageNameToDraw, rect;
    rect = this.itemRect(index);
    d = this.getImageData(index);
    if (d == null) {
      return;
    }
    try {
      if (String.any(d.previewPicName)) {
        imageNameToDraw = d.previewPicName;
      } else {
        imageNameToDraw = d.picName;
      }
      return this._drawGalleryGridImage(imageNameToDraw, rect);
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  }

  _drawGalleryGridImage(imageName, rect) {
    var b, e, picSizeX, picSizeY, picX, picY;
    try {
      b = ImageManager.loadPictureForPhone(imageName);
      picX = rect.x + 4;
      picY = rect.y + 4;
      picSizeX = rect.width - 8;
      picSizeY = rect.height - 8;
      return b.addLoadListener(() => {
        return this.contents.blt(b, 0, 0, b.width, b.height, picX, picY, picSizeX, picSizeY);
      });
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  }

  getImageData(index) {
    return this._imagesForGrid[index];
  }

};


// Generated by CoffeeScript 2.6.1
var PKD_Window_PhoneMessagesList;

PKD_Window_PhoneMessagesList = class PKD_Window_PhoneMessagesList extends Window_Selectable {
  constructor() {
    super(...arguments);
    this.setBackgroundType(2);
    this.refresh();
  }

  maxItems() {
    return $gameSystem.pkdGetPhoneMessagesList().length;
  }

  itemHeight() {
    return 56;
  }

  safeSelect() {
    if (this.maxItems() > 0) {
      return this.select(0);
    } else {
      return this.select(-1);
    }
  }

  selectedMessage() {
    return this.getMessageData(this.index());
  }

  drawItem(index) {
    var d, e, rect;
    rect = this.itemRect(index);
    d = this.getMessageData(index);
    if (d == null) {
      return;
    }
    try {
      this._drawIcon(rect, $gameSystem.pkdIsNewMessageFrom(d.name));
      this._drawFace(d.avatar, rect);
      return this._drawName(d.name, rect);
    } catch (error) {
      //@_drawLineRect(rect.x, rect.y, rect.width, rect.hight) unless index == 0
      e = error;
      return KDCore.warning(e);
    }
  }

  _drawIcon(rect, isNew) {
    var backBit;
    if (isNew) {
      backBit = ImageManager.loadPictureForPhone('MessageIconNew');
    } else {
      backBit = ImageManager.loadPictureForPhone('MessageIcon');
    }
    this.contents.drawOnMe(backBit, rect.width - backBit.width, rect.y);
  }

  _drawFace(name, rect) {
    var faceBit;
    faceBit = ImageManager.loadPictureForPhone(name);
    faceBit.addLoadListener(() => {
      return this.contents.blt(faceBit, 0, 0, 48, 48, rect.x + 2, rect.y + 2);
    });
  }

  _drawName(name, rect) {
    this.contents.fontSize = 18;
    return this.drawText(name, rect.x + 60, rect.y + 6);
  }

  //@resetFontSettings()

    //_drawLineRect: (x, y, w, h) ->
  //    c = KDCore.Color.BLACK.reAlpha(60).CSS
  //    @contents.fillRect(x, y, w, 1, c)
  getMessageData(index) {
    var allMsg;
    allMsg = $gameSystem.pkdGetPhoneMessagesList();
    return allMsg[index];
  }

};


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_Base.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Scene_Base.prototype;
  _.pkdShowPhoneNotify = function(params) {
    var e;
    try {
      if (params == null) {
        return;
      }
      this._pkdPhoneNotifySprite = new PKD_SpritePhoneMapNotify(params);
      this.addChild(this._pkdPhoneNotifySprite);
      return this._pkdPhoneNotifySprite;
    } catch (error) {
      e = error;
      KDCore.warning(e);
    }
    return null;
  };
})();

// ■ END Scene_Base.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_Boot.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__start, _;
  //@[DEFINES]
  _ = Scene_Boot.prototype;
  //@[ALIAS]
  ALIAS__start = _.start;
  _.start = function() {
    ALIAS__start.call(this, ...arguments);
    PKD_PhoneMenu.LoadPluginSettings();
    PKD_PhoneMapNotifyManager.init();
  };
})();

// ■ END Scene_Boot.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_Map.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__callMenu, ALIAS__onMapLoaded, _;
  //@[DEFINES]
  _ = Scene_Map.prototype;
  //@[ALIAS]
  ALIAS__onMapLoaded = _.onMapLoaded;
  _.onMapLoaded = function() {
    $gameSystem.pkdPreparePhoneImages();
    ALIAS__onMapLoaded.call(this, ...arguments);
    PKD_PhoneMenu.Map.Show();
  };
  
  //@[ALIAS]
  ALIAS__callMenu = _.callMenu;
  _.callMenu = function() {
    if (PKD_PhoneMenu.PP.isUseAsMainMenu()) {
      SoundManager.playOk();
      SceneManager.push(PKD_ScenePhone);
      $gameTemp.clearDestination();
      this._mapNameWindow.hide();
      return this._waitCount = 2;
    } else {
      return ALIAS__callMenu.call(this, ...arguments);
    }
  };
})();

// ■ END Scene_Map.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_Map.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Scene_Map.prototype;
  _.pkdRefreshPhoneIcon = function() {
    var e, ref;
    try {
      return (ref = this._pkdPhoneIcon) != null ? ref.refreshAlertSymbol() : void 0;
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  };
  _.pkdShowPhoneIcon = function() {
    var ref;
    if (this._pkdPhoneIcon == null) {
      this._pkdPhoneIcon = new PKD_SpritePhoneIcon();
      this.addChild(this._pkdPhoneIcon);
    }
    if ((ref = this._pkdPhoneIcon) != null) {
      ref.visible = true;
    }
  };
  _.pkdHidePhoneIcon = function() {
    if (this._pkdPhoneIcon == null) {
      return;
    }
    this._pkdPhoneIcon.visible = false;
  };
})();

// ■ END Scene_Map.coffee
//---------------------------------------------------------------------------

//Plugin PKD_PhoneMenu builded by PKD PluginBuilder 2.2 - 12.02.2024
