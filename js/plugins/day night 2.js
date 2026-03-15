/*
Title: Game Time Day/Night
Author: DKPlugins
Site: https://dk-plugins.ru
E-mail: kuznetsovdenis96@gmail.com
Version: 1.0.1
Release: 12.09.2022
First release: 13.08.2022
*/

/*ru
ÐÐ°Ð·Ð²Ð°Ð½Ð¸Ðµ: Ð’Ñ€ÐµÐ¼Ñ Ð”ÐµÐ½ÑŒ/ÐÐ¾Ñ‡ÑŒ
ÐÐ²Ñ‚Ð¾Ñ€: DKPlugins
Ð¡Ð°Ð¹Ñ‚: https://dk-plugins.ru
E-mail: kuznetsovdenis96@gmail.com
Ð’ÐµÑ€ÑÐ¸Ñ: 1.0.1
Ð ÐµÐ»Ð¸Ð·: 12.09.2022
ÐŸÐµÑ€Ð²Ñ‹Ð¹ Ñ€ÐµÐ»Ð¸Ð·: 13.08.2022
*/

/*:
 * @plugindesc v.1.0.1 [MV|MZ] Simple cycle of day and night.
 * @author DKPlugins
 * @url https://dk-plugins.ru
 * @target MZ
 * @base DK_Game_Time
 * @orderAfter DK_Game_Time
 * @help

 ### Info about plugin ###
 Title: DK_Game_Time_DayNight
 Author: DKPlugins
 Site: https://dk-plugins.ru
 Version: 1.0.1
 Release: 12.09.2022
 First release: 13.08.2022

 ###===========================================================================
 ## Compatibility
 ###===========================================================================
 RPG Maker MV: 1.5+
 RPG Maker MZ: 1.0+

 ###=========================================================================
 ## Requirements and dependencies
 ###=========================================================================
 Availability of working plugin Game Time version 2.6.0 or above
 Download plugin: https://dk-plugins.ru/game-time/

 ###=========================================================================
 ## Plugin commands (RPG Maker MV)
 ###=========================================================================
 1. Show tint of day/night: ShowGameTint
 2. Hide tint of day/night: HideGameTint
 3. Set visibility of day/night tint: SetGameTintVisible visible
 visible - Visibility of day/night tint (true or false)
 4. Set static time for day/night tint: SetGameTintStaticTime hour min
 hour - Hour
 min - Minutes
 5. Reset static time for day/night tint: ResetGameTintStaticTime

 ###=========================================================================
 ## Script calls
 ###=========================================================================
 1. Show tint of day/night: $gameTimeTint.show()
 2. Hide tint of day/night: $gameTimeTint.hide()
 3. Set static time for day/night tint: $gameTimeTint.setStaticTime(hour, min)
 hour - Hour
 min - Minutes
 4. Reset static time for day/night tint: $gameTimeTint.setStaticTime(null)

 ###=========================================================================
 ## License and terms of use
 ###=========================================================================
 You can:
 -To use the plugin for your non-commercial projects
 -Change code of the plugin

 You cannot:
 -Delete or change any information about the plugin
 -Distribute the plugin and its modifications

 ## Commercial license ##
 Visit the page: https://dk-plugins.ru/commercial-license/

 ###=========================================================================
 ## Support
 ###=========================================================================
 Become a subscriber: https://boosty.to/dkplugins



 * @command ShowGameTint
 * @desc Show tint of day/night

 * @command HideGameTint
 * @desc Hide tint of day/night

 * @command SetGameTintVisible
 * @desc Set visibility of day/night tint
 *
 * @arg visible
 * @text Visibility
 * @desc Visibility of day/night tint
 * @type boolean
 * @default true

 * @command SetGameTintStaticTime
 * @desc Set static time for day/night tint
 *
 * @arg hour
 * @text Hour
 * @desc Hour
 * @type number
 * @min 0
 * @max 23
 * @default 0
 *
 * @arg min
 * @text Minutes
 * @desc Minutes
 * @type number
 * @min 0
 * @max 59
 * @default 0

 * @command ResetGameTintStaticTime
 * @desc Reset static time for day/night tint



 * @param tints
 * @text Tints
 * @desc Screen tints at different hours
 * @type struct<Tint>
 * @default {"0":"{\"r\":\"30\",\"g\":\"0\",\"b\":\"40\",\"a\":\"165\"}","1":"{\"r\":\"20\",\"g\":\"0\",\"b\":\"30\",\"a\":\"165\"}","2":"{\"r\":\"20\",\"g\":\"0\",\"b\":\"30\",\"a\":\"155\"}","3":"{\"r\":\"10\",\"g\":\"0\",\"b\":\"30\",\"a\":\"145\"}","4":"{\"r\":\"10\",\"g\":\"0\",\"b\":\"20\",\"a\":\"125\"}","5":"{\"r\":\"0\",\"g\":\"0\",\"b\":\"20\",\"a\":\"125\"}","6":"{\"r\":\"75\",\"g\":\"20\",\"b\":\"20\",\"a\":\"115\"}","7":"{\"r\":\"100\",\"g\":\"30\",\"b\":\"10\",\"a\":\"105\"}","8":"{\"r\":\"75\",\"g\":\"20\",\"b\":\"10\",\"a\":\"85\"}","9":"{\"r\":\"0\",\"g\":\"0\",\"b\":\"0\",\"a\":\"55\"}","10":"{\"r\":\"0\",\"g\":\"0\",\"b\":\"0\",\"a\":\"30\"}","11":"{\"r\":\"0\",\"g\":\"0\",\"b\":\"0\",\"a\":\"10\"}","12":"{\"r\":\"0\",\"g\":\"0\",\"b\":\"0\",\"a\":\"0\"}","13":"{\"r\":\"0\",\"g\":\"0\",\"b\":\"0\",\"a\":\"0\"}","14":"{\"r\":\"0\",\"g\":\"0\",\"b\":\"0\",\"a\":\"0\"}","15":"{\"r\":\"0\",\"g\":\"0\",\"b\":\"0\",\"a\":\"5\"}","16":"{\"r\":\"0\",\"g\":\"0\",\"b\":\"0\",\"a\":\"15\"}","17":"{\"r\":\"0\",\"g\":\"0\",\"b\":\"10\",\"a\":\"45\"}","18":"{\"r\":\"75\",\"g\":\"20\",\"b\":\"20\",\"a\":\"85\"}","19":"{\"r\":\"100\",\"g\":\"40\",\"b\":\"30\",\"a\":\"105\"}","20":"{\"r\":\"75\",\"g\":\"20\",\"b\":\"40\",\"a\":\"125\"}","21":"{\"r\":\"10\",\"g\":\"0\",\"b\":\"45\",\"a\":\"145\"}","22":"{\"r\":\"20\",\"g\":\"0\",\"b\":\"45\",\"a\":\"145\"}","23":"{\"r\":\"20\",\"g\":\"0\",\"b\":\"50\",\"a\":\"160\"}"}

 * @param disabledMaps
 * @text Disabled maps
 * @desc Disabled maps. Screen tint does not work on these maps.
 * @type number[]
 * @default []

*/

/*:ru
 * @plugindesc v.1.0.1 [MV|MZ] ÐŸÑ€Ð¾ÑÑ‚Ð¾Ð¹ Ñ†Ð¸ÐºÐ» ÑÐ¼ÐµÐ½Ñ‹ Ð´Ð½Ñ Ð¸ Ð½Ð¾Ñ‡Ð¸.
 * @author DKPlugins
 * @url https://dk-plugins.ru
 * @target MZ
 * @base DK_Game_Time
 * @orderAfter DK_Game_Time
 * @help

 ### Ð˜Ð½Ñ„Ð¾Ñ€Ð¼Ð°Ñ†Ð¸Ñ Ð¾ Ð¿Ð»Ð°Ð³Ð¸Ð½Ðµ ###
 ÐÐ°Ð·Ð²Ð°Ð½Ð¸Ðµ: DK_Game_Time_DayNight
 ÐÐ²Ñ‚Ð¾Ñ€: DKPlugins
 Ð¡Ð°Ð¹Ñ‚: https://dk-plugins.ru
 Ð’ÐµÑ€ÑÐ¸Ñ: 1.0.1
 Ð ÐµÐ»Ð¸Ð·: 12.09.2022
 ÐŸÐµÑ€Ð²Ñ‹Ð¹ Ñ€ÐµÐ»Ð¸Ð·: 13.08.2022

 ###=========================================================================
 ## Ð¡Ð¾Ð²Ð¼ÐµÑÑ‚Ð¸Ð¼Ð¾ÑÑ‚ÑŒ
 ###=========================================================================
 RPG Maker MV: 1.5+
 RPG Maker MZ: 1.0+

 ###=========================================================================
 ## Ð¢Ñ€ÐµÐ±Ð¾Ð²Ð°Ð½Ð¸Ñ Ð¸ Ð·Ð°Ð²Ð¸ÑÐ¸Ð¼Ð¾ÑÑ‚Ð¸
 ###=========================================================================
 ÐÐ°Ð»Ð¸Ñ‡Ð¸Ðµ Ð²ÐºÐ»ÑŽÑ‡ÐµÐ½Ð½Ð¾Ð³Ð¾ Ð¿Ð»Ð°Ð³Ð¸Ð½Ð° Game Time Ð²ÐµÑ€ÑÐ¸Ð¸ 2.6.0 Ð¸Ð»Ð¸ Ð²Ñ‹ÑˆÐµ
 Ð¡ÐºÐ°Ñ‡Ð°Ñ‚ÑŒ Ð¿Ð»Ð°Ð³Ð¸Ð½: https://dk-plugins.ru/game-time/

 ###=========================================================================
 ## ÐšÐ¾Ð¼Ð°Ð½Ð´Ñ‹ Ð¿Ð»Ð°Ð³Ð¸Ð½Ð° (RPG Maker MV)
 ###=========================================================================
 1. ÐŸÐ¾ÐºÐ°Ð·Ð°Ñ‚ÑŒ Ð¾Ñ‚Ñ‚ÐµÐ½Ð¾Ðº Ð´Ð½Ñ Ð¸ Ð½Ð¾Ñ‡Ð¸: ShowGameTint
 2. Ð¡ÐºÑ€Ñ‹Ñ‚ÑŒ Ð¾Ñ‚Ñ‚ÐµÐ½Ð¾Ðº Ð´Ð½Ñ Ð¸ Ð½Ð¾Ñ‡Ð¸: HideGameTint
 3. Ð£ÑÑ‚Ð°Ð½Ð¾Ð²Ð¸Ñ‚ÑŒ Ð²Ð¸Ð´Ð¸Ð¼Ð¾ÑÑ‚ÑŒ Ð¾Ñ‚Ñ‚ÐµÐ½ÐºÐ° Ð´Ð½Ñ Ð¸ Ð½Ð¾Ñ‡Ð¸: SetGameTintVisible visible
 visible - Ð’Ð¸Ð´Ð¸Ð¼Ð¾ÑÑ‚ÑŒ Ð¾Ñ‚Ñ‚ÐµÐ½ÐºÐ° Ð´Ð½Ñ Ð¸ Ð½Ð¾Ñ‡Ð¸ (true Ð¸Ð»Ð¸ false)
 4. Ð£ÑÑ‚Ð°Ð½Ð¾Ð²Ð¸Ñ‚ÑŒ ÑÑ‚Ð°Ñ‚Ð¸Ñ‡ÐµÑÐºÐ¾Ðµ Ð²Ñ€ÐµÐ¼Ñ Ð´Ð»Ñ Ð¾Ñ‚Ñ‚ÐµÐ½ÐºÐ° Ð´Ð½Ñ Ð¸ Ð½Ð¾Ñ‡Ð¸: SetGameTintStaticTime hour min
 hour - Ð§Ð°Ñ
 min - ÐœÐ¸Ð½ÑƒÑ‚Ñ‹
 5. Ð¡Ð±Ñ€Ð¾ÑÐ¸Ñ‚ÑŒ ÑÑ‚Ð°Ñ‚Ð¸Ñ‡ÐµÑÐºÐ¾Ðµ Ð²Ñ€ÐµÐ¼Ñ Ð´Ð»Ñ Ð¾Ñ‚Ñ‚ÐµÐ½ÐºÐ° Ð´Ð½Ñ Ð¸ Ð½Ð¾Ñ‡Ð¸: ResetGameTintStaticTime

 ###=========================================================================
 ## Ð’Ñ‹Ð·Ð¾Ð²Ñ‹ ÑÐºÑ€Ð¸Ð¿Ñ‚Ð¾Ð²
 ###=========================================================================
 1. ÐŸÐ¾ÐºÐ°Ð·Ð°Ñ‚ÑŒ Ð¾Ñ‚Ñ‚ÐµÐ½Ð¾Ðº Ð´Ð½Ñ Ð¸ Ð½Ð¾Ñ‡Ð¸: $gameTimeTint.show()
 2. Ð¡ÐºÑ€Ñ‹Ñ‚ÑŒ Ð¾Ñ‚Ñ‚ÐµÐ½Ð¾Ðº Ð´Ð½Ñ Ð¸ Ð½Ð¾Ñ‡Ð¸: $gameTimeTint.hide()
 3. Ð£ÑÑ‚Ð°Ð½Ð¾Ð²Ð¸Ñ‚ÑŒ ÑÑ‚Ð°Ñ‚Ð¸Ñ‡ÐµÑÐºÐ¾Ðµ Ð²Ñ€ÐµÐ¼Ñ Ð´Ð»Ñ Ð¾Ñ‚Ñ‚ÐµÐ½ÐºÐ° Ð´Ð½Ñ Ð¸ Ð½Ð¾Ñ‡Ð¸: $gameTimeTint.setStaticTime(hour, min)
 hour - Ð§Ð°Ñ
 min - ÐœÐ¸Ð½ÑƒÑ‚Ñ‹
 4. Ð¡Ð±Ñ€Ð¾ÑÐ¸Ñ‚ÑŒ ÑÑ‚Ð°Ñ‚Ð¸Ñ‡ÐµÑÐºÐ¾Ðµ Ð²Ñ€ÐµÐ¼Ñ Ð´Ð»Ñ Ð¾Ñ‚Ñ‚ÐµÐ½ÐºÐ° Ð´Ð½Ñ Ð¸ Ð½Ð¾Ñ‡Ð¸: $gameTimeTint.setStaticTime(null)

 ###=========================================================================
 ## Ð›Ð¸Ñ†ÐµÐ½Ð·Ð¸Ñ Ð¸ Ð¿Ñ€Ð°Ð²Ð¸Ð»Ð° Ð¸ÑÐ¿Ð¾Ð»ÑŒÐ·Ð¾Ð²Ð°Ð½Ð¸Ñ Ð¿Ð»Ð°Ð³Ð¸Ð½Ð°
 ###=========================================================================
 Ð’Ñ‹ Ð¼Ð¾Ð¶ÐµÑ‚Ðµ:
 -Ð˜ÑÐ¿Ð¾Ð»ÑŒÐ·Ð¾Ð²Ð°Ñ‚ÑŒ Ð¿Ð»Ð°Ð³Ð¸Ð½ Ð² Ð½ÐµÐºÐ¾Ð¼Ð¼ÐµÑ€Ñ‡ÐµÑÐºÐ¸Ñ… Ð¿Ñ€Ð¾ÐµÐºÑ‚Ð°Ñ…
 -Ð˜Ð·Ð¼ÐµÐ½ÑÑ‚ÑŒ ÐºÐ¾Ð´ Ð¿Ð»Ð°Ð³Ð¸Ð½Ð°

 Ð’Ñ‹ Ð½Ðµ Ð¼Ð¾Ð¶ÐµÑ‚Ðµ:
 -Ð£Ð´Ð°Ð»ÑÑ‚ÑŒ Ð¸Ð»Ð¸ Ð¸Ð·Ð¼ÐµÐ½ÑÑ‚ÑŒ Ð»ÑŽÐ±ÑƒÑŽ Ð¸Ð½Ñ„Ð¾Ñ€Ð¼Ð°Ñ†Ð¸ÑŽ Ð¾ Ð¿Ð»Ð°Ð³Ð¸Ð½Ðµ
 -Ð Ð°ÑÐ¿Ñ€Ð¾ÑÑ‚Ñ€Ð°Ð½ÑÑ‚ÑŒ Ð¿Ð»Ð°Ð³Ð¸Ð½ Ð¸ ÐµÐ³Ð¾ Ð¼Ð¾Ð´Ð¸Ñ„Ð¸ÐºÐ°Ñ†Ð¸Ð¸

 ## ÐšÐ¾Ð¼Ð¼ÐµÑ€Ñ‡ÐµÑÐºÐ°Ñ Ð»Ð¸Ñ†ÐµÐ½Ð·Ð¸Ñ ##
 ÐŸÐ¾ÑÐµÑ‚Ð¸Ñ‚Ðµ ÑÑ‚Ñ€Ð°Ð½Ð¸Ñ†Ñƒ: https://dk-plugins.ru/commercial-license/

 ###=========================================================================
 ## ÐŸÐ¾Ð´Ð´ÐµÑ€Ð¶ÐºÐ°
 ###=========================================================================
 Ð¡Ñ‚Ð°Ñ‚ÑŒ Ð¿Ð¾Ð´Ð¿Ð¸ÑÑ‡Ð¸ÐºÐ¾Ð¼: https://boosty.to/dkplugins



 * @command ShowGameTint
 * @desc ÐŸÐ¾ÐºÐ°Ð·Ð°Ñ‚ÑŒ Ð¾Ñ‚Ñ‚ÐµÐ½Ð¾Ðº Ð´Ð½Ñ Ð¸ Ð½Ð¾Ñ‡Ð¸

 * @command HideGameTint
 * @desc Ð¡ÐºÑ€Ñ‹Ñ‚ÑŒ Ð¾Ñ‚Ñ‚ÐµÐ½Ð¾Ðº Ð´Ð½Ñ Ð¸ Ð½Ð¾Ñ‡Ð¸

 * @command SetGameTintVisible
 * @desc Ð£ÑÑ‚Ð°Ð½Ð¾Ð²Ð¸Ñ‚ÑŒ Ð²Ð¸Ð´Ð¸Ð¼Ð¾ÑÑ‚ÑŒ Ð¾Ñ‚Ñ‚ÐµÐ½ÐºÐ° Ð´Ð½Ñ Ð¸ Ð½Ð¾Ñ‡Ð¸
 *
 * @arg visible
 * @text Ð’Ð¸Ð´Ð¸Ð¼Ð¾ÑÑ‚ÑŒ
 * @desc Ð’Ð¸Ð´Ð¸Ð¼Ð¾ÑÑ‚ÑŒ Ð¾Ñ‚Ñ‚ÐµÐ½ÐºÐ° Ð´Ð½Ñ Ð¸ Ð½Ð¾Ñ‡Ð¸
 * @type boolean
 * @default true

 * @command SetGameTintStaticTime
 * @desc Ð£ÑÑ‚Ð°Ð½Ð¾Ð²Ð¸Ñ‚ÑŒ ÑÑ‚Ð°Ñ‚Ð¸Ñ‡ÐµÑÐºÐ¾Ðµ Ð²Ñ€ÐµÐ¼Ñ Ð´Ð»Ñ Ð¾Ñ‚Ñ‚ÐµÐ½ÐºÐ° Ð´Ð½Ñ Ð¸ Ð½Ð¾Ñ‡Ð¸
 *
 * @arg hour
 * @text Ð§Ð°Ñ
 * @desc Ð§Ð°Ñ
 * @type number
 * @min 0
 * @max 23
 * @default 0
 *
 * @arg min
 * @text ÐœÐ¸Ð½ÑƒÑ‚Ñ‹
 * @desc ÐœÐ¸Ð½ÑƒÑ‚Ñ‹
 * @type number
 * @min 0
 * @max 59
 * @default 0

 * @command ResetGameTintStaticTime
 * @desc Ð¡Ð±Ñ€Ð¾ÑÐ¸Ñ‚ÑŒ ÑÑ‚Ð°Ñ‚Ð¸Ñ‡ÐµÑÐºÐ¾Ðµ Ð²Ñ€ÐµÐ¼Ñ Ð´Ð»Ñ Ð¾Ñ‚Ñ‚ÐµÐ½ÐºÐ° Ð´Ð½Ñ Ð¸ Ð½Ð¾Ñ‡Ð¸



 * @param tints
 * @text ÐžÑ‚Ñ‚ÐµÐ½ÐºÐ¸
 * @desc ÐžÑ‚Ñ‚ÐµÐ½ÐºÐ¸ ÑÐºÑ€Ð°Ð½Ð° Ð² Ñ€Ð°Ð·Ð½Ñ‹Ðµ Ñ‡Ð°ÑÑ‹
 * @type struct<Tint>
 * @default {"0":"{\"r\":\"30\",\"g\":\"0\",\"b\":\"40\",\"a\":\"165\"}","1":"{\"r\":\"20\",\"g\":\"0\",\"b\":\"30\",\"a\":\"165\"}","2":"{\"r\":\"20\",\"g\":\"0\",\"b\":\"30\",\"a\":\"155\"}","3":"{\"r\":\"10\",\"g\":\"0\",\"b\":\"30\",\"a\":\"145\"}","4":"{\"r\":\"10\",\"g\":\"0\",\"b\":\"20\",\"a\":\"125\"}","5":"{\"r\":\"0\",\"g\":\"0\",\"b\":\"20\",\"a\":\"125\"}","6":"{\"r\":\"75\",\"g\":\"20\",\"b\":\"20\",\"a\":\"115\"}","7":"{\"r\":\"100\",\"g\":\"30\",\"b\":\"10\",\"a\":\"105\"}","8":"{\"r\":\"75\",\"g\":\"20\",\"b\":\"10\",\"a\":\"85\"}","9":"{\"r\":\"0\",\"g\":\"0\",\"b\":\"0\",\"a\":\"55\"}","10":"{\"r\":\"0\",\"g\":\"0\",\"b\":\"0\",\"a\":\"30\"}","11":"{\"r\":\"0\",\"g\":\"0\",\"b\":\"0\",\"a\":\"10\"}","12":"{\"r\":\"0\",\"g\":\"0\",\"b\":\"0\",\"a\":\"0\"}","13":"{\"r\":\"0\",\"g\":\"0\",\"b\":\"0\",\"a\":\"0\"}","14":"{\"r\":\"0\",\"g\":\"0\",\"b\":\"0\",\"a\":\"0\"}","15":"{\"r\":\"0\",\"g\":\"0\",\"b\":\"0\",\"a\":\"5\"}","16":"{\"r\":\"0\",\"g\":\"0\",\"b\":\"0\",\"a\":\"15\"}","17":"{\"r\":\"0\",\"g\":\"0\",\"b\":\"10\",\"a\":\"45\"}","18":"{\"r\":\"75\",\"g\":\"20\",\"b\":\"20\",\"a\":\"85\"}","19":"{\"r\":\"100\",\"g\":\"40\",\"b\":\"30\",\"a\":\"105\"}","20":"{\"r\":\"75\",\"g\":\"20\",\"b\":\"40\",\"a\":\"125\"}","21":"{\"r\":\"10\",\"g\":\"0\",\"b\":\"45\",\"a\":\"145\"}","22":"{\"r\":\"20\",\"g\":\"0\",\"b\":\"45\",\"a\":\"145\"}","23":"{\"r\":\"20\",\"g\":\"0\",\"b\":\"50\",\"a\":\"160\"}"}

 * @param disabledMaps
 * @text ÐžÑ‚ÐºÐ»ÑŽÑ‡ÐµÐ½Ð½Ñ‹Ðµ ÐºÐ°Ñ€Ñ‚Ñ‹
 * @desc ÐžÑ‚ÐºÐ»ÑŽÑ‡ÐµÐ½Ð½Ñ‹Ðµ ÐºÐ°Ñ€Ñ‚Ñ‹. ÐÐ° ÑÑ‚Ð¸Ñ… ÐºÐ°Ñ€Ñ‚Ð°Ñ… Ð¾Ñ‚Ñ‚ÐµÐ½Ð¾Ðº ÑÐºÑ€Ð°Ð½Ð° Ð½Ðµ Ñ€Ð°Ð±Ð¾Ñ‚Ð°ÐµÑ‚.
 * @type number[]
 * @default []

*/

/*~struct~Tint:

 * @param 0
 * @text 00:00
 * @desc RGBA screen hue value
 * @type struct<TintRGBA>
 * @default {"r":"255","g":"255","b":"255","a":"255"}

 * @param 1
 * @text 01:00
 * @desc RGBA screen hue value
 * @type struct<TintRGBA>
 * @default {"r":"255","g":"255","b":"255","a":"255"}

 * @param 2
 * @text 02:00
 * @desc RGBA screen hue value
 * @type struct<TintRGBA>
 * @default {"r":"255","g":"255","b":"255","a":"255"}

 * @param 3
 * @text 03:00
 * @desc RGBA screen hue value
 * @type struct<TintRGBA>
 * @default {"r":"255","g":"255","b":"255","a":"255"}

 * @param 4
 * @text 04:00
 * @desc RGBA screen hue value
 * @type struct<TintRGBA>
 * @default {"r":"255","g":"255","b":"255","a":"255"}

 * @param 5
 * @text 05:00
 * @desc RGBA screen hue value
 * @type struct<TintRGBA>
 * @default {"r":"255","g":"255","b":"255","a":"255"}

 * @param 6
 * @text 06:00
 * @desc RGBA screen hue value
 * @type struct<TintRGBA>
 * @default {"r":"255","g":"255","b":"255","a":"255"}

 * @param 7
 * @text 07:00
 * @desc RGBA screen hue value
 * @type struct<TintRGBA>
 * @default {"r":"255","g":"255","b":"255","a":"255"}

 * @param 8
 * @text 08:00
 * @desc RGBA screen hue value
 * @type struct<TintRGBA>
 * @default {"r":"255","g":"255","b":"255","a":"255"}

 * @param 9
 * @text 09:00
 * @desc RGBA screen hue value
 * @type struct<TintRGBA>
 * @default {"r":"255","g":"255","b":"255","a":"255"}

 * @param 10
 * @text 10:00
 * @desc RGBA screen hue value
 * @type struct<TintRGBA>
 * @default {"r":"255","g":"255","b":"255","a":"255"}

 * @param 11
 * @text 11:00
 * @desc RGBA screen hue value
 * @type struct<TintRGBA>
 * @default {"r":"255","g":"255","b":"255","a":"255"}

 * @param 12
 * @text 12:00
 * @desc RGBA screen hue value
 * @type struct<TintRGBA>
 * @default {"r":"255","g":"255","b":"255","a":"255"}

 * @param 13
 * @text 13:00
 * @desc RGBA screen hue value
 * @type struct<TintRGBA>
 * @default {"r":"255","g":"255","b":"255","a":"255"}

 * @param 14
 * @text 14:00
 * @desc RGBA screen hue value
 * @type struct<TintRGBA>
 * @default {"r":"255","g":"255","b":"255","a":"255"}

 * @param 15
 * @text 15:00
 * @desc RGBA screen hue value
 * @type struct<TintRGBA>
 * @default {"r":"255","g":"255","b":"255","a":"255"}

 * @param 16
 * @text 16:00
 * @desc RGBA screen hue value
 * @type struct<TintRGBA>
 * @default {"r":"255","g":"255","b":"255","a":"255"}

 * @param 17
 * @text 17:00
 * @desc RGBA screen hue value
 * @type struct<TintRGBA>
 * @default {"r":"255","g":"255","b":"255","a":"255"}

 * @param 18
 * @text 18:00
 * @desc RGBA screen hue value
 * @type struct<TintRGBA>
 * @default {"r":"255","g":"255","b":"255","a":"255"}

 * @param 19
 * @text 19:00
 * @desc RGBA screen hue value
 * @type struct<TintRGBA>
 * @default {"r":"255","g":"255","b":"255","a":"255"}

 * @param 20
 * @text 20:00
 * @desc RGBA screen hue value
 * @type struct<TintRGBA>
 * @default {"r":"255","g":"255","b":"255","a":"255"}

 * @param 21
 * @text 21:00
 * @desc RGBA screen hue value
 * @type struct<TintRGBA>
 * @default {"r":"255","g":"255","b":"255","a":"255"}

 * @param 22
 * @text 22:00
 * @desc RGBA screen hue value
 * @type struct<TintRGBA>
 * @default {"r":"255","g":"255","b":"255","a":"255"}

 * @param 23
 * @text 23:00
 * @desc RGBA screen hue value
 * @type struct<TintRGBA>
 * @default {"r":"255","g":"255","b":"255","a":"255"}

*/

/*~struct~Tint:ru

 * @param 0
 * @text 00:00
 * @desc RGBA Ð¾Ñ‚Ñ‚ÐµÐ½Ð¾Ðº ÑÐºÑ€Ð°Ð½Ð°
 * @type struct<TintRGBA>
 * @default {"r":"255","g":"255","b":"255","a":"255"}

 * @param 1
 * @text 01:00
 * @desc RGBA Ð¾Ñ‚Ñ‚ÐµÐ½Ð¾Ðº ÑÐºÑ€Ð°Ð½Ð°
 * @type struct<TintRGBA>
 * @default {"r":"255","g":"255","b":"255","a":"255"}

 * @param 2
 * @text 02:00
 * @desc RGBA Ð¾Ñ‚Ñ‚ÐµÐ½Ð¾Ðº ÑÐºÑ€Ð°Ð½Ð°
 * @type struct<TintRGBA>
 * @default {"r":"255","g":"255","b":"255","a":"255"}

 * @param 3
 * @text 03:00
 * @desc RGBA Ð¾Ñ‚Ñ‚ÐµÐ½Ð¾Ðº ÑÐºÑ€Ð°Ð½Ð°
 * @type struct<TintRGBA>
 * @default {"r":"255","g":"255","b":"255","a":"255"}

 * @param 4
 * @text 04:00
 * @desc RGBA Ð¾Ñ‚Ñ‚ÐµÐ½Ð¾Ðº ÑÐºÑ€Ð°Ð½Ð°
 * @type struct<TintRGBA>
 * @default {"r":"255","g":"255","b":"255","a":"255"}

 * @param 5
 * @text 05:00
 * @desc RGBA Ð¾Ñ‚Ñ‚ÐµÐ½Ð¾Ðº ÑÐºÑ€Ð°Ð½Ð°
 * @type struct<TintRGBA>
 * @default {"r":"255","g":"255","b":"255","a":"255"}

 * @param 6
 * @text 06:00
 * @desc RGBA Ð¾Ñ‚Ñ‚ÐµÐ½Ð¾Ðº ÑÐºÑ€Ð°Ð½Ð°
 * @type struct<TintRGBA>
 * @default {"r":"255","g":"255","b":"255","a":"255"}

 * @param 7
 * @text 07:00
 * @desc RGBA Ð¾Ñ‚Ñ‚ÐµÐ½Ð¾Ðº ÑÐºÑ€Ð°Ð½Ð°
 * @type struct<TintRGBA>
 * @default {"r":"255","g":"255","b":"255","a":"255"}

 * @param 8
 * @text 08:00
 * @desc RGBA Ð¾Ñ‚Ñ‚ÐµÐ½Ð¾Ðº ÑÐºÑ€Ð°Ð½Ð°
 * @type struct<TintRGBA>
 * @default {"r":"255","g":"255","b":"255","a":"255"}

 * @param 9
 * @text 09:00
 * @desc RGBA Ð¾Ñ‚Ñ‚ÐµÐ½Ð¾Ðº ÑÐºÑ€Ð°Ð½Ð°
 * @type struct<TintRGBA>
 * @default {"r":"255","g":"255","b":"255","a":"255"}

 * @param 10
 * @text 10:00
 * @desc RGBA Ð¾Ñ‚Ñ‚ÐµÐ½Ð¾Ðº ÑÐºÑ€Ð°Ð½Ð°
 * @type struct<TintRGBA>
 * @default {"r":"255","g":"255","b":"255","a":"255"}

 * @param 11
 * @text 11:00
 * @desc RGBA Ð¾Ñ‚Ñ‚ÐµÐ½Ð¾Ðº ÑÐºÑ€Ð°Ð½Ð°
 * @type struct<TintRGBA>
 * @default {"r":"255","g":"255","b":"255","a":"255"}

 * @param 12
 * @text 12:00
 * @desc RGBA Ð¾Ñ‚Ñ‚ÐµÐ½Ð¾Ðº ÑÐºÑ€Ð°Ð½Ð°
 * @type struct<TintRGBA>
 * @default {"r":"255","g":"255","b":"255","a":"255"}

 * @param 13
 * @text 13:00
 * @desc RGBA Ð¾Ñ‚Ñ‚ÐµÐ½Ð¾Ðº ÑÐºÑ€Ð°Ð½Ð°
 * @type struct<TintRGBA>
 * @default {"r":"255","g":"255","b":"255","a":"255"}

 * @param 14
 * @text 14:00
 * @desc RGBA Ð¾Ñ‚Ñ‚ÐµÐ½Ð¾Ðº ÑÐºÑ€Ð°Ð½Ð°
 * @type struct<TintRGBA>
 * @default {"r":"255","g":"255","b":"255","a":"255"}

 * @param 15
 * @text 15:00
 * @desc RGBA Ð¾Ñ‚Ñ‚ÐµÐ½Ð¾Ðº ÑÐºÑ€Ð°Ð½Ð°
 * @type struct<TintRGBA>
 * @default {"r":"255","g":"255","b":"255","a":"255"}

 * @param 16
 * @text 16:00
 * @desc RGBA Ð¾Ñ‚Ñ‚ÐµÐ½Ð¾Ðº ÑÐºÑ€Ð°Ð½Ð°
 * @type struct<TintRGBA>
 * @default {"r":"255","g":"255","b":"255","a":"255"}

 * @param 17
 * @text 17:00
 * @desc RGBA Ð¾Ñ‚Ñ‚ÐµÐ½Ð¾Ðº ÑÐºÑ€Ð°Ð½Ð°
 * @type struct<TintRGBA>
 * @default {"r":"255","g":"255","b":"255","a":"255"}

 * @param 18
 * @text 18:00
 * @desc RGBA Ð¾Ñ‚Ñ‚ÐµÐ½Ð¾Ðº ÑÐºÑ€Ð°Ð½Ð°
 * @type struct<TintRGBA>
 * @default {"r":"255","g":"255","b":"255","a":"255"}

 * @param 19
 * @text 19:00
 * @desc RGBA Ð¾Ñ‚Ñ‚ÐµÐ½Ð¾Ðº ÑÐºÑ€Ð°Ð½Ð°
 * @type struct<TintRGBA>
 * @default {"r":"255","g":"255","b":"255","a":"255"}

 * @param 20
 * @text 20:00
 * @desc RGBA Ð¾Ñ‚Ñ‚ÐµÐ½Ð¾Ðº ÑÐºÑ€Ð°Ð½Ð°
 * @type struct<TintRGBA>
 * @default {"r":"255","g":"255","b":"255","a":"255"}

 * @param 21
 * @text 21:00
 * @desc RGBA Ð¾Ñ‚Ñ‚ÐµÐ½Ð¾Ðº ÑÐºÑ€Ð°Ð½Ð°
 * @type struct<TintRGBA>
 * @default {"r":"255","g":"255","b":"255","a":"255"}

 * @param 22
 * @text 22:00
 * @desc RGBA Ð¾Ñ‚Ñ‚ÐµÐ½Ð¾Ðº ÑÐºÑ€Ð°Ð½Ð°
 * @type struct<TintRGBA>
 * @default {"r":"255","g":"255","b":"255","a":"255"}

 * @param 23
 * @text 23:00
 * @desc RGBA Ð¾Ñ‚Ñ‚ÐµÐ½Ð¾Ðº ÑÐºÑ€Ð°Ð½Ð°
 * @type struct<TintRGBA>
 * @default {"r":"255","g":"255","b":"255","a":"255"}

*/

/*~struct~TintRGBA:

 * @param r
 * @text Red
 * @desc Red hue
 * @type number
 * @min 0
 * @max 255
 * @default 255

 * @param g
 * @text Green
 * @desc Green hue
 * @type number
 * @min 0
 * @max 255
 * @default 255

 * @param b
 * @text Blue
 * @desc Blue hue
 * @type number
 * @min 0
 * @max 255
 * @default 255

 * @param a
 * @text Alpha
 * @desc Tint opacity
 * @type number
 * @min 0
 * @max 255
 * @default 255

*/

/*~struct~TintRGBA:ru

 * @param r
 * @text Red
 * @desc ÐšÑ€Ð°ÑÐ½Ñ‹Ð¹ Ð¾Ñ‚Ñ‚ÐµÐ½Ð¾Ðº
 * @type number
 * @min 0
 * @max 255
 * @default 255

 * @param g
 * @text Green
 * @desc Ð—ÐµÐ»ÐµÐ½Ñ‹Ð¹ Ð¾Ñ‚Ñ‚ÐµÐ½Ð¾Ðº
 * @type number
 * @min 0
 * @max 255
 * @default 255

 * @param b
 * @text Blue
 * @desc Ð¡Ð¸Ð½Ð¸Ð¹ Ð¾Ñ‚Ñ‚ÐµÐ½Ð¾Ðº
 * @type number
 * @min 0
 * @max 255
 * @default 255

 * @param a
 * @text Alpha
 * @desc ÐŸÑ€Ð¾Ð·Ñ€Ð°Ñ‡Ð½Ð¾ÑÑ‚ÑŒ Ð¾Ñ‚Ñ‚ÐµÐ½ÐºÐ°
 * @type number
 * @min 0
 * @max 255
 * @default 255

*/

'use strict';

var Imported = Imported || {};
Imported['DK_Game_Time_DayNight'] = '1.0.1';

if (Imported['DK_Game_Time']) {
    const pluginVersion = Imported['DK_Game_Time'];
    const requiredVersion = '2.6.0';

    if (!Game_Time.checkVersion(requiredVersion)) {
        throw new Error(
            'Required to update the plugin "DK_Game_Time" to minimal version %1 (Installed: %2)'
                .format(requiredVersion, pluginVersion));
    }
} else {
    throw new Error('No plugin "DK_Game_Time"! Plugin "DK_Game_Time_DayNight" will not work!');
}

/**
 * @global
 * @type {Game_Time_Tint}
 */
var $gameTimeTint = null;

//===========================================================================
// initialize parameters
//===========================================================================

const GameTimeDayNightParams = (function() {

    function parse(string) {
        try {
            return JSON.parse(string, function(key, value) {
                if (typeof string === 'number' || typeof string === 'boolean') {
                    return string;
                }

                try {
                    if (Array.isArray(value)) {
                        return value.map(val => parse(val));
                    }

                    return parse(value);
                } catch (e) {
                    return value;
                }
            });
        } catch (e) {
            return string;
        }
    }

    const parameters = PluginManager.parameters('DK_Game_Time_DayNight');

    return Object.entries(parameters).reduce((acc, [key, value]) => {
        acc[key] = parse(value);
        return acc;
    }, {});

})();

GameTimeDayNightParams.tints = Object.entries(GameTimeDayNightParams.tints).reduce((acc, [hour, rgba]) => {
    acc[hour] = Object.values(rgba);
    return acc;
}, []);
GameTimeDayNightParams.disabledMaps = GameTimeDayNightParams.disabledMaps || [];

//=============================================================================
// Game_Interpreter
//=============================================================================

const Game_Time_DayNight_Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
    Game_Time_DayNight_Game_Interpreter_pluginCommand.apply(this, arguments);

    switch(command) {
        case 'ShowGameTint':
            $gameTimeTint.show();
            break;
        case 'HideGameTint':
            $gameTimeTint.hide();
            break;
        case 'SetGameTintVisible':
            args[0] === 'true' ?
                $gameTimeTint.show() : $gameTimeTint.hide();
            break;
        case 'SetGameTintStaticTime':
            $gameTimeTint.setStaticTime(eval(args[0]), eval(args[1]));
            break;
        case 'ResetGameTintStaticTime':
            $gameTimeTint.setStaticTime(null);
            break;
    }
};

if (Utils.RPGMAKER_NAME === 'MZ') {

    PluginManager.registerCommand('DK_Game_Time_DayNight', 'ShowGameTint', () => {
        $gameTimeTint.show();
    });

    PluginManager.registerCommand('DK_Game_Time_DayNight', 'HideGameTint', () => {
        $gameTimeTint.hide();
    });

    PluginManager.registerCommand('DK_Game_Time_DayNight', 'SetGameTintVisible', (args) => {
        args.visible === 'true' ?
            $gameTimeTint.show() : $gameTimeTint.hide();
    });

    PluginManager.registerCommand('DK_Game_Time_DayNight', 'SetGameTintStaticTime', (args) => {
        $gameTimeTint.setStaticTime(eval(args.hour), eval(args.min));
    });

    PluginManager.registerCommand('DK_Game_Time_DayNight', 'ResetGameTintStaticTime', () => {
        $gameTimeTint.setStaticTime(null);
    });

}

//=============================================================================
// Game_Time_Tint
//=============================================================================

class Game_Time_Tint {

    constructor() {
        this.initialize.apply(this, arguments);
    }

    // initialize methods

    initialize() {
        this._visible = true;
    }

    // get methods

    getStaticTime() {
        return this._staticTime;
    }

    // set methods

    setStaticTime(hour, min) {
        if (arguments[0] == null) {
            this._staticTime = null;
        } else {
            this._staticTime = { hour, min };
        }

        if (this._sprite) {
            this._sprite.update();
        }
    }

    // is methods

    isVisible() {
        return this._visible;
    }

    // other methods

    show() {
        this._visible = true;
    }

    hide() {
        this._visible = false;
    }

}

//===========================================================================
// Hacks for JsonEx encode/decode. Makes visibility for classes in window
//===========================================================================

window.Game_Time_Tint = Game_Time_Tint;

//=============================================================================
// Game_Time_Tint.Sprite
//=============================================================================

Game_Time_Tint.Sprite = class extends Sprite {

    // initialize methods

    initialize() {
        super.initialize(new Bitmap(Graphics.width, Graphics.height));
        this._gameTime = $gameTime.clone().remMin(1);
    }

    // get methods

    getTint() {
        const rgb = [];

        for (let i = 0; i < 3; i++) {
            rgb[i] = (this._currentHour[i] + (this._nextHour[i] - this._currentHour[i]) / Game_Time.getMinutesInHour() * this._min).clamp(0, 255);
        }

        return rgb;
    }

    getOpacity() {
        return (this._currentHour[3] + (this._nextHour[3] - this._currentHour[3]) / Game_Time.getMinutesInHour() * this._min).clamp(0, 255);
    }

    // update methods

    updateVisibility() {
        this.visible = $gameTimeTint.isVisible();
    }

    updateCurrentHour() {
        this._currentHour = GameTimeDayNightParams.tints[this._hour];
    }

    updateNextHour() {
        const hour = (this._hour + 1) % Game_Time.getHoursInDay();
        this._nextHour = GameTimeDayNightParams.tints[hour];
    }

    updateParameters() {
        const staticTime = $gameTimeTint.getStaticTime();

        this._hour = $gameTime.hour;
        this._min = $gameTime.min;

        if (staticTime) {
            this._hour = staticTime.hour;
            this._min = staticTime.min;
        }

        this.updateCurrentHour();
        this.updateNextHour();
    }

    updateTint() {
        this.updateParameters();

        this.bitmap.clear();
        this.bitmap.fillRect(0, 0, this.bitmap.width, this.bitmap.height, `rgb(${this.getTint().join(',')})`);
        this.opacity = this.getOpacity();
    }

    update() {
        const staticTime = $gameTimeTint.getStaticTime();

        this.updateVisibility();

        if (staticTime) {
            if (this._staticTime && this._staticTime.hour === staticTime.hour && this._staticTime.min === staticTime.min) {
                return;
            }

            this._staticTime = staticTime;
        } else {
            if (this._gameTime.equals($gameTime, true)) {
                return;
            }

            this._gameTime = $gameTime.clone();
        }

        this.updateTint();
    }

}

//=============================================================================
// Spriteset_Map
//=============================================================================

const Game_Time_DayNight_Spriteset_Map_createTilemap = Spriteset_Map.prototype.createTilemap;
Spriteset_Map.prototype.createTilemap = function() {
    Game_Time_DayNight_Spriteset_Map_createTilemap.apply(this, arguments);

    if (!GameTimeDayNightParams.disabledMaps.includes($gameMap.mapId())) {
        this._baseSprite.addChild(new Game_Time_Tint.Sprite());
    }
};

//=============================================================================
// Data Manager
//=============================================================================

const Game_Time_DayNight_DataManager_createGameObjects = DataManager.createGameObjects;
DataManager.createGameObjects = function() {
    Game_Time_DayNight_DataManager_createGameObjects.apply(this, arguments);
    $gameTimeTint = new Game_Time_Tint();
};

const Game_Time_DayNight_DataManager_makeSaveContents = DataManager.makeSaveContents;
DataManager.makeSaveContents = function() {
    const contents = Game_Time_DayNight_DataManager_makeSaveContents.apply(this, arguments);

    contents.gameTimeTint = $gameTimeTint;

    return contents;
};

const Game_Time_DayNight_DataManager_extractSaveContents = DataManager.extractSaveContents;
DataManager.extractSaveContents = function(contents) {
    Game_Time_DayNight_DataManager_extractSaveContents.apply(this, arguments);

    if (contents.gameTimeTint) {
        $gameTimeTint = contents.gameTimeTint;
    }
};