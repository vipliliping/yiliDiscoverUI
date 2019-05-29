(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['exports', 'echarts'], factory);
    } else if (typeof exports === 'object' && typeof exports.nodeName !== 'string') {
        // CommonJS
        factory(exports, require('echarts'));
    } else {
        // Browser globals
        factory({}, root.echarts);
    }
}(this, function (exports, echarts) {
    var log = function (msg) {
        if (typeof console !== 'undefined') {
            console && console.error && console.error(msg);
        }
    }
    if (!echarts) {
        log('ECharts is not Loaded');
        return;
    }
    if (!echarts.registerMap) {
        log('ECharts Map is not loaded')
        return;
    }
    echarts.registerMap('china', {"type":"FeatureCollection","features":[{"id":"710000","geometry":{"type":"MultiPolygon","coordinates":[["@@°Ü¯Û","@@ƛĴÕƊÉɼģºðʀ\\ƎsÆNŌÔĚänÜƤɊĂǀĆĴĤǊŨxĚĮǂƺòƌâÔ®ĮXŦţƸZûÐƕƑGđ¨ĭMó·ęcëƝɉlÝƯֹÅŃ^Ó·śŃǋƏďíåɛGɉ¿IċããF¥ĘWǬÏĶñÄ","@@\\p|WoYG¿¥Ij@","@@¡@V^RqBbAnTXeQr©C","@@ÆEEkWqë I"]],"encodeOffsets":[[[122886,24033],[123335,22980],[122375,24193],[122518,24117],[124427,22618]]]},"properties":{"cp":[121.509062,25.044332],"name":"台湾","childNum":5}},{"id":"130000","geometry":{"type":"MultiPolygon","coordinates":[["@@\\aM`Ç½ÓnUKĜēs¤­©yrý§uģcJ»eIP]ªrºc_ħ²G¼s`jÎŸnüsÂľP","@@U`Ts¿mÄ","@@FOhđ©OiÃ`ww^ÌkÑH«ƇǤŗĺtFu{Z}Ö@U´ʚLg®¯Oı°Ãw ^VbÉsmAê]]w§RRl£ŭuwNÁ`ÇFēÝčȻuT¡Ĺ¯Õ¯sŗő£YªhVƍ£ƅnëYNgq¼ś¿µı²UºÝUąąŖóxV@tƯJ]eR¾fe|rHA|h~Ėƍl§ÏjVë` ØoÅbbx³^zÃĶ¶Sj®AyÂhðk`«PËµEFÛ¬Y¨Ļrõqi¼Wi°§Ð±²°`[À|ĠO@ÆxO\\ta\\p_Zõ^û{ġȧXýĪÓjùÎRb^Î»j{íděYfíÙTymńŵōHim½éŅ­aVcř§ax¹XŻácWU£ôãºQ¨÷Ñws¥qEHÙ|šYQoŕÇyáĂ£MÃ°oťÊP¡mWO¡v{ôvîēÜISpÌhp¨ jdeŔQÖjX³àĈ[n`Yp@UcM`RKhEbpŞlNut®EtqnsÁgAiúoHqCXhfgu~ÏWP½¢G^}¯ÅīGCÑ^ãziMáļMTÃƘrMc|O_¯Ŏ´|morDkO\\mĆJfl@cĢ¬¢aĦtRıÒXòë¬WP{ŵǫƝīÛ÷ąV×qƥV¿aȉd³BqPBmaËđŻģmÅ®V¹d^KKonYg¯XhqaLdu¥Ípǅ¡KąÅkĝęěhq}HyÃ]¹ǧ£Í÷¿qágPmoei¤o^á¾ZEY^Ný{nOl±Í@Mċèk§daNaÇį¿]øRiiñEūiǱàUtėGyl}ÓM}jpEC~¡FtoQiHkk{ILgĽxqÈƋÄdeVDJj£J|ÅdzÂFt~KŨ¸IÆv|¢r}èonb}`RÎÄn°ÒdÞ²^®lnÐèĄlðÓ×]ªÆ}LiĂ±Ö`^°Ç¶p®đDcŋ`ZÔ¶êqvFÆN®ĆTH®¦O¾IbÐã´BĐɢŴÆíȦpĐÞXR·nndO¤OÀĈƒ­QgµFo|gȒęSWb©osx|hYhgŃfmÖĩnºTÌSp¢dYĤ¶UĈjlǐpäðëx³kÛfw²Xjz~ÂqbTÑěŨ@|oMzv¢ZrÃVw¬ŧĖ¸f°ÐTªqs{S¯r æÝl¼ÖĞ ǆiGĘJ¼lr}~K¨ŸƐÌWö¼Þ°nÞoĦL|C~D©|q]SvKÑcwpÏÏĿćènĪWlĄkT}¬Tp~®Hgd˒ĺBVtEÀ¢ôPĎƗè@~kü\\rÊĔÖæW_§¼F´©òDòjYÈrbĞāøŀG{ƀ|¦ðrb|ÀH`pʞkvGpuARhÞÆǶgĘTǼƹS£¨¡ù³ŘÍ]¿ÂyôEP xX¶¹ÜO¡gÚ¡IwÃé¦ÅBÏ|Ç°N«úmH¯âbęU~xĈbȒ{^xÖlD¸dɂ~"]],"encodeOffsets":[[[120023,41045],[121616,39981],[122102,42307]]]},"properties":{"cp":[114.502461,38.045474],"name":"河北","childNum":3}},{"id":"140000","geometry":{"type":"Polygon","coordinates":["@@ħÜ_ªlìwGkÛÃǏokćiµVZģ¡coTSË¹ĪmnÕńehZg{gtwªpXaĚThȑp{¶Eh®RćƑP¿£PmcªaJyý{ýȥoÅîɡųAďä³aÏJ½¥PG­ąSM­sWz½µÛYÓŖgxoOkĒCo­Èµ]¯_²ÕjāK~©ÅØ^ÔkïçămÏk]­±cÝ¯ÑÃmQÍ~_apm~ç¡qu{JÅŧ·Ls}EyÁÆcI{¤IiCfUcƌÃp§]ě«vD@¡SÀµMÅwuYY¡DbÑc¡h×]nkoQdaMç~eDÛtT©±@¥ù@É¡ZcW|WqOJmĩl«ħşvOÓ«IqăV¥D[mI~Ó¢cehiÍ]Ɠ~ĥqX·eƷn±}v[ěďŕ]_œ`¹§ÕōIo©b­s^}Ét±ū«³p£ÿ¥WÑxçÁ«h×u×¥ř¾dÒ{ºvĴÎêÌɊ²¶ü¨|ÞƸµȲLLúÉƎ¤ϊęĔV`_bªS^|dzY|dz¥pZbÆ£¶ÒK}tĦÔņƠPYznÍvX¶Ěn ĠÔzý¦ª÷ÑĸÙUȌ¸dòÜJð´ìúNM¬XZ´¤ŊǸ_tldI{¦ƀðĠȤ¥NehXnYGR° ƬDj¬¸|CĞKqºfƐiĺ©ª~ĆOQª ¤@ìǦɌ²æBÊTĞHƘÁĪËĖĴŞȀÆÿȄlŤĒötÎ½î¼ĨXh|ªM¤ÐzÞĩÒSrao³"],"encodeOffsets":[[117016,41452]]},"properties":{"cp":[112.549248,37.857014],"name":"山西","childNum":1}},{"id":"150000","geometry":{"type":"MultiPolygon","coordinates":[["@@ǪƫÌÛMĂ[`ÕCn}¶Vcês¯PqFB|S³C|kñHdiÄ¥sŉÅPóÑÑE^ÅPpy_YtShQ·aHwsOnŉÃs©iqjUSiº]ïW«gW¡ARëśĳĘů`çõh]y»ǃǛҤxÒm~zf}pf|ÜroÈzrKÈĵSƧż؜Ġu~è¬vîS¼ĂhĖMÈÄw\\fŦ°W ¢¾luŸDw\\Ŗĝ","@@GVu»Aylßí¹ãe]Eāò³C¹ð¾²iÒAdkò^P²CǜңǄ z¼g^èöŰ_Ĳĕê}gÁnUI«m]jvV¼euhwqAaW_µj»çjioQR¹ēÃßt@r³[ÛlćË^ÍÉáGOUÛOB±XkÅ¹£k|e]olkVÍ¼ÕqtaÏõjgÁ£§U^RLËnX°ÇBz^~wfvypV ¯ƫĉ˭ȫƗŷɿÿĿƑ˃ĝÿÃǃßËőó©ǐȍŒĖM×ÍEyxþp]ÉvïèvƀnÂĴÖ@V~Ĉ³MEĸÅĖtējyÄDXÄxGQuv_i¦aBçw˛wD©{tāmQ{EJ§KPśƘƿ¥@sCTÉ}ɃwƇy±gÑ}T[÷kÐç¦«SÒ¥¸ëBX½HáÅµÀğtSÝÂa[ƣ°¯¦Pï¡]£ġÒk®G²èQ°óMq}EóƐÇ\\@áügQÍu¥FTÕ¿Jû]|mvāÎYua^WoÀa·­ząÒot×¶CLƗi¯¤mƎHǊ¤îìɾŊìTdåwsRÖgĒųúÍġäÕ}Q¶¿A[¡{d×uQAMxVvMOmăl«ct[wº_ÇÊjbÂ£ĦS_éQZ_lwgOiýe`YYJq¥IÁǳ£ÙË[ÕªuƏ³ÍTs·bÁĽäė[b[ŗfãcn¥îC¿÷µ[ŏÀQ­ōĉm¿Á^£mJVmL[{Ï_£F¥Ö{ŹA}×Wu©ÅaųĳƳhB{·TQqÙIķËZđ©Yc|M¡LeVUóK_QWk_ĥ¿ãZ»X\\ĴuUèlG®ěłTĠğDŃGÆÍz]±ŭ©Å]ÅÐ}UË¥©TċïxgckfWgi\\ÏĒ¥HkµEë{»ÏetcG±ahUiñiWsɁ·cCÕk]wȑ|ća}wVaĚá G°ùnM¬¯{ÈÐÆA¥ÄêJxÙ¢hP¢ÛºµwWOóFÁz^ÀŗÎú´§¢T¤ǻƺSėǵhÝÅQgvBHouʝl_o¿Ga{ïq{¥|ſĿHĂ÷aĝÇqZñiñC³ª»E`¨åXēÕqÉû[l}ç@čƘóO¿¡FUsAʽīccocÇS}£IS~ălkĩXçmĈŀÐoÐdxÒuL^T{r@¢ÍĝKén£kQyÅõËXŷƏL§~}kq»IHėǅjĝ»ÑÞoå°qTt|r©ÏS¯·eŨĕx«È[eM¿yupN~¹ÏyN£{©għWí»Í¾səšǅ_ÃĀɗ±ąĳĉʍŌŷSÉA±åǥɋ@ë£R©ąP©}ĹªƏj¹erLDĝ·{i«ƫC½ÉshVzGS|úþXgp{ÁX¿ć{ƱȏñZáĔyoÁhA}ŅĆfdŉ_¹Y°ėǩÑ¡H¯¶oMQqð¡Ë|Ñ`ƭŁX½·óÛxğįÅcQs«tȋǅFù^it«Č¯[hAi©á¥ÇĚ×l|¹y¯Kȝqgů{ñǙµïċĹzŚȭ¶¡oŽäÕG\\ÄT¿Òõr¯LguÏYęRƩɷŌO\\İÐ¢æ^Ŋ ĲȶȆbÜGĝ¬¿ĚVĎgª^íu½jÿĕęjık@Ľ]ėl¥ËĭûÁėéV©±ćn©­ȇÍq¯½YÃÔŉÉNÑÅÝy¹NqáʅDǡËñ­ƁYÅy̱os§ȋµʽǘǏƬɱàưN¢ƔÊuľýľώȪƺɂļxZĈ}ÌŉŪĺœĭFЛĽ̅ȣͽÒŵìƩÇϋÿȮǡŏçƑůĕ~Ç¼ȳÐUfdIxÿ\\G zâɏÙOº·pqy£@qþ@Ǟ˽IBäƣzsÂZÁàĻdñ°ŕzéØűzșCìDȐĴĺf®Àľưø@ɜÖÞKĊŇƄ§͑těï͡VAġÑÑ»d³öǍÝXĉĕÖ{þĉu¸ËʅğU̎éhɹƆ̗̮ȘǊ֥ड़ࡰţાíϲäʮW¬®ҌeרūȠkɬɻ̼ãüfƠSצɩςåȈHϚÎKǳͲOðÏȆƘ¼CϚǚ࢚˼ФÔ¤ƌĞ̪Qʤ´¼mȠJˀƲÀɠmɆǄĜƠ´ǠN~ʢĜ¶ƌĆĘźʆȬ˪ĚĒ¸ĞGȖƴƀj`ĢçĶāàŃºēĢĖćYÀŎüôQÐÂŎŞǆŞêƖoˆDĤÕºÑǘÛˤ³̀gńƘĔÀ^ªƂ`ªt¾äƚêĦĀ¼ÐĔǎ¨Ȕ»͠^ˮÊȦƤøxRrŜH¤¸ÂxDÄ|ø˂˜ƮÐ¬ɚwɲFjĔ²Äw°ǆdÀÉ_ĸdîàŎjÊêTĞªŌŜWÈ|tqĢUB~´°ÎFCU¼pĀēƄN¦¾O¶łKĊOjĚj´ĜYp{¦SĚÍ\\T×ªV÷Ší¨ÅDK°ßtŇĔK¨ǵÂcḷ̌ĚǣȄĽFlġUĵŇȣFʉɁMğįʏƶɷØŭOǽ«ƽū¹Ʊő̝Ȩ§ȞʘĖiɜɶʦ}¨֪ࠜ̀ƇǬ¹ǨE˦ĥªÔêFxúQEr´Wrh¤Ɛ \\talĈDJÜ|[Pll̚¸ƎGú´P¬W¦^¦H]prRn|or¾wLVnÇIujkmon£cX^Bh`¥V¦U¤¸}xRj[^xN[~ªxQ[`ªHÆÂExx^wN¶Ê|¨ìMrdYpoRzNyÀDs~bcfÌ`L¾n|¾T°c¨È¢ar¤`[|òDŞĔöxElÖdHÀI`Ď\\Àì~ÆR¼tf¦^¢ķ¶eÐÚMptgjɡČÅyġLûŇV®ÄÈƀĎ°P|ªVVªj¬ĚÒêp¬E|ŬÂ_~¼rƐK f{ĘFĒƌXưăkÃĄ}nµo×q£ç­kX{uĩ«āíÓUŅÝVUŌ]Ť¥lyň[oi{¦LĸĦ^ôâJ¨^UZðÚĒL¿Ìf£K£ʺoqNwğc`uetOj×°KJ±qÆġmĚŗos¬qehqsuH{¸kH¡ÊRǪÇƌbȆ¢´äÜ¢NìÉʖ¦â©Ɨؗ"]],"encodeOffsets":[[[128500,52752],[127089,51784]]]},"properties":{"cp":[111.670801,40.818311],"name":"内蒙古","childNum":2}},{"id":"210000","geometry":{"type":"MultiPolygon","coordinates":[["@@L@@s]","@@MnNm","@@dc","@@eÀC@b","@@fXwkbrÄ`qg","@@^jtWQ","@@~ Y[c","@@I`ĖN^_¿ZÁM","@@Ïxǌ{q_×^Gigp","@@iX¶BY","@@YZ","@@L_yG`b","@@^WqCTZ","@@\\[§t|]","@@m`p[","@@@é^BntaÊU]x ¯ÄPĲ­°hʙK³VÕ@Y~|EvĹsÇ¦­L^pÃ²ŸÒG Ël]xxÄ_fT¤Ď¤cPC¨¸TVjbgH²sdÎdHt`B²¬GJję¶[ÐhjeXdlwhðSČ¦ªVÊÏÆZÆŶ®²^ÎyÅHńĚDMħĜŁH­kçvV[ĳ¼WYÀäĦ`XlR`ôLUVfK¢{NZdĒªYĸÌÚJRr¸SA|ƴgŴĴÆbvªØX~źB|¦ÕE¤Ð`\\|KUnnI]¤ÀÂĊnŎR®Ő¿¶\\ÀøíDm¦ÎbŨabaĘ\\ľãÂ¸atÎSƐ´©v\\ÖÚÌǴ¤Â¨JKrZ_ZfjþhPkx`YRIjJcVf~sCN¤ EhæmsHy¨SðÑÌ\\\\ĐRÊwS¥fqŒßýáĞÙÉÖ[^¯ǤŲê´\\¦¬ĆPM¯£»uïpùzExanµyoluqe¦W^£ÊL}ñrkqWňûPUP¡ôJoo·U}£[·¨@XĸDXm­ÛÝºGUCÁª½{íĂ^cjk¶Ã[q¤LÉö³cux«|Zd²BWÇ®Yß½ve±ÃCý£W{Ú^q^sÑ·¨ËMr¹·C¥GDrí@wÕKţÃ«V·i}xËÍ÷i©ĝɝǡ]{c±OW³Ya±_ç©HĕoƫŇqr³Lys[ñ³¯OSďOMisZ±ÅFC¥Pq{Ã[Pg}\\¿ghćOk^ĩÃXaĕËĥM­oEqqZûěŉ³F¦oĵhÕP{¯~TÍlªNßYÐ{Ps{ÃVUeĎwk±ŉVÓ½ŽJãÇÇ»Jm°dhcÀffdF~ĀeĖd`sx² ®EĦ¦dQÂd^~ăÔH¦\\LKpĄVez¤NP ǹÓRÆąJSh­a[¦´ÂghwmBÐ¨źhI|VV|p] Â¼èNä¶ÜBÖ¼L`¼bØæKVpoúNZÞÒKxpw|ÊEMnzEQIZZNBčÚFÜçmĩWĪñtÞĵÇñZ«uD±|ƏlǗw·±PmÍada CLǑkùó¡³Ï«QaċÏOÃ¥ÕđQȥċƭy³ÁA"]],"encodeOffsets":[[[123686,41445],[126019,40435],[124393,40128],[126117,39963],[125322,40140],[126686,40700],[126041,40374],[125584,40168],[125509,40217],[125453,40165],[125362,40214],[125280,40291],[125774,39997],[125976,40496],[125822,39993],[122731,40949]]]},"properties":{"cp":[123.429096,41.796767],"name":"辽宁","childNum":16}},{"id":"220000","geometry":{"type":"Polygon","coordinates":["@@ñr½ÉKāGÁ¤ia ÉÈ¹`\\xs¬dĆkNnuNUwNx¶c¸|\\¢GªóĄ~RãÖÎĢùđŴÕhQxtcæëSɽŉíëǉ£ƍG£nj°KƘµDsØÑpyĆ¸®¿bXp]vbÍZuĂ{n^IüÀSÖ¦EvRÎûh@â[ƏÈô~FNr¯ôçR±­HÑlĢ^¤¢OðætxsŒ]ÞÁTĠs¶¿âÆGW¾ìA¦·TÑ¬è¥ÏÐJ¨¼ÒÖ¼ƦɄxÊ~StD@Ă¼Ŵ¡jlºWvÐzƦZÐ²CH AxiukdGgetqmcÛ£Ozy¥cE}|¾cZk¿uŐã[oxGikfeäT@SUwpiÚFM©£è^Ú`@v¶eňf heP¶täOlÃUgÞzŸU`l}ÔÆUvØ_Ō¬Öi^ĉi§²ÃB~¡ĈÚEgc|DC_Ȧm²rBx¼MÔ¦ŮdĨÃâYxƘDVÇĺĿg¿cwÅ\\¹¥Yĭl¤OvLjM_a W`zļMž·\\swqÝSAqŚĳ¯°kRē°wx^ĐkǂÒ\\]nrĂ}²ĊŲÒøãh·M{yMzysěnĒġV·°G³¼XÀ¤¹i´o¤ŃÈ`ÌǲÄUĞd\\iÖmÈBĤÜɲDEh LG¾ƀÄ¾{WaYÍÈĢĘÔRîĐj}ÇccjoUb½{h§Ǿ{KƖµÎ÷GĄØŜçưÌs«lyiē«`å§H¥Ae^§GK}iã\\c]v©ģZmÃ|[M}ģTɟĵÂÂ`ÀçmFK¥ÚíÁbX³ÌQÒHof{]ept·GŋĜYünĎųVY^ydõkÅZW«WUa~U·SbwGçǑiW^qFuNĝ·EwUtW·Ýďæ©PuqEzwAVXRãQ`­©GYYhcUGorBd}ģÉb¡·µMicF«Yƅ»é\\ɹ~ǙG³mØ©BšuT§Ĥ½¢Ã_Ã½L¡ûsT\\rke\\PnwAKy}ywdSefµ]UhĿD@mÿvaÙNSkCuncÿ`lWėVâ¦÷~^fÏ~vwHCį`xqT­­lW«ï¸skmßEGqd¯R©Ý¯¯S\\cZ¹iűƏCuƍÓXoR}M^o£R}oªU­FuuXHlEÅÏ©¤ßgXþ¤D²ÄufàÀ­XXÈ±Ac{Yw¬dvõ´KÊ£\\rµÄlidā]|î©¾DÂVH¹Þ®ÜWnCķ W§@\\¸~¤Vp¸póIO¢VOŇürXql~òÉK]¤¥Xrfkvzpm¶bwyFoúvð¼¤ N°ąO¥«³[éǣű]°Õ\\ÚÊĝôîŇÔaâBYlďQ[ Ë[ïÒ¥RI|`j]P"],"encodeOffsets":[[126831,44503]]},"properties":{"cp":[125.3245,43.886841],"name":"吉林","childNum":1}},{"id":"230000","geometry":{"type":"MultiPolygon","coordinates":[["@@UµNÿ¥īèçHÍøƕ¶Lǽ|g¨|a¾pVidd~ÈiíďÓQġėÇZÎXb½|ſÃH½KFgɱCģÛÇAnjÕc[VĝǱÃËÇ_ £ń³pj£º¿»WH´¯U¸đĢmtĜyzzNN|g¸÷äűÑ±ĉā~mq^[ǁÑďlw]¯xQĔ¯l°řĴrBÞTxr[tŽ¸ĻN_yX`biNKuP£kZĮ¦[ºxÆÀdhĹŀUÈƗCwáZħÄŭcÓ¥»NAw±qȥnD`{ChdÙFć}¢A±Äj¨]ĊÕjŋ«×`VuÓÅ~_kŷVÝyhVkÄãPsOµfgeŇµf@u_Ù ÙcªNªÙEojVxT@ãSefjlwH\\pŏäÀvlY½d{F~¦dyz¤PÜndsrhfHcvlwjF£G±DÏƥYyÏu¹XikĿ¦ÏqƗǀOŜ¨LI|FRĂn sª|C˜zxAè¥bfudTrFWÁ¹Am|ĔĕsķÆF´N}ćUÕ@Áĳſmuçuð^ÊýowFzØÎĕNőǏȎôªÌŒǄàĀÄ˄ĞŀƒʀĀƘŸˮȬƬĊ°Uzouxe]}AyÈW¯ÌmKQ]Īºif¸ÄX|sZt|½ÚUÎ lk^p{f¤lºlÆW A²PVÜPHÊâ]ÎĈÌÜk´\\@qàsĔÄQºpRij¼èi`¶bXrBgxfv»uUi^v~J¬mVp´£´VWrnP½ì¢BX¬hðX¹^TjVriªjtŊÄmtPGx¸bgRsT`ZozÆO]ÒFôÒOÆŊvÅpcGêsx´DR{AEOr°x|íb³Wm~DVjºéNNËÜ˛ɶ­GxŷCSt}]ûōSmtuÇÃĕNāg»íT«u}ç½BĵÞʣ¥ëÊ¡MÛ³ãȅ¡ƋaǩÈÉQG¢·lG|tvgrrf«ptęŘnÅĢrI²¯LiØsPf_vĠdxM prʹL¤¤eËÀđKïÙVY§]Ióáĥ]ķK¥j|pŇ\\kzţ¦šnņäÔVĂîĪ¬|vW®l¤èØrxm¶ă~lÄƯĄ̈́öȄEÔ¤ØQĄĄ»ƢjȦOǺ¨ìSŖÆƬyQv`cwZSÌ®ü±Ǆ]ŀç¬B¬©ńzƺŷɄeeOĨSfm ĊƀP̎ēz©ĊÄÕÊmgÇsJ¥ƔŊśæÎÑqv¿íUOµªÂnĦÁ_½ä@êí£P}Ġ[@gġ}gɊ×ûÏWXá¢užƻÌsNÍ½ƎÁ§čŐAēeL³àydl¦ĘVçŁpśǆĽĺſÊQíÜçÛġÔsĕ¬Ǹ¯YßċġHµ ¡eå`ļrĉŘóƢFìĎWøxÊkƈdƬv|I|·©NqńRŀ¤éeŊŀàŀU²ŕƀBQ£Ď}L¹Îk@©ĈuǰųǨÚ§ƈnTËÇéƟÊcfčŤ^XmHĊĕË«W·ċëx³ǔķÐċJāwİ_ĸȀ^ôWr­°oú¬ĦŨK~ȰCĐ´Ƕ£fNÎèâw¢XnŮeÂÆĶ¾¾xäLĴĘlļO¤ÒĨA¢Êɚ¨®ØCÔ ŬGƠƦYĜĘÜƬDJg_ͥœ@čŅĻA¶¯@wÎqC½Ĉ»NăëKďÍQÙƫ[«ÃígßÔÇOÝáWñuZ¯ĥŕā¡ÑķJu¤E å¯°WKÉ±_d_}}vyõu¬ï¹ÓU±½@gÏ¿rÃ½DgCdµ°MFYxw¿CG£Rƛ½Õ{]L§{qqą¿BÇƻğëܭǊË|c²}Fµ}ÙRsÓpg±QNqǫŋRwŕnéÑÉK«SeYRŋ@{¤SJ}D Ûǖ֍]gr¡µŷjqWÛham³~S«Ü[","@@ƨĶTLÇyqpÇÛqe{~oyen}s`qiXGù]Ëp½©lÉÁp]Þñ´FĂ^fäîºkàz¼BUv¬D"]],"encodeOffsets":[[[134456,44547],[127123,51780]]]},"properties":{"cp":[126.642464,45.756967],"name":"黑龙江","childNum":2}},{"id":"320000","geometry":{"type":"Polygon","coordinates":["@@Õg^vÁbnÀ`Jnĝ¬òM¶ĘTÖŒbe¦¦{¸ZâćNp©Hp|`mjhSEb\\afv`sz^lkljÄtg¤D­¾X¿À|ĐiZȀåB·î}GL¢õcßjayBFµÏC^ĭcÙt¿sğH]j{s©HM¢QnDÀ©DaÜÞ·jgàiDbPufjDk`dPOîhw¡ĥ¥GP²ĐobºrYî¶aHŢ´ ]´rılw³r_{£DB_Ûdåuk|Ũ¯F Cºyr{XFye³Þċ¿ÂkĭB¿MvÛpm`rÚã@Ę¹hågËÖƿxnlč¶Åì½Ot¾dJlVJĂǀŞqvnO^JZż·Q}êÍÅmµÒ]ƍ¦Dq}¬R^èĂ´ŀĻĊIÔtĲyQŐĠMNtR®òLhĚs©»}OÓGZz¶A\\jĨFäOĤHYJvÞHNiÜaĎÉnFQlNM¤B´ĄNöɂtpŬdZÅglmuÇUšŞÚb¤uŃJŴu»¹ĄlȖħŴw̌ŵ²ǹǠ͛hĭłƕrçü±Yrřl¥i`ã__¢ćSÅr[Çq^ùzWmOĈaŐÝɞï²ʯʊáĘĳĒǭPħ͍ôƋÄÄÍīçÛɈǥ£­ÛmY`ó£Z«§°Ó³QafusNıǅ_k}¢m[ÝóDµ¡RLčiXyÅNïă¡¸iĔÏNÌķoıdōîåŤûHcs}~Ûwbù¹£¦ÓCtOPrE^ÒogĉIµÛÅʹK¤½phMú`mR¸¦PƚgÉLRs`£¯ãhD¨|³¤C"],"encodeOffsets":[[121451,32518]]},"properties":{"cp":[118.767413,32.041544],"name":"江苏","childNum":1}},{"id":"330000","geometry":{"type":"MultiPolygon","coordinates":[["@@jX^n","@@sfdM","@@qP\\xz[_i","@@o\\VzRZ}mECy","@@R¢FX}°[m]","@@Cb\\}","@@e|v\\laus","@@v~s{","@@QxÂF©}","@@¹nvÞs©m","@@rQgYIh","@@bi«ZX","@@p[}ILd","@@À¿|","@@¹dnb","@@rS}[Kl","@@g~h}","@@FlCk","@@ůTG°ĄLHm°UF","@@OdRe","@@v[u\\","@@FjâL~wyoo~sµLZ","@@¬e¹aH","@@\\nÔ¡q]L³ë\\ÿ®QÌ","@@ÊA­©]ª","@@Kxv{­","@@@hlIk_","@@pWcrxp","@@Md|_iA","@@¢X£½z\\ðpN","@@hlÜ[LykAvyfw^E ","@@fp¤MusH","@@®_ma~LÁ¬`","@@@°¡mÛGĕ¨§Ianá[ýƤjfæÐNäGp","@@iMt\\","@@Zc[b","@@X®±GrÆ°Zæĉm","@@Z~dOSo|A¿qZv","@@@`EN£p","@@|s","@@@nDi","@@na£¾uYL¯QªmĉÅdMgÇjcº«ę¬­K­´B«Âącoċ\\xK`cįŧ«®á[~ıxu·ÅKsËÉc¢Ù\\ĭƛëbf¹­ģSĜkáƉÔ­ĈZB{aMµfzŉfÓÔŹŁƋǝÊĉ{ğč±g³ne{ç­ií´S¬\\ßðK¦w\\iqªĭiAuA­µ_W¥ƣO\\lċĢttC¨£t`PZäuXßBsĻyekOđġĵHuXBµ]×­­\\°®¬F¢¾pµ¼kŘó¬Wät¸|@L¨¸µrºù³Ù~§WIZW®±Ð¨ÒÉx`²pĜrOògtÁZ{üÙ[|ûKwsPlU[}¦Rvn`hsª^nQ´ĘRWb_ rtČFIÖkĦPJ¶ÖÀÖJĈĄTĚòC ²@PúØz©Pî¢£CÈÚĒ±hŖl¬â~nm¨f©iļ«mntqÒTÜÄjL®EÌFª²iÊxØ¨IÈhhst[Ôx}dtüGæţŔïĬaĸpMËÐjē¢·ðĄÆMzjWKĎ¢Q¶À_ê_@ıi«pZgf¤Nrq]§ĂN®«H±yƳí¾×ŊďŀĐÏŴǝĂíÀBŖÕªÁŐTFqĉ¯³ËCĕģi¨hÜ·ñt»¯Ï","@@ºwZRkĕWK "]],"encodeOffsets":[[[125785,31436],[125729,31431],[125513,31380],[125329,30690],[125223,30438],[125115,30114],[124815,29155],[124419,28746],[124095,28635],[124005,28609],[125000,30713],[125111,30698],[125078,30682],[125150,30684],[124014,28103],[125008,31331],[125411,31468],[125329,31479],[125369,31139],[125626,30916],[125417,30956],[125254,30976],[125199,30997],[125095,31058],[125083,30915],[124885,31015],[125218,30798],[124867,30838],[124755,30788],[124802,30809],[125267,30657],[125218,30578],[125200,30562],[125192,30787],[124968,30474],[125167,30396],[125115,30363],[124955,29879],[124714,29781],[124762,29462],[124325,28754],[124863,30077],[125366,31477]]]},"properties":{"cp":[120.153576,30.287459],"name":"浙江","childNum":43}},{"id":"340000","geometry":{"type":"MultiPolygon","coordinates":[["@@^iuLV\\","@@e©Edh","@@´CE¶zAXêeödK¡~H¸íæAȽd{ďÅÀ½W®£ChÃsikkly]_teu[bFaTign{]GqªoĈMYá|·¥f¥őaSÕėNµñĞ«Im_m¿Âa]uĜp Z_§{Cäg¤°r[_YjÆOdý[I[á·¥Q_nùgL¾mzˆDÜÆ¶ĊJhpc¹O]iŠ]¥ jtsggDÑ¡w×jÉ©±EFË­KiÛÃÕYvsm¬njĻª§emná}k«ŕgđ²ÙDÇ¤í¡ªOy×Où±@DñSęćăÕIÕ¿IµĥOlJÕÍRÍ|JìĻÒåyķrĕq§ÄĩsWÆßF¶X®¿mwRIÞfßoG³¾©uyHį{Ɓħ¯AFnuPÍÔzVdàôº^Ðæd´oG¤{S¬ćxã}ŧ×Kǥĩ«ÕOEÐ·ÖdÖsƘÑ¨[Û^Xr¢¼§xvÄÆµ`K§ tÒ´Cvlo¸fzŨð¾NY´ı~ÉĔēßúLÃÃ_ÈÏ|]ÂÏHlg`ben¾¢pUh~ƴĖ¶_r sĄ~cƈ]|r c~`¼{À{ȒiJjz`îÀT¥Û³]u}fïQl{skloNdjäËzDvčoQďHI¦rbrHĖ~BmlNRaĥTX\\{fÁKÁ®TLÂÄMtÊgĀDĄXƔvDcÎJbt[¤D@®hh~kt°ǾzÖ@¾ªdbYhüóV´ŮŒ¨Üc±r@J|àuYÇÔG·ĚąĐlŪÚpSJ¨ĸLvÞcPæķŨ®mÐálsgd×mQ¨ųÆ©Þ¤IÎs°KZpĄ|XwWdĎµmkǀwÌÕæhºgBĝâqÙĊzÖgņtÀÁĂÆáhEz|WzqD¹°Eŧl{ævÜcA`¤C`|´qxĲkq^³³GšµbíZ¹qpa±ď OH¦Ħx¢gPícOl_iCveaOjChß¸iÝbÛªCC¿mRV§¢A|tbkĜEÀtîm^g´fÄ"]],"encodeOffsets":[[[121722,32278],[119475,30423],[121606,33646]]]},"properties":{"cp":[117.283042,31.86119],"name":"安徽","childNum":3}},{"id":"350000","geometry":{"type":"MultiPolygon","coordinates":[["@@zht´}[","@@aj^~ĆGå","@@edHse","@@@vPGsyQ","@@sBzddW[O","@@S¨Qy","@@NVucW","@@qptB@q","@@¸[iu","@@Q\\pD[_","@@jSwUappI","@@eXª~","@@AjvFoo","@@fT_Çí\\v|ba¦jZÆy|®","@@IjLg","@@wJIx«¼AoNe{M¥","@@K±¡ÓČ~N¾","@@k¡¹Eh~c®uDqZì¡I~Māe£bN¨gZý¡a±Öcp©PhI¢QqÇGj|¥U g[Ky¬ŏv@OptÉEF\\@ åA¬V{XģĐBycpě¼³Ăp·¤¥ohqqÚ¡ŅLs^Ã¡§qlÀhH¨MCe»åÇGD¥zPO£čÙkJA¼ßėuĕeûÒiÁŧS[¡Uûŗ½ùěcÝ§SùĩąSWó«íęACµeRåǃRCÒÇZÍ¢ź±^dlstjD¸ZpuÔâÃH¾oLUêÃÔjjēò´ĄWƛ^Ñ¥Ħ@ÇòmOw¡õyJyD}¢ďÑÈġfZda©º²z£NjD°Ötj¶¬ZSÎ~¾c°¶ÐmxO¸¢Pl´SL|¥AȪĖMņĲg®áIJČĒü` QF¬h|ĂJ@zµ |ê³È ¸UÖŬŬÀCtrĸr]ðM¤ĶĲHtÏ AĬkvsq^aÎbvdfÊòSD´Z^xPsĂrvƞŀjJd×ŘÉ ®AÎ¦ĤdxĆqAZRÀMźnĊ»İÐZ YXæJyĊ²·¶q§·K@·{sXãô«lŗ¶»o½E¡­«¢±¨Y®Ø¶^AvWĶGĒĢPlzfļtàAvWYãO_¤sD§ssČġ[kƤPX¦`¶®BBvĪjv©jx[L¥àï[F¼ÍË»ğV`«Ip}ccÅĥZEãoP´B@D¸m±z«Ƴ¿å³BRØ¶Wlâþäą`]Z£Tc ĹGµ¶Hm@_©k¾xĨôȉðX«½đCIbćqK³ÁÄš¬OAwã»aLŉËĥW[ÂGIÂNxĳ¤D¢îĎÎB§°_JGs¥E@¤ućPåcuMuw¢BI¿]zG¹guĮI"]],"encodeOffsets":[[[123250,27563],[122541,27268],[123020,27189],[122916,27125],[122887,26845],[122808,26762],[122568,25912],[122778,26197],[122515,26757],[122816,26587],[123388,27005],[122450,26243],[122578,25962],[121255,25103],[120987,24903],[122339,25802],[121042,25093],[122439,26024]]]},"properties":{"cp":[119.306239,26.075302],"name":"福建","childNum":18}},{"id":"360000","geometry":{"type":"Polygon","coordinates":["@@ÖP¬ǦĪØLŨä~Ĉw«|TH£pc³Ïå¹]ĉđxe{ÎÓvOEm°BƂĨİ|Gvz½ª´HàpeJÝQxnÀW­EµàXÅĪt¨ÃĖrÄwÀFÎ|Ă¡WÕ¸cf¥XaęST±m[r«_gmQu~¥V\\OkxtL E¢Ú^~ýØkbēqoě±_Êw§Ñ²ÏƟė¼mĉŹ¿NQYBąrwģcÍ¥B­ŗÊcØiIƝĿuqtāwO]³YCñTeÉcaubÍ]trluīBÐGsĵıN£ï^ķqsq¿DūūVÕ·´Ç{éĈýÿOER_đûIċâJh­ŅıNȩĕB¦K{Tk³¡OP·wnµÏd¯}½TÍ«YiµÕsC¯iM¤­¦¯P|ÿUHvhe¥oFTuõ\\OSsMòđƇiaºćXĊĵà·çhƃ÷Ç{ígu^đgm[ÙxiIN¶Õ»lđÕwZSÆv©_ÈëJbVkĔVÀ¤P¾ºÈMÖxlò~ªÚàGĂ¢B±ÌKyñ`w²¹·`gsÙfIěxŕeykpudjuTfb·hh¿Jd[\\LáƔĨƐAĈepÀÂMD~ņªe^\\^§ý©j×cZØ¨zdÒa¶lÒJìõ`oz÷@¤uŞ¸´ôęöY¼HČƶajlÞƩ¥éZ[|h}^U  ¥pĄžƦO lt¸Æ Q\\aÆ|CnÂOjt­ĚĤdÈF`¶@Ðë ¦ōÒ¨SêvHĢÛ@[ÆQoxHW[ŰîÀt¦Ǆ~NĠ¢lĄtZoCƞÔºCxrpČNpj¢{f_Y`_eq®Aot`@oDXfkp¨|s¬\\DÄSfè©Hn¬^DhÆyøJhØxĢĀLÊƠPżċĄwĮ¶"],"encodeOffsets":[[118923,30536]]},"properties":{"cp":[115.892151,28.676493],"name":"江西","childNum":1}},{"id":"370000","geometry":{"type":"MultiPolygon","coordinates":[["@@Xjd]mE","@@itnq","@@Dl@k","@@TGw","@@K¬U","@@Wd`c","@@PtMs","@@LnXlc","@@ppVu]Qn","@@cdzAU_","@@udRhnCE","@@oIpP","@@M{ĿčwbxƨîKÎMĮ]ZF½Y]â£ph¶¨râøÀÎǨ¤^ºÄGz~grĚĜlĞÆLĆǆ¢Îo¦cvKbgr°WhmZp L]LºcUÆ­nżĤÌĒbAnrOA´ȊcÀbƦUØrĆUÜøĬƞŶǬĴóò_A̈«ªdÎÉnb²ĦhņBĖįĦåXćì@L¯´ywƕCéÃµė ƿ¸lµZæyj|BíÂKNNnoƈfÈMZwnŐNàúÄsTJULîVjǎ¾ĒØDz²XPn±ŴPè¸ŔLƔÜƺ_TüÃĤBBċÈöA´faM¨{«M`¶d¡ôÖ°mȰBÔjj´PM|c^d¤u¤Û´ä«ƢfPk¶Môl]Lb}su^ke{lCMrDÇ­]NÑFsmoõľHyGă{{çrnÓEƕZGª¹Fj¢ÿ©}ÌCǷë¡ąuhÛ¡^KxC`C\\bÅxì²ĝÝ¿_NīCȽĿåB¥¢·IŖÕy\\¹kxÃ£ČáKµË¤ÁçFQ¡KtŵƋ]CgÏAùSedcÚźuYfyMmhUWpSyGwMPqŀÁ¼zK¶G­Y§Ë@´śÇµƕBm@IogZ¯uTMx}CVKï{éƵP_K«pÛÙqċtkkù]gTğwoɁsMõ³ăAN£MRkmEÊčÛbMjÝGuIZGPģãħE[iµBEuDPÔ~ª¼ęt]ûG§¡QMsğNPŏįzs£Ug{đJĿļā³]ç«Qr~¥CƎÑ^n¶ÆéÎR~Ż¸YI] PumŝrƿIā[xeÇ³L¯v¯s¬ÁY~}ťuŁgƋpÝĄ_ņī¶ÏSR´ÁP~¿Cyċßdwk´SsX|t`Ä ÈðAªìÎT°¦Dda^lĎDĶÚY°`ĪŴǒàŠv\\ebZHŖR¬ŢƱùęOÑM­³FÛaj"]],"encodeOffsets":[[[123806,39303],[123821,39266],[123742,39256],[123702,39203],[123649,39066],[123847,38933],[123580,38839],[123894,37288],[123043,36624],[123344,38676],[123522,38857],[123628,38858],[118267,36772]]]},"properties":{"cp":[117.000923,36.675807],"name":"山东","childNum":13}},{"id":"410000","geometry":{"type":"MultiPolygon","coordinates":[["@@dXD}~Hgq~ÔN~zkĘHVsǲßjŬŢ`Pûàl¢\\ÀEhİgÞē X¼`khÍLùµP³swIÓzeŠĠð´E®ÚPtºIŊÊºL«šŕQGYfa[şußǑĩų_Z¯ĵÙčC]kbc¥CS¯ëÍB©ïÇÃ_{sWTt³xlàcČzÀD}ÂOQ³ÐTĬµƑÐ¿ŸghłŦv~}ÂZ«¤lPÇ£ªÝŴÅR§ØnhctâknÏ­ľŹUÓÝdKuķI§oTũÙďkęĆH¸Ó\\Ä¿PcnS{wBIvÉĽ[GqµuŇôYgûZca©@½Õǽys¯}lgg@­C\\£asIdÍuCQñ[L±ęk·ţb¨©kK»KC²òGKmĨS`UQnk}AGēsqaJ¥ĐGRĎpCuÌy ã iMcplk|tRkðev~^´¦ÜSí¿_iyjI|ȑ|¿_»d}q^{Ƈdă}tqµ`ŷé£©V¡om½ZÙÏÁRD|JOÈpÀRsI{ùÓjuµ{t}uËRivGçJFjµåkWê´MÂHewixGw½Yŷpµú³XU½ġyłåkÚwZX·l¢Á¢KzOÎÎjc¼htoDHr|­J½}JZ_¯iPq{tę½ĕ¦Zpĵø«kQĹ¤]MÛfaQpě±ǽ¾]u­Fu÷nčÄ¯ADp}AjmcEÇaª³o³ÆÍSƇĈÙDIzçñİ^KNiÞñ[aA²zzÌ÷D|[íÄ³gfÕÞd®|`Ć~oĠƑô³ŊD×°¯CsøÂ«ìUMhTº¨¸ǝêWÔDruÂÇZ£ĆPZW~ØØv¬gèÂÒw¦X¤Ā´oŬ¬²Ês~]®tªapŎJ¨Öº_ŔfŐ\\Đ\\Ĝu~m²Ƹ¸fWĦrƔ}Î^gjdfÔ¡J}\\n C¦þWxªJRÔŠu¬ĨĨmFdM{\\d\\YÊ¢ú@@¦ª²SÜsC}fNècbpRmlØ^gd¢aÒ¢CZZxvÆ¶N¿¢T@uC¬^ĊðÄn|lIlXhun[","@@hzUq"]],"encodeOffsets":[[[116744,37216],[116480,33048]]]},"properties":{"cp":[113.665412,34.757975],"name":"河南","childNum":2}},{"id":"420000","geometry":{"type":"MultiPolygon","coordinates":[["@@ASd","@@ls{d","@@¾«}{ra®pîÃ\\{øCËyyB±b\\òÝjKL ]ĎĽÌJyÚCƈćÎT´Å´pb©ÈdFin~BCo°BĎÃømv®E^vǾ½Ĝ²RobÜeN^ĺ£R¬lĶ÷YoĖ¥Ě¾|sOr°jY`~I¾®I{GqpCgyl{£ÍÍyPLÂ¡¡¸kWxYlÙæŁĢz¾V´W¶ùŸo¾ZHxjwfxGNÁ³Xéæl¶EièIH ujÌQ~v|sv¶Ôi|ú¢FhQsğ¦SiŠBgÐE^ÁÐ{čnOÂÈUÎóĔÊēĲ}Z³½Mŧïeyp·uk³DsÑ¨L¶_ÅuÃ¨w»¡WqÜ]\\Ò§tƗcÕ¸ÕFÏǝĉăxŻČƟOKÉġÿ×wg÷IÅzCg]m«ªGeçÃTC«[t§{loWeC@ps_Bp­rf_``Z|ei¡oċMqow¹DƝÓDYpûsYkıǃ}s¥ç³[§cY§HK«Qy]¢wwö¸ïx¼ņ¾Xv®ÇÀµRĠÐHM±cÏdƒǍũȅȷ±DSyúĝ£ŤĀàtÖÿï[îb\\}pĭÉI±Ñy¿³x¯No|¹HÏÛmjúË~TuęjCöAwě¬Rđl¯ Ñb­ŇTĿ_[IčĄʿnM¦ğ\\É[T·k¹©oĕ@A¾wya¥Y\\¥Âaz¯ãÁ¡k¥ne£ÛwE©Êō¶˓uoj_U¡cF¹­[WvP©whuÕyBF`RqJUw\\i¡{jEPïÿ½fćQÑÀQ{°fLÔ~wXgītêÝ¾ĺHd³fJd]HJ²EoU¥HhwQsƐ»Xmg±çve]DmÍPoCc¾_hhøYrŊU¶eD°Č_N~øĹĚ·`z]Äþp¼äÌQv\\rCé¾TnkžŐÚÜa¼ÝƆĢ¶ÛodĔňÐ¢JqPb ¾|J¾fXƐîĨ_Z¯À}úƲN_ĒÄ^ĈaŐyp»CÇÄKñL³ġM²wrIÒŭxjb[n«øæà ^²­h¯ÚŐªÞ¸Y²ĒVø}Ā^İ´LÚm¥ÀJÞ{JVųÞŃx×sxxƈē ģMřÚðòIfĊŒ\\Ʈ±ŒdÊ§ĘDvČ_Àæ~Dċ´A®µ¨ØLV¦êHÒ¤"]],"encodeOffsets":[[[113712,34000],[115612,30507],[113649,34054]]]},"properties":{"cp":[114.298572,30.584355],"name":"湖北","childNum":3}},{"id":"430000","geometry":{"type":"MultiPolygon","coordinates":[["@@nFZw","@@ãÆá½ÔXrCOËRïÿĩ­TooQyÓ[ŅBE¬ÎÓXaį§Ã¸G °ITxpúxÚĳ¥ÏĢ¾edÄ©ĸGàGhM¤Â_U}Ċ}¢pczfþg¤ÇôAV","@@ȴÚĖÁĐiOĜ«BxDõĚivSÌ}iùÜnÐºG{p°M°yÂÒzJ²Ì ÂcXëöüiáÿñőĞ¤ùTz²CȆȸǎŪƑÐc°dPÎğË¶[È½u¯½WM¡­ÉB·rínZÒ `¨GA¾\\pēXhÃRC­üWGġuTé§ŎÑ©êLM³}_EÇģc®ęisÁPDmÅ{b[RÅs·kPŽƥóRoOV~]{g\\êYƪ¦kÝbiċƵGZ»Ěõó·³vŝ£ø@pyö_ëIkÑµbcÑ§y×dYØªiþUjŅ³C}ÁN»hĻħƏâƓKA·³CQ±µ§¿AUƑ¹AtćOwD]JUÖgk¯b£ylZFËÑ±H­}EbóľA¡»Ku¦·³åş¥ùBD^{ÌC´­¦ŷJ£^[ª¿ğ|ƅN skóā¹¿ï]ă~÷O§­@Vm¡Qđ¦¢Ĥ{ºjÔª¥nf´~Õo×ÛąGû¥cÑ[Z¶ŨĪ²SÊǔƐƀAÚŌ¦QØ¼rŭ­«}NÏürÊ¬mjr@ĘrTW ­SsdHzƓ^ÇÂyUi¯DÅYlŹu{hT}mĉ¹¥ěDÿë©ıÓ[Oº£¥ótł¹MÕƪ`PDiÛU¾ÅâìUñBÈ£ýhedy¡oċ`pfmjP~kZaZsÐd°wj§@Ĵ®w~^kÀÅKvNmX\\¨aŃqvíó¿F¤¡@ũÑVw}S@j}¾«pĂrªg àÀ²NJ¶¶DôK|^ª°LX¾ŴäPĪ±£EXd^¶ĲÞÜ~u¸ǔMRhsRe`ÄofIÔ\\Ø  ićymnú¨cj ¢»GČìƊÿÐ¨XeĈĀ¾Oð Fi ¢|[jVxrIQ_EzAN¦zLU`cªxOTu RLÄªpUĪȴ^ŎµªÉFxÜf¤ºgĲèy°Áb[¦Zb¦z½xBĖ@ªpºjS´rVźOd©ʪiĎăJP`"]],"encodeOffsets":[[[115640,30489],[112577,27316],[114113,30649]]]},"properties":{"cp":[112.982279,28.19409],"name":"湖南","childNum":3}},{"id":"440000","geometry":{"type":"MultiPolygon","coordinates":[["@@QdAsa","@@lxDRm","@@sbhNLo","@@Ă ý","@@WltOY[","@@Kr]S","@@e~AS}","@@I|Mym","@@Û³LS²Q","@@nvºBë¥cÕº","@@zdÛJm","@@°³","@@a yAª¸ËJIxØ@ĀHÉÕZofoo","@@sŗÃÔėAƁZÄ ~°ČPºb","@@¶ÝÌvmĞh¹Ĺ","@@HdSjĒ¢D}waru«ZqadY{K","@@el\\LqqO","@@~rMmX","@@f^E","@@øPªoj÷ÍÝħXČx°Q¨ıXJp","@@gÇƳmxatfu","@@EÆC½","@@¸B_¶ekWvSivc}p}Ăº¾NĎyj¦Èm th_®Ä}»âUzLË²Aā¡ßH©Ùñ}wkNÕ¹ÇO½¿£ēUlaUìIÇª`uTÅxYĒÖ¼kÖµMjJÚwn\\hĒv]îh|ÈƄøèg¸Ķß ĉĈWb¹ƀdéĘNTtP[öSvrCZaGubo´ŖÒÇĐ~¡zCIözx¢PnÈñ @ĥÒ¦]ƜX³ăĔñiiÄÓVépKG½ÄÓávYoC·sitiaÀyŧÎ¡ÈYDÑům}ý|m[węõĉZÅxUO}÷N¹³ĉo_qtăqwµŁYÙǝŕ¹tïÛUÃ¯mRCºĭ|µÕÊK½Rē ó]GªęAxNqSF|ām¡diď×YïYWªŉOeÚtĐ«zđ¹TāúEáÎÁWwíHcòßÎſ¿Çdğ·ùT×Çūʄ¡XgWÀǇğ·¿ÃOj YÇ÷Sğ³kzőõmĝ[³¡VÙæÅöMÌ³¹pÁaËýý©D©ÜJŹƕģGą¤{ÙūÇO²«BƱéAÒĥ¡«BhlmtÃPµyU¯ucd·w_bŝcīímGOGBȅŹãĻFŷŽŕ@Óoo¿ē±ß}}ÓF÷tĲWÈCőâUâǙIğŉ©IĳE×Á³AĥDĈ±ÌÜÓĨ£L]ĈÙƺZǾĆĖMĸĤfÎĵlŨnÈĐtFFĤêk¶^k°f¶g}®Faf`vXŲxl¦ÔÁ²¬Ð¦pqÊÌ²iXØRDÎ}Ä@ZĠsx®AR~®ETtĄZƈfŠŠHâÒÐAµ\\S¸^wĖkRzalŜ|E¨ÈNĀňZTpBh£\\ĎƀuXĖtKL¶G|»ĺEļĞ~ÜĢÛĊrOÙîvd]n¬VÊĜ°RÖpMƀ¬HbwEÀ©\\¤]ŸI®¥D³|Ë]CúAŠ¦æ´¥¸Lv¼¢ĽBaôF~®²GÌÒEYzk¤°ahlVÕI^CxĈPsBƒºVÀB¶¨R²´D","@@OR"]],"encodeOffsets":[[[117381,22988],[116552,22934],[116790,22617],[116973,22545],[116444,22536],[116931,22515],[116496,22490],[116453,22449],[113301,21439],[118726,21604],[118709,21486],[113210,20816],[115482,22082],[113171,21585],[113199,21590],[115232,22102],[115739,22373],[115134,22184],[113056,21175],[119573,21271],[119957,24020],[115859,22356],[116680,26053],[116561,22649]]]},"properties":{"cp":[113.280637,23.125178],"name":"广东","childNum":24}},{"id":"450000","geometry":{"type":"MultiPolygon","coordinates":[["@@H TI¡U","@@Ɣ_LÊFZgčP­kini«qÇczÍY®¬Ů»qR×ō©DÕ§ƙǃŵTÉĩ±ıdÑnYYĲvNĆĆØÜ Öp}e³¦m©iÓ|¹ħņ|ª¦QF¢Â¬ʖovg¿em^ucäāmÇÖåB¡Õçĝ}FĻ¼Ĺ{µHKsLSđƃrč¤[AgoSŇYMÿ§Ç{FśbkylQxĕ]T·¶[BÑÏGáşşƇeăYSs­FQ}­BwtYğÃ@~CÍQ ×WjË±rÉ¥oÏ ±«ÓÂ¥kwWűue_b­E~µh¯ecl¯Ïr¯EģJğ}w³Ƈē`ãògK_ÛsUʝćğ¶höO¤Ǜn³c`¡yię[ďĵűMę§]XÎ_íÛ]éÛUćİÕBƣ±dy¹T^dûÅÑŦ·PĻþÙ`K¦¢ÍeĥR¿³£[~äu¼dltW¸oRM¢ď\\z}Æzdvň{ÎXF¶°Â_ÒÂÏL©ÖTmu¼ãlīkiqéfA·Êµ\\őDc¥ÝFyÔćcűH_hLÜêĺĐ¨c}rn`½Ì@¸¶ªVLhŒ\\Ţĺk~Ġið°|gtTĭĸ^xvKVGréAébUuMJVÃO¡qĂXËSģãlýà_juYÛÒBG^éÖ¶§EGÅzěƯ¤EkN[kdåucé¬dnYpAyČ{`]þ±X\\ÞÈk¡ĬjàhÂƄ¢Hè ŔâªLĒ^Öm¶ħĊAǦė¸zÚGn£¾rªŀÜt¬@ÖÚSx~øOŒŶÐÂæȠ\\ÈÜObĖw^oÞLf¬°bI lTØBÌF£Ć¹gñĤaYt¿¤VSñK¸¤nM¼JE±½¸ñoÜCƆæĪ^ĚQÖ¦^f´QüÜÊz¯lzUĺš@ìp¶n]sxtx¶@~ÒĂJb©gk{°~c°`Ô¬rV\\la¼¤ôá`¯¹LCÆbxEræOv[H­[~|aB£ÖsºdAĐzNÂðsÞÆĤªbab`ho¡³F«èVZs\\\\ÔRzpp®SĪº¨ÖºNĳd`a¦¤F³¢@`¢ĨĀìhYvlĆº¦Ċ~nS|gźv^kGÆÀè·"]],"encodeOffsets":[[[111707,21520],[113706,26955]]]},"properties":{"cp":[108.320004,22.82402],"name":"广西","childNum":2}},{"id":"460000","geometry":{"type":"Polygon","coordinates":["@@¦Ŝil¢XƦƞòïè§ŞCêɕrŧůÇąĻõ·ĉ³œ̅kÇm@ċȧŧĥĽʉ­ƅſȓÒË¦ŝE}ºƑ[ÍĜȋ gÎfǐÏĤ¨êƺ\\Ɔ¸ĠĎvʄȀÐ¾jNðĀÒRZǆzÐĊ¢DÀɘZ"],"encodeOffsets":[[112750,20508]]},"properties":{"cp":[110.33119,20.031971],"name":"海南","childNum":1}},{"id":"510000","geometry":{"type":"MultiPolygon","coordinates":[["@@LqSn","@@ĆOìÛÐ@ĞǔNY{¤Á§di´ezÝúØãwIþËQÇ¦ÃqÉSJ»ĂéʔõÔƁİlƞ¹§ĬqtÀƄmÀêErĒtD®ċæcQE®³^ĭ¥©l}äQtoŖÜqÆkµªÔĻĴ¡@Ċ°B²Èw^^RsºTĀ£ŚæQPJvÄz^Đ¹Æ¯fLà´GC²dt­ĀRt¼¤ĦOðğfÔðDŨŁĞƘïPÈ®âbMüÀXZ ¸£@Å»»QÉ­]dsÖ×_Í_ÌêŮPrĔĐÕGĂeZÜîĘqBhtO ¤tE[h|YÔZśÎs´xº±Uñt|OĩĠºNbgþJy^dÂY Į]Řz¦gC³R`Āz¢Aj¸CL¤RÆ»@­Ŏk\\Ç´£YW}z@Z}Ã¶oû¶]´^NÒ}èNªPÍy¹`S°´ATeVamdUĐwʄvĮÕ\\uÆŗ¨Yp¹àZÂmWh{á}WØǍÉüwga§ßAYrÅÂQĀÕ¬LŐý®Xøxª½Ű¦¦[þ`ÜUÖ´òrÙŠ°²ÄkĳnDX{U~ET{ļº¦PZcjF²Ė@pg¨B{u¨ŦyhoÚD®¯¢ WòàFÎ¤¨GDäz¦kŮPġqË¥À]eâÚ´ªKxīPÖ|æ[xÃ¤JÞĥsNÖ½I¬nĨY´®ÐƐmDŝuäđđEbee_v¡}ìęǊē}qÉåT¯µRs¡M@}ůaa­¯wvƉåZw\\Z{åû`[±oiJDÅ¦]ĕãïrG réÏ·~ąSfy×Í·ºſƽĵȁŗūmHQ¡Y¡®ÁÃ×t«­T¤JJJyJÈ`Ohß¦¡uËhIyCjmÿwZGTiSsOB²fNmsPa{M{õE^Hj}gYpaeu¯oáwHjÁ½M¡pMuåmni{fk\\oÎqCwEZ¼KĝAy{m÷LwO×SimRI¯rKõBS«sFe]fµ¢óY_ÆPRcue°Cbo×bd£ŌIHgtrnyPt¦foaXďxlBowz_{ÊéWiêEGhÜ¸ºuFĈIxf®Y½ĀǙ]¤EyF²ċw¸¿@g¢§RGv»áW`ÃĵJwi]t¥wO­½a[×]`Ãi­üL¦LabbTÀåc}ÍhÆh®BHî|îºÉk­¤Sy£ia©taį·Ɖ`ō¥UhOĝLk}©Fos´JmµlŁuønÑJWÎªYÀïAetTŅÓGË«bo{ıwodƟ½OġÜÂµxàNÖ¾P²§HKv¾]|BÆåoZ`¡Ø`ÀmºĠ~ÌÐ§nÇ¿¤]wğ@srğu~Io[é±¹ ¿ſđÓ@qg¹zƱřaí°KtÇ¤V»Ã[ĩǭƑ^ÇÓ@áťsZÏÅĭƋěpwDóÖáŻneQËq·GCœýS]x·ýq³OÕ¶Qzßti{řáÍÇWŝŭñzÇWpç¿JXĩè½cFÂLiVjx}\\NŇĖ¥GeJA¼ÄHfÈu~¸Æ«dE³ÉMA|bÒćhG¬CMõƤąAvüVéŀ_VÌ³ĐwQj´·ZeÈÁ¨X´Æ¡Qu·»ÕZ³ġqDoy`L¬gdp°şp¦ėìÅĮZ°Iähzĵf²å ĚÑKpIN|Ñz]ń·FU×é»R³MÉ»GM«kiér}Ã`¹ăÞmÈnÁîRǀ³ĜoİzŔwǶVÚ£À]ɜ»ĆlƂ²ĠþTº·àUȞÏʦ¶I«dĽĢdĬ¿»Ĕ×h\\c¬ä²GêëĤł¥ÀǿżÃÆMº}BÕĢyFVvwxBèĻĒ©Ĉt@Ğû¸£B¯¨ˋäßkķ½ªôNÔ~t¼Ŵu^s¼{TA¼ø°¢İªDè¾Ň¶ÝJ®Z´ğ~Sn|ªWÚ©òzPOȸbð¢|øĞA"]],"encodeOffsets":[[[108815,30935],[100197,35028]]]},"properties":{"cp":[104.065735,30.659462],"name":"四川","childNum":2}},{"id":"520000","geometry":{"type":"MultiPolygon","coordinates":[["@@G\\lY£cj","@@q|mc¯vÏV","@@hÑ£IsNgßHHªķÃh_¹¡ĝÄ§ń¦uÙùgS¯JH|sÝÅtÁïyMDč»eÕtA¤{b\\}G®u\\åPFqwÅaDK°ºâ_£ùbµmÁÛĹM[q|hlaªāI}Ñµ@swtwm^oµDéĽŠyVky°ÉûÛR³e¥]RÕěħ[ƅåÛDpJiVÂF²I»mN·£LbÒYbWsÀbpkiTZĄă¶Hq`ĥ_J¯ae«KpÝx]aĕÛPÇȟ[ÁåŵÏő÷Pw}TÙ@Õs«ĿÛq©½m¤ÙH·yǥĘĉBµĨÕnđ]K©œáGçş§ÕßgǗĦTèƤƺ{¶ÉHÎd¾ŚÊ·OÐjXWrãLyzÉAL¾ę¢bĶėy_qMĔąro¼hĊw¶øV¤w²Ĉ]ÊKx|`ź¦ÂÈdrcÈbe¸`I¼čTF´¼Óýȃr¹ÍJ©k_șl³´_pĐ`oÒh¶pa^ÓĔ}D»^Xy`d[KvJPhèhCrĂĚÂ^Êƌ wZL­Ġ£ÁbrzOIlMMĪŐžËr×ÎeŦtw|¢mKjSǘňĂStÎŦEtqFT¾Eì¬¬ôxÌO¢ K³ŀºäYPVgŎ¦ŊmŞ¼VZwVlz¤£Tl®ctĽÚó{G­AÇge~Îd¿æaSba¥KKûj®_Ä^\\Ø¾bP®¦x^sxjĶI_Ä Xâ¼Hu¨Qh¡À@Ëô}±GNìĎlT¸`V~R°tbÕĊ`¸úÛtÏFDu[MfqGH·¥yAztMFe|R_GkChZeÚ°tov`xbDnÐ{E}ZèxNEÞREn[Pv@{~rĆAB§EO¿|UZ~ìUf¨J²ĂÝÆsªB`s¶fvö¦Õ~dÔq¨¸º»uù[[§´sb¤¢zþF¢ÆÀhÂW\\ıËIÝo±ĭŠ£þÊs}¡R]ěDg´VG¢j±®èºÃmpU[Áëº°rÜbNu¸}º¼`niºÔXĄ¤¼ÔdaµÁ_ÃftQQgR·Ǔv}Ý×ĵ]µWc¤F²OĩųãW½¯K©]{LóµCIµ±Mß¿h©āq¬o½~@i~TUxð´Đhw­ÀEîôuĶb[§nWuMÆJl½]vuıµb"]],"encodeOffsets":[[[112158,27383],[112105,27474],[112095,27476]]]},"properties":{"cp":[106.713478,26.578343],"name":"贵州","childNum":3}},{"id":"530000","geometry":{"type":"Polygon","coordinates":["@@[ùx½}ÑRHYīĺûsÍniEoã½Ya²ė{c¬ĝgĂsAØÅwďõzFjw}«Dx¿}Uũlê@HÅ­F¨ÇoJ´Ónũuą¡Ã¢pÒÅØ TF²xa²ËXcÊlHîAßËŁkŻƑŷÉ©hW­æßUËs¡¦}teèÆ¶StÇÇ}Fd£jĈZĆÆ¤Tč\\D}O÷£U§~ŃGåŃDĝ¸Tsd¶¶Bª¤u¢ŌĎo~t¾ÍŶÒtD¦ÚiôözØX²ghįh½Û±¯ÿm·zR¦Ɵ`ªŊÃh¢rOÔ´£Ym¼èêf¯ŪĽncÚbw\\zlvWªâ ¦gmĿBĹ£¢ƹřbĥkǫßeeZkÙIKueT»sVesbaĕ  ¶®dNĄÄpªy¼³BE®lGŭCǶwêżĔÂepÍÀQƞpC¼ŲÈ­AÎô¶RäQ^Øu¬°_Èôc´¹ò¨PÎ¢hlĎ¦´ĦÆ´sâÇŲPnÊD^¯°Upv}®BPÌªjǬxSöwlfòªvqĸ|`H­viļndĜ­Ćhňem·FyÞqóSį¯³X_ĞçêtryvL¤§z¦c¦¥jnŞklD¤øz½ĜàĂŧMÅ|áƆàÊcðÂFÜáŢ¥\\\\ºİøÒÐJĴîD¦zK²ǏÎEh~CD­hMn^ÌöÄ©ČZÀaüfɭyœpį´ěFűk]Ôě¢qlÅĆÙa¶~ÄqêljN¬¼HÊNQ´ê¼VØ¸E^ŃÒyM{JLoÒęæe±Ķygã¯JYÆĭĘëo¥Šo¯hcK«z_prC´ĢÖY¼ v¸¢RÅW³Â§fÇ¸Yi³xR´ďUË`êĿUûuĆBƣöNDH«ĈgÑaB{ÊNF´¬c·Åv}eÇÃGB»If¦HňĕM~[iwjUÁKE¾dĪçWIèÀoÈXòyŞŮÈXâÎŚj|àsRyµÖPr´þ ¸^wþTDŔHr¸RÌmfżÕâCôoxĜƌÆĮÐYtâŦÔ@]ÈǮƒ\\Ī¼Ä£UsÈ¯LbîƲŚºyhr@ĒÔƀÀ²º\\êpJ}ĠvqtĠ@^xÀ£È¨mËÏğ}n¹_¿¢×Y_æpÅA^{½Lu¨GO±Õ½ßM¶wÁĢÛPƢ¼pcĲx|apÌ¬HÐŊSfsðBZ¿©XÏÒKk÷Eû¿SrEFsÕūkóVǥŉiTL¡n{uxţÏhôŝ¬ğōNNJkyPaqÂğ¤K®YxÉƋÁ]āęDqçgOgILu\\_gz]W¼~CÔē]bµogpÑ_oď`´³Țkl`IªºÎȄqÔþ»E³ĎSJ»_f·adÇqÇc¥Á_Źw{L^É±ćxU£µ÷xgĉp»ĆqNē`rĘzaĵĚ¡K½ÊBzyäKXqiWPÏÉ¸½řÍcÊG|µƕƣGË÷k°_^ý|_zċBZocmø¯hhcæ\\lMFlư£ĜÆyHF¨µêÕ]HAàÓ^it `þßäkĤÎT~Wlÿ¨ÔPzUCNVv [jâôDôď[}z¿msSh¯{jïğl}šĹ[őgK©U·µË@¾m_~q¡f¹ÅË^»f³ø}Q¡ÖË³gÍ±^Ç\\ëÃA_¿bWÏ[¶ƛé£F{īZgm@|kHǭƁć¦UĔť×ëǟeċ¼ȡȘÏíBÉ£āĘPªĳ¶ŉÿy©nď£G¹¡I±LÉĺÑdĉÜW¥}gÁ{aqÃ¥aıęÏZÁ`"],"encodeOffsets":[[104636,22969]]},"properties":{"cp":[102.712251,25.040609],"name":"云南","childNum":1}},{"id":"540000","geometry":{"type":"Polygon","coordinates":["@@ÂhľxŖxÒVºÅâAĪÝȆµę¯Ňa±r_w~uSÕňqOj]ɄQ£ZUDûoY»©M[L¼qãË{VÍçWVi]ë©Ä÷àyƛhÚU°adcQ~Mx¥caÛcSyFÖk­uRýq¿ÔµQĽ³aG{¿FµëªéĜÿª@¬·K·àariĕĀ«V»ŶĴūgèLǴŇƶaftèBŚ£^âǐÝ®M¦ÁǞÿ¬LhJ¾óƾÆºcxwf]Y´¦|QLn°adĊ\\¨oǀÍŎ´ĩĀd`tÊQŞŕ|¨C^©Ĉ¦¦ÎJĊ{ëĎjª²rÐl`¼Ą[t|¦Stè¾PÜK¸dƄı]s¤î_v¹ÎVòŦj£Əsc¬_Ğ´|Ł¦Av¦w`ăaÝaa­¢e¤ı²©ªSªÈMĄwÉØŔì@T¤Ę\\õª@þo´­xA sÂtŎKzó²ÇČµ¢r^nĊ­Æ¬×üG¢³ {âĊ]G~bÀgVjzlhǶfOfdªB]pjTOtĊn¤}®¦Č¥d¢¼»ddY¼t¢eȤJ¤}Ǿ¡°§¤AÐlc@ĝsªćļđAçwxUuzEÖġ~AN¹ÄÅȀŻ¦¿ģŁéì±Hãd«g[Ø¼ēÀcīľġ¬cJµÐʥVȝ¸ßS¹ý±ğkƁ¼ą^ɛ¤Ûÿb[}¬ōõÃ]ËNm®g@Bg}ÍF±ǐyL¥íCIĳÏ÷Ñį[¹¦[âšEÛïÁÉdƅß{âNÆāŨß¾ě÷yC£k­´ÓH@Â¹TZ¥¢į·ÌAÐ§®Zcv½Z­¹|ÅWZqgW|ieZÅYVÓqdqbc²R@c¥Rã»GeeƃīQ}J[ÒK¬Ə|oėjġĠÑN¡ð¯EBčnwôɍėª²CλŹġǝʅįĭạ̃ūȹ]ΓͧgšsgȽóϧµǛęgſ¶ҍć`ĘąŌJÞä¤rÅň¥ÖÁUětęuůÞiĊÄÀ\\Æs¦ÓRb|Â^řÌkÄŷ¶½÷f±iMÝ@ĥ°G¬ÃM¥n£Øąğ¯ß§aëbéüÑOčk£{\\eµª×MÉfm«Ƒ{Å×Gŏǩãy³©WÑăû··Qòı}¯ãIéÕÂZ¨īès¶ZÈsæĔTŘvgÌsN@îá¾ó@ÙwU±ÉTå»£TđWxq¹Zobs[×¯cĩvėŧ³BM|¹kªħ¥TzNYnÝßpęrñĠĉRS~½ěVVµõ«M££µBĉ¥áºae~³AuĐh`Ü³ç@BÛïĿa©|z²Ý¼D£àč²ŸIûI āóK¥}rÝ_Á´éMaň¨~ªSĈ½½KÙóĿeƃÆB·¬ën×W|Uº}LJrƳlŒµ`bÔ`QÐÓ@s¬ñIÍ@ûws¡åQÑßÁ`ŋĴ{ĪTÚÅTSÄ³Yo|Ç[Ç¾µMW¢ĭiÕØ¿@MhpÕ]jéò¿OƇĆƇpêĉâlØwěsǩĵ¸cbU¹ř¨WavquSMzeo_^gsÏ·¥Ó@~¯¿RiīB\\qTGªÇĜçPoÿfñòą¦óQīÈáPābß{ZŗĸIæÅhnszÁCËìñÏ·ąĚÝUm®ó­L·ăUÈíoù´Êj°ŁŤ_uµ^°ìÇ@tĶĒ¡ÆM³Ģ«İĨÅ®ğRāðggheÆ¢zÊ©Ô\\°ÝĎz~ź¤PnMĪÖB£kné§żćĆKĒ°¼L¶èâz¨u¦¥LDĘz¬ýÎmĘd¾ßFzhg²Fy¦ĝ¤ċņbÎ@yĄæm°NĮZRÖíJ²öLĸÒ¨Y®ƌÐVàtt_ÚÂyĠz]ŢhzĎ{ÂĢXc|ÐqfO¢¤ögÌHNPKŖUú´xx[xvĐCûĀìÖT¬¸^}Ìsòd´_KgžLĴÀBon|H@Êx¦BpŰŌ¿fµƌA¾zǈRx¶FkĄźRzŀ~¶[´HnªVƞuĒ­È¨ƎcƽÌm¸ÁÈM¦x͊ëÀxǆBú^´W£dkɾĬpw˂ØɦļĬIŚÊnŔa¸~J°îlɌxĤÊÈðhÌ®gT´øàCÀ^ªerrƘd¢İP|Ė ŸWªĦ^¶´ÂLaT±üWƜǀRÂŶUńĖ[QhlLüAÜ\\qRĄ©"],"encodeOffsets":[[90849,37210]]},"properties":{"cp":[91.132212,29.660361],"name":"西藏","childNum":1}},{"id":"610000","geometry":{"type":"Polygon","coordinates":["@@¸ÂW¢xR­Fq§uF@N¢XLRMº[ğȣſï|¥Jkc`sŉǷ£Y³WN«ùMëï³ÛIg÷±mTșÚÒķø©þ¥yÓğęmWµÎumZyOŅƟĥÓ~sÑL¤µaÅY¦ocyZ{y c]{Ta©`U_Ěē£ωÊƍKùK¶ȱÝƷ§{û»ÅÁȹÍéuĳ|¹cÑdìUYOuFÕÈYvÁCqÓTǢí§·S¹NgV¬ë÷Át°DØ¯C´ŉƒópģ}ąiEËFéGU¥×K§­¶³BČ}C¿åċ`wġB·¤őcƭ²ő[Å^axwQOñJÙïŚĤNĔwƇÄńwĪ­o[_KÓª³ÙnKÇěÿ]ďă_d©·©Ýŏ°Ù®g]±ß×¥¬÷m\\iaǑkěX{¢|ZKlçhLtŇîŵœè[É@ƉĄEtƇÏ³­ħZ«mJ×¾MtÝĦ£IwÄå\\Õ{OwĬ©LÙ³ÙTª¿^¦rÌĢŭO¥lãyC§HÍ£ßEñX¡­°ÙCgpťzb`wIvA|¥hoĕ@E±iYd¥OÿµÇvPW|mCĴŜǂÒW¶¸AĜh^Wx{@¬­F¸¡ķn£P|ªĴ@^ĠĈæbÔc¶lYi^MicĎ°Â[ävï¶gv@ÀĬ·lJ¸sn|¼u~a]ÆÈtŌºJpþ£KKf~¦UbyäIĺãnÔ¿^­ŵMThĠÜ¤ko¼Ŏìąǜh`[tRd²Ĳ_XPrɲlXiL§à¹H°Ȧqº®QCbAŌJ¸ĕÚ³ĺ§ `d¨YjiZvRĺ±öVKkjGȊÄePĞZmļKÀ[`ösìhïÎoĬdtKÞ{¬èÒÒBÔpĲÇĬJŊ¦±J«[©ārHµàåVKe§|P²ÇÓ·vUzgnN¾yI@oHĆÛķhxen¡QQ±ƝJǖRbzy¸ËÐl¼EºpĤ¼x¼½~Ğà@ÚüdK^mÌSjp²ȮµûGĦ}Ħðǚ¶òƄjɂz°{ºØkÈęâ¦jªBg\\ċ°s¬]jú EȌǆ¬stRÆdĠİwÜ¸ôW¾ƮłÒ_{Ìû¼jº¹¢GǪÒ¯ĘZ`ºŊecņą~BÂgzpâēòYƲȐĎ"],"encodeOffsets":[[113634,40474]]},"properties":{"cp":[108.948024,34.263161],"name":"陕西","childNum":1}},{"id":"620000","geometry":{"type":"MultiPolygon","coordinates":[["@@Vu_^","@@ųEĠtt~nkh`Q¦ÅÄÜdwAb×ĠąJ¤DüègĺqBqj°lI¡Ĩ¶ĖIHdjÎB°aZ¢KJO[|A£Dx}NĂ¬HUnrk kp¼Y kMJn[aGáÚÏ[½rc}aQxOgsPMnUsncZsKúvAtÞġ£®ĀYKdnFw¢JE°Latf`¼h¬we|Æbj}GA·~W`¢MC¤tL©Ĳ°qdfObÞĬ¹ttu`^ZúE`[@Æsîz®¡CƳƜG²R¢RmfwĸgÜą G@pzJM½mhVy¸uÈÔO±¨{LfæU¶ßGĂq\\ª¬²I¥IŉÈīoıÓÑAçÑ|«LÝcspīðÍgtë_õ\\ĉñLYnĝgRǡÁiHLlõUĹ²uQjYi§Z_c¨´ĹĖÙ·ŋIaBD­R¹ȥr¯GºßK¨jWkɱOqWĳ\\a­Q\\sg_ĆǛōëp»£lğÛgSŶN®À]ÓämĹãJaz¥V}Le¤Lýo¹IsŋÅÇ^bz³tmEÁ´a¹cčecÇNĊãÁ\\č¯dNj]jZµkÓdaćå]ğĳ@ ©O{¤ĸm¢E·®«|@Xwg]Aģ±¯XǁÑǳªcwQÚŝñsÕ³ÛV_ý¥\\ů¥©¾÷w©WÕÊĩhÿÖÁRo¸V¬âDb¨hûxÊ×ǌ~Zâg|XÁnßYoº§ZÅŘv[ĭÖʃuďxcVbnUSfB¯³_TzºÎO©çMÑ~M³]µ^püµÄY~y@X~¤Z³[Èōl@®Å¼£QK·Di¡ByÿQ_´D¥hŗy^ĭÁZ]cIzýah¹MĪğPs{ò²Vw¹t³ŜË[Ñ}X\\gsF£sPAgěp×ëfYHāďÖqēŭOÏëdLü\\it^c®RÊº¶¢H°mrY£B¹čIoľu¶uI]vģSQ{UŻÅ}QÂ|Ì°ƅ¤ĩŪU ęĄÌZÒ\\v²PĔ»ƢNHĂyAmƂwVm`]ÈbH`Ì¢²ILvĜH®¤Dlt_¢JJÄämèÔDëþgºƫaʎÌrêYi~ Îİ¤NpÀA¾Ĕ¼bð÷®üszMzÖĖQdȨýv§Tè|ªHÃ¾a¸|Ð ƒwKĢx¦ivr^ÿ ¸l öæfƟĴ·PJv}n\\h¹¶v·À|\\ƁĚN´ĜçèÁz]ġ¤²¨QÒŨTIlªťØ}¼˗ƦvÄùØEÂ«FïËIqōTvāÜŏíÛßÛVj³âwGăÂíNOPìyV³ŉĖýZso§HÑiYw[ß\\X¦¥c]ÔƩÜ·«jÐqvÁ¦m^ċ±R¦΋ƈťĚgÀ»IïĨʗƮ°ƝĻþÍAƉſ±tÍEÕÞāNUÍ¡\\ſčåÒʻĘm ƭÌŹöʥëQ¤µ­ÇcƕªoIýIÉ_mkl³ăƓ¦j¡YzŇi}Msßõīʋ }ÁVm_[n}eı­Uĥ¼ªI{Î§DÓƻėojqYhĹT©oūĶ£]ďxĩǑMĝq`B´ƃ˺Чç~²ņj@¥@đ´ί}ĥtPńÇ¾V¬ufÓÉCtÓ̻¹£G³]ƖƾŎĪŪĘ̖¨ʈĢƂlɘ۪üºňUðǜȢƢż̌ȦǼĤŊɲĖÂ­KqĘŉ¼ĔǲņɾªǀÞĈĂD½ĄĎÌŗĞrôñnN¼â¾ʄľԆ|Ǆ֦ज़ȗǉ̘̭ɺƅêgV̍ʆĠ·ÌĊv|ýĖÕWĊǎÞ´õ¼cÒÒBĢ͢UĜð͒s¨ňƃLĉÕÝ@ɛƯ÷¿Ľ­ĹeȏĳëCȚDŲyê×Ŗyò¯ļcÂßYtÁƤyAã˾J@ǝrý@¤rz¸oP¹ɐÚyáHĀ[JwcVeȴÏ»ÈĖ}ƒŰŐèȭǢόĀƪÈŶë;Ñ̆ȤМľĮEŔĹŊũ~ËUă{ĻƹɁύȩþĽvĽƓÉ@ēĽɲßǐƫʾǗĒpäWÐxnsÀ^ƆwW©¦cÅ¡Ji§vúF¶¨c~c¼īeXǚ\\đ¾JwÀďksãAfÕ¦L}waoZD½Ml«]eÒÅaÉ²áo½FõÛ]ĻÒ¡wYR£¢rvÓ®y®LFLzĈôe]gx}|KK}xklL]c¦£fRtív¦PŨ£","@@M T¥"]],"encodeOffsets":[[[108619,36299],[108594,36341],[108600,36306]]]},"properties":{"cp":[103.823557,36.058039],"name":"甘肃","childNum":3}},{"id":"630000","geometry":{"type":"MultiPolygon","coordinates":[["@@InJo","@@CÆ½OŃĦsΰ~Ē³¦@@Ņi±è}ШƄ˹A³r_ĞǒNĪĐw¤^ŬĵªpĺSZgrpiƼĘÔ¨C|ÍJ©Ħ»®VĲ~f\\m `UnÂ~ʌĬàöNt~ňjy¢ZiƔ¥Ąk´nl`JÊJþ©pdƖ®È£¶ìRʦźõƮËnʼėæÑƀĎ[¢VÎĂMÖÝÎF²sƊƀÎBļýƞ¯ʘƭðħ¼Jh¿ŦęΌƇ¥²Q]Č¥nuÂÏri¸¬ƪÛ^Ó¦d¥[Wàx\\ZjÒ¨GtpþYŊĕ´zUOëPîMĄÁxH´áiÜUàîÜŐĂÛSuŎrJðÌ¬EFÁú×uÃÎkrĒ{V}İ«O_ÌËĬ©ÓŧSRÑ±§Ģ£^ÂyèçěM³Ƃę{[¸¿uºµ[gt£¸OƤĿéYõ·kĀq]juw¥DĩƍõÇPéÄ½G©ã¤GuȧþRcÕĕNyyût­øï»a½ē¿BMoį£Íj}éZËqbʍƬh¹ìÿÓAçãnIÃ¡I`ks£CG­ěUy×Cy@¶ʡÊBnāzGơMē¼±O÷õJËĚăVĪũƆ£¯{ËL½ÌzżVR|ĠTbuvJvµhĻĖHAëáa­OÇðñęNwœľ·LmI±íĠĩPÉ×®ÿscB³±JKßĊ«`ađ»·QAmOVţéÿ¤¹SQt]]Çx±¯A@ĉĳ¢Óļ©l¶ÅÛrŕspãRk~¦ª]Į­´FRåd­ČsCqđéFn¿ÅƃmÉx{W©ºƝºįkÕƂƑ¸wWūÐ©ÈF£\\tÈ¥ÄRÈýÌJ lGr^×äùyÞ³fjc¨£ÂZ|ǓMĝÏ@ëÜőRĝ÷¡{aïȷPu°ËXÙ{©TmĠ}Y³­ÞIňµç½©C¡į÷¯B»|St»]vųs»}MÓ ÿʪƟǭA¡fs»PY¼c¡»¦cċ­¥£~msĉPSi^o©AecPeǵkgyUi¿h}aHĉ^|á´¡HØûÅ«ĉ®]m¡qċ¶±ÈyôōLÁstB®wn±ă¥HSòė£Së@×œÊăxÇN©©T±ª£Ĳ¡fb®Þbb_Ą¥xu¥B{łĝ³«`dƐt¤ťiñÍUuºí`£^tƃĲc·ÛLO½sç¥Ts{ă\\_»kÏ±q©čiìĉ|ÍI¥ć¥]ª§D{ŝŖÉR_sÿc³ĪōƿÎ§p[ĉc¯bKmR¥{³Ze^wx¹dƽÅ½ôIg §Mĕ ƹĴ¿ǣÜÍ]Ý]snåA{eƭ`ǻŊĿ\\ĳŬűYÂÿ¬jĖqßb¸L«¸©@ěĀ©ê¶ìÀEH|´bRľÓ¶rÀQþvl®ÕETzÜdb hw¤{LRdcb¯ÙVgƜßzÃôì®^jUèXÎ|UäÌ»rK\\ªN¼pZCüVY¤ɃRi^rPŇTÖ}|br°qňbĚ°ªiƶGQ¾²x¦PmlŜ[Ĥ¡ΞsĦÔÏâ\\ªÚŒU\\f¢N²§x|¤§xĔsZPòʛ²SÐqF`ªVÞŜĶƨVZÌL`¢dŐIqr\\oäõFÎ·¤»Ŷ×h¹]ClÙ\\¦ďÌį¬řtTӺƙgQÇÓHţĒ´ÃbEÄlbʔC|CŮkƮ[ʼ¬ň´KŮÈΰÌĪ¶ƶlðļATUvdTGº̼ÔsÊDÔveMg"]],"encodeOffsets":[[[105308,37219],[95370,40081]]]},"properties":{"cp":[101.778916,36.623178],"name":"青海","childNum":2}},{"id":"640000","geometry":{"type":"Polygon","coordinates":["@@KëÀęĞ«Oęȿȕı]ŉ¡åįÕÔ«ǴõƪĚQÐZhv K°öqÀÑS[ÃÖHƖčËnL]ûcÙß@ĝ¾}w»»oģF¹»kÌÏ·{zP§B­¢íyÅt@@á]Yv_ssģ¼ißĻL¾ġsKD£¡N_X¸}B~HaiÅf{«x»ge_bsKF¯¡IxmELcÿZ¤­ĢÝsuBLùtYdmVtNmtOPhRw~bd¾qÐ\\âÙH\\bImlNZ»loqlVmGā§~QCw¤{A\\PKNY¯bFkC¥sks_Ã\\ă«¢ħkJi¯rrAhĹûç£CUĕĊ_ÔBixÅÙĄnªÑaM~ħpOu¥sîeQ¥¤^dkKwlL~{L~hw^ófćKyE­K­zuÔ¡qQ¤xZÑ¢^ļöÜ¾Ep±âbÊÑÆ^fk¬NC¾YpxbK~¥eÖäBlt¿Đx½I[ĒǙWf»Ĭ}d§dµùEuj¨IÆ¢¥dXªƅx¿]mtÏwßRĶX¢͎vÆzƂZò®ǢÌʆCrâºMÞzÆMÒÊÓŊZÄ¾r°Î®Ȉmª²ĈUªĚîøºĮ¦ÌĘk^FłĬhĚiĀĖ¾iİbjË"],"encodeOffsets":[[109366,40242]]},"properties":{"cp":[106.278179,38.46637],"name":"宁夏","childNum":1}},{"id":"650000","geometry":{"type":"Polygon","coordinates":["@@QØĔ²X¨~ǘBºjʐßØvKƔX¨vĊOÃ·¢i@~cĝe_«E}QxgɪëÏÃ@sÅyXoŖ{ô«ŸuXêÎf`C¹ÂÿÐGĮÕĞXŪōŸMźÈƺQèĽôe|¿ƸJR¤ĘEjcUóº¯Ĩ_ŘÁMª÷Ð¥OéÈ¿ÖğǤǷÂFÒzÉx[]­Ĥĝœ¦EP}ûƥé¿İƷTėƫœŕƅƱB»Đ±ēO¦E}`cȺrĦáŖuÒª«ĲπdƺÏØZƴwʄ¤ĖGĐǂZĶèH¶}ÚZצʥĪï|ÇĦMŔ»İĝǈì¥Βba­¯¥ǕǚkĆŵĦɑĺƯxūД̵nơʃĽá½M»òmqóŘĝčË¾ăCćāƿÝɽ©ǱŅ»ēėŊLrÁ®ɱĕģŉǻ̋ȥơŻǛȡVï¹Ň۩ûkɗġƁ§ʇė̕ĩũƽō^ƕUv£ƁQïƵkŏ½ΉÃŭÇ³LŇʻ«ƭ\\lŭD{ʓDkaFÃÄa³ŤđÔGRÈƚhSӹŚsİ«ĐË[¥ÚDkº^Øg¼ŵ¸£EÍöůŉT¡c_ËKYƧUśĵÝU_©rETÏʜ±OñtYwē¨{£¨uM³x½şL©Ùá[ÓÐĥ Νtģ¢\\śnkOw¥±T»ƷFɯàĩÞáB¹ÆÑUwŕĽw]kE½Èå~Æ÷QyěCFmĭZīŵVÁƿQƛûXS²b½KÏ½ĉS©ŷXĕ{ĕK·¥Ɨcqq©f¿]ßDõU³h­gËÇïģÉɋwk¯í}I·œbmÉřīJɥĻˁ×xoɹīlc¤³Xù]ǅA¿w͉ì¥wÇN·ÂËnƾƍdÇ§đ®ƝvUm©³G\\}µĿQyŹlăµEwǇQ½yƋBe¶ŋÀůo¥AÉw@{Gpm¿AĳŽKLh³`ñcËtW±»ÕSëüÿďDu\\wwwù³VLŕOMËGh£õP¡erÏd{ġWÁč|yšg^ğyÁzÙs`s|ÉåªÇ}m¢Ń¨`x¥ù^}Ì¥H«YªƅAÐ¹n~ź¯f¤áÀzgÇDIÔ´AňĀÒ¶ûEYospõD[{ù°]uJqU|Soċxţ[õÔĥkŋÞŭZËºóYËüċrw ÞkrťË¿XGÉbřaDü·Ē÷AÃª[ÄäIÂ®BÕĐÞ_¢āĠpÛÄȉĖġDKwbmÄNôfƫVÉviǳHQµâFù­Âœ³¦{YGd¢ĚÜO {Ö¦ÞÍÀP^bƾl[vt×ĈÍEË¨¡Đ~´î¸ùÎhuè`¸HÕŔVºwĠââWò@{ÙNÝ´ə²ȕn{¿¥{l÷eé^eďXj©î\\ªÑòÜìc\\üqÕ[Č¡xoÂċªbØ­ø|¶ȴZdÆÂońéG\\¼C°ÌÆn´nxÊOĨŪƴĸ¢¸òTxÊǪMīĞÖŲÃɎOvʦƢ~FRěò¿ġ~åŊúN¸qĘ[Ĕ¶ÂćnÒPĒÜvúĀÊbÖ{Äî¸~Ŕünp¤ÂH¾ĄYÒ©ÊfºmÔĘcDoĬMŬS¤s²ʘÚžȂVŦ èW°ªB|ĲXŔþÈJĦÆæFĚêYĂªĂ]øªŖNÞüAfɨJ¯ÎrDDĤ`mz\\§~D¬{vJÂ«lµĂb¤pŌŰNĄ¨ĊXW|ų ¿¾ɄĦƐMTòP÷fØĶK¢ȝ˔Sô¹òEð­`Ɩ½ǒÂň×äı§ĤƝ§C~¡hlåǺŦŞkâ~}FøàĲaĞfƠ¥Ŕd®U¸źXv¢aƆúŪtŠųƠjdƺƺÅìnrh\\ĺ¯äɝĦ]èpĄ¦´LƞĬ´ƤǬ˼Ēɸ¤rºǼ²¨zÌPðŀbþ¹ļD¢¹\\ĜÑŚ¶ZƄ³âjĦoâȴLÊȮĐ­ĚăÀêZǚŐ¤qȂ\\L¢ŌİfÆs|zºeªÙæ§΢{Ā´ƐÚ¬¨Ĵà²łhʺKÞºÖTiƢ¾ªì°`öøu®Ê¾ãÖ"],"encodeOffsets":[[88824,50096]]},"properties":{"cp":[87.617733,43.792818],"name":"新疆","childNum":1}},{"id":"110000","geometry":{"type":"Polygon","coordinates":["@@RºaYÕQaúÍÔiþĩȨWĢü|Ėu[qb[swP@ÅğP¿{\\¯Y²·Ñ¨j¯X\\¯MSvU¯YIŕY{[fk­VÁûtŷmiÍt_H»Ĩ±d`¹­{bwYr³S]§§o¹qGtm_SŧoaFLgQN_dV@Zom_ć\\ßW´ÕiœRcfio§ËgToÛJíĔóu|wP¤XnO¢ÉŦ¯pNÄā¤zâŖÈRpŢZÚ{GrFt¦Òx§ø¹RóäV¤XdżâºWbwŚ¨Ud®bêņ¾jnŎGŃŶnzÚScîĚZen¬"],"encodeOffsets":[[119421,42013]]},"properties":{"cp":[116.405285,39.904989],"name":"北京","childNum":1}},{"id":"120000","geometry":{"type":"Polygon","coordinates":["@@ŬgX§Ü«E¶FÌ¬O_ïlÁgz±AXeµÄĵ{¶]gitgIj·¥ì_iU¨ÐƎk}ĕ{gBqGf{¿aU^fIư³õ{YıëNĿk©ïËZukāAīlĕĥs¡bġ«@dekąI[nlPqCnp{ō³°`{PNdƗqSÄĻNNâyj]äÒD ĬH°Æ]~¡HO¾X}ÐxgpgWrDGpù^LrzWxZ^¨´T\\|~@IzbĤjeĊªz£®ĔvěLmV¾Ô_ÈNW~zbĬvG²ZmDM~~"],"encodeOffsets":[[120237,41215]]},"properties":{"cp":[117.190182,39.125596],"name":"天津","childNum":1}},{"id":"310000","geometry":{"type":"MultiPolygon","coordinates":[["@@ɧư¬EpƸÁx]","@@©²","@@MA","@@QpªKWT§¨","@@bŝÕÕEȣÚƥêImɇǦèÜĠÚÄÓŴ·ʌÇ","@@Sô¤r]ìƬįǜûȬɋŭ×^sYɍDŋŽąñCG²«ªč@h_p¯A{oloY¬j@Ĳ`gQÚpptǀ^MĲvtbe´Rh@oj¨","@@ÆLH{a}Eo¦"]],"encodeOffsets":[[[124702,32062],[124547,32200],[124808,31991],[124726,32110],[124903,32376],[124065,32166],[124870,31965]]]},"properties":{"cp":[121.472644,31.231706],"name":"上海","childNum":7}},{"id":"500000","geometry":{"type":"Polygon","coordinates":["@@TÂÛ`Ùƅően½SêqDu[RåÍ¹÷eXÍy¸_ĺę}÷`M¯ċfCVµqŉ÷Zgg^d½pDOÎCn^uf²ènh¼WtƏxRGg¦pVFI±G^Ic´ecGĹÞ½sëÆNäÌ¤KÓe¯|R¸§LÜkPoïƭNï¶}Gywdiù©nkĈzj@Óc£»Wă¹Óf§c[µo·Ó|MvÛaq½«è\\ÂoVnÓØÍ²«bq¿ehCĜ^Q~ Évýş¤²ĮpEĶyhsŊwH½¿gÅ¡ýE¡ya£³t\\¨\\vú¹¼©·Ñr_oÒý¥et³]Et©uÖ¥±ă©KVeë]}wVPÀFA¨ąB}qTjgRemfFmQFÝMyùnÑAmÑCawu_p¯sfÛ_gI_pNysB¦zG¸rHeN\\CvEsÐñÚkcDÖĉsaQ¯}_UzÁē}^R Äd^ÍĸZ¾·¶`wećJE¹vÛ·HgéFXjÉê`|ypxkAwWĐpb¥eOsmzwqChóUQl¥F^lafanòsrEvfQdÁUVfÎvÜ^eftET¬ôA\\¢sJnQTjPØxøK|nBzĞ»LYFDxÓvr[ehľvN¢o¾NiÂxGpâ¬zbfZo~hGi]öF||NbtOMn eA±tPTLjpYQ|SHYĀxinzDJÌg¢và¥Pg_ÇzIIII£®S¬ØsÎ¼¥¨^LnGĲļĲƤjÎƀƾ¹¸ØÎezĆT¸}êÐqHðqĖä¥^CÆIj²p\\_ æüY|[YxƊæu°xb®Űb@~¢NQt°¶Sæ Ê~rǉĔëĚ¢~uf`faĔJåĊnÔ]jƎćÊ@£¾a®£Ű{ŶĕFègLk{Y|¡ĜWƔtƬJÑxq±ĢN´òKLÈÃ¼D|s`ŋć]Ã`đMùƱ¿~Y°ħ`ƏíW½eI½{aOIrÏ¡ĕŇapµÜƃġ²"],"encodeOffsets":[[111728,31311]]},"properties":{"cp":[106.504962,29.533155],"name":"重庆","childNum":1}},{"id":"810000","geometry":{"type":"MultiPolygon","coordinates":[["@@AlFi","@@mp","@@EpHo","@@rMUwAS¬]","@@ea¢pl¸Eõ¹hj[]ÔCÎ@lj¡uBX´AI¹[yDU]W`çwZkmcMpÅv}IoJlcafŃK°ä¬XJmÐ đhI®æÔtSHnEÒrÄc"]],"encodeOffsets":[[[117111,23002],[117072,22876],[117045,22887],[116882,22747],[116975,23082]]]},"properties":{"cp":[114.173355,22.320048],"name":"香港","childNum":5}},{"id":"820000","geometry":{"type":"Polygon","coordinates":["@@áw{Îr"],"encodeOffsets":[[116285,22746]]},"properties":{"cp":[113.54909,22.198951],"name":"澳门","childNum":1}}],"UTF8Encoding":true});
}));
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['exports', 'echarts'], factory);
    } else if (typeof exports === 'object' && typeof exports.nodeName !== 'string') {
        // CommonJS
        factory(exports, require('echarts'));
    } else {
        // Browser globals
        factory({}, root.echarts);
    }
}(this, function (exports, echarts) {
    var log = function (msg) {
        if (typeof console !== 'undefined') {
            console && console.error && console.error(msg);
        }
    }
    if (!echarts) {
        log('ECharts is not Loaded');
        return;
    }
    if (!echarts.registerMap) {
        log('ECharts Map is not loaded')
        return;
    }
    echarts.registerMap('chinaZone', {"type":"FeatureCollection","features":[{"type":"Feature","properties":{"name":"东北"},"geometry":{"type":"Polygon","coordinates":[[[121.55273437499999,53.330872983017066],[121.77246093750001,53.04121304075649],[121.640625,52.8823912222619],[121.2451171875,52.61639023304539],[121.904296875,52.29504228453735],[122.16796875,52.45600939264076],[122.6953125,52.24125614966341],[122.56347656249999,52.07950600379697],[122.9150390625,51.37178037591737],[123.31054687499999,51.20688339486559],[123.74999999999999,51.34433866059924],[124.365234375,51.28940590271679],[124.8046875,51.37178037591737],[124.98046874999999,51.699799849741936],[125.41992187499999,51.56341232867588],[125.9912109375,50.98609893339354],[125.15625000000001,49.95121990866204],[125.24414062499999,49.38237278700955],[125.068359375,49.18170338770663],[124.76074218749999,49.15296965617042],[124.49707031249999,48.545705491847464],[124.4091796875,48.1367666796927],[124.1455078125,48.48748647988415],[123.134765625,47.87214396888731],[122.4755859375,47.30903424774781],[122.82714843749999,47.010225655683485],[122.958984375,46.619261036171515],[123.1787109375,46.255846818480315],[122.82714843749999,46.07323062540835],[122.6953125,45.706179285330855],[122.29980468749999,45.85941212790755],[121.81640624999999,45.98169518512228],[121.6845703125,45.73685954736049],[122.1240234375,45.36758436884978],[122.08007812499999,44.715513732021336],[122.3876953125,44.213709909702054],[123.0908203125,44.465151013519616],[123.48632812499999,43.739352079154706],[123.3544921875,43.54854811091286],[123.6181640625,43.32517767999296],[123.57421875,43.068887774169625],[123.31054687499999,43.004647127794435],[123.134765625,42.74701217318067],[122.431640625,42.8115217450979],[121.9482421875,42.65012181368022],[121.77246093750001,42.48830197960227],[121.37695312499999,42.48830197960227],[120.84960937499999,42.261049162113856],[120.32226562500001,42.09822241118974],[120.0146484375,41.73852846935917],[119.83886718750001,42.13082130188811],[119.44335937499999,42.35854391749705],[119.35546875000001,42.09822241118974],[119.3115234375,41.376808565702355],[118.87207031250001,40.91351257612758],[119.267578125,40.58058466412761],[119.5751953125,40.51379915504413],[119.61914062499999,40.27952566881291],[119.88281249999999,40.04443758460856],[120.4541015625,40.27952566881291],[121.11328124999999,40.84706035607122],[121.81640624999999,40.84706035607122],[122.16796875,40.48038142908172],[121.2451171875,39.605688178320804],[121.28906250000001,39.40224434029275],[121.640625,39.33429742980725],[121.55273437499999,39.13006024213511],[121.1572265625,38.95940879245423],[121.1572265625,38.788345355085625],[121.86035156249999,38.993572058209466],[122.16796875,39.232253141714885],[122.78320312499999,39.605688178320804],[123.662109375,39.80853604144591],[124.18945312500001,39.842286020743394],[124.71679687499999,40.44694705960048],[125.72753906249999,40.81380923056958],[126.60644531250001,41.705728515237524],[126.9580078125,41.73852846935917],[127.2216796875,41.44272637767212],[128.1005859375,41.343824581185686],[128.232421875,41.64007838467894],[128.0126953125,41.96765920367816],[128.935546875,42.032974332441405],[129.3310546875,42.391008609205045],[129.7265625,42.4234565179383],[129.990234375,42.90816007196054],[130.4736328125,42.74701217318067],[131.1328125,42.97250158602597],[131.2646484375,43.99281450048989],[131.0009765625,44.87144275016589],[131.572265625,44.99588261816546],[131.748046875,45.30580259943578],[133.0224609375,45.02695045318546],[134.1650390625,47.338822694822],[134.7802734375,47.69497434186282],[134.6044921875,48.019324184801185],[134.86816406249997,48.48748647988415],[133.90136718749997,48.3416461723746],[133.154296875,48.10743118848039],[132.4951171875,47.754097979680026],[130.9130859375,47.724544549099676],[130.693359375,48.07807894349862],[130.517578125,48.80686346108517],[129.375,49.410973199695846],[129.0673828125,49.38237278700955],[128.49609375,49.61070993807422],[127.9248046875,49.55372551347579],[127.44140625,49.809631563563094],[127.2216796875,50.708634400828224],[126.87011718749999,51.28940590271679],[126.43066406249999,52.07950600379697],[125.9912109375,52.696361078274485],[125.595703125,53.067626642387374],[125.1123046875,53.199451902831555],[124.67285156250001,53.199451902831555],[123.74999999999999,53.51418452077113],[123.26660156249999,53.54030739150022],[122.6953125,53.409531853086435],[122.25585937500001,53.48804553605622],[121.55273437499999,53.330872983017066]]]}},{"type":"Feature","properties":{"name":"山东"},"geometry":{"type":"Polygon","coordinates":[[[117.861328125,38.28993659801203],[117.79541015625001,38.09998264736481],[117.57568359374999,38.048091067457236],[117.39990234375,37.84015683604136],[116.806640625,37.82280243352756],[116.42211914062499,37.49229399862877],[116.3232421875,37.56199695314352],[116.224365234375,37.47485808497102],[116.27929687499999,37.38761749978395],[116.1474609375,37.37888785004527],[115.98266601562499,37.33522435930639],[115.87280273437499,37.16907157713011],[115.76293945312499,36.99377838872517],[115.6640625,36.80928470205937],[115.477294921875,36.76529191711624],[115.26855468749999,36.527294814546245],[115.323486328125,36.34167804918315],[115.4443359375,36.2354121683998],[115.4443359375,36.04021586880111],[115.34545898437499,35.951329861522666],[115.323486328125,35.77325759103725],[115.46630859375,35.862343734896484],[115.76293945312499,36.00467348670187],[115.8837890625,36.01356058518153],[116.04858398437499,36.10237644873644],[116.03759765625,35.96911507577482],[115.894775390625,35.96022296929667],[115.82885742187499,35.84453450421662],[115.697021484375,35.82672127366604],[115.6640625,35.746512259918504],[115.49926757812499,35.7286770448517],[115.323486328125,35.51434313431818],[115.1806640625,35.41591492345623],[115.01586914062499,35.38904996691167],[114.97192382812499,35.263561862152095],[114.81811523437501,35.15584570226544],[114.81811523437501,35.003003395276714],[115.08178710937499,34.994003757575776],[115.23559570312499,34.84085858477277],[115.42236328124999,34.8047829195724],[115.4443359375,34.63320791137959],[115.653076171875,34.56990638085636],[115.98266601562499,34.59704151614417],[116.224365234375,34.56990638085636],[116.34521484375001,34.642247047768535],[116.42211914062499,34.903952965590065],[116.6748046875,34.93097858831627],[116.8505859375,34.92197103616377],[117.05932617187499,34.75966612466248],[117.147216796875,34.56085936708384],[117.24609374999999,34.45221847282654],[117.333984375,34.57895241036948],[117.520751953125,34.488447837809304],[117.72949218749999,34.52466147177172],[117.784423828125,34.63320791137959],[118.004150390625,34.66032236481892],[118.09204101562501,34.56990638085636],[118.17993164062499,34.38877925439021],[118.38867187500001,34.42503613021332],[118.443603515625,34.6241677899049],[118.57543945312501,34.70549341022544],[118.740234375,34.732584206123626],[118.85009765625,35.04798673426734],[119.091796875,35.05698043137265],[119.25659179687499,35.110921809704756],[119.36645507812499,35.10193405724606],[119.42138671875,35.28150065789119],[119.54223632812501,35.36217605914681],[119.63012695312499,35.55904339525896],[119.72900390625001,35.62158189955968],[119.893798828125,35.62158189955968],[120.003662109375,35.755428369259626],[120.0146484375,35.85343961959182],[120.267333984375,35.97800618085566],[120.28930664062499,36.05798104702501],[120.640869140625,36.03133177633187],[120.673828125,36.1733569352216],[120.640869140625,36.30627216957992],[120.728759765625,36.34167804918315],[120.728759765625,36.43896124085945],[120.860595703125,36.4477991295848],[120.89355468749999,36.36822190085111],[120.95947265624999,36.53612263184686],[120.82763671875,36.59788913307022],[120.904541015625,36.63316209558658],[121.025390625,36.58024660149866],[121.431884765625,36.756490329505176],[121.61865234375,36.756490329505176],[121.937255859375,36.958671131530316],[122.178955078125,36.83566824724438],[122.431640625,36.8708321556463],[122.508544921875,36.96744946416934],[122.464599609375,37.081475648860525],[122.44262695312501,37.142803443716836],[122.607421875,37.204081555898526],[122.53051757812499,37.413800350662896],[122.16796875,37.43997405227057],[122.10205078125,37.54457732085582],[121.84936523437499,37.46613860234406],[121.541748046875,37.43997405227057],[121.37695312499999,37.57070524233116],[121.168212890625,37.579412513438385],[121.124267578125,37.69251435532741],[121.025390625,37.70120736474139],[120.904541015625,37.80544394934271],[120.70678710937499,37.814123701604466],[120.28930664062499,37.67512527892127],[120.2783203125,37.56199695314352],[119.84985351562499,37.36142550190517],[119.893798828125,37.28279464911045],[119.69604492187499,37.13404537126446],[119.36645507812499,37.09023980307208],[119.17968749999999,37.21283151445594],[119.02587890624999,37.24782120155428],[118.93798828125,37.37015718405753],[118.99291992187499,37.64903402157866],[119.278564453125,37.65773212628272],[119.267578125,37.75334401310656],[119.091796875,37.83148014503288],[119.06982421874999,37.92686760148135],[118.970947265625,38.013476231041935],[118.905029296875,38.12591462924157],[118.67431640625,38.12591462924157],[118.49853515625,38.03078569382294],[118.333740234375,38.09998264736481],[118.05908203124999,38.14319750166766],[117.861328125,38.28993659801203]]]}},{"type":"Feature","properties":{"name":"苏皖"},"geometry":{"type":"Polygon","coordinates":[[[121.9482421875,31.690781806136822],[121.728515625,32.02670629333614],[121.44287109374999,32.1570124860701],[121.35498046875,32.39851580247402],[121.04736328125,32.52828936482526],[120.89355468749999,32.690243035492266],[120.9375,32.80574473290688],[120.904541015625,33.02708758002874],[120.498046875,33.797408767572485],[120.32226562500001,34.098159345215535],[120.2783203125,34.288991865037524],[120.08056640625,34.379712580462204],[119.91577148437499,34.45221847282654],[119.81689453125,34.470335121217474],[119.608154296875,34.56085936708384],[119.43237304687499,34.66935854524543],[119.46533203125,34.732584206123626],[119.300537109375,34.77771580360469],[119.234619140625,34.8047829195724],[119.20166015625,34.994003757575776],[119.24560546875001,35.06597313798418],[119.35546875000001,35.10193405724606],[119.25659179687499,35.110921809704756],[119.091796875,35.05698043137265],[118.85009765625,35.04798673426734],[118.740234375,34.732584206123626],[118.57561111450195,34.705634531113056],[118.443603515625,34.6241677899049],[118.38884353637695,34.42517772782117],[118.17993164062499,34.38892091337994],[118.09204101562501,34.57004773263718],[118.004150390625,34.66032236481892],[117.784423828125,34.633349155461715],[117.72966384887697,34.52466147177172],[117.520751953125,34.4885893279266],[117.333984375,34.57895241036948],[117.24609374999999,34.453350878522286],[117.14584350585938,34.56085936708384],[117.05932617187499,34.760794345237514],[116.8505859375,34.92197103616377],[116.67343139648439,34.93097858831627],[116.42211914062499,34.903952965590065],[116.34521484375001,34.642247047768535],[116.22299194335938,34.5710371883746],[116.1865997314453,34.57442951865274],[116.16943359374999,34.43409789359469],[116.4111328125,34.27083595165],[116.5869140625,34.23451236236987],[116.60888671874999,33.88865750124075],[116.19140625,33.7243396617476],[115.94970703125,33.96158628979907],[115.72998046875,34.07086232376631],[115.53222656249999,33.925129700072],[115.6201171875,33.578014746143985],[115.400390625,33.54139466898275],[115.29052734375,33.37641235124676],[115.224609375,33.08233672856376],[114.9169921875,33.137551192346145],[114.89501953124999,32.95336814579932],[115.1806640625,32.84267363195431],[115.20263671874999,32.58384932565662],[115.57617187499999,32.43561304116276],[115.83984375,32.47269502206151],[115.8837890625,31.80289258670676],[115.57617187499999,31.70947636001935],[115.3564453125,31.44741029142872],[115.51025390625,31.259769987394286],[115.83984375,31.090574094954192],[116.03759765625,30.95876857077987],[115.77392578125,30.65681556429287],[115.94970703125,30.240086360983426],[116.12548828124999,29.859701442126756],[116.49902343749999,29.916852233070173],[116.630859375,30.06909396443887],[116.87255859374999,29.935895213372444],[116.65283203124999,29.726222319395504],[116.71874999999999,29.53522956294847],[117.04833984375001,29.726222319395504],[117.1142578125,29.897805610155874],[117.39990234375,29.783449456820605],[117.57568359374999,29.592565403314087],[117.8173828125,29.516110386062277],[118.037109375,29.53522956294847],[118.23486328125,29.420460341013133],[118.65234374999999,29.668962525992505],[118.85009765625,29.973970240516614],[118.91601562499999,30.315987718557867],[119.33349609375,30.372875188118016],[119.24560546875001,30.524413269923986],[119.39941406249999,30.65681556429287],[119.64111328125,31.12819929911196],[119.90478515625,31.16580958786196],[120.14648437499999,30.939924331023445],[120.41015624999999,30.90222470517144],[120.47607421874999,30.770159115784214],[120.82763671875,31.034108344903512],[121.09130859375,31.18460913574325],[121.11328124999999,31.44741029142872],[121.37695312499999,31.522361470421437],[121.11328124999999,31.74685416292141],[121.28906250000001,31.87755764334002],[121.728515625,31.672083485607402],[121.9482421875,31.690781806136822]]]}},{"type":"Feature","properties":{"name":"浙沪"},"geometry":{"type":"Polygon","coordinates":[[[120.4541015625,27.235094607795503],[120.684814453125,27.44004046509707],[120.61889648437501,27.556981920338316],[120.684814453125,27.69325634309158],[120.95947265624999,27.907058371121995],[121.00341796874999,28.07198030177986],[121.17919921875001,28.372068829631633],[121.35498046875,28.13981591275445],[121.47583007812501,28.31405305806959],[121.59667968749999,28.275358281817105],[121.640625,28.468691297348148],[121.497802734375,28.680949728554964],[121.66259765625001,28.69058765425071],[121.695556640625,28.93124697186731],[121.640625,29.152161283318915],[121.95922851562501,29.05616970274342],[121.9482421875,29.621221113784504],[122.398681640625,30.002516938570686],[121.95922851562501,30.14512718337613],[121.83837890625,29.92637417863576],[121.66259765625001,29.99300228455108],[121.453857421875,30.268556249047727],[121.212158203125,30.363396239603716],[120.76171875,30.240086360983426],[120.99243164062501,30.552800413453546],[121.51977539062499,30.817346256492073],[121.78344726562499,30.826780904779774],[121.97021484374999,30.89279747750818],[121.9482421875,31.69195032611824],[121.728515625,31.67325224096816],[121.28906250000001,31.87755764334002],[121.11465454101561,31.74685416292141],[121.37695312499999,31.522361470421437],[121.11328124999999,31.44975342450799],[121.09130859375,31.186958816798732],[120.83312988281249,31.038815104128687],[120.47607421874999,30.772519022811146],[120.41015624999999,30.90222470517144],[120.14648437499999,30.939924331023445],[119.90478515625,31.16580958786196],[119.64111328125,31.12819929911196],[119.40216064453126,30.65681556429287],[119.24560546875001,30.52204730013766],[119.33349609375,30.372875188118016],[118.91326904296874,30.318358689813856],[118.85009765625,29.973970240516614],[118.65234374999999,29.668962525992505],[118.23211669921876,29.420460341013133],[118.048095703125,29.27681632836857],[118.01513671875,29.132970130878636],[118.16894531249999,28.97931203672246],[118.3447265625,28.835049972635176],[118.41064453125,28.65203063036226],[118.43261718749999,28.265682390146477],[118.72924804687499,28.304380682962783],[118.795166015625,28.120438687101064],[118.707275390625,28.004101830368654],[118.87207031250001,27.702983735525862],[118.861083984375,27.479034752500656],[119.21264648437499,27.430289738862594],[119.61914062499999,27.664068965384516],[119.674072265625,27.430289738862594],[119.83886718750001,27.303451991034542],[120.21240234375001,27.430289738862594],[120.34423828125,27.391278222579277],[120.4541015625,27.235094607795503]]]}},{"type":"Feature","properties":{"name":"台"},"geometry":{"type":"Polygon","coordinates":[[[121.59667968749999,25.304303764403617],[121.453857421875,25.25463261974945],[121.39892578125,25.15522939494057],[121.234130859375,25.12539261151203],[121.03637695312499,25.045792240303445],[120.89355468749999,24.746831298412058],[120.78369140624999,24.666986385216273],[120.55297851562499,24.367113562651262],[120.421142578125,24.10664717920179],[120.267333984375,23.83560098662095],[120.16845703125,23.805449612314625],[120.13549804687501,23.543845136505844],[120.14648437499999,23.392681978612988],[120.091552734375,23.311990950585997],[120.03662109374999,23.069624397708267],[120.14648437499999,22.998851594142913],[120.1904296875,22.806567100271522],[120.25634765624999,22.644432481217155],[120.311279296875,22.543000965921863],[120.58593749999999,22.350075806124867],[120.69580078125001,22.105998799750566],[120.7177734375,21.95323560036448],[120.838623046875,21.90227796666864],[120.88256835937499,22.055096050575845],[120.89355468749999,22.31958944283391],[121.014404296875,22.664709810176827],[121.11328124999999,22.7255238110894],[121.17919921875001,22.806567100271522],[121.39892578125,23.11004929735674],[121.453857421875,23.311990950585997],[121.5087890625,23.51362636346272],[121.62963867187499,24.00632619875113],[121.62963867187499,24.16680208530324],[121.761474609375,24.337086982410497],[121.86035156249999,24.557116164309626],[121.805419921875,24.84656534821976],[121.981201171875,25.015928763367857],[121.86035156249999,25.055745117015316],[121.717529296875,25.18505888358067],[121.59667968749999,25.304303764403617]]]}},{"type":"Feature","properties":{"name":"闽赣"},"geometry":{"type":"Polygon","coordinates":[[[116.136474609375,29.869228848968312],[115.8837890625,29.726222319395504],[115.72998046875,29.84064389983441],[115.46630859375,29.84064389983441],[114.89501953124999,29.401319510041485],[114.2578125,29.34387539941801],[113.9501953125,29.075375179558346],[114.12597656249999,28.76765910569123],[114.2138671875,28.323724553546015],[113.73046875,27.9361805667694],[113.57666015625,27.547241546253268],[113.64257812499999,27.31321389856826],[113.8623046875,27.391278222579277],[113.818359375,26.64745870265938],[114.10400390625,26.54922257769204],[114.08203125,26.15543796871355],[113.92822265625,25.720735134412106],[113.9501953125,25.443274612305746],[114.0380859375,25.284437746983055],[114.54345703125,25.423431426334222],[114.697265625,25.284437746983055],[114.6533203125,25.105497373014686],[114.19189453125,24.666986385216273],[114.45556640625,24.50714328310284],[115.00488281250001,24.686952411999155],[115.42236328124999,24.766784522874453],[115.64208984374999,24.587090339209634],[115.79589843749999,24.587090339209634],[115.86181640625001,24.906367237907997],[116.3671875,24.78673454198888],[116.56494140625001,24.627044746156027],[116.76269531249999,24.627044746156027],[116.96044921875,24.206889622398023],[116.98242187499999,23.745125865762923],[117.158203125,23.624394569716923],[117.50976562499999,23.926013033021192],[118.10302734374999,24.26699728841817],[118.43261718749999,24.607069137709683],[118.6083984375,24.56710835257599],[118.71826171875,24.86650252692691],[118.98193359375,24.986058021167594],[118.98193359375,25.20494115356912],[119.59716796875,25.443274612305746],[119.59716796875,25.859223554761407],[119.61914062499999,26.2145910237943],[119.92675781249999,26.391869671769022],[119.83886718750001,26.60817437403311],[120.05859375,26.86328062676624],[120.4541015625,27.235094607795503],[120.34423828125,27.391278222579277],[120.21240234375001,27.430289738862594],[119.83886718750001,27.30589254842439],[119.674072265625,27.42785192271138],[119.61639404296874,27.664068965384516],[119.20989990234374,27.432727501179993],[118.861083984375,27.479034752500656],[118.86932373046874,27.702983735525862],[118.707275390625,28.004101830368654],[118.795166015625,28.122861031898417],[118.72650146484374,28.30679885919413],[118.42987060546874,28.26810144544533],[118.41064453125,28.65203063036226],[118.3447265625,28.835049972635176],[118.01513671875,29.132970130878636],[118.048095703125,29.27681632836857],[118.23348999023438,29.422852691411045],[118.037109375,29.53522956294847],[117.8173828125,29.517305440471738],[117.57705688476564,29.591371238663804],[117.40127563476561,29.783449456820605],[117.11563110351562,29.897805610155874],[117.04833984375001,29.727414884638474],[116.71874999999999,29.536424391519873],[116.65283203124999,29.72502973997892],[116.87118530273436,29.935895213372444],[116.62948608398438,30.06909396443887],[116.49902343749999,29.918042526070806],[116.12823486328126,29.859701442126756],[116.136474609375,29.869228848968312]]]}},{"type":"Feature","properties":{"name":"京津"},"geometry":{"type":"Polygon","coordinates":[[[118.048095703125,39.223742741391305],[118.01513671875,39.35129035526705],[117.87231445312499,39.39375459224348],[117.938232421875,39.614152077002664],[117.72949218749999,39.554883059924016],[117.630615234375,39.614152077002664],[117.6416015625,39.67337039176558],[117.564697265625,39.791654835253425],[117.54272460937499,40.002371935876475],[117.7734375,39.96870074491696],[117.72949218749999,40.07807142745009],[117.54272460937499,40.212440718286466],[117.38891601562499,40.23760536584024],[117.21313476562499,40.36328834091583],[117.22412109375,40.53050177574321],[117.38891601562499,40.55554790286311],[117.50976562499999,40.65563874006118],[117.21313476562499,40.68896903762434],[116.993408203125,40.68896903762434],[116.773681640625,40.863679665481676],[116.663818359375,41.04621681452063],[116.56494140625001,40.98819156349393],[116.43310546875,40.97989806962013],[116.3232421875,40.91351257612758],[116.444091796875,40.772221877329024],[116.224365234375,40.772221877329024],[116.070556640625,40.59727063442024],[115.927734375,40.59727063442024],[115.72998046875,40.522150985623796],[115.79589843749999,40.421860362045194],[115.93872070312499,40.23760536584024],[115.86181640625001,40.1452892956766],[115.72998046875,40.16208338164617],[115.4443359375,40.027614437486655],[115.42236328124999,39.93501296038254],[115.53222656249999,39.816975090490004],[115.42236328124999,39.757879992021756],[115.477294921875,39.62261494094297],[115.806884765625,39.52099229357195],[115.927734375,39.58875727696545],[116.20239257812499,39.58029027440865],[116.25732421875,39.47860556892209],[116.45507812500001,39.45316112807394],[116.4111328125,39.52099229357195],[116.597900390625,39.631076770083666],[116.79565429687499,39.59722324495565],[116.82861328125001,39.36827914916014],[116.861572265625,39.13006024213511],[116.75170898437501,39.04478604850143],[116.69677734375,38.90813299596705],[116.72973632812499,38.736946065676],[117.00439453125,38.685509760012],[117.09228515624999,38.591113776147445],[117.22412109375,38.60828592850559],[117.333984375,38.565347844885466],[117.57568359374999,38.59970036588819],[117.60864257812501,38.74551518488265],[117.630615234375,38.84826438869913],[117.828369140625,38.89103282648846],[117.79541015625001,39.138581990583525],[118.048095703125,39.223742741391305]]]}},{"type":"Feature","properties":{"name":"广琼"},"geometry":{"type":"Polygon","coordinates":[[[117.147216796875,23.624394569716923],[116.98242187499999,23.743868823619675],[116.96044921875,24.20939467509706],[116.76132202148436,24.627044746156027],[116.56494140625001,24.627044746156027],[116.36856079101562,24.78673454198888],[115.86318969726564,24.90512166048925],[115.79589843749999,24.587090339209634],[115.64208984374999,24.587090339209634],[115.42236328124999,24.766784522874453],[115.00762939453125,24.68944794054683],[114.45556640625,24.508392847518074],[114.19189453125,24.666986385216273],[114.6533203125,25.105497373014686],[114.697265625,25.284437746983055],[114.54345703125,25.423431426334222],[114.0380859375,25.285679468429873],[113.9501953125,25.442034508935436],[113.79638671875,25.3241665257384],[113.56567382812499,25.353954558526684],[113.26904296874999,25.522614647623293],[113.0712890625,25.41350860804229],[112.950439453125,25.25463261974945],[112.9833984375,24.91633140459907],[112.78564453124999,24.886436490787712],[112.67578124999999,25.105497373014686],[112.181396484375,25.18505888358067],[112.12646484375,24.986058021167594],[112.1044921875,24.836595553891183],[111.895751953125,24.617057340809524],[112.03857421875,24.367113562651262],[111.86279296875,24.206889622398023],[111.917724609375,23.996289790628417],[111.6650390625,23.85569800975124],[111.478271484375,23.61432859499168],[111.346435546875,23.301901124188877],[111.4013671875,23.059516273509303],[111.104736328125,22.715390019335942],[110.79711914062499,22.61401087437029],[110.687255859375,22.471954507739227],[110.74218749999999,22.30942584120019],[110.32470703125,22.19757745335104],[110.36865234374999,21.94304553343818],[109.951171875,21.87169463514272],[109.720458984375,21.58593511478851],[109.9072265625,21.453068633086783],[109.852294921875,21.381474908405597],[109.7314453125,21.207458730482642],[109.654541015625,20.92039691397189],[109.720458984375,20.80747157680652],[109.92919921875,20.262197124246534],[110.04730224609375,20.29053732272331],[110.2862548828125,20.280232395237007],[110.37689208984374,20.040450354169483],[110.1708984375,20.014645445341365],[109.64355468749999,19.973348786110602],[109.2041015625,19.84939395842279],[109.18212890625,19.704657579362323],[108.6328125,19.31114335506464],[108.67675781249999,18.500447458475094],[109.0283203125,18.3336694457713],[109.48974609375,18.291949733550336],[109.92919921875,18.417078658661257],[110.4345703125,18.70869162255995],[110.654296875,19.31114335506464],[111.005859375,19.642587534013032],[110.9619140625,19.9526963975442],[110.6982421875,20.076570104545173],[110.390625,20.035289711352377],[110.302734375,20.282808691330054],[110.478515625,20.46818922264095],[110.25878906249999,20.899871347076424],[110.654296875,21.289374355860424],[111.02783203125,21.453068633086783],[111.884765625,21.616579336740603],[112.47802734375,21.739091217718574],[113.115234375,21.90227796666864],[113.466796875,22.024545601240337],[113.70849609375,22.715390019335942],[113.88427734374999,22.49225722008518],[114.10400390625,22.268764039073968],[114.78515624999999,22.573438264572395],[115.07080078125,22.79643932091949],[115.64208984374999,22.816694126899844],[116.1474609375,22.836945920943855],[116.553955078125,23.140359987886118],[116.76269531249999,23.33216830631147],[116.883544921875,23.57405696664267],[117.147216796875,23.624394569716923]]]}},{"type":"Feature","properties":{"name":"两湖"},"geometry":{"type":"Polygon","coordinates":[[[115.3564453125,31.44741029142872],[115.3070068359375,31.39584654193847],[115.20263671874999,31.438037173124464],[115.213623046875,31.555133721172034],[115.1312255859375,31.615965936476076],[115.0872802734375,31.512995857454676],[114.85107421875,31.461468210801037],[114.5489501953125,31.58321506275729],[114.57092285156249,31.75619625757135],[114.2852783203125,31.751525328078905],[114.2303466796875,31.84489911613476],[114.1094970703125,31.84956532831343],[113.97216796875,31.765537409484374],[113.70849609375,32.10118973232094],[113.741455078125,32.35212281198644],[113.653564453125,32.44488496716713],[113.367919921875,32.29641979896909],[113.15917968749999,32.41706632846282],[112.30224609374999,32.35212281198644],[111.51123046875,32.63937487360669],[111.02783203125,33.22949814144951],[110.41259765625,33.19273094190692],[109.51171875,33.22949814144951],[110.21484375,32.69486597787505],[109.6875,32.565333160841035],[109.48974609375,32.2313896627376],[109.57763671875,31.690781806136822],[110.0830078125,31.353636941500987],[110.0390625,30.789036751261136],[109.27001953125,30.543338954230222],[108.4130859375,30.486550842588485],[108.45703125,29.878755346037977],[109.2041015625,29.152161283318915],[109.31396484375,28.748396571187406],[109.3798828125,27.6251403350933],[108.83056640625,27.137368359795584],[108.896484375,27.039556602163195],[109.35791015625,27.15692045688088],[109.48974609375,26.96124577052697],[109.31396484375,26.62781822639305],[109.31396484375,26.27371402440643],[109.53369140625,25.958044673317843],[109.951171875,26.13571361317392],[110.25878906249999,25.97779895546436],[110.61035156249999,26.27371402440643],[110.98388671874999,26.352497858154024],[111.26953125,26.23430203240673],[111.357421875,25.780107118422244],[110.93994140625,25.18505888358067],[110.93994140625,24.966140159912975],[111.37939453125,25.085598897064752],[111.4453125,24.686952411999155],[111.52221679687499,24.62954147281562],[111.66778564453125,24.76927845059527],[112.02209472656249,24.749325626697196],[112.1044921875,24.836595553891183],[112.12509155273438,24.983568464904028],[112.18276977539062,25.186301620540558],[112.67578124999999,25.105497373014686],[112.78701782226562,24.886436490787712],[112.9833984375,24.918822320516302],[112.950439453125,25.252148528835257],[113.0712890625,25.41350860804229],[113.26766967773438,25.521375362412332],[113.56430053710938,25.35519556738819],[113.79638671875,25.325407840167266],[113.94882202148438,25.442034508935436],[113.92822265625,25.720735134412106],[114.08065795898438,26.157903278765215],[114.10263061523436,26.54922257769204],[113.818359375,26.648686120289714],[113.86093139648436,27.392497540937878],[113.63983154296875,27.314434076625904],[113.57528686523438,27.547241546253268],[113.72634887695312,27.9361805667694],[114.21249389648436,28.32614228994993],[114.12597656249999,28.770066672590293],[113.94882202148438,29.07417494209143],[114.2578125,29.34387539941801],[114.89501953124999,29.401319510041485],[115.47180175781249,29.845408626428448],[115.72998046875,29.84064389983441],[115.88928222656249,29.73099249532227],[116.1309814453125,29.869228848968312],[115.9442138671875,30.240086360983426],[115.77392578125,30.661540870820918],[116.03759765625,30.963479049959364],[115.51025390625,31.259769987394286],[115.3564453125,31.44741029142872]]]}},{"type":"Feature","properties":{"name":"云贵广"},"geometry":{"type":"Polygon","coordinates":[[[109.720458984375,21.596150576461426],[109.951171875,21.87169463514272],[110.36865234374999,21.94814065819028],[110.3192138671875,22.19757745335104],[110.74218749999999,22.314507734511825],[110.687255859375,22.466878364528448],[110.775146484375,22.608939952085887],[111.0992431640625,22.715390019335942],[111.4013671875,23.059516273509303],[111.346435546875,23.296855923968202],[111.4727783203125,23.60426184707018],[111.6650390625,23.87076873182048],[111.91223144531249,23.991271293052655],[111.86279296875,24.206889622398023],[112.0330810546875,24.36210962726063],[111.895751953125,24.617057340809524],[112.0166015625,24.746831298412058],[111.67053222656249,24.766784522874453],[111.5167236328125,24.627044746156027],[111.4453125,24.686952411999155],[111.37390136718749,25.085598897064752],[110.93994140625,24.966140159912975],[110.94543457031249,25.19002975536265],[111.3519287109375,25.78505344378837],[111.2750244140625,26.239229262573595],[110.98388671874999,26.352497858154024],[110.6158447265625,26.278639583003976],[110.2642822265625,25.97779895546436],[109.9456787109375,26.13571361317392],[109.5391845703125,25.958044673317843],[109.31396484375,26.268788256766292],[109.31396484375,26.632728662035912],[109.48974609375,26.96124577052697],[109.3524169921875,27.15692045688088],[108.8909912109375,27.039556602163195],[108.83056640625,27.142256704793976],[109.3798828125,27.6251403350933],[109.3359375,28.526622418648127],[109.16015624999999,28.473520105140903],[109.072265625,28.19792655722615],[108.78662109375,28.20760859532738],[108.43505859374999,28.65203063036226],[108.19335937499999,29.05616970274342],[107.42431640625,29.094577077511826],[107.07275390625,28.825425374477224],[106.6552734375,28.51696944040106],[106.34765625,28.497660832963472],[105.9521484375,28.69058765425071],[105.62255859375,28.497660832963472],[105.732421875,28.265682390146477],[106.2158203125,28.14950321154457],[106.28173828125,27.800209937418252],[105.77636718749999,27.664068965384516],[105.2490234375,27.761329874505233],[105.2490234375,27.97499795326776],[105.05126953124999,28.110748760633534],[104.74365234375,27.839076094777816],[104.3701171875,27.994401411046148],[104.23828125,28.613459424004414],[103.86474609375,28.5941685062326],[103.84277343749999,28.34306490482549],[103.46923828124999,28.091366281406945],[103.447265625,27.858503954841247],[102.87597656249999,27.254629577800063],[103.02978515625,26.62781822639305],[102.89794921875,26.293415004265796],[101.7333984375,26.15543796871355],[101.513671875,26.509904531413927],[100.72265625,27.877928333679495],[100.37109375,27.72243591897343],[100.0634765625,28.07198030177986],[100.107421875,28.304380682962783],[99.66796875,28.844673680771795],[99.404296875,28.57487404744697],[99.4482421875,28.110748760633534],[99.1845703125,28.34306490482549],[99.052734375,29.152161283318915],[98.87695312499999,28.8831596093235],[98.61328125,28.9600886880068],[98.701171875,28.304380682962783],[98.10791015625,28.130127737874005],[98.39355468749999,27.547241546253268],[98.701171875,27.488781168937997],[98.61328125,25.859223554761407],[98.15185546874999,25.60190226111573],[97.53662109375,24.78673454198888],[97.49267578125,23.905926927314724],[98.701171875,24.10664717920179],[98.9208984375,23.200960808078566],[99.4482421875,23.079731762449878],[99.16259765625,22.126354759919685],[99.931640625,21.983801417384697],[100.5029296875,21.4121622297254],[101.1181640625,21.779905342529645],[101.162109375,21.207458730482642],[101.77734374999999,21.207458730482642],[101.6455078125,21.820707853875017],[101.689453125,22.471954507739227],[102.12890625,22.350075806124867],[102.48046875,22.715390019335942],[103.0078125,22.43134015636061],[103.4033203125,22.715390019335942],[104.7216796875,22.79643932091949],[104.765625,23.079731762449878],[105.27099609375,23.38259828417886],[105.8642578125,22.978623970384913],[106.50146484374999,22.958393318086348],[106.787109375,22.79643932091949],[106.61132812499999,22.573438264572395],[106.72119140625,21.983801417384697],[107.29248046875,21.637005211106306],[107.7978515625,21.657428197370653],[108.03955078125,21.53484700204879],[108.5888671875,21.637005211106306],[109.16015624999999,21.565502029745332],[109.0283203125,21.46329344189928],[109.149169921875,21.401933838235188],[109.720458984375,21.596150576461426]]]}},{"type":"Feature","properties":{"name":"西南"},"geometry":{"type":"Polygon","coordinates":[[[109.566650390625,31.728167146023935],[108.4130859375,32.21280106801518],[107.9296875,32.13840869677249],[107.40234375,32.509761735919426],[105.99609375,32.80574473290688],[105.4248046875,32.84267363195431],[104.94140625,32.58384932565662],[104.2822265625,32.84267363195431],[104.3701171875,33.17434155100208],[104.0625,33.65120829920497],[103.18359375,33.7243396617476],[103.0517578125,34.161818161230386],[102.83203125,34.30714385628804],[102.26074218749999,33.90689555128866],[102.39257812499999,33.46810795527896],[101.77734374999999,33.137551192346145],[101.162109375,33.211116472416855],[101.2060546875,32.69486597787505],[100.634765625,32.54681317351514],[99.8876953125,32.91648534731439],[99.6240234375,32.76880048488168],[98.7890625,33.137551192346145],[98.349609375,34.05265942137599],[97.822265625,34.161818161230386],[97.3828125,33.7243396617476],[97.646484375,33.358061612778876],[97.55859375,32.58384932565662],[96.767578125,31.80289258670676],[95.49316406249999,31.765537409484374],[95.0537109375,32.36140331527543],[94.6142578125,32.58384932565662],[93.7353515625,32.509761735919426],[92.1533203125,32.80574473290688],[91.318359375,33.063924198120645],[90.087890625,33.394759218577995],[89.69238281249999,34.125447565116126],[89.56054687499999,35.31736632923788],[89.6484375,35.88905007936091],[89.56054687499999,36.13787471840729],[88.41796875,36.4566360115962],[87.3193359375,36.38591277287651],[86.220703125,36.1733569352216],[85.517578125,35.71083783530009],[85.078125,35.746512259918504],[84.0673828125,35.38904996691167],[83.056640625,35.42486791930558],[82.880859375,35.67514743608467],[82.3974609375,35.71083783530009],[81.6064453125,35.209721645221386],[80.2880859375,35.42486791930558],[79.7607421875,34.45221847282654],[78.9697265625,34.379712580462204],[78.7060546875,34.016241889667015],[78.7060546875,33.578014746143985],[79.365234375,32.69486597787505],[78.9697265625,32.36140331527543],[78.662109375,32.65787573695528],[78.44238281249999,32.47269502206151],[78.79394531249999,31.27855085894653],[79.1015625,31.42866311735861],[79.9365234375,30.86451022625836],[81.23291015625,30.050076521698735],[81.45263671875,30.44867367928756],[82.11181640625,30.278044377800153],[83.60595703125,29.19053283229458],[84.0234375,29.305561325527698],[84.17724609375,29.19053283229458],[84.24316406249999,28.92163128242129],[85.166015625,28.5941685062326],[85.14404296875,28.285033294640684],[85.71533203125,28.246327971048842],[86.0009765625,27.9361805667694],[86.98974609375,27.89734922968426],[87.978515625,27.89734922968426],[88.72558593749999,28.05259082333983],[88.8134765625,27.46928747369202],[89.07714843749999,27.547241546253268],[89.71435546875,28.188243641850313],[90.5712890625,28.07198030177986],[91.47216796875,27.97499795326776],[91.636962890625,27.790491224830877],[91.636962890625,27.488781168937997],[92.032470703125,27.45953933271788],[92.098388671875,26.912273826625587],[92.581787109375,26.980828590472107],[92.977294921875,26.902476886279832],[93.592529296875,26.96124577052697],[94.24072265625,27.488781168937997],[94.251708984375,27.61540601339959],[95.284423828125,27.858503954841247],[95.47119140625,27.858503954841247],[95.657958984375,27.965294915211132],[95.833740234375,28.101057958669447],[96.317138671875,27.887639217136517],[96.50390625,28.06228599981216],[96.8994140625,27.907058371121995],[97.020263671875,28.091366281406945],[97.349853515625,28.04289477256162],[97.36083984375,28.246327971048842],[97.503662109375,28.323724553546015],[97.569580078125,28.545925723233477],[97.789306640625,28.31405305806959],[97.93212890625,28.323724553546015],[98.1298828125,28.130127737874005],[98.701171875,28.31405305806959],[98.624267578125,28.950475674848008],[98.87695312499999,28.8831596093235],[99.041748046875,29.142566155107065],[99.195556640625,28.333395169196457],[99.4482421875,28.120438687101064],[99.404296875,28.57487404744697],[99.66796875,28.844673680771795],[100.096435546875,28.294707428421205],[100.0634765625,28.07198030177986],[100.37109375,27.732160709580906],[100.72265625,27.877928333679495],[101.7333984375,26.165298896316042],[102.908935546875,26.303264239389534],[103.02978515625,26.64745870265938],[102.87597656249999,27.254629577800063],[103.447265625,27.868216579514076],[103.46923828124999,28.101057958669447],[103.84277343749999,28.352733760237818],[103.86474609375,28.5941685062326],[104.227294921875,28.603814407841327],[104.3701171875,27.994401411046148],[104.75463867187499,27.848790459862073],[105.05126953124999,28.120438687101064],[105.2490234375,27.97499795326776],[105.260009765625,27.761329874505233],[105.75439453125,27.67379895781762],[106.28173828125,27.809927780908378],[106.2158203125,28.14950321154457],[105.732421875,28.275358281817105],[105.62255859375,28.507315578441784],[105.941162109375,28.680949728554964],[106.34765625,28.497660832963472],[106.6552734375,28.51696944040106],[107.435302734375,29.084976575985912],[108.182373046875,29.05616970274342],[108.45703125,28.613459424004414],[108.78662109375,28.20760859532738],[109.083251953125,28.20760859532738],[109.16015624999999,28.478348692223165],[109.324951171875,28.545925723233477],[109.31396484375,28.758028282691143],[109.2041015625,29.152161283318915],[108.45703125,29.878755346037977],[108.4130859375,30.486550842588485],[109.2919921875,30.543338954230222],[110.0390625,30.798474179567823],[110.0830078125,31.372399104880525],[109.57695007324219,31.691366067966744],[109.57077026367188,31.729919213990538],[109.566650390625,31.728167146023935]]]}},{"type":"Feature","properties":{"name":"河南"},"geometry":{"type":"Polygon","coordinates":[[[110.9344482421875,33.224903086263964],[111.02783203125,33.22949814144951],[111.51260375976562,32.63937487360669],[112.30224609374999,32.35328292697968],[113.15780639648438,32.41590703229392],[113.36654663085938,32.297580627868925],[113.653564453125,32.44488496716713],[113.741455078125,32.35212281198644],[113.70849609375,32.10118973232094],[113.97216796875,31.765537409484374],[114.1101837158203,31.84956532831343],[114.2303466796875,31.84489911613476],[114.2856216430664,31.751817268076632],[114.57057952880858,31.75619625757135],[114.5489501953125,31.583507532223454],[114.68421936035156,31.529092424832434],[114.85107421875,31.461761061684257],[115.0872802734375,31.513581235768143],[115.13156890869139,31.615673568921192],[115.213623046875,31.555426278730632],[115.20263671874999,31.43833009726237],[115.3070068359375,31.39613959785752],[115.35610198974611,31.44741029142872],[115.57617187499999,31.710060504121703],[115.88310241699219,31.803476141595862],[115.83984375,32.47269502206151],[115.5768585205078,32.43619256447739],[115.20263671874999,32.58327075337777],[115.1806640625,32.84209673599253],[114.89501953124999,32.95336814579932],[114.9169921875,33.13697622055061],[115.224609375,33.08233672856376],[115.28984069824219,33.37583894926043],[115.400390625,33.54139466898275],[115.6201171875,33.57858681163982],[115.53153991699217,33.92455994198492],[115.72998046875,34.07029354225064],[115.9503936767578,33.96158628979907],[116.1907196044922,33.72491075551312],[116.60820007324217,33.88922749934704],[116.5869140625,34.23451236236987],[116.40975952148438,34.27140338330196],[116.16943359374999,34.43409789359469],[116.1865997314453,34.57442951865274],[115.98197937011717,34.5976067372431],[115.653076171875,34.57047178653788],[115.4443359375,34.632642932646135],[115.42167663574217,34.80534672334474],[115.23490905761717,34.84142214166116],[115.08178710937499,34.99456626392848],[114.81811523437501,35.003565839769166],[114.81811523437501,35.15640709405757],[114.97192382812499,35.263561862152095],[115.01518249511717,35.38904996691167],[115.1806640625,35.41647451484553],[115.323486328125,35.51434313431818],[115.4999542236328,35.72923445579027],[115.6640625,35.746512259918504],[115.697021484375,35.82727799765747],[115.8295440673828,35.84453450421662],[115.8940887451172,35.960778755287464],[116.03759765625,35.97022651867593],[116.04789733886717,36.10237644873644],[115.88447570800781,36.01356058518153],[115.76293945312499,36.00467348670187],[115.46630859375,35.86345667898701],[115.323486328125,35.77325759103725],[115.34271240234374,35.951329861522666],[115.44158935546876,36.04243673532787],[115.4443359375,36.13787471840729],[115.33447265625,36.12900165569652],[115.12573242187499,36.1822249804225],[114.873046875,36.10237644873644],[114.345703125,36.27970720524017],[113.6865234375,36.31512514748051],[113.5986328125,35.639441068973944],[112.763671875,35.209721645221386],[111.9287109375,35.28150065789119],[111.97265625,35.10193405724606],[111.09374999999999,34.63320791137959],[110.302734375,34.59704151614417],[110.61035156249999,33.94335994657882],[110.9619140625,33.797408767572485],[110.9344482421875,33.224903086263964]]]}},{"type":"Feature","properties":{"name":"西北"},"geometry":{"type":"Polygon","coordinates":[[[78.9697265625,34.379712580462204],[79.7607421875,34.45674800347809],[80.2880859375,35.42486791930558],[81.6064453125,35.21420969483077],[82.40295410156249,35.71083783530009],[82.88635253906249,35.67514743608467],[83.056640625,35.429344044107154],[84.0618896484375,35.38904996691167],[85.078125,35.74205383068037],[85.517578125,35.715298012125295],[86.220703125,36.1733569352216],[87.3248291015625,36.39033486213649],[88.41796875,36.4566360115962],[89.56054687499999,36.13787471840729],[89.6484375,35.88459964717596],[89.56054687499999,35.31736632923788],[89.6978759765625,34.120900139826965],[90.0933837890625,33.394759218577995],[92.16430664062499,32.80574473290688],[93.7408447265625,32.51439400122826],[94.6142578125,32.58384932565662],[95.0537109375,32.36140331527543],[95.49316406249999,31.765537409484374],[96.767578125,31.80756092262095],[97.55859375,32.58384932565662],[97.6409912109375,33.358061612778876],[97.3828125,33.72890830547334],[97.8277587890625,34.161818161230386],[98.349609375,34.05265942137599],[98.7945556640625,33.137551192346145],[99.6240234375,32.773419354975175],[99.8876953125,32.91187391621322],[100.6292724609375,32.55144352864431],[101.20056152343749,32.699488680852674],[101.162109375,33.211116472416855],[101.77734374999999,33.142150831105354],[102.39257812499999,33.46810795527896],[102.26074218749999,33.90689555128866],[102.83203125,34.30260622622907],[103.0572509765625,34.15727269301868],[103.18634033203125,33.7243396617476],[104.0625,33.65120829920497],[104.3701171875,33.17664043594348],[104.2822265625,32.84267363195431],[104.94415283203125,32.58616357743131],[105.42205810546875,32.84267363195431],[106.0015869140625,32.80574473290688],[107.3968505859375,32.51207789841144],[107.93243408203125,32.1407343780354],[108.41583251953125,32.21280106801518],[109.566650390625,31.728751172360298],[109.57145690917969,31.729919213990538],[109.48699951171874,32.2313896627376],[109.68475341796875,32.56764789050999],[110.21484375,32.69486597787505],[109.50897216796875,33.22949814144951],[110.41534423828124,33.19273094190692],[110.9344482421875,33.224903086263964],[110.9619140625,33.80197351806589],[110.61035156249999,33.94335994657882],[110.302734375,34.59704151614417],[110.12695312499999,34.813803317113155],[110.56640625,35.53222622770337],[110.390625,35.99578538642032],[110.390625,36.94989178681327],[110.74218749999999,37.579412513438385],[110.478515625,38.20365531807149],[111.22558593749999,39.470125122358176],[109.86328125,39.26628442213066],[109.0283203125,38.47939467327645],[108.720703125,37.71859032558816],[108.10546875,37.68382032669382],[106.4794921875,38.13455657705411],[107.0068359375,39.095962936305476],[106.171875,39.26628442213066],[105.8203125,38.788345355085625],[105.77636718749999,37.85750715625203],[104.150390625,37.43997405227057],[103.38134765625,37.92686760148135],[103.51318359375,38.18638677411551],[103.42529296875,38.42777351132902],[104.19433593749999,38.95940879245423],[103.9306640625,39.45316112807394],[102.98583984374999,39.14710270770074],[102.4365234375,39.232253141714885],[101.88720703125,39.13006024213511],[102.06298828125,38.89103282648846],[101.79931640625,38.71980474264237],[100.8544921875,39.027718840211605],[100.7666015625,39.38526381099774],[99.5361328125,39.90973623453719],[100.12939453125,40.245991504199026],[100.21728515624999,40.64730356252251],[100.08544921874999,40.88029480552824],[99.6240234375,40.91351257612758],[98.349609375,40.64730356252251],[97.6025390625,41.44272637767212],[97.84423828125,41.65649719441145],[97.1630859375,42.76314586689492],[96.416015625,42.68243539838623],[95.361328125,44.08758502824516],[93.07617187499999,44.96479793033101],[90.52734374999999,45.398449976304086],[90.703125,46.619261036171515],[90,47.754097979680026],[88.24218749999999,48.40003249610685],[87.890625,49.095452162534826],[87.099609375,49.095452162534826],[86.7041015625,48.63290858589535],[85.517578125,48.25394114463431],[85.6494140625,47.21956811231547],[84.9462890625,46.98025235521883],[83.056640625,47.18971246448421],[82.265625,45.61403741135093],[82.5732421875,45.24395342262324],[81.8701171875,45.36758436884978],[79.89257812499999,44.902577996288876],[80.2880859375,44.59046718130883],[80.7275390625,43.16512263158296],[80.1123046875,42.61779143282346],[80.244140625,42.09822241118974],[77.6953125,41.0130657870063],[76.728515625,41.0130657870063],[76.4208984375,40.44694705960048],[75.673828125,40.27952566881291],[75.498046875,40.613952441166596],[74.091796875,40.04443758460856],[73.47656249999999,39.436192999314095],[73.8720703125,38.51378825951165],[74.5751953125,38.44498466889473],[74.970703125,37.405073750176925],[74.4873046875,37.23032838760387],[75.89355468749999,36.63316209558658],[75.849609375,36.10237644873644],[76.1572265625,35.85343961959182],[76.5087890625,35.92464453144099],[76.728515625,35.67514743608467],[78.134765625,35.47856499535729],[77.98095703125,35.29943548054545],[78.15673828125,34.994003757575776],[78.28857421875,34.63320791137959],[78.68408203124999,34.56085936708384],[78.9697265625,34.379712580462204]]]}},{"type":"Feature","properties":{"name":"晋冀蒙"},"geometry":{"type":"Polygon","coordinates":[[[121.55273437499999,53.330462921131215],[120.89355468749999,53.27835301753182],[120.05859375,52.802761415419674],[120.05859375,52.5897007687178],[120.5419921875,52.64306343665892],[120.7177734375,52.05249047600099],[119.970703125,51.645294049305406],[119.17968749999999,50.3734961443035],[119.2236328125,50.0923932109388],[118.47656249999999,49.92293545449574],[117.72949218749999,49.52520834197442],[116.54296874999999,49.809631563563094],[115.927734375,48.69096039092549],[115.7080078125,48.19538740833338],[115.53222656249999,47.931066347509784],[115.927734375,47.724544549099676],[116.23535156249999,47.84265762816538],[116.89453125,47.84265762816538],[117.333984375,47.69497434186282],[117.68554687499999,48.04870994288686],[118.43261718749999,48.019324184801185],[119.3115234375,47.517200697839414],[119.794921875,47.040182144806664],[119.83886718750001,46.70973594407157],[118.95996093749999,46.6795944656402],[118.16894531249999,46.70973594407157],[117.42187500000001,46.5286346952717],[116.76269531249999,46.37725420510028],[116.1474609375,45.706179285330855],[115.31249999999999,45.398449976304086],[114.60937499999999,45.42929873257377],[113.5546875,44.74673324024678],[112.5,44.933696389694674],[112.1484375,45.120052841530544],[111.57714843749999,44.902577996288876],[111.4013671875,44.308126684886126],[111.884765625,43.77109381775651],[110.91796875,43.35713822211053],[109.951171875,42.58544425738491],[108.06152343749999,42.45588764197166],[107.3583984375,42.48830197960227],[105.029296875,41.57436130598913],[104.3701171875,41.80407814427234],[102.83203125,42.06560675405716],[102.0849609375,42.22851735620852],[101.77734374999999,42.48830197960227],[100.5908203125,42.71473218539458],[99.404296875,42.5530802889558],[97.16033935546875,42.76516228327469],[97.84423828125,41.65649719441145],[97.60528564453125,41.44272637767212],[98.35235595703125,40.64730356252251],[99.62677001953125,40.91351257612758],[100.08544921874999,40.88029480552824],[100.21728515624999,40.64938745451835],[100.12939453125,40.24808787647333],[99.5361328125,39.90973623453719],[100.7666015625,39.3831409542565],[100.8544921875,39.027718840211605],[101.79931640625,38.72194763292809],[102.06024169921875,38.89317057287496],[101.88720703125,39.132190775931036],[102.4365234375,39.232253141714885],[102.98309326171875,39.14710270770074],[103.9306640625,39.45316112807394],[104.19433593749999,38.95940879245423],[103.42803955078125,38.429925130409366],[103.51043701171875,38.18638677411551],[103.38409423828125,37.92686760148135],[104.15313720703125,37.44433544620035],[105.77636718749999,37.859675659210005],[105.8203125,38.78620445725866],[106.171875,39.26628442213066],[107.00408935546875,39.095962936305476],[106.4794921875,38.13455657705411],[108.10546875,37.68599392939966],[108.720703125,37.72076290898373],[109.02557373046875,38.48369476951686],[109.86602783203125,39.26628442213066],[111.22283935546875,39.470125122358176],[110.478515625,38.20365531807149],[110.73944091796875,37.579412513438385],[110.390625,36.95208671786997],[110.38787841796875,35.99800750540412],[110.56640625,35.53446133418443],[110.12695312499999,34.81154831029378],[110.30342102050781,34.59704151614417],[111.09443664550781,34.633772886265064],[111.97265625,35.10305758050401],[111.92939758300781,35.28150065789119],[112.76229858398436,35.21028266499067],[113.5986328125,35.639441068973944],[113.6865234375,36.31512514748051],[114.34295654296875,36.28081425933677],[114.873046875,36.103486012588036],[115.12573242187499,36.1822249804225],[115.33447265625,36.130110843400146],[115.4443359375,36.13787471840729],[115.4443359375,36.236519850396775],[115.323486328125,36.342784223707234],[115.26992797851564,36.52619126653696],[115.47866821289062,36.76639204454785],[115.6640625,36.80928470205937],[115.98403930664061,37.33631625612842],[116.1474609375,37.37997911184045],[116.27929687499999,37.388708634542056],[116.22573852539062,37.473768205267504],[116.3232421875,37.56199695314352],[116.42074584960936,37.49338360812417],[116.806640625,37.82280243352756],[117.39990234375,37.84124135065978],[117.57568359374999,38.048091067457236],[117.79678344726564,38.09998264736481],[117.85995483398438,38.28993659801203],[117.93685913085939,38.37826858136171],[117.74597167968749,38.34381037525605],[117.57568359374999,38.60077361738762],[117.33535766601562,38.565347844885466],[117.22412109375,38.60828592850559],[117.09228515624999,38.59218715603345],[117.00439453125,38.685509760012],[116.72973632812499,38.739088441876866],[116.69677734375,38.905995699991145],[116.75445556640625,39.04691915968501],[116.85882568359374,39.13006024213511],[116.79290771484374,39.59933957529531],[116.60064697265625,39.631076770083666],[116.4111328125,39.52099229357195],[116.45507812500001,39.45316112807394],[116.25732421875,39.47860556892209],[116.20239257812499,39.58029027440865],[115.93048095703125,39.58875727696545],[115.806884765625,39.523110951240696],[115.477294921875,39.62261494094297],[115.42510986328124,39.757879992021756],[115.53222656249999,39.816975090490004],[115.42510986328124,39.93501296038254],[115.4443359375,40.03182061333687],[115.72998046875,40.16208338164617],[115.86181640625001,40.1452892956766],[115.93872070312499,40.24179856487036],[115.79589843749999,40.41976938144622],[115.73272705078124,40.522150985623796],[115.927734375,40.59727063442024],[116.06781005859375,40.59727063442024],[116.22161865234376,40.772221877329024],[116.44134521484375,40.77430186363723],[116.3232421875,40.91558813293605],[116.43035888671875,40.97989806962013],[116.56494140625001,40.98819156349393],[116.66107177734375,41.04621681452063],[116.773681640625,40.861602479810266],[116.993408203125,40.68896903762434],[117.21313476562499,40.68896903762434],[117.50701904296875,40.65563874006118],[117.38616943359374,40.55554790286311],[117.22137451171875,40.53258931069554],[117.21313476562499,40.36328834091583],[117.39166259765625,40.23550866893913],[117.53997802734375,40.214538129296336],[117.72949218749999,40.07386810509482],[117.7734375,39.96870074491696],[117.54272460937499,40.000267972646796],[117.564697265625,39.787433886224406],[117.6416015625,39.67125632523974],[117.630615234375,39.614152077002664],[117.72949218749999,39.55700068337126],[117.938232421875,39.612036199336956],[117.87231445312499,39.39375459224348],[118.01513671875,39.35129035526705],[118.04534912109376,39.223742741391305],[118.13323974609374,39.17052936145295],[118.21014404296875,39.06824672852526],[118.52874755859376,38.91668153637508],[118.58367919921875,38.97862765746913],[118.50677490234375,39.11727568585598],[118.99017333984375,39.18969082109678],[119.300537109375,39.42346418978382],[119.26208496093751,39.50404070558415],[119.35546875000001,39.74943369178247],[119.57244873046874,39.91605629078665],[119.91508483886717,40.00184595114704],[119.88281249999999,40.0447004133524],[119.61914062499999,40.27952566881291],[119.5751953125,40.514321174936704],[119.26826477050781,40.580063160471695],[118.87275695800781,40.91351257612758],[119.3115234375,41.37835427979543],[119.35546875000001,42.099241380322944],[119.44267272949219,42.35803652353272],[119.83886718750001,42.13082130188811],[120.0146484375,41.739040835793816],[120.32226562500001,42.09873189780303],[120.84960937499999,42.261557338476734],[121.08650207519533,42.36463232550283],[121.3776397705078,42.488808320425846],[121.77246093750001,42.48830197960227],[121.9482421875,42.65062684261494],[122.43095397949219,42.8115217450979],[123.13545227050781,42.74751641468717],[123.30986022949217,43.005149268492374],[123.57421875,43.069389389453015],[123.61747741699219,43.32517767999296],[123.35517883300781,43.549045783240295],[123.48564147949217,43.739848173302434],[123.0908203125,44.46564105431543],[122.38700866699219,44.2146941992524],[122.08007812499999,44.716489596738064],[122.12265014648438,45.36661954708626],[121.6845703125,45.735901044186406],[121.81640624999999,45.98169518512228],[122.32177734375,45.85558643964395],[122.6953125,45.706179285330855],[122.82714843749999,46.07323062540835],[123.1787109375,46.25964487666549],[122.958984375,46.619261036171515],[122.82714843749999,47.010225655683485],[122.4755859375,47.30903424774781],[123.13201904296875,47.87398630840817],[124.14276123046876,48.48748647988415],[124.4091796875,48.1367666796927],[124.49432373046875,48.5402503014931],[124.76074218749999,49.154766002922],[125.06561279296875,49.18170338770663],[125.24414062499999,49.384160800744986],[125.15625000000001,49.95121990866204],[125.9912109375,50.98609893339354],[125.41992187499999,51.565119704124186],[124.98046874999999,51.698097536240525],[124.8046875,51.37178037591737],[124.365234375,51.291123547147215],[123.74999999999999,51.34433866059924],[123.31054687499999,51.20860412431918],[122.9150390625,51.370065750319654],[122.56347656249999,52.07950600379697],[122.69256591796876,52.24125614966341],[122.16796875,52.45433567512185],[121.90155029296875,52.2967220498974],[121.2451171875,52.61805778461654],[121.63238525390626,52.8823912222619],[121.77246093750001,53.042864365225824],[121.55273437499999,53.330462921131215]]]}}]});
}));

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['exports', 'echarts'], factory)
  } else if (typeof exports === 'object' &&
    typeof exports.nodeName !== 'string') {
    // CommonJS
    factory(exports, require('echarts'))
  } else {
    // Browser globals
    factory({}, root.echarts)
  }
}(this, function (exports, echarts) {
  var colorPalette = [
    '#11A0F8',
    '#26C8A4',
    '#BF8FE1',
    '#FF8426',
    '#337FFF',
    '#7F8FA4',
    '#07A2A4', '#9A7FD1', '#588DD5', '#F5994E', '#C05050',
    '#59678C', '#C9AB00', '#7EB00A', '#6F5553', '#C14089'
  ]
  var log = function (msg) {
    if (typeof console !== 'undefined') {
      console && console.error && console.error(msg)
    }
  }
  if (!echarts) {
    log('ECharts is not Loaded')
    return
  }
  echarts.registerTheme('theme-fin1',
    {
      color: colorPalette,

      title: {
        textStyle: {
          fontWeight: 'normal',
          color: '#008acd'
        }
      },

      visualMap: {
        itemWidth: 15,
        color: ['#5ab1ef', '#e0ffff']
      },

      toolbox: {
        iconStyle: {
          normal: {
            borderColor: colorPalette[0]
          }
        }
      },

      tooltip: {
        backgroundColor: 'rgba(50,50,50,0.5)',
        textStyle: {
          fontSize: 12
        },
        axisPointer: {
          type: 'line',
          lineStyle: {
            color: 'rgba(127, 143, 164, 0.23)',
            width: 20
          },
          crossStyle: {
            color: '#008acd'
          },
          shadowStyle: {
            color: 'rgba(200,200,200,0.2)'
          }
        }
      },

      dataZoom: {
        dataBackgroundColor: '#efefff',
        fillerColor: 'rgba(182,162,222,0.2)',
        handleColor: '#008acd'
      },

      grid: { left: 20, right: 25, top: 60, bottom: 5, containLabel: true },
      legend: {
        top: 8,
        left: 'right',
        itemWidth: 15, // 图例标记宽度/高度
        itemHeight: 6,
        textStyle: {
          fontSize: 12
        }
      },
      categoryAxis: {
        axisLabel: {
          fontSize: 12,
          color: '#354052'
        },
        axisLine: {
          lineStyle: {
            color: '#D0D3D7'
          }
        },
        splitLine: {
          lineStyle: {
            color: ['#eee']
          }
        }
      },

      valueAxis: {
        axisLabel: {
          fontSize: 12,
          color: '#354052'
        },
        axisLine: {
          show: false,
          lineStyle: {
            color: '#D0D3D7'
          }
        },
        splitLine: {
          lineStyle: {
            color: ['#ccc'],
            type: 'dotted'
          }
        },

        nameTextStyle: {
          color: '#354052',
          fontSize: 12
        }
      },

      timeline: {
        lineStyle: {
          color: '#008acd'
        },
        controlStyle: {
          normal: { color: '#008acd' },
          emphasis: { color: '#008acd' }
        },
        symbol: 'emptyCircle',
        symbolSize: 3
      },

      line: {
        symbol: 'emptyCircle',
        symbolSize: 6
      },

      candlestick: {
        itemStyle: {
          normal: {
            color: '#d87a80',
            color0: '#2ec7c9',
            lineStyle: {
              color: '#d87a80',
              color0: '#2ec7c9'
            }
          }
        }
      },

      scatter: {
        symbol: 'circle',
        symbolSize: 4
      },

      map: {
        label: {
          normal: {
            textStyle: {
              color: '#d87a80'
            }
          }
        },
        itemStyle: {
          normal: {
            borderColor: '#eee',
            areaColor: '#ddd'
          },
          emphasis: {
            areaColor: '#fe994e'
          }
        }
      },

      graph: {
        color: colorPalette
      },

      gauge: {
        axisLine: {
          lineStyle: {
            color: [[0.2, '#2ec7c9'], [0.8, '#5ab1ef'], [1, '#d87a80']],
            width: 10
          }
        },
        axisTick: {
          splitNumber: 10,
          length: 15,
          lineStyle: {
            color: 'auto'
          }
        },
        splitLine: {
          length: 22,
          lineStyle: {
            color: 'auto'
          }
        },
        pointer: {
          width: 5
        }
      }
    }
  )
}))

/*!
 PowerTip v1.3.1 (2018-04-15)
 https://stevenbenner.github.io/jquery-powertip/
 Copyright (c) 2018 Steven Benner (http://stevenbenner.com/).
 Released under MIT license.
 https://raw.github.com/stevenbenner/jquery-powertip/master/LICENSE.txt
*/
(function(root, factory) {
	// support loading the plugin via common patterns
	if (typeof define === 'function' && define.amd) {
		// load the plugin as an amd module
		define([ 'jquery' ], factory);
	} else if (typeof module === 'object' && module.exports) {
		// load the plugin as a commonjs module
		module.exports = factory(require('jquery'));
	} else {
		// load the plugin as a global
		factory(root.jQuery);
	}
}(this, function($) {
	// useful private variables
	var $document = $(document),
		$window = $(window),
		$body = $('body');

	// constants
	var DATA_DISPLAYCONTROLLER = 'displayController',
		DATA_HASACTIVEHOVER = 'hasActiveHover',
		DATA_FORCEDOPEN = 'forcedOpen',
		DATA_HASMOUSEMOVE = 'hasMouseMove',
		DATA_MOUSEONTOTIP = 'mouseOnToPopup',
		DATA_ORIGINALTITLE = 'originalTitle',
		DATA_POWERTIP = 'powertip',
		DATA_POWERTIPJQ = 'powertipjq',
		DATA_POWERTIPTARGET = 'powertiptarget',
		EVENT_NAMESPACE = '.powertip',
		RAD2DEG = 180 / Math.PI,
		MOUSE_EVENTS = [
			'click',
			'dblclick',
			'mousedown',
			'mouseup',
			'mousemove',
			'mouseover',
			'mouseout',
			'mouseenter',
			'mouseleave',
			'contextmenu'
		];

	/**
	 * Session data
	 * Private properties global to all powerTip instances
	 */
	var session = {
		elements: null,
		tooltips: null,
		isTipOpen: false,
		isFixedTipOpen: false,
		isClosing: false,
		tipOpenImminent: false,
		activeHover: null,
		currentX: 0,
		currentY: 0,
		previousX: 0,
		previousY: 0,
		desyncTimeout: null,
		closeDelayTimeout: null,
		mouseTrackingActive: false,
		delayInProgress: false,
		windowWidth: 0,
		windowHeight: 0,
		scrollTop: 0,
		scrollLeft: 0
	};

	/**
	 * Collision enumeration
	 * @enum {number}
	 */
	var Collision = {
		none: 0,
		top: 1,
		bottom: 2,
		left: 4,
		right: 8
	};

	/**
	 * Display hover tooltips on the matched elements.
	 * @param {(Object|string)=} opts The options object to use for the plugin, or
	 *     the name of a method to invoke on the first matched element.
	 * @param {*=} [arg] Argument for an invoked method (optional).
	 * @return {jQuery} jQuery object for the matched selectors.
	 */
	$.fn.powerTip = function(opts, arg) {
		var targetElements = this,
			options,
			tipController;

		// don't do any work if there were no matched elements
		if (!targetElements.length) {
			return targetElements;
		}

		// handle api method calls on the plugin, e.g. powerTip('hide')
		if ($.type(opts) === 'string' && $.powerTip[opts]) {
			return $.powerTip[opts].call(targetElements, targetElements, arg);
		}

		// extend options
		options = $.extend({}, $.fn.powerTip.defaults, opts);

		// handle repeated powerTip calls on the same element by destroying any
		// original instance hooked to it and replacing it with this call
		$.powerTip.destroy(targetElements);

		// instantiate the TooltipController for this instance
		tipController = new TooltipController(options);

		// hook mouse and viewport dimension tracking
		initTracking();

		// setup the elements
		targetElements.each(function elementSetup() {
			var $this = $(this),
				dataPowertip = $this.data(DATA_POWERTIP),
				dataElem = $this.data(DATA_POWERTIPJQ),
				dataTarget = $this.data(DATA_POWERTIPTARGET),
				title = $this.attr('title');

			// attempt to use title attribute text if there is no data-powertip,
			// data-powertipjq or data-powertiptarget. If we do use the title
			// attribute, delete the attribute so the browser will not show it
			if (!dataPowertip && !dataTarget && !dataElem && title) {
				$this.data(DATA_POWERTIP, title);
				$this.data(DATA_ORIGINALTITLE, title);
				$this.removeAttr('title');
			}

			// create hover controllers for each element
			$this.data(
				DATA_DISPLAYCONTROLLER,
				new DisplayController($this, options, tipController)
			);
		});

		// attach events to matched elements if the manual option is not enabled
		if (!options.manual) {
			// attach open events
			$.each(options.openEvents, function(idx, evt) {
				if ($.inArray(evt, options.closeEvents) > -1) {
					// event is in both openEvents and closeEvents, so toggle it
					targetElements.on(evt + EVENT_NAMESPACE, function elementToggle(event) {
						$.powerTip.toggle(this, event);
					});
				} else {
					targetElements.on(evt + EVENT_NAMESPACE, function elementOpen(event) {
						$.powerTip.show(this, event);
					});
				}
			});

			// attach close events
			$.each(options.closeEvents, function(idx, evt) {
				if ($.inArray(evt, options.openEvents) < 0) {
					targetElements.on(evt + EVENT_NAMESPACE, function elementClose(event) {
						// set immediate to true for any event without mouse info
						$.powerTip.hide(this, !isMouseEvent(event));
					});
				}
			});

			// attach escape key close event
			targetElements.on('keydown' + EVENT_NAMESPACE, function elementKeyDown(event) {
				// always close tooltip when the escape key is pressed
				if (event.keyCode === 27) {
					$.powerTip.hide(this, true);
				}
			});
		}

		// remember elements that the plugin is attached to
		session.elements = session.elements ? session.elements.add(targetElements) : targetElements;

		return targetElements;
	};

	/**
	 * Default options for the powerTip plugin.
	 */
	$.fn.powerTip.defaults = {
		fadeInTime: 200,
		fadeOutTime: 100,
		followMouse: false,
		popupId: 'powerTip',
		popupClass: null,
		intentSensitivity: 7,
		intentPollInterval: 100,
		closeDelay: 100,
		placement: 'n',
		smartPlacement: false,
		offset: 10,
		mouseOnToPopup: false,
		manual: false,
		openEvents: [ 'mouseenter', 'focus' ],
		closeEvents: [ 'mouseleave', 'blur' ]
	};

	/**
	 * Default smart placement priority lists.
	 * The first item in the array is the highest priority, the last is the lowest.
	 * The last item is also the default, which will be used if all previous options
	 * do not fit.
	 */
	$.fn.powerTip.smartPlacementLists = {
		n: [ 'n', 'ne', 'nw', 's' ],
		e: [ 'e', 'ne', 'se', 'w', 'nw', 'sw', 'n', 's', 'e' ],
		s: [ 's', 'se', 'sw', 'n' ],
		w: [ 'w', 'nw', 'sw', 'e', 'ne', 'se', 'n', 's', 'w' ],
		nw: [ 'nw', 'w', 'sw', 'n', 's', 'se', 'nw' ],
		ne: [ 'ne', 'e', 'se', 'n', 's', 'sw', 'ne' ],
		sw: [ 'sw', 'w', 'nw', 's', 'n', 'ne', 'sw' ],
		se: [ 'se', 'e', 'ne', 's', 'n', 'nw', 'se' ],
		'nw-alt': [ 'nw-alt', 'n', 'ne-alt', 'sw-alt', 's', 'se-alt', 'w', 'e' ],
		'ne-alt': [ 'ne-alt', 'n', 'nw-alt', 'se-alt', 's', 'sw-alt', 'e', 'w' ],
		'sw-alt': [ 'sw-alt', 's', 'se-alt', 'nw-alt', 'n', 'ne-alt', 'w', 'e' ],
		'se-alt': [ 'se-alt', 's', 'sw-alt', 'ne-alt', 'n', 'nw-alt', 'e', 'w' ]
	};

	/**
	 * Public API
	 */
	$.powerTip = {
		/**
		 * Attempts to show the tooltip for the specified element.
		 * @param {jQuery|Element} element The element to open the tooltip for.
		 * @param {jQuery.Event=} event jQuery event for hover intent and mouse
		 *     tracking (optional).
		 * @return {jQuery|Element} The original jQuery object or DOM Element.
		 */
		show: function apiShowTip(element, event) {
			// if we were given a mouse event then run the hover intent testing,
			// otherwise, simply show the tooltip asap
			if (isMouseEvent(event)) {
				trackMouse(event);
				session.previousX = event.pageX;
				session.previousY = event.pageY;
				$(element).data(DATA_DISPLAYCONTROLLER).show();
			} else {
				$(element).first().data(DATA_DISPLAYCONTROLLER).show(true, true);
			}
			return element;
		},

		/**
		 * Repositions the tooltip on the element.
		 * @param {jQuery|Element} element The element the tooltip is shown for.
		 * @return {jQuery|Element} The original jQuery object or DOM Element.
		 */
		reposition: function apiResetPosition(element) {
			$(element).first().data(DATA_DISPLAYCONTROLLER).resetPosition();
			return element;
		},

		/**
		 * Attempts to close any open tooltips.
		 * @param {(jQuery|Element)=} element The element with the tooltip that
		 *     should be closed (optional).
		 * @param {boolean=} immediate Disable close delay (optional).
		 * @return {jQuery|Element|undefined} The original jQuery object or DOM
		 *     Element, if one was specified.
		 */
		hide: function apiCloseTip(element, immediate) {
			var displayController;

			// set immediate to true when no element is specified
			immediate = element ? immediate : true;

			// find the relevant display controller
			if (element) {
				displayController = $(element).first().data(DATA_DISPLAYCONTROLLER);
			} else if (session.activeHover) {
				displayController = session.activeHover.data(DATA_DISPLAYCONTROLLER);
			}

			// if found, hide the tip
			if (displayController) {
				displayController.hide(immediate);
			}

			return element;
		},

		/**
		 * Toggles the tooltip for the specified element. This will open a closed
		 * tooltip, or close an open tooltip.
		 * @param {jQuery|Element} element The element with the tooltip that
		 *     should be toggled.
		 * @param {jQuery.Event=} event jQuery event for hover intent and mouse
		 *     tracking (optional).
		 * @return {jQuery|Element} The original jQuery object or DOM Element.
		 */
		toggle: function apiToggle(element, event) {
			if (session.activeHover && session.activeHover.is(element)) {
				// tooltip for element is active, so close it
				$.powerTip.hide(element, !isMouseEvent(event));
			} else {
				// tooltip for element is not active, so open it
				$.powerTip.show(element, event);
			}
			return element;
		},

		/**
		 * Destroy and roll back any powerTip() instance on the specified elements.
		 * If no elements are specified then all elements that the plugin is
		 * currently attached to will be rolled back.
		 * @param {(jQuery|Element)=} element The element with the powerTip instance.
		 * @return {jQuery|Element|undefined} The original jQuery object or DOM
		 *     Element, if one was specified.
		 */
		destroy: function apiDestroy(element) {
			var $element = element ? $(element) : session.elements;

			// if the plugin is not hooked to any elements then there is no point
			// trying to destroy anything, or dealing with the possible errors
			if (!session.elements || session.elements.length === 0) {
				return element;
			}

			// if a tooltip is currently open for an element we are being asked to
			// destroy then it should be forced to close
			if (session.isTipOpen && !session.isClosing && $element.filter(session.activeHover).length > 0) {
				// if the tooltip is waiting to close then cancel that delay timer
				if (session.delayInProgress) {
					session.activeHover.data(DATA_DISPLAYCONTROLLER).cancel();
				}
				// hide the tooltip, immediately
				$.powerTip.hide(session.activeHover, true);
			}

			// unhook events and destroy plugin changes to each element
			$element.off(EVENT_NAMESPACE).each(function destroy() {
				var $this = $(this),
					dataAttributes = [
						DATA_ORIGINALTITLE,
						DATA_DISPLAYCONTROLLER,
						DATA_HASACTIVEHOVER,
						DATA_FORCEDOPEN
					];

				// revert title attribute
				if ($this.data(DATA_ORIGINALTITLE)) {
					$this.attr('title', $this.data(DATA_ORIGINALTITLE));
					dataAttributes.push(DATA_POWERTIP);
				}

				// remove data attributes
				$this.removeData(dataAttributes);
			});

			// remove destroyed element from active elements collection
			session.elements = session.elements.not($element);

			// if there are no active elements left then we will unhook all of the
			// events that we've bound code to and remove the tooltip elements
			if (session.elements.length === 0) {
				$window.off(EVENT_NAMESPACE);
				$document.off(EVENT_NAMESPACE);
				session.mouseTrackingActive = false;
				session.tooltips.remove();
				session.tooltips = null;
			}

			return element;
		}
	};

	// API aliasing
	$.powerTip.showTip = $.powerTip.show;
	$.powerTip.closeTip = $.powerTip.hide;

	/**
	 * Creates a new CSSCoordinates object.
	 * @private
	 * @constructor
	 */
	function CSSCoordinates() {
		var me = this;

		// initialize object properties
		me.top = 'auto';
		me.left = 'auto';
		me.right = 'auto';
		me.bottom = 'auto';

		/**
		 * Set a property to a value.
		 * @private
		 * @param {string} property The name of the property.
		 * @param {number} value The value of the property.
		 */
		me.set = function(property, value) {
			if ($.isNumeric(value)) {
				me[property] = Math.round(value);
			}
		};
	}

	/**
	 * Creates a new tooltip display controller.
	 * @private
	 * @constructor
	 * @param {jQuery} element The element that this controller will handle.
	 * @param {Object} options Options object containing settings.
	 * @param {TooltipController} tipController The TooltipController object for
	 *     this instance.
	 */
	function DisplayController(element, options, tipController) {
		var hoverTimer = null,
			myCloseDelay = null;

		/**
		 * Begins the process of showing a tooltip.
		 * @private
		 * @param {boolean=} immediate Skip intent testing (optional).
		 * @param {boolean=} forceOpen Ignore cursor position and force tooltip to
		 *     open (optional).
		 */
		function openTooltip(immediate, forceOpen) {
			cancelTimer();
			if (!element.data(DATA_HASACTIVEHOVER)) {
				if (!immediate) {
					session.tipOpenImminent = true;
					hoverTimer = setTimeout(
						function intentDelay() {
							hoverTimer = null;
							checkForIntent();
						},
						options.intentPollInterval
					);
				} else {
					if (forceOpen) {
						element.data(DATA_FORCEDOPEN, true);
					}
					closeAnyDelayed();
					tipController.showTip(element);
				}
			} else {
				// cursor left and returned to this element, cancel close
				cancelClose();
			}
		}

		/**
		 * Begins the process of closing a tooltip.
		 * @private
		 * @param {boolean=} disableDelay Disable close delay (optional).
		 */
		function closeTooltip(disableDelay) {
			// if this instance already has a close delay in progress then halt it
			if (myCloseDelay) {
				myCloseDelay = session.closeDelayTimeout = clearTimeout(myCloseDelay);
				session.delayInProgress = false;
			}
			cancelTimer();
			session.tipOpenImminent = false;
			if (element.data(DATA_HASACTIVEHOVER)) {
				element.data(DATA_FORCEDOPEN, false);
				if (!disableDelay) {
					session.delayInProgress = true;
					session.closeDelayTimeout = setTimeout(
						function closeDelay() {
							session.closeDelayTimeout = null;
							tipController.hideTip(element);
							session.delayInProgress = false;
							myCloseDelay = null;
						},
						options.closeDelay
					);
					// save internal reference close delay id so we can check if the
					// active close delay belongs to this instance
					myCloseDelay = session.closeDelayTimeout;
				} else {
					tipController.hideTip(element);
				}
			}
		}

		/**
		 * Checks mouse position to make sure that the user intended to hover on the
		 * specified element before showing the tooltip.
		 * @private
		 */
		function checkForIntent() {
			// calculate mouse position difference
			var xDifference = Math.abs(session.previousX - session.currentX),
				yDifference = Math.abs(session.previousY - session.currentY),
				totalDifference = xDifference + yDifference;

			// check if difference has passed the sensitivity threshold
			if (totalDifference < options.intentSensitivity) {
				cancelClose();
				closeAnyDelayed();
				tipController.showTip(element);
			} else {
				// try again
				session.previousX = session.currentX;
				session.previousY = session.currentY;
				openTooltip();
			}
		}

		/**
		 * Cancels active hover timer.
		 * @private
		 * @param {boolean=} stopClose Cancel any active close delay timer.
		 */
		function cancelTimer(stopClose) {
			hoverTimer = clearTimeout(hoverTimer);
			// cancel the current close delay if the active close delay is for this
			// element or the stopClose argument is true
			if (session.closeDelayTimeout && myCloseDelay === session.closeDelayTimeout || stopClose) {
				cancelClose();
			}
		}

		/**
		 * Cancels any active close delay timer.
		 * @private
		 */
		function cancelClose() {
			session.closeDelayTimeout = clearTimeout(session.closeDelayTimeout);
			session.delayInProgress = false;
		}

		/**
		 * Asks any tooltips waiting on their close delay to close now.
		 * @private
		 */
		function closeAnyDelayed() {
			// if another element is waiting for its close delay then we should ask
			// it to close immediately so we can proceed without unexpected timeout
			// code being run during this tooltip's lifecycle
			if (session.delayInProgress && session.activeHover && !session.activeHover.is(element)) {
				session.activeHover.data(DATA_DISPLAYCONTROLLER).hide(true);
			}
		}

		/**
		 * Repositions the tooltip on this element.
		 * @private
		 */
		function repositionTooltip() {
			tipController.resetPosition(element);
		}

		// expose the methods
		this.show = openTooltip;
		this.hide = closeTooltip;
		this.cancel = cancelTimer;
		this.resetPosition = repositionTooltip;
	}

	/**
	 * Creates a new Placement Calculator.
	 * @private
	 * @constructor
	 */
	function PlacementCalculator() {
		/**
		 * Compute the CSS position to display a tooltip at the specified placement
		 * relative to the specified element.
		 * @private
		 * @param {jQuery} element The element that the tooltip should target.
		 * @param {string} placement The placement for the tooltip.
		 * @param {number} tipWidth Width of the tooltip element in pixels.
		 * @param {number} tipHeight Height of the tooltip element in pixels.
		 * @param {number} offset Distance to offset tooltips in pixels.
		 * @return {CSSCoordinates} A CSSCoordinates object with the position.
		 */
		function computePlacementCoords(element, placement, tipWidth, tipHeight, offset) {
			var placementBase = placement.split('-')[0], // ignore 'alt' for corners
				coords = new CSSCoordinates(),
				position;

			if (isSvgElement(element)) {
				position = getSvgPlacement(element, placementBase);
			} else {
				position = getHtmlPlacement(element, placementBase);
			}

			// calculate the appropriate x and y position in the document
			switch (placement) {
				case 'n':
					coords.set('left', position.left - (tipWidth / 2));
					coords.set('bottom', session.windowHeight - position.top + offset);
					break;
				case 'e':
					coords.set('left', position.left + offset);
					coords.set('top', position.top - (tipHeight / 2));
					break;
				case 's':
					coords.set('left', position.left - (tipWidth / 2));
					coords.set('top', position.top + offset);
					break;
				case 'w':
					coords.set('top', position.top - (tipHeight / 2));
					coords.set('right', session.windowWidth - position.left + offset);
					break;
				case 'nw':
					coords.set('bottom', session.windowHeight - position.top + offset);
					coords.set('right', session.windowWidth - position.left - 20);
					break;
				case 'nw-alt':
					coords.set('left', position.left);
					coords.set('bottom', session.windowHeight - position.top + offset);
					break;
				case 'ne':
					coords.set('left', position.left - 20);
					coords.set('bottom', session.windowHeight - position.top + offset);
					break;
				case 'ne-alt':
					coords.set('bottom', session.windowHeight - position.top + offset);
					coords.set('right', session.windowWidth - position.left);
					break;
				case 'sw':
					coords.set('top', position.top + offset);
					coords.set('right', session.windowWidth - position.left - 20);
					break;
				case 'sw-alt':
					coords.set('left', position.left);
					coords.set('top', position.top + offset);
					break;
				case 'se':
					coords.set('left', position.left - 20);
					coords.set('top', position.top + offset);
					break;
				case 'se-alt':
					coords.set('top', position.top + offset);
					coords.set('right', session.windowWidth - position.left);
					break;
			}

			return coords;
		}

		/**
		 * Finds the tooltip attachment point in the document for a HTML DOM element
		 * for the specified placement.
		 * @private
		 * @param {jQuery} element The element that the tooltip should target.
		 * @param {string} placement The placement for the tooltip.
		 * @return {Object} An object with the top,left position values.
		 */
		function getHtmlPlacement(element, placement) {
			var objectOffset = element.offset(),
				objectWidth = element.outerWidth(),
				objectHeight = element.outerHeight(),
				left,
				top;

			// calculate the appropriate x and y position in the document
			switch (placement) {
				case 'n':
					left = objectOffset.left + objectWidth / 2;
					top = objectOffset.top;
					break;
				case 'e':
					left = objectOffset.left + objectWidth;
					top = objectOffset.top + objectHeight / 2;
					break;
				case 's':
					left = objectOffset.left + objectWidth / 2;
					top = objectOffset.top + objectHeight;
					break;
				case 'w':
					left = objectOffset.left;
					top = objectOffset.top + objectHeight / 2;
					break;
				case 'nw':
					left = objectOffset.left;
					top = objectOffset.top;
					break;
				case 'ne':
					left = objectOffset.left + objectWidth;
					top = objectOffset.top;
					break;
				case 'sw':
					left = objectOffset.left;
					top = objectOffset.top + objectHeight;
					break;
				case 'se':
					left = objectOffset.left + objectWidth;
					top = objectOffset.top + objectHeight;
					break;
			}

			return {
				top: top,
				left: left
			};
		}

		/**
		 * Finds the tooltip attachment point in the document for a SVG element for
		 * the specified placement.
		 * @private
		 * @param {jQuery} element The element that the tooltip should target.
		 * @param {string} placement The placement for the tooltip.
		 * @return {Object} An object with the top,left position values.
		 */
		function getSvgPlacement(element, placement) {
			var svgElement = element.closest('svg')[0],
				domElement = element[0],
				point = svgElement.createSVGPoint(),
				boundingBox = domElement.getBBox(),
				matrix = domElement.getScreenCTM(),
				halfWidth = boundingBox.width / 2,
				halfHeight = boundingBox.height / 2,
				placements = [],
				placementKeys = [ 'nw', 'n', 'ne', 'e', 'se', 's', 'sw', 'w' ],
				coords,
				rotation,
				steps,
				x;

			/**
			 * Transform and append the current points to the placements list.
			 * @private
			 */
			function pushPlacement() {
				placements.push(point.matrixTransform(matrix));
			}

			// get bounding box corners and midpoints
			point.x = boundingBox.x;
			point.y = boundingBox.y;
			pushPlacement();
			point.x += halfWidth;
			pushPlacement();
			point.x += halfWidth;
			pushPlacement();
			point.y += halfHeight;
			pushPlacement();
			point.y += halfHeight;
			pushPlacement();
			point.x -= halfWidth;
			pushPlacement();
			point.x -= halfWidth;
			pushPlacement();
			point.y -= halfHeight;
			pushPlacement();

			// determine rotation
			if (placements[0].y !== placements[1].y || placements[0].x !== placements[7].x) {
				rotation = Math.atan2(matrix.b, matrix.a) * RAD2DEG;
				steps = Math.ceil(((rotation % 360) - 22.5) / 45);
				if (steps < 1) {
					steps += 8;
				}
				while (steps--) {
					placementKeys.push(placementKeys.shift());
				}
			}

			// find placement
			for (x = 0; x < placements.length; x++) {
				if (placementKeys[x] === placement) {
					coords = placements[x];
					break;
				}
			}

			return {
				top: coords.y + session.scrollTop,
				left: coords.x + session.scrollLeft
			};
		}

		// expose methods
		this.compute = computePlacementCoords;
	}

	/**
	 * Creates a new tooltip controller.
	 * @private
	 * @constructor
	 * @param {Object} options Options object containing settings.
	 */
	function TooltipController(options) {
		var placementCalculator = new PlacementCalculator(),
			tipElement = $('#' + options.popupId);

		// build and append tooltip div if it does not already exist
		if (tipElement.length === 0) {
			tipElement = $('<div/>', { id: options.popupId });
			// grab body element if it was not populated when the script loaded
			// note: this hack exists solely for jsfiddle support
			if ($body.length === 0) {
				$body = $('body');
			}
			$body.append(tipElement);
			// remember the tooltip elements that the plugin has created
			session.tooltips = session.tooltips ? session.tooltips.add(tipElement) : tipElement;
		}

		// hook mousemove for cursor follow tooltips
		if (options.followMouse) {
			// only one positionTipOnCursor hook per tooltip element, please
			if (!tipElement.data(DATA_HASMOUSEMOVE)) {
				$document.on('mousemove' + EVENT_NAMESPACE, positionTipOnCursor);
				$window.on('scroll' + EVENT_NAMESPACE, positionTipOnCursor);
				tipElement.data(DATA_HASMOUSEMOVE, true);
			}
		}

		/**
		 * Gives the specified element the active-hover state and queues up the
		 * showTip function.
		 * @private
		 * @param {jQuery} element The element that the tooltip should target.
		 */
		function beginShowTip(element) {
			element.data(DATA_HASACTIVEHOVER, true);
			// show tooltip, asap
			tipElement.queue(function queueTipInit(next) {
				showTip(element);
				next();
			});
		}

		/**
		 * Shows the tooltip, as soon as possible.
		 * @private
		 * @param {jQuery} element The element that the tooltip should target.
		 */
		function showTip(element) {
			var tipContent;

			// it is possible, especially with keyboard navigation, to move on to
			// another element with a tooltip during the queue to get to this point
			// in the code. if that happens then we need to not proceed or we may
			// have the fadeout callback for the last tooltip execute immediately
			// after this code runs, causing bugs.
			if (!element.data(DATA_HASACTIVEHOVER)) {
				return;
			}

			// if the tooltip is open and we got asked to open another one then the
			// old one is still in its fadeOut cycle, so wait and try again
			if (session.isTipOpen) {
				if (!session.isClosing) {
					hideTip(session.activeHover);
				}
				tipElement.delay(100).queue(function queueTipAgain(next) {
					showTip(element);
					next();
				});
				return;
			}

			// trigger powerTipPreRender event
			element.trigger('powerTipPreRender');

			// set tooltip content
			tipContent = getTooltipContent(element);
			if (tipContent) {
				tipElement.empty().append(tipContent);
			} else {
				// we have no content to display, give up
				return;
			}

			// trigger powerTipRender event
			element.trigger('powerTipRender');

			session.activeHover = element;
			session.isTipOpen = true;

			tipElement.data(DATA_MOUSEONTOTIP, options.mouseOnToPopup);

			// add custom class to tooltip element
			tipElement.addClass(options.popupClass);

			// set tooltip position
			// revert to static placement when the "force open" flag was set because
			// that flag means that we do not have accurate mouse position info
			if (!options.followMouse || element.data(DATA_FORCEDOPEN)) {
				positionTipOnElement(element);
				session.isFixedTipOpen = true;
			} else {
				positionTipOnCursor();
			}

			// close tooltip when clicking anywhere on the page, with the exception
			// of the tooltip's trigger element and any elements that are within a
			// tooltip that has 'mouseOnToPopup' option enabled
			// always enable this feature when the "force open" flag is set on a
			// followMouse tooltip because we reverted to static placement above
			if (!element.data(DATA_FORCEDOPEN) && !options.followMouse) {
				$document.on('click' + EVENT_NAMESPACE, function documentClick(event) {
					var target = event.target;
					if (target !== element[0]) {
						if (options.mouseOnToPopup) {
							if (target !== tipElement[0] && !$.contains(tipElement[0], target)) {
								$.powerTip.hide();
							}
						} else {
							$.powerTip.hide();
						}
					}
				});
			}

			// if we want to be able to mouse on to the tooltip then we need to
			// attach hover events to the tooltip that will cancel a close request
			// on mouseenter and start a new close request on mouseleave
			// only hook these listeners if we're not in manual mode
			if (options.mouseOnToPopup && !options.manual) {
				tipElement.on('mouseenter' + EVENT_NAMESPACE, function tipMouseEnter() {
					// check activeHover in case the mouse cursor entered the
					// tooltip during the fadeOut and close cycle
					if (session.activeHover) {
						session.activeHover.data(DATA_DISPLAYCONTROLLER).cancel();
					}
				});
				tipElement.on('mouseleave' + EVENT_NAMESPACE, function tipMouseLeave() {
					// check activeHover in case the mouse cursor left the tooltip
					// during the fadeOut and close cycle
					if (session.activeHover) {
						session.activeHover.data(DATA_DISPLAYCONTROLLER).hide();
					}
				});
			}

			// fadein
			tipElement.fadeIn(options.fadeInTime, function fadeInCallback() {
				// start desync polling
				if (!session.desyncTimeout) {
					session.desyncTimeout = setInterval(closeDesyncedTip, 500);
				}

				// trigger powerTipOpen event
				element.trigger('powerTipOpen');
			});
		}

		/**
		 * Hides the tooltip.
		 * @private
		 * @param {jQuery} element The element that the tooltip should target.
		 */
		function hideTip(element) {
			// reset session
			session.isClosing = true;
			session.isTipOpen = false;

			// stop desync polling
			session.desyncTimeout = clearInterval(session.desyncTimeout);

			// reset element state
			element.data(DATA_HASACTIVEHOVER, false);
			element.data(DATA_FORCEDOPEN, false);

			// remove document click handler
			$document.off('click' + EVENT_NAMESPACE);

			// unbind the mouseOnToPopup events if they were set
			tipElement.off(EVENT_NAMESPACE);

			// fade out
			tipElement.fadeOut(options.fadeOutTime, function fadeOutCallback() {
				var coords = new CSSCoordinates();

				// reset session and tooltip element
				session.activeHover = null;
				session.isClosing = false;
				session.isFixedTipOpen = false;
				tipElement.removeClass();

				// support mouse-follow and fixed position tips at the same time by
				// moving the tooltip to the last cursor location after it is hidden
				coords.set('top', session.currentY + options.offset);
				coords.set('left', session.currentX + options.offset);
				tipElement.css(coords);

				// trigger powerTipClose event
				element.trigger('powerTipClose');
			});
		}

		/**
		 * Moves the tooltip to the users mouse cursor.
		 * @private
		 */
		function positionTipOnCursor() {
			var tipWidth,
				tipHeight,
				coords,
				collisions,
				collisionCount;

			// to support having fixed tooltips on the same page as cursor tooltips,
			// where both instances are referencing the same tooltip element, we
			// need to keep track of the mouse position constantly, but we should
			// only set the tip location if a fixed tip is not currently open, a tip
			// open is imminent or active, and the tooltip element in question does
			// have a mouse-follow using it.
			if (!session.isFixedTipOpen && (session.isTipOpen || (session.tipOpenImminent && tipElement.data(DATA_HASMOUSEMOVE)))) {
				// grab measurements
				tipWidth = tipElement.outerWidth();
				tipHeight = tipElement.outerHeight();
				coords = new CSSCoordinates();

				// grab collisions
				coords.set('top', session.currentY + options.offset);
				coords.set('left', session.currentX + options.offset);
				collisions = getViewportCollisions(
					coords,
					tipWidth,
					tipHeight
				);

				// handle tooltip view port collisions
				if (collisions !== Collision.none) {
					collisionCount = countFlags(collisions);
					if (collisionCount === 1) {
						// if there is only one collision (bottom or right) then
						// simply constrain the tooltip to the view port
						if (collisions === Collision.right) {
							coords.set('left', session.scrollLeft + session.windowWidth - tipWidth);
						} else if (collisions === Collision.bottom) {
							coords.set('top', session.scrollTop + session.windowHeight - tipHeight);
						}
					} else {
						// if the tooltip has more than one collision then it is
						// trapped in the corner and should be flipped to get it out
						// of the users way
						coords.set('left', session.currentX - tipWidth - options.offset);
						coords.set('top', session.currentY - tipHeight - options.offset);
					}
				}

				// position the tooltip
				tipElement.css(coords);
			}
		}

		/**
		 * Sets the tooltip to the correct position relative to the specified target
		 * element. Based on options settings.
		 * @private
		 * @param {jQuery} element The element that the tooltip should target.
		 */
		function positionTipOnElement(element) {
			var priorityList,
				finalPlacement;

			// when the followMouse option is enabled and the "force open" flag is
			// set we revert to static positioning. since the developer may not have
			// considered this scenario we should use smart placement
			if (options.smartPlacement || (options.followMouse && element.data(DATA_FORCEDOPEN))) {
				priorityList = $.fn.powerTip.smartPlacementLists[options.placement];

				// iterate over the priority list and use the first placement option
				// that does not collide with the view port. if they all collide
				// then the last placement in the list will be used.
				$.each(priorityList, function(idx, pos) {
					// place tooltip and find collisions
					var collisions = getViewportCollisions(
						placeTooltip(element, pos),
						tipElement.outerWidth(),
						tipElement.outerHeight()
					);

					// update the final placement variable
					finalPlacement = pos;

					// break if there were no collisions
					return collisions !== Collision.none;
				});
			} else {
				// if we're not going to use the smart placement feature then just
				// compute the coordinates and do it
				placeTooltip(element, options.placement);
				finalPlacement = options.placement;
			}

			// add placement as class for CSS arrows
			tipElement.removeClass('w nw sw e ne se n s w se-alt sw-alt ne-alt nw-alt');
			tipElement.addClass(finalPlacement);
		}

		/**
		 * Sets the tooltip position to the appropriate values to show the tip at
		 * the specified placement. This function will iterate and test the tooltip
		 * to support elastic tooltips.
		 * @private
		 * @param {jQuery} element The element that the tooltip should target.
		 * @param {string} placement The placement for the tooltip.
		 * @return {CSSCoordinates} A CSSCoordinates object with the top, left, and
		 *     right position values.
		 */
		function placeTooltip(element, placement) {
			var iterationCount = 0,
				tipWidth,
				tipHeight,
				coords = new CSSCoordinates();

			// set the tip to 0,0 to get the full expanded width
			coords.set('top', 0);
			coords.set('left', 0);
			tipElement.css(coords);

			// to support elastic tooltips we need to check for a change in the
			// rendered dimensions after the tooltip has been positioned
			do {
				// grab the current tip dimensions
				tipWidth = tipElement.outerWidth();
				tipHeight = tipElement.outerHeight();

				// get placement coordinates
				coords = placementCalculator.compute(
					element,
					placement,
					tipWidth,
					tipHeight,
					options.offset
				);

				// place the tooltip
				tipElement.css(coords);
			} while (
				// sanity check: limit to 5 iterations, and...
				++iterationCount <= 5 &&
				// try again if the dimensions changed after placement
				(tipWidth !== tipElement.outerWidth() || tipHeight !== tipElement.outerHeight())
			);

			return coords;
		}

		/**
		 * Checks for a tooltip desync and closes the tooltip if one occurs.
		 * @private
		 */
		function closeDesyncedTip() {
			var isDesynced = false,
				hasDesyncableCloseEvent = $.grep(
					[ 'mouseleave', 'mouseout', 'blur', 'focusout' ],
					function(eventType) {
						return $.inArray(eventType, options.closeEvents) !== -1;
					}
				).length > 0;

			// It is possible for the mouse cursor to leave an element without
			// firing the mouseleave or blur event. This most commonly happens when
			// the element is disabled under mouse cursor. If this happens it will
			// result in a desynced tooltip because the tooltip was never asked to
			// close. So we should periodically check for a desync situation and
			// close the tip if such a situation arises.
			if (session.isTipOpen && !session.isClosing && !session.delayInProgress && hasDesyncableCloseEvent) {
				if (session.activeHover.data(DATA_HASACTIVEHOVER) === false || session.activeHover.is(':disabled')) {
					// user moused onto another tip or active hover is disabled
					isDesynced = true;
				} else if (!isMouseOver(session.activeHover) && !session.activeHover.is(':focus') && !session.activeHover.data(DATA_FORCEDOPEN)) {
					// hanging tip - have to test if mouse position is not over the
					// active hover and not over a tooltip set to let the user
					// interact with it.
					// for keyboard navigation: this only counts if the element does
					// not have focus.
					// for tooltips opened via the api: we need to check if it has
					// the forcedOpen flag.
					if (tipElement.data(DATA_MOUSEONTOTIP)) {
						if (!isMouseOver(tipElement)) {
							isDesynced = true;
						}
					} else {
						isDesynced = true;
					}
				}

				if (isDesynced) {
					// close the desynced tip
					hideTip(session.activeHover);
				}
			}
		}

		// expose methods
		this.showTip = beginShowTip;
		this.hideTip = hideTip;
		this.resetPosition = positionTipOnElement;
	}

	/**
	 * Determine whether a jQuery object is an SVG element
	 * @private
	 * @param {jQuery} element The element to check
	 * @return {boolean} Whether this is an SVG element
	 */
	function isSvgElement(element) {
		return Boolean(window.SVGElement && element[0] instanceof SVGElement);
	}

	/**
	 * Determines if the specified jQuery.Event object has mouse data.
	 * @private
	 * @param {jQuery.Event=} event The jQuery.Event object to test.
	 * @return {boolean} True if there is mouse data, otherwise false.
	 */
	function isMouseEvent(event) {
		return Boolean(event && $.inArray(event.type, MOUSE_EVENTS) > -1 &&
			typeof event.pageX === 'number');
	}

	/**
	 * Initializes the viewport dimension cache and hooks up the mouse position
	 * tracking and viewport dimension tracking events.
	 * Prevents attaching the events more than once.
	 * @private
	 */
	function initTracking() {
		if (!session.mouseTrackingActive) {
			session.mouseTrackingActive = true;

			// grab the current viewport dimensions on load
			getViewportDimensions();
			$(getViewportDimensions);

			// hook mouse move tracking
			$document.on('mousemove' + EVENT_NAMESPACE, trackMouse);

			// hook viewport dimensions tracking
			$window.on('resize' + EVENT_NAMESPACE, trackResize);
			$window.on('scroll' + EVENT_NAMESPACE, trackScroll);
		}
	}

	/**
	 * Updates the viewport dimensions cache.
	 * @private
	 */
	function getViewportDimensions() {
		session.scrollLeft = $window.scrollLeft();
		session.scrollTop = $window.scrollTop();
		session.windowWidth = $window.width();
		session.windowHeight = $window.height();
	}

	/**
	 * Updates the window size info in the viewport dimensions cache.
	 * @private
	 */
	function trackResize() {
		session.windowWidth = $window.width();
		session.windowHeight = $window.height();
	}

	/**
	 * Updates the scroll offset info in the viewport dimensions cache.
	 * @private
	 */
	function trackScroll() {
		var x = $window.scrollLeft(),
			y = $window.scrollTop();
		if (x !== session.scrollLeft) {
			session.currentX += x - session.scrollLeft;
			session.scrollLeft = x;
		}
		if (y !== session.scrollTop) {
			session.currentY += y - session.scrollTop;
			session.scrollTop = y;
		}
	}

	/**
	 * Saves the current mouse coordinates to the session object.
	 * @private
	 * @param {jQuery.Event} event The mousemove event for the document.
	 */
	function trackMouse(event) {
		session.currentX = event.pageX;
		session.currentY = event.pageY;
	}

	/**
	 * Tests if the mouse is currently over the specified element.
	 * @private
	 * @param {jQuery} element The element to check for hover.
	 * @return {boolean} True if the mouse is over the element, otherwise false.
	 */
	function isMouseOver(element) {
		// use getBoundingClientRect() because jQuery's width() and height()
		// methods do not work with SVG elements
		// compute width/height because those properties do not exist on the object
		// returned by getBoundingClientRect() in older versions of IE
		var elementPosition = element.offset(),
			elementBox = element[0].getBoundingClientRect(),
			elementWidth = elementBox.right - elementBox.left,
			elementHeight = elementBox.bottom - elementBox.top;

		return session.currentX >= elementPosition.left &&
			session.currentX <= elementPosition.left + elementWidth &&
			session.currentY >= elementPosition.top &&
			session.currentY <= elementPosition.top + elementHeight;
	}

	/**
	 * Fetches the tooltip content from the specified element's data attributes.
	 * @private
	 * @param {jQuery} element The element to get the tooltip content for.
	 * @return {(string|jQuery|undefined)} The text/HTML string, jQuery object, or
	 *     undefined if there was no tooltip content for the element.
	 */
	function getTooltipContent(element) {
		var tipText = element.data(DATA_POWERTIP),
			tipObject = element.data(DATA_POWERTIPJQ),
			tipTarget = element.data(DATA_POWERTIPTARGET),
			targetElement,
			content;

		if (tipText) {
			if ($.isFunction(tipText)) {
				tipText = tipText.call(element[0]);
			}
			content = tipText;
		} else if (tipObject) {
			if ($.isFunction(tipObject)) {
				tipObject = tipObject.call(element[0]);
			}
			if (tipObject.length > 0) {
				content = tipObject.clone(true, true);
			}
		} else if (tipTarget) {
			targetElement = $('#' + tipTarget);
			if (targetElement.length > 0) {
				content = targetElement.html();
			}
		}

		return content;
	}

	/**
	 * Finds any viewport collisions that an element (the tooltip) would have if it
	 * were absolutely positioned at the specified coordinates.
	 * @private
	 * @param {CSSCoordinates} coords Coordinates for the element.
	 * @param {number} elementWidth Width of the element in pixels.
	 * @param {number} elementHeight Height of the element in pixels.
	 * @return {number} Value with the collision flags.
	 */
	function getViewportCollisions(coords, elementWidth, elementHeight) {
		var viewportTop = session.scrollTop,
			viewportLeft = session.scrollLeft,
			viewportBottom = viewportTop + session.windowHeight,
			viewportRight = viewportLeft + session.windowWidth,
			collisions = Collision.none;

		if (coords.top < viewportTop || Math.abs(coords.bottom - session.windowHeight) - elementHeight < viewportTop) {
			collisions |= Collision.top;
		}
		if (coords.top + elementHeight > viewportBottom || Math.abs(coords.bottom - session.windowHeight) > viewportBottom) {
			collisions |= Collision.bottom;
		}
		if (coords.left < viewportLeft || coords.right + elementWidth > viewportRight) {
			collisions |= Collision.left;
		}
		if (coords.left + elementWidth > viewportRight || coords.right < viewportLeft) {
			collisions |= Collision.right;
		}

		return collisions;
	}

	/**
	 * Counts the number of bits set on a flags value.
	 * @param {number} value The flags value.
	 * @return {number} The number of bits that have been set.
	 */
	function countFlags(value) {
		var count = 0;
		while (value) {
			value &= value - 1;
			count++;
		}
		return count;
	}

	// return api for commonjs and amd environments
	return $.powerTip;
}));

!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):e.moment=t()}(this,function(){"use strict";var e,i;function c(){return e.apply(null,arguments)}function o(e){return e instanceof Array||"[object Array]"===Object.prototype.toString.call(e)}function u(e){return null!=e&&"[object Object]"===Object.prototype.toString.call(e)}function l(e){return void 0===e}function d(e){return"number"==typeof e||"[object Number]"===Object.prototype.toString.call(e)}function h(e){return e instanceof Date||"[object Date]"===Object.prototype.toString.call(e)}function f(e,t){var n,s=[];for(n=0;n<e.length;++n)s.push(t(e[n],n));return s}function m(e,t){return Object.prototype.hasOwnProperty.call(e,t)}function _(e,t){for(var n in t)m(t,n)&&(e[n]=t[n]);return m(t,"toString")&&(e.toString=t.toString),m(t,"valueOf")&&(e.valueOf=t.valueOf),e}function y(e,t,n,s){return Ot(e,t,n,s,!0).utc()}function g(e){return null==e._pf&&(e._pf={empty:!1,unusedTokens:[],unusedInput:[],overflow:-2,charsLeftOver:0,nullInput:!1,invalidMonth:null,invalidFormat:!1,userInvalidated:!1,iso:!1,parsedDateParts:[],meridiem:null,rfc2822:!1,weekdayMismatch:!1}),e._pf}function p(e){if(null==e._isValid){var t=g(e),n=i.call(t.parsedDateParts,function(e){return null!=e}),s=!isNaN(e._d.getTime())&&t.overflow<0&&!t.empty&&!t.invalidMonth&&!t.invalidWeekday&&!t.weekdayMismatch&&!t.nullInput&&!t.invalidFormat&&!t.userInvalidated&&(!t.meridiem||t.meridiem&&n);if(e._strict&&(s=s&&0===t.charsLeftOver&&0===t.unusedTokens.length&&void 0===t.bigHour),null!=Object.isFrozen&&Object.isFrozen(e))return s;e._isValid=s}return e._isValid}function v(e){var t=y(NaN);return null!=e?_(g(t),e):g(t).userInvalidated=!0,t}i=Array.prototype.some?Array.prototype.some:function(e){for(var t=Object(this),n=t.length>>>0,s=0;s<n;s++)if(s in t&&e.call(this,t[s],s,t))return!0;return!1};var r=c.momentProperties=[];function w(e,t){var n,s,i;if(l(t._isAMomentObject)||(e._isAMomentObject=t._isAMomentObject),l(t._i)||(e._i=t._i),l(t._f)||(e._f=t._f),l(t._l)||(e._l=t._l),l(t._strict)||(e._strict=t._strict),l(t._tzm)||(e._tzm=t._tzm),l(t._isUTC)||(e._isUTC=t._isUTC),l(t._offset)||(e._offset=t._offset),l(t._pf)||(e._pf=g(t)),l(t._locale)||(e._locale=t._locale),0<r.length)for(n=0;n<r.length;n++)l(i=t[s=r[n]])||(e[s]=i);return e}var t=!1;function M(e){w(this,e),this._d=new Date(null!=e._d?e._d.getTime():NaN),this.isValid()||(this._d=new Date(NaN)),!1===t&&(t=!0,c.updateOffset(this),t=!1)}function S(e){return e instanceof M||null!=e&&null!=e._isAMomentObject}function D(e){return e<0?Math.ceil(e)||0:Math.floor(e)}function k(e){var t=+e,n=0;return 0!==t&&isFinite(t)&&(n=D(t)),n}function a(e,t,n){var s,i=Math.min(e.length,t.length),r=Math.abs(e.length-t.length),a=0;for(s=0;s<i;s++)(n&&e[s]!==t[s]||!n&&k(e[s])!==k(t[s]))&&a++;return a+r}function Y(e){!1===c.suppressDeprecationWarnings&&"undefined"!=typeof console&&console.warn&&console.warn("Deprecation warning: "+e)}function n(i,r){var a=!0;return _(function(){if(null!=c.deprecationHandler&&c.deprecationHandler(null,i),a){for(var e,t=[],n=0;n<arguments.length;n++){if(e="","object"==typeof arguments[n]){for(var s in e+="\n["+n+"] ",arguments[0])e+=s+": "+arguments[0][s]+", ";e=e.slice(0,-2)}else e=arguments[n];t.push(e)}Y(i+"\nArguments: "+Array.prototype.slice.call(t).join("")+"\n"+(new Error).stack),a=!1}return r.apply(this,arguments)},r)}var s,O={};function T(e,t){null!=c.deprecationHandler&&c.deprecationHandler(e,t),O[e]||(Y(t),O[e]=!0)}function x(e){return e instanceof Function||"[object Function]"===Object.prototype.toString.call(e)}function b(e,t){var n,s=_({},e);for(n in t)m(t,n)&&(u(e[n])&&u(t[n])?(s[n]={},_(s[n],e[n]),_(s[n],t[n])):null!=t[n]?s[n]=t[n]:delete s[n]);for(n in e)m(e,n)&&!m(t,n)&&u(e[n])&&(s[n]=_({},s[n]));return s}function P(e){null!=e&&this.set(e)}c.suppressDeprecationWarnings=!1,c.deprecationHandler=null,s=Object.keys?Object.keys:function(e){var t,n=[];for(t in e)m(e,t)&&n.push(t);return n};var W={};function H(e,t){var n=e.toLowerCase();W[n]=W[n+"s"]=W[t]=e}function R(e){return"string"==typeof e?W[e]||W[e.toLowerCase()]:void 0}function C(e){var t,n,s={};for(n in e)m(e,n)&&(t=R(n))&&(s[t]=e[n]);return s}var F={};function L(e,t){F[e]=t}function U(e,t,n){var s=""+Math.abs(e),i=t-s.length;return(0<=e?n?"+":"":"-")+Math.pow(10,Math.max(0,i)).toString().substr(1)+s}var N=/(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g,G=/(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g,V={},E={};function I(e,t,n,s){var i=s;"string"==typeof s&&(i=function(){return this[s]()}),e&&(E[e]=i),t&&(E[t[0]]=function(){return U(i.apply(this,arguments),t[1],t[2])}),n&&(E[n]=function(){return this.localeData().ordinal(i.apply(this,arguments),e)})}function A(e,t){return e.isValid()?(t=j(t,e.localeData()),V[t]=V[t]||function(s){var e,i,t,r=s.match(N);for(e=0,i=r.length;e<i;e++)E[r[e]]?r[e]=E[r[e]]:r[e]=(t=r[e]).match(/\[[\s\S]/)?t.replace(/^\[|\]$/g,""):t.replace(/\\/g,"");return function(e){var t,n="";for(t=0;t<i;t++)n+=x(r[t])?r[t].call(e,s):r[t];return n}}(t),V[t](e)):e.localeData().invalidDate()}function j(e,t){var n=5;function s(e){return t.longDateFormat(e)||e}for(G.lastIndex=0;0<=n&&G.test(e);)e=e.replace(G,s),G.lastIndex=0,n-=1;return e}var Z=/\d/,z=/\d\d/,$=/\d{3}/,q=/\d{4}/,J=/[+-]?\d{6}/,B=/\d\d?/,Q=/\d\d\d\d?/,X=/\d\d\d\d\d\d?/,K=/\d{1,3}/,ee=/\d{1,4}/,te=/[+-]?\d{1,6}/,ne=/\d+/,se=/[+-]?\d+/,ie=/Z|[+-]\d\d:?\d\d/gi,re=/Z|[+-]\d\d(?::?\d\d)?/gi,ae=/[0-9]{0,256}['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFF07\uFF10-\uFFEF]{1,256}|[\u0600-\u06FF\/]{1,256}(\s*?[\u0600-\u06FF]{1,256}){1,2}/i,oe={};function ue(e,n,s){oe[e]=x(n)?n:function(e,t){return e&&s?s:n}}function le(e,t){return m(oe,e)?oe[e](t._strict,t._locale):new RegExp(de(e.replace("\\","").replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g,function(e,t,n,s,i){return t||n||s||i})))}function de(e){return e.replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&")}var he={};function ce(e,n){var t,s=n;for("string"==typeof e&&(e=[e]),d(n)&&(s=function(e,t){t[n]=k(e)}),t=0;t<e.length;t++)he[e[t]]=s}function fe(e,i){ce(e,function(e,t,n,s){n._w=n._w||{},i(e,n._w,n,s)})}var me=0,_e=1,ye=2,ge=3,pe=4,ve=5,we=6,Me=7,Se=8;function De(e){return ke(e)?366:365}function ke(e){return e%4==0&&e%100!=0||e%400==0}I("Y",0,0,function(){var e=this.year();return e<=9999?""+e:"+"+e}),I(0,["YY",2],0,function(){return this.year()%100}),I(0,["YYYY",4],0,"year"),I(0,["YYYYY",5],0,"year"),I(0,["YYYYYY",6,!0],0,"year"),H("year","y"),L("year",1),ue("Y",se),ue("YY",B,z),ue("YYYY",ee,q),ue("YYYYY",te,J),ue("YYYYYY",te,J),ce(["YYYYY","YYYYYY"],me),ce("YYYY",function(e,t){t[me]=2===e.length?c.parseTwoDigitYear(e):k(e)}),ce("YY",function(e,t){t[me]=c.parseTwoDigitYear(e)}),ce("Y",function(e,t){t[me]=parseInt(e,10)}),c.parseTwoDigitYear=function(e){return k(e)+(68<k(e)?1900:2e3)};var Ye,Oe=Te("FullYear",!0);function Te(t,n){return function(e){return null!=e?(be(this,t,e),c.updateOffset(this,n),this):xe(this,t)}}function xe(e,t){return e.isValid()?e._d["get"+(e._isUTC?"UTC":"")+t]():NaN}function be(e,t,n){e.isValid()&&!isNaN(n)&&("FullYear"===t&&ke(e.year())&&1===e.month()&&29===e.date()?e._d["set"+(e._isUTC?"UTC":"")+t](n,e.month(),Pe(n,e.month())):e._d["set"+(e._isUTC?"UTC":"")+t](n))}function Pe(e,t){if(isNaN(e)||isNaN(t))return NaN;var n,s=(t%(n=12)+n)%n;return e+=(t-s)/12,1===s?ke(e)?29:28:31-s%7%2}Ye=Array.prototype.indexOf?Array.prototype.indexOf:function(e){var t;for(t=0;t<this.length;++t)if(this[t]===e)return t;return-1},I("M",["MM",2],"Mo",function(){return this.month()+1}),I("MMM",0,0,function(e){return this.localeData().monthsShort(this,e)}),I("MMMM",0,0,function(e){return this.localeData().months(this,e)}),H("month","M"),L("month",8),ue("M",B),ue("MM",B,z),ue("MMM",function(e,t){return t.monthsShortRegex(e)}),ue("MMMM",function(e,t){return t.monthsRegex(e)}),ce(["M","MM"],function(e,t){t[_e]=k(e)-1}),ce(["MMM","MMMM"],function(e,t,n,s){var i=n._locale.monthsParse(e,s,n._strict);null!=i?t[_e]=i:g(n).invalidMonth=e});var We=/D[oD]?(\[[^\[\]]*\]|\s)+MMMM?/,He="January_February_March_April_May_June_July_August_September_October_November_December".split("_");var Re="Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_");function Ce(e,t){var n;if(!e.isValid())return e;if("string"==typeof t)if(/^\d+$/.test(t))t=k(t);else if(!d(t=e.localeData().monthsParse(t)))return e;return n=Math.min(e.date(),Pe(e.year(),t)),e._d["set"+(e._isUTC?"UTC":"")+"Month"](t,n),e}function Fe(e){return null!=e?(Ce(this,e),c.updateOffset(this,!0),this):xe(this,"Month")}var Le=ae;var Ue=ae;function Ne(){function e(e,t){return t.length-e.length}var t,n,s=[],i=[],r=[];for(t=0;t<12;t++)n=y([2e3,t]),s.push(this.monthsShort(n,"")),i.push(this.months(n,"")),r.push(this.months(n,"")),r.push(this.monthsShort(n,""));for(s.sort(e),i.sort(e),r.sort(e),t=0;t<12;t++)s[t]=de(s[t]),i[t]=de(i[t]);for(t=0;t<24;t++)r[t]=de(r[t]);this._monthsRegex=new RegExp("^("+r.join("|")+")","i"),this._monthsShortRegex=this._monthsRegex,this._monthsStrictRegex=new RegExp("^("+i.join("|")+")","i"),this._monthsShortStrictRegex=new RegExp("^("+s.join("|")+")","i")}function Ge(e){var t=new Date(Date.UTC.apply(null,arguments));return e<100&&0<=e&&isFinite(t.getUTCFullYear())&&t.setUTCFullYear(e),t}function Ve(e,t,n){var s=7+t-n;return-((7+Ge(e,0,s).getUTCDay()-t)%7)+s-1}function Ee(e,t,n,s,i){var r,a,o=1+7*(t-1)+(7+n-s)%7+Ve(e,s,i);return o<=0?a=De(r=e-1)+o:o>De(e)?(r=e+1,a=o-De(e)):(r=e,a=o),{year:r,dayOfYear:a}}function Ie(e,t,n){var s,i,r=Ve(e.year(),t,n),a=Math.floor((e.dayOfYear()-r-1)/7)+1;return a<1?s=a+Ae(i=e.year()-1,t,n):a>Ae(e.year(),t,n)?(s=a-Ae(e.year(),t,n),i=e.year()+1):(i=e.year(),s=a),{week:s,year:i}}function Ae(e,t,n){var s=Ve(e,t,n),i=Ve(e+1,t,n);return(De(e)-s+i)/7}I("w",["ww",2],"wo","week"),I("W",["WW",2],"Wo","isoWeek"),H("week","w"),H("isoWeek","W"),L("week",5),L("isoWeek",5),ue("w",B),ue("ww",B,z),ue("W",B),ue("WW",B,z),fe(["w","ww","W","WW"],function(e,t,n,s){t[s.substr(0,1)]=k(e)});I("d",0,"do","day"),I("dd",0,0,function(e){return this.localeData().weekdaysMin(this,e)}),I("ddd",0,0,function(e){return this.localeData().weekdaysShort(this,e)}),I("dddd",0,0,function(e){return this.localeData().weekdays(this,e)}),I("e",0,0,"weekday"),I("E",0,0,"isoWeekday"),H("day","d"),H("weekday","e"),H("isoWeekday","E"),L("day",11),L("weekday",11),L("isoWeekday",11),ue("d",B),ue("e",B),ue("E",B),ue("dd",function(e,t){return t.weekdaysMinRegex(e)}),ue("ddd",function(e,t){return t.weekdaysShortRegex(e)}),ue("dddd",function(e,t){return t.weekdaysRegex(e)}),fe(["dd","ddd","dddd"],function(e,t,n,s){var i=n._locale.weekdaysParse(e,s,n._strict);null!=i?t.d=i:g(n).invalidWeekday=e}),fe(["d","e","E"],function(e,t,n,s){t[s]=k(e)});var je="Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_");var Ze="Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_");var ze="Su_Mo_Tu_We_Th_Fr_Sa".split("_");var $e=ae;var qe=ae;var Je=ae;function Be(){function e(e,t){return t.length-e.length}var t,n,s,i,r,a=[],o=[],u=[],l=[];for(t=0;t<7;t++)n=y([2e3,1]).day(t),s=this.weekdaysMin(n,""),i=this.weekdaysShort(n,""),r=this.weekdays(n,""),a.push(s),o.push(i),u.push(r),l.push(s),l.push(i),l.push(r);for(a.sort(e),o.sort(e),u.sort(e),l.sort(e),t=0;t<7;t++)o[t]=de(o[t]),u[t]=de(u[t]),l[t]=de(l[t]);this._weekdaysRegex=new RegExp("^("+l.join("|")+")","i"),this._weekdaysShortRegex=this._weekdaysRegex,this._weekdaysMinRegex=this._weekdaysRegex,this._weekdaysStrictRegex=new RegExp("^("+u.join("|")+")","i"),this._weekdaysShortStrictRegex=new RegExp("^("+o.join("|")+")","i"),this._weekdaysMinStrictRegex=new RegExp("^("+a.join("|")+")","i")}function Qe(){return this.hours()%12||12}function Xe(e,t){I(e,0,0,function(){return this.localeData().meridiem(this.hours(),this.minutes(),t)})}function Ke(e,t){return t._meridiemParse}I("H",["HH",2],0,"hour"),I("h",["hh",2],0,Qe),I("k",["kk",2],0,function(){return this.hours()||24}),I("hmm",0,0,function(){return""+Qe.apply(this)+U(this.minutes(),2)}),I("hmmss",0,0,function(){return""+Qe.apply(this)+U(this.minutes(),2)+U(this.seconds(),2)}),I("Hmm",0,0,function(){return""+this.hours()+U(this.minutes(),2)}),I("Hmmss",0,0,function(){return""+this.hours()+U(this.minutes(),2)+U(this.seconds(),2)}),Xe("a",!0),Xe("A",!1),H("hour","h"),L("hour",13),ue("a",Ke),ue("A",Ke),ue("H",B),ue("h",B),ue("k",B),ue("HH",B,z),ue("hh",B,z),ue("kk",B,z),ue("hmm",Q),ue("hmmss",X),ue("Hmm",Q),ue("Hmmss",X),ce(["H","HH"],ge),ce(["k","kk"],function(e,t,n){var s=k(e);t[ge]=24===s?0:s}),ce(["a","A"],function(e,t,n){n._isPm=n._locale.isPM(e),n._meridiem=e}),ce(["h","hh"],function(e,t,n){t[ge]=k(e),g(n).bigHour=!0}),ce("hmm",function(e,t,n){var s=e.length-2;t[ge]=k(e.substr(0,s)),t[pe]=k(e.substr(s)),g(n).bigHour=!0}),ce("hmmss",function(e,t,n){var s=e.length-4,i=e.length-2;t[ge]=k(e.substr(0,s)),t[pe]=k(e.substr(s,2)),t[ve]=k(e.substr(i)),g(n).bigHour=!0}),ce("Hmm",function(e,t,n){var s=e.length-2;t[ge]=k(e.substr(0,s)),t[pe]=k(e.substr(s))}),ce("Hmmss",function(e,t,n){var s=e.length-4,i=e.length-2;t[ge]=k(e.substr(0,s)),t[pe]=k(e.substr(s,2)),t[ve]=k(e.substr(i))});var et,tt=Te("Hours",!0),nt={calendar:{sameDay:"[Today at] LT",nextDay:"[Tomorrow at] LT",nextWeek:"dddd [at] LT",lastDay:"[Yesterday at] LT",lastWeek:"[Last] dddd [at] LT",sameElse:"L"},longDateFormat:{LTS:"h:mm:ss A",LT:"h:mm A",L:"MM/DD/YYYY",LL:"MMMM D, YYYY",LLL:"MMMM D, YYYY h:mm A",LLLL:"dddd, MMMM D, YYYY h:mm A"},invalidDate:"Invalid date",ordinal:"%d",dayOfMonthOrdinalParse:/\d{1,2}/,relativeTime:{future:"in %s",past:"%s ago",s:"a few seconds",ss:"%d seconds",m:"a minute",mm:"%d minutes",h:"an hour",hh:"%d hours",d:"a day",dd:"%d days",M:"a month",MM:"%d months",y:"a year",yy:"%d years"},months:He,monthsShort:Re,week:{dow:0,doy:6},weekdays:je,weekdaysMin:ze,weekdaysShort:Ze,meridiemParse:/[ap]\.?m?\.?/i},st={},it={};function rt(e){return e?e.toLowerCase().replace("_","-"):e}function at(e){var t=null;if(!st[e]&&"undefined"!=typeof module&&module&&module.exports)try{t=et._abbr,require("./locale/"+e),ot(t)}catch(e){}return st[e]}function ot(e,t){var n;return e&&((n=l(t)?lt(e):ut(e,t))?et=n:"undefined"!=typeof console&&console.warn&&console.warn("Locale "+e+" not found. Did you forget to load it?")),et._abbr}function ut(e,t){if(null!==t){var n,s=nt;if(t.abbr=e,null!=st[e])T("defineLocaleOverride","use moment.updateLocale(localeName, config) to change an existing locale. moment.defineLocale(localeName, config) should only be used for creating a new locale See http://momentjs.com/guides/#/warnings/define-locale/ for more info."),s=st[e]._config;else if(null!=t.parentLocale)if(null!=st[t.parentLocale])s=st[t.parentLocale]._config;else{if(null==(n=at(t.parentLocale)))return it[t.parentLocale]||(it[t.parentLocale]=[]),it[t.parentLocale].push({name:e,config:t}),null;s=n._config}return st[e]=new P(b(s,t)),it[e]&&it[e].forEach(function(e){ut(e.name,e.config)}),ot(e),st[e]}return delete st[e],null}function lt(e){var t;if(e&&e._locale&&e._locale._abbr&&(e=e._locale._abbr),!e)return et;if(!o(e)){if(t=at(e))return t;e=[e]}return function(e){for(var t,n,s,i,r=0;r<e.length;){for(t=(i=rt(e[r]).split("-")).length,n=(n=rt(e[r+1]))?n.split("-"):null;0<t;){if(s=at(i.slice(0,t).join("-")))return s;if(n&&n.length>=t&&a(i,n,!0)>=t-1)break;t--}r++}return et}(e)}function dt(e){var t,n=e._a;return n&&-2===g(e).overflow&&(t=n[_e]<0||11<n[_e]?_e:n[ye]<1||n[ye]>Pe(n[me],n[_e])?ye:n[ge]<0||24<n[ge]||24===n[ge]&&(0!==n[pe]||0!==n[ve]||0!==n[we])?ge:n[pe]<0||59<n[pe]?pe:n[ve]<0||59<n[ve]?ve:n[we]<0||999<n[we]?we:-1,g(e)._overflowDayOfYear&&(t<me||ye<t)&&(t=ye),g(e)._overflowWeeks&&-1===t&&(t=Me),g(e)._overflowWeekday&&-1===t&&(t=Se),g(e).overflow=t),e}function ht(e,t,n){return null!=e?e:null!=t?t:n}function ct(e){var t,n,s,i,r,a=[];if(!e._d){var o,u;for(o=e,u=new Date(c.now()),s=o._useUTC?[u.getUTCFullYear(),u.getUTCMonth(),u.getUTCDate()]:[u.getFullYear(),u.getMonth(),u.getDate()],e._w&&null==e._a[ye]&&null==e._a[_e]&&function(e){var t,n,s,i,r,a,o,u;if(null!=(t=e._w).GG||null!=t.W||null!=t.E)r=1,a=4,n=ht(t.GG,e._a[me],Ie(Tt(),1,4).year),s=ht(t.W,1),((i=ht(t.E,1))<1||7<i)&&(u=!0);else{r=e._locale._week.dow,a=e._locale._week.doy;var l=Ie(Tt(),r,a);n=ht(t.gg,e._a[me],l.year),s=ht(t.w,l.week),null!=t.d?((i=t.d)<0||6<i)&&(u=!0):null!=t.e?(i=t.e+r,(t.e<0||6<t.e)&&(u=!0)):i=r}s<1||s>Ae(n,r,a)?g(e)._overflowWeeks=!0:null!=u?g(e)._overflowWeekday=!0:(o=Ee(n,s,i,r,a),e._a[me]=o.year,e._dayOfYear=o.dayOfYear)}(e),null!=e._dayOfYear&&(r=ht(e._a[me],s[me]),(e._dayOfYear>De(r)||0===e._dayOfYear)&&(g(e)._overflowDayOfYear=!0),n=Ge(r,0,e._dayOfYear),e._a[_e]=n.getUTCMonth(),e._a[ye]=n.getUTCDate()),t=0;t<3&&null==e._a[t];++t)e._a[t]=a[t]=s[t];for(;t<7;t++)e._a[t]=a[t]=null==e._a[t]?2===t?1:0:e._a[t];24===e._a[ge]&&0===e._a[pe]&&0===e._a[ve]&&0===e._a[we]&&(e._nextDay=!0,e._a[ge]=0),e._d=(e._useUTC?Ge:function(e,t,n,s,i,r,a){var o=new Date(e,t,n,s,i,r,a);return e<100&&0<=e&&isFinite(o.getFullYear())&&o.setFullYear(e),o}).apply(null,a),i=e._useUTC?e._d.getUTCDay():e._d.getDay(),null!=e._tzm&&e._d.setUTCMinutes(e._d.getUTCMinutes()-e._tzm),e._nextDay&&(e._a[ge]=24),e._w&&void 0!==e._w.d&&e._w.d!==i&&(g(e).weekdayMismatch=!0)}}var ft=/^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/,mt=/^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/,_t=/Z|[+-]\d\d(?::?\d\d)?/,yt=[["YYYYYY-MM-DD",/[+-]\d{6}-\d\d-\d\d/],["YYYY-MM-DD",/\d{4}-\d\d-\d\d/],["GGGG-[W]WW-E",/\d{4}-W\d\d-\d/],["GGGG-[W]WW",/\d{4}-W\d\d/,!1],["YYYY-DDD",/\d{4}-\d{3}/],["YYYY-MM",/\d{4}-\d\d/,!1],["YYYYYYMMDD",/[+-]\d{10}/],["YYYYMMDD",/\d{8}/],["GGGG[W]WWE",/\d{4}W\d{3}/],["GGGG[W]WW",/\d{4}W\d{2}/,!1],["YYYYDDD",/\d{7}/]],gt=[["HH:mm:ss.SSSS",/\d\d:\d\d:\d\d\.\d+/],["HH:mm:ss,SSSS",/\d\d:\d\d:\d\d,\d+/],["HH:mm:ss",/\d\d:\d\d:\d\d/],["HH:mm",/\d\d:\d\d/],["HHmmss.SSSS",/\d\d\d\d\d\d\.\d+/],["HHmmss,SSSS",/\d\d\d\d\d\d,\d+/],["HHmmss",/\d\d\d\d\d\d/],["HHmm",/\d\d\d\d/],["HH",/\d\d/]],pt=/^\/?Date\((\-?\d+)/i;function vt(e){var t,n,s,i,r,a,o=e._i,u=ft.exec(o)||mt.exec(o);if(u){for(g(e).iso=!0,t=0,n=yt.length;t<n;t++)if(yt[t][1].exec(u[1])){i=yt[t][0],s=!1!==yt[t][2];break}if(null==i)return void(e._isValid=!1);if(u[3]){for(t=0,n=gt.length;t<n;t++)if(gt[t][1].exec(u[3])){r=(u[2]||" ")+gt[t][0];break}if(null==r)return void(e._isValid=!1)}if(!s&&null!=r)return void(e._isValid=!1);if(u[4]){if(!_t.exec(u[4]))return void(e._isValid=!1);a="Z"}e._f=i+(r||"")+(a||""),kt(e)}else e._isValid=!1}var wt=/^(?:(Mon|Tue|Wed|Thu|Fri|Sat|Sun),?\s)?(\d{1,2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{2,4})\s(\d\d):(\d\d)(?::(\d\d))?\s(?:(UT|GMT|[ECMP][SD]T)|([Zz])|([+-]\d{4}))$/;function Mt(e,t,n,s,i,r){var a=[function(e){var t=parseInt(e,10);{if(t<=49)return 2e3+t;if(t<=999)return 1900+t}return t}(e),Re.indexOf(t),parseInt(n,10),parseInt(s,10),parseInt(i,10)];return r&&a.push(parseInt(r,10)),a}var St={UT:0,GMT:0,EDT:-240,EST:-300,CDT:-300,CST:-360,MDT:-360,MST:-420,PDT:-420,PST:-480};function Dt(e){var t,n,s,i=wt.exec(e._i.replace(/\([^)]*\)|[\n\t]/g," ").replace(/(\s\s+)/g," ").replace(/^\s\s*/,"").replace(/\s\s*$/,""));if(i){var r=Mt(i[4],i[3],i[2],i[5],i[6],i[7]);if(t=i[1],n=r,s=e,t&&Ze.indexOf(t)!==new Date(n[0],n[1],n[2]).getDay()&&(g(s).weekdayMismatch=!0,!(s._isValid=!1)))return;e._a=r,e._tzm=function(e,t,n){if(e)return St[e];if(t)return 0;var s=parseInt(n,10),i=s%100;return(s-i)/100*60+i}(i[8],i[9],i[10]),e._d=Ge.apply(null,e._a),e._d.setUTCMinutes(e._d.getUTCMinutes()-e._tzm),g(e).rfc2822=!0}else e._isValid=!1}function kt(e){if(e._f!==c.ISO_8601)if(e._f!==c.RFC_2822){e._a=[],g(e).empty=!0;var t,n,s,i,r,a,o,u,l=""+e._i,d=l.length,h=0;for(s=j(e._f,e._locale).match(N)||[],t=0;t<s.length;t++)i=s[t],(n=(l.match(le(i,e))||[])[0])&&(0<(r=l.substr(0,l.indexOf(n))).length&&g(e).unusedInput.push(r),l=l.slice(l.indexOf(n)+n.length),h+=n.length),E[i]?(n?g(e).empty=!1:g(e).unusedTokens.push(i),a=i,u=e,null!=(o=n)&&m(he,a)&&he[a](o,u._a,u,a)):e._strict&&!n&&g(e).unusedTokens.push(i);g(e).charsLeftOver=d-h,0<l.length&&g(e).unusedInput.push(l),e._a[ge]<=12&&!0===g(e).bigHour&&0<e._a[ge]&&(g(e).bigHour=void 0),g(e).parsedDateParts=e._a.slice(0),g(e).meridiem=e._meridiem,e._a[ge]=function(e,t,n){var s;if(null==n)return t;return null!=e.meridiemHour?e.meridiemHour(t,n):(null!=e.isPM&&((s=e.isPM(n))&&t<12&&(t+=12),s||12!==t||(t=0)),t)}(e._locale,e._a[ge],e._meridiem),ct(e),dt(e)}else Dt(e);else vt(e)}function Yt(e){var t,n,s,i,r=e._i,a=e._f;return e._locale=e._locale||lt(e._l),null===r||void 0===a&&""===r?v({nullInput:!0}):("string"==typeof r&&(e._i=r=e._locale.preparse(r)),S(r)?new M(dt(r)):(h(r)?e._d=r:o(a)?function(e){var t,n,s,i,r;if(0===e._f.length)return g(e).invalidFormat=!0,e._d=new Date(NaN);for(i=0;i<e._f.length;i++)r=0,t=w({},e),null!=e._useUTC&&(t._useUTC=e._useUTC),t._f=e._f[i],kt(t),p(t)&&(r+=g(t).charsLeftOver,r+=10*g(t).unusedTokens.length,g(t).score=r,(null==s||r<s)&&(s=r,n=t));_(e,n||t)}(e):a?kt(e):l(n=(t=e)._i)?t._d=new Date(c.now()):h(n)?t._d=new Date(n.valueOf()):"string"==typeof n?(s=t,null===(i=pt.exec(s._i))?(vt(s),!1===s._isValid&&(delete s._isValid,Dt(s),!1===s._isValid&&(delete s._isValid,c.createFromInputFallback(s)))):s._d=new Date(+i[1])):o(n)?(t._a=f(n.slice(0),function(e){return parseInt(e,10)}),ct(t)):u(n)?function(e){if(!e._d){var t=C(e._i);e._a=f([t.year,t.month,t.day||t.date,t.hour,t.minute,t.second,t.millisecond],function(e){return e&&parseInt(e,10)}),ct(e)}}(t):d(n)?t._d=new Date(n):c.createFromInputFallback(t),p(e)||(e._d=null),e))}function Ot(e,t,n,s,i){var r,a={};return!0!==n&&!1!==n||(s=n,n=void 0),(u(e)&&function(e){if(Object.getOwnPropertyNames)return 0===Object.getOwnPropertyNames(e).length;var t;for(t in e)if(e.hasOwnProperty(t))return!1;return!0}(e)||o(e)&&0===e.length)&&(e=void 0),a._isAMomentObject=!0,a._useUTC=a._isUTC=i,a._l=n,a._i=e,a._f=t,a._strict=s,(r=new M(dt(Yt(a))))._nextDay&&(r.add(1,"d"),r._nextDay=void 0),r}function Tt(e,t,n,s){return Ot(e,t,n,s,!1)}c.createFromInputFallback=n("value provided is not in a recognized RFC2822 or ISO format. moment construction falls back to js Date(), which is not reliable across all browsers and versions. Non RFC2822/ISO date formats are discouraged and will be removed in an upcoming major release. Please refer to http://momentjs.com/guides/#/warnings/js-date/ for more info.",function(e){e._d=new Date(e._i+(e._useUTC?" UTC":""))}),c.ISO_8601=function(){},c.RFC_2822=function(){};var xt=n("moment().min is deprecated, use moment.max instead. http://momentjs.com/guides/#/warnings/min-max/",function(){var e=Tt.apply(null,arguments);return this.isValid()&&e.isValid()?e<this?this:e:v()}),bt=n("moment().max is deprecated, use moment.min instead. http://momentjs.com/guides/#/warnings/min-max/",function(){var e=Tt.apply(null,arguments);return this.isValid()&&e.isValid()?this<e?this:e:v()});function Pt(e,t){var n,s;if(1===t.length&&o(t[0])&&(t=t[0]),!t.length)return Tt();for(n=t[0],s=1;s<t.length;++s)t[s].isValid()&&!t[s][e](n)||(n=t[s]);return n}var Wt=["year","quarter","month","week","day","hour","minute","second","millisecond"];function Ht(e){var t=C(e),n=t.year||0,s=t.quarter||0,i=t.month||0,r=t.week||0,a=t.day||0,o=t.hour||0,u=t.minute||0,l=t.second||0,d=t.millisecond||0;this._isValid=function(e){for(var t in e)if(-1===Ye.call(Wt,t)||null!=e[t]&&isNaN(e[t]))return!1;for(var n=!1,s=0;s<Wt.length;++s)if(e[Wt[s]]){if(n)return!1;parseFloat(e[Wt[s]])!==k(e[Wt[s]])&&(n=!0)}return!0}(t),this._milliseconds=+d+1e3*l+6e4*u+1e3*o*60*60,this._days=+a+7*r,this._months=+i+3*s+12*n,this._data={},this._locale=lt(),this._bubble()}function Rt(e){return e instanceof Ht}function Ct(e){return e<0?-1*Math.round(-1*e):Math.round(e)}function Ft(e,n){I(e,0,0,function(){var e=this.utcOffset(),t="+";return e<0&&(e=-e,t="-"),t+U(~~(e/60),2)+n+U(~~e%60,2)})}Ft("Z",":"),Ft("ZZ",""),ue("Z",re),ue("ZZ",re),ce(["Z","ZZ"],function(e,t,n){n._useUTC=!0,n._tzm=Ut(re,e)});var Lt=/([\+\-]|\d\d)/gi;function Ut(e,t){var n=(t||"").match(e);if(null===n)return null;var s=((n[n.length-1]||[])+"").match(Lt)||["-",0,0],i=60*s[1]+k(s[2]);return 0===i?0:"+"===s[0]?i:-i}function Nt(e,t){var n,s;return t._isUTC?(n=t.clone(),s=(S(e)||h(e)?e.valueOf():Tt(e).valueOf())-n.valueOf(),n._d.setTime(n._d.valueOf()+s),c.updateOffset(n,!1),n):Tt(e).local()}function Gt(e){return 15*-Math.round(e._d.getTimezoneOffset()/15)}function Vt(){return!!this.isValid()&&(this._isUTC&&0===this._offset)}c.updateOffset=function(){};var Et=/^(\-|\+)?(?:(\d*)[. ])?(\d+)\:(\d+)(?:\:(\d+)(\.\d*)?)?$/,It=/^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/;function At(e,t){var n,s,i,r=e,a=null;return Rt(e)?r={ms:e._milliseconds,d:e._days,M:e._months}:d(e)?(r={},t?r[t]=e:r.milliseconds=e):(a=Et.exec(e))?(n="-"===a[1]?-1:1,r={y:0,d:k(a[ye])*n,h:k(a[ge])*n,m:k(a[pe])*n,s:k(a[ve])*n,ms:k(Ct(1e3*a[we]))*n}):(a=It.exec(e))?(n="-"===a[1]?-1:(a[1],1),r={y:jt(a[2],n),M:jt(a[3],n),w:jt(a[4],n),d:jt(a[5],n),h:jt(a[6],n),m:jt(a[7],n),s:jt(a[8],n)}):null==r?r={}:"object"==typeof r&&("from"in r||"to"in r)&&(i=function(e,t){var n;if(!e.isValid()||!t.isValid())return{milliseconds:0,months:0};t=Nt(t,e),e.isBefore(t)?n=Zt(e,t):((n=Zt(t,e)).milliseconds=-n.milliseconds,n.months=-n.months);return n}(Tt(r.from),Tt(r.to)),(r={}).ms=i.milliseconds,r.M=i.months),s=new Ht(r),Rt(e)&&m(e,"_locale")&&(s._locale=e._locale),s}function jt(e,t){var n=e&&parseFloat(e.replace(",","."));return(isNaN(n)?0:n)*t}function Zt(e,t){var n={milliseconds:0,months:0};return n.months=t.month()-e.month()+12*(t.year()-e.year()),e.clone().add(n.months,"M").isAfter(t)&&--n.months,n.milliseconds=+t-+e.clone().add(n.months,"M"),n}function zt(s,i){return function(e,t){var n;return null===t||isNaN(+t)||(T(i,"moment()."+i+"(period, number) is deprecated. Please use moment()."+i+"(number, period). See http://momentjs.com/guides/#/warnings/add-inverted-param/ for more info."),n=e,e=t,t=n),$t(this,At(e="string"==typeof e?+e:e,t),s),this}}function $t(e,t,n,s){var i=t._milliseconds,r=Ct(t._days),a=Ct(t._months);e.isValid()&&(s=null==s||s,a&&Ce(e,xe(e,"Month")+a*n),r&&be(e,"Date",xe(e,"Date")+r*n),i&&e._d.setTime(e._d.valueOf()+i*n),s&&c.updateOffset(e,r||a))}At.fn=Ht.prototype,At.invalid=function(){return At(NaN)};var qt=zt(1,"add"),Jt=zt(-1,"subtract");function Bt(e,t){var n=12*(t.year()-e.year())+(t.month()-e.month()),s=e.clone().add(n,"months");return-(n+(t-s<0?(t-s)/(s-e.clone().add(n-1,"months")):(t-s)/(e.clone().add(n+1,"months")-s)))||0}function Qt(e){var t;return void 0===e?this._locale._abbr:(null!=(t=lt(e))&&(this._locale=t),this)}c.defaultFormat="YYYY-MM-DDTHH:mm:ssZ",c.defaultFormatUtc="YYYY-MM-DDTHH:mm:ss[Z]";var Xt=n("moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.",function(e){return void 0===e?this.localeData():this.locale(e)});function Kt(){return this._locale}function en(e,t){I(0,[e,e.length],0,t)}function tn(e,t,n,s,i){var r;return null==e?Ie(this,s,i).year:((r=Ae(e,s,i))<t&&(t=r),function(e,t,n,s,i){var r=Ee(e,t,n,s,i),a=Ge(r.year,0,r.dayOfYear);return this.year(a.getUTCFullYear()),this.month(a.getUTCMonth()),this.date(a.getUTCDate()),this}.call(this,e,t,n,s,i))}I(0,["gg",2],0,function(){return this.weekYear()%100}),I(0,["GG",2],0,function(){return this.isoWeekYear()%100}),en("gggg","weekYear"),en("ggggg","weekYear"),en("GGGG","isoWeekYear"),en("GGGGG","isoWeekYear"),H("weekYear","gg"),H("isoWeekYear","GG"),L("weekYear",1),L("isoWeekYear",1),ue("G",se),ue("g",se),ue("GG",B,z),ue("gg",B,z),ue("GGGG",ee,q),ue("gggg",ee,q),ue("GGGGG",te,J),ue("ggggg",te,J),fe(["gggg","ggggg","GGGG","GGGGG"],function(e,t,n,s){t[s.substr(0,2)]=k(e)}),fe(["gg","GG"],function(e,t,n,s){t[s]=c.parseTwoDigitYear(e)}),I("Q",0,"Qo","quarter"),H("quarter","Q"),L("quarter",7),ue("Q",Z),ce("Q",function(e,t){t[_e]=3*(k(e)-1)}),I("D",["DD",2],"Do","date"),H("date","D"),L("date",9),ue("D",B),ue("DD",B,z),ue("Do",function(e,t){return e?t._dayOfMonthOrdinalParse||t._ordinalParse:t._dayOfMonthOrdinalParseLenient}),ce(["D","DD"],ye),ce("Do",function(e,t){t[ye]=k(e.match(B)[0])});var nn=Te("Date",!0);I("DDD",["DDDD",3],"DDDo","dayOfYear"),H("dayOfYear","DDD"),L("dayOfYear",4),ue("DDD",K),ue("DDDD",$),ce(["DDD","DDDD"],function(e,t,n){n._dayOfYear=k(e)}),I("m",["mm",2],0,"minute"),H("minute","m"),L("minute",14),ue("m",B),ue("mm",B,z),ce(["m","mm"],pe);var sn=Te("Minutes",!1);I("s",["ss",2],0,"second"),H("second","s"),L("second",15),ue("s",B),ue("ss",B,z),ce(["s","ss"],ve);var rn,an=Te("Seconds",!1);for(I("S",0,0,function(){return~~(this.millisecond()/100)}),I(0,["SS",2],0,function(){return~~(this.millisecond()/10)}),I(0,["SSS",3],0,"millisecond"),I(0,["SSSS",4],0,function(){return 10*this.millisecond()}),I(0,["SSSSS",5],0,function(){return 100*this.millisecond()}),I(0,["SSSSSS",6],0,function(){return 1e3*this.millisecond()}),I(0,["SSSSSSS",7],0,function(){return 1e4*this.millisecond()}),I(0,["SSSSSSSS",8],0,function(){return 1e5*this.millisecond()}),I(0,["SSSSSSSSS",9],0,function(){return 1e6*this.millisecond()}),H("millisecond","ms"),L("millisecond",16),ue("S",K,Z),ue("SS",K,z),ue("SSS",K,$),rn="SSSS";rn.length<=9;rn+="S")ue(rn,ne);function on(e,t){t[we]=k(1e3*("0."+e))}for(rn="S";rn.length<=9;rn+="S")ce(rn,on);var un=Te("Milliseconds",!1);I("z",0,0,"zoneAbbr"),I("zz",0,0,"zoneName");var ln=M.prototype;function dn(e){return e}ln.add=qt,ln.calendar=function(e,t){var n=e||Tt(),s=Nt(n,this).startOf("day"),i=c.calendarFormat(this,s)||"sameElse",r=t&&(x(t[i])?t[i].call(this,n):t[i]);return this.format(r||this.localeData().calendar(i,this,Tt(n)))},ln.clone=function(){return new M(this)},ln.diff=function(e,t,n){var s,i,r;if(!this.isValid())return NaN;if(!(s=Nt(e,this)).isValid())return NaN;switch(i=6e4*(s.utcOffset()-this.utcOffset()),t=R(t)){case"year":r=Bt(this,s)/12;break;case"month":r=Bt(this,s);break;case"quarter":r=Bt(this,s)/3;break;case"second":r=(this-s)/1e3;break;case"minute":r=(this-s)/6e4;break;case"hour":r=(this-s)/36e5;break;case"day":r=(this-s-i)/864e5;break;case"week":r=(this-s-i)/6048e5;break;default:r=this-s}return n?r:D(r)},ln.endOf=function(e){return void 0===(e=R(e))||"millisecond"===e?this:("date"===e&&(e="day"),this.startOf(e).add(1,"isoWeek"===e?"week":e).subtract(1,"ms"))},ln.format=function(e){e||(e=this.isUtc()?c.defaultFormatUtc:c.defaultFormat);var t=A(this,e);return this.localeData().postformat(t)},ln.from=function(e,t){return this.isValid()&&(S(e)&&e.isValid()||Tt(e).isValid())?At({to:this,from:e}).locale(this.locale()).humanize(!t):this.localeData().invalidDate()},ln.fromNow=function(e){return this.from(Tt(),e)},ln.to=function(e,t){return this.isValid()&&(S(e)&&e.isValid()||Tt(e).isValid())?At({from:this,to:e}).locale(this.locale()).humanize(!t):this.localeData().invalidDate()},ln.toNow=function(e){return this.to(Tt(),e)},ln.get=function(e){return x(this[e=R(e)])?this[e]():this},ln.invalidAt=function(){return g(this).overflow},ln.isAfter=function(e,t){var n=S(e)?e:Tt(e);return!(!this.isValid()||!n.isValid())&&("millisecond"===(t=R(l(t)?"millisecond":t))?this.valueOf()>n.valueOf():n.valueOf()<this.clone().startOf(t).valueOf())},ln.isBefore=function(e,t){var n=S(e)?e:Tt(e);return!(!this.isValid()||!n.isValid())&&("millisecond"===(t=R(l(t)?"millisecond":t))?this.valueOf()<n.valueOf():this.clone().endOf(t).valueOf()<n.valueOf())},ln.isBetween=function(e,t,n,s){return("("===(s=s||"()")[0]?this.isAfter(e,n):!this.isBefore(e,n))&&(")"===s[1]?this.isBefore(t,n):!this.isAfter(t,n))},ln.isSame=function(e,t){var n,s=S(e)?e:Tt(e);return!(!this.isValid()||!s.isValid())&&("millisecond"===(t=R(t||"millisecond"))?this.valueOf()===s.valueOf():(n=s.valueOf(),this.clone().startOf(t).valueOf()<=n&&n<=this.clone().endOf(t).valueOf()))},ln.isSameOrAfter=function(e,t){return this.isSame(e,t)||this.isAfter(e,t)},ln.isSameOrBefore=function(e,t){return this.isSame(e,t)||this.isBefore(e,t)},ln.isValid=function(){return p(this)},ln.lang=Xt,ln.locale=Qt,ln.localeData=Kt,ln.max=bt,ln.min=xt,ln.parsingFlags=function(){return _({},g(this))},ln.set=function(e,t){if("object"==typeof e)for(var n=function(e){var t=[];for(var n in e)t.push({unit:n,priority:F[n]});return t.sort(function(e,t){return e.priority-t.priority}),t}(e=C(e)),s=0;s<n.length;s++)this[n[s].unit](e[n[s].unit]);else if(x(this[e=R(e)]))return this[e](t);return this},ln.startOf=function(e){switch(e=R(e)){case"year":this.month(0);case"quarter":case"month":this.date(1);case"week":case"isoWeek":case"day":case"date":this.hours(0);case"hour":this.minutes(0);case"minute":this.seconds(0);case"second":this.milliseconds(0)}return"week"===e&&this.weekday(0),"isoWeek"===e&&this.isoWeekday(1),"quarter"===e&&this.month(3*Math.floor(this.month()/3)),this},ln.subtract=Jt,ln.toArray=function(){var e=this;return[e.year(),e.month(),e.date(),e.hour(),e.minute(),e.second(),e.millisecond()]},ln.toObject=function(){var e=this;return{years:e.year(),months:e.month(),date:e.date(),hours:e.hours(),minutes:e.minutes(),seconds:e.seconds(),milliseconds:e.milliseconds()}},ln.toDate=function(){return new Date(this.valueOf())},ln.toISOString=function(e){if(!this.isValid())return null;var t=!0!==e,n=t?this.clone().utc():this;return n.year()<0||9999<n.year()?A(n,t?"YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]":"YYYYYY-MM-DD[T]HH:mm:ss.SSSZ"):x(Date.prototype.toISOString)?t?this.toDate().toISOString():new Date(this.valueOf()+60*this.utcOffset()*1e3).toISOString().replace("Z",A(n,"Z")):A(n,t?"YYYY-MM-DD[T]HH:mm:ss.SSS[Z]":"YYYY-MM-DD[T]HH:mm:ss.SSSZ")},ln.inspect=function(){if(!this.isValid())return"moment.invalid(/* "+this._i+" */)";var e="moment",t="";this.isLocal()||(e=0===this.utcOffset()?"moment.utc":"moment.parseZone",t="Z");var n="["+e+'("]',s=0<=this.year()&&this.year()<=9999?"YYYY":"YYYYYY",i=t+'[")]';return this.format(n+s+"-MM-DD[T]HH:mm:ss.SSS"+i)},ln.toJSON=function(){return this.isValid()?this.toISOString():null},ln.toString=function(){return this.clone().locale("en").format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ")},ln.unix=function(){return Math.floor(this.valueOf()/1e3)},ln.valueOf=function(){return this._d.valueOf()-6e4*(this._offset||0)},ln.creationData=function(){return{input:this._i,format:this._f,locale:this._locale,isUTC:this._isUTC,strict:this._strict}},ln.year=Oe,ln.isLeapYear=function(){return ke(this.year())},ln.weekYear=function(e){return tn.call(this,e,this.week(),this.weekday(),this.localeData()._week.dow,this.localeData()._week.doy)},ln.isoWeekYear=function(e){return tn.call(this,e,this.isoWeek(),this.isoWeekday(),1,4)},ln.quarter=ln.quarters=function(e){return null==e?Math.ceil((this.month()+1)/3):this.month(3*(e-1)+this.month()%3)},ln.month=Fe,ln.daysInMonth=function(){return Pe(this.year(),this.month())},ln.week=ln.weeks=function(e){var t=this.localeData().week(this);return null==e?t:this.add(7*(e-t),"d")},ln.isoWeek=ln.isoWeeks=function(e){var t=Ie(this,1,4).week;return null==e?t:this.add(7*(e-t),"d")},ln.weeksInYear=function(){var e=this.localeData()._week;return Ae(this.year(),e.dow,e.doy)},ln.isoWeeksInYear=function(){return Ae(this.year(),1,4)},ln.date=nn,ln.day=ln.days=function(e){if(!this.isValid())return null!=e?this:NaN;var t,n,s=this._isUTC?this._d.getUTCDay():this._d.getDay();return null!=e?(t=e,n=this.localeData(),e="string"!=typeof t?t:isNaN(t)?"number"==typeof(t=n.weekdaysParse(t))?t:null:parseInt(t,10),this.add(e-s,"d")):s},ln.weekday=function(e){if(!this.isValid())return null!=e?this:NaN;var t=(this.day()+7-this.localeData()._week.dow)%7;return null==e?t:this.add(e-t,"d")},ln.isoWeekday=function(e){if(!this.isValid())return null!=e?this:NaN;if(null!=e){var t=(n=e,s=this.localeData(),"string"==typeof n?s.weekdaysParse(n)%7||7:isNaN(n)?null:n);return this.day(this.day()%7?t:t-7)}return this.day()||7;var n,s},ln.dayOfYear=function(e){var t=Math.round((this.clone().startOf("day")-this.clone().startOf("year"))/864e5)+1;return null==e?t:this.add(e-t,"d")},ln.hour=ln.hours=tt,ln.minute=ln.minutes=sn,ln.second=ln.seconds=an,ln.millisecond=ln.milliseconds=un,ln.utcOffset=function(e,t,n){var s,i=this._offset||0;if(!this.isValid())return null!=e?this:NaN;if(null!=e){if("string"==typeof e){if(null===(e=Ut(re,e)))return this}else Math.abs(e)<16&&!n&&(e*=60);return!this._isUTC&&t&&(s=Gt(this)),this._offset=e,this._isUTC=!0,null!=s&&this.add(s,"m"),i!==e&&(!t||this._changeInProgress?$t(this,At(e-i,"m"),1,!1):this._changeInProgress||(this._changeInProgress=!0,c.updateOffset(this,!0),this._changeInProgress=null)),this}return this._isUTC?i:Gt(this)},ln.utc=function(e){return this.utcOffset(0,e)},ln.local=function(e){return this._isUTC&&(this.utcOffset(0,e),this._isUTC=!1,e&&this.subtract(Gt(this),"m")),this},ln.parseZone=function(){if(null!=this._tzm)this.utcOffset(this._tzm,!1,!0);else if("string"==typeof this._i){var e=Ut(ie,this._i);null!=e?this.utcOffset(e):this.utcOffset(0,!0)}return this},ln.hasAlignedHourOffset=function(e){return!!this.isValid()&&(e=e?Tt(e).utcOffset():0,(this.utcOffset()-e)%60==0)},ln.isDST=function(){return this.utcOffset()>this.clone().month(0).utcOffset()||this.utcOffset()>this.clone().month(5).utcOffset()},ln.isLocal=function(){return!!this.isValid()&&!this._isUTC},ln.isUtcOffset=function(){return!!this.isValid()&&this._isUTC},ln.isUtc=Vt,ln.isUTC=Vt,ln.zoneAbbr=function(){return this._isUTC?"UTC":""},ln.zoneName=function(){return this._isUTC?"Coordinated Universal Time":""},ln.dates=n("dates accessor is deprecated. Use date instead.",nn),ln.months=n("months accessor is deprecated. Use month instead",Fe),ln.years=n("years accessor is deprecated. Use year instead",Oe),ln.zone=n("moment().zone is deprecated, use moment().utcOffset instead. http://momentjs.com/guides/#/warnings/zone/",function(e,t){return null!=e?("string"!=typeof e&&(e=-e),this.utcOffset(e,t),this):-this.utcOffset()}),ln.isDSTShifted=n("isDSTShifted is deprecated. See http://momentjs.com/guides/#/warnings/dst-shifted/ for more information",function(){if(!l(this._isDSTShifted))return this._isDSTShifted;var e={};if(w(e,this),(e=Yt(e))._a){var t=e._isUTC?y(e._a):Tt(e._a);this._isDSTShifted=this.isValid()&&0<a(e._a,t.toArray())}else this._isDSTShifted=!1;return this._isDSTShifted});var hn=P.prototype;function cn(e,t,n,s){var i=lt(),r=y().set(s,t);return i[n](r,e)}function fn(e,t,n){if(d(e)&&(t=e,e=void 0),e=e||"",null!=t)return cn(e,t,n,"month");var s,i=[];for(s=0;s<12;s++)i[s]=cn(e,s,n,"month");return i}function mn(e,t,n,s){"boolean"==typeof e?d(t)&&(n=t,t=void 0):(t=e,e=!1,d(n=t)&&(n=t,t=void 0)),t=t||"";var i,r=lt(),a=e?r._week.dow:0;if(null!=n)return cn(t,(n+a)%7,s,"day");var o=[];for(i=0;i<7;i++)o[i]=cn(t,(i+a)%7,s,"day");return o}hn.calendar=function(e,t,n){var s=this._calendar[e]||this._calendar.sameElse;return x(s)?s.call(t,n):s},hn.longDateFormat=function(e){var t=this._longDateFormat[e],n=this._longDateFormat[e.toUpperCase()];return t||!n?t:(this._longDateFormat[e]=n.replace(/MMMM|MM|DD|dddd/g,function(e){return e.slice(1)}),this._longDateFormat[e])},hn.invalidDate=function(){return this._invalidDate},hn.ordinal=function(e){return this._ordinal.replace("%d",e)},hn.preparse=dn,hn.postformat=dn,hn.relativeTime=function(e,t,n,s){var i=this._relativeTime[n];return x(i)?i(e,t,n,s):i.replace(/%d/i,e)},hn.pastFuture=function(e,t){var n=this._relativeTime[0<e?"future":"past"];return x(n)?n(t):n.replace(/%s/i,t)},hn.set=function(e){var t,n;for(n in e)x(t=e[n])?this[n]=t:this["_"+n]=t;this._config=e,this._dayOfMonthOrdinalParseLenient=new RegExp((this._dayOfMonthOrdinalParse.source||this._ordinalParse.source)+"|"+/\d{1,2}/.source)},hn.months=function(e,t){return e?o(this._months)?this._months[e.month()]:this._months[(this._months.isFormat||We).test(t)?"format":"standalone"][e.month()]:o(this._months)?this._months:this._months.standalone},hn.monthsShort=function(e,t){return e?o(this._monthsShort)?this._monthsShort[e.month()]:this._monthsShort[We.test(t)?"format":"standalone"][e.month()]:o(this._monthsShort)?this._monthsShort:this._monthsShort.standalone},hn.monthsParse=function(e,t,n){var s,i,r;if(this._monthsParseExact)return function(e,t,n){var s,i,r,a=e.toLocaleLowerCase();if(!this._monthsParse)for(this._monthsParse=[],this._longMonthsParse=[],this._shortMonthsParse=[],s=0;s<12;++s)r=y([2e3,s]),this._shortMonthsParse[s]=this.monthsShort(r,"").toLocaleLowerCase(),this._longMonthsParse[s]=this.months(r,"").toLocaleLowerCase();return n?"MMM"===t?-1!==(i=Ye.call(this._shortMonthsParse,a))?i:null:-1!==(i=Ye.call(this._longMonthsParse,a))?i:null:"MMM"===t?-1!==(i=Ye.call(this._shortMonthsParse,a))?i:-1!==(i=Ye.call(this._longMonthsParse,a))?i:null:-1!==(i=Ye.call(this._longMonthsParse,a))?i:-1!==(i=Ye.call(this._shortMonthsParse,a))?i:null}.call(this,e,t,n);for(this._monthsParse||(this._monthsParse=[],this._longMonthsParse=[],this._shortMonthsParse=[]),s=0;s<12;s++){if(i=y([2e3,s]),n&&!this._longMonthsParse[s]&&(this._longMonthsParse[s]=new RegExp("^"+this.months(i,"").replace(".","")+"$","i"),this._shortMonthsParse[s]=new RegExp("^"+this.monthsShort(i,"").replace(".","")+"$","i")),n||this._monthsParse[s]||(r="^"+this.months(i,"")+"|^"+this.monthsShort(i,""),this._monthsParse[s]=new RegExp(r.replace(".",""),"i")),n&&"MMMM"===t&&this._longMonthsParse[s].test(e))return s;if(n&&"MMM"===t&&this._shortMonthsParse[s].test(e))return s;if(!n&&this._monthsParse[s].test(e))return s}},hn.monthsRegex=function(e){return this._monthsParseExact?(m(this,"_monthsRegex")||Ne.call(this),e?this._monthsStrictRegex:this._monthsRegex):(m(this,"_monthsRegex")||(this._monthsRegex=Ue),this._monthsStrictRegex&&e?this._monthsStrictRegex:this._monthsRegex)},hn.monthsShortRegex=function(e){return this._monthsParseExact?(m(this,"_monthsRegex")||Ne.call(this),e?this._monthsShortStrictRegex:this._monthsShortRegex):(m(this,"_monthsShortRegex")||(this._monthsShortRegex=Le),this._monthsShortStrictRegex&&e?this._monthsShortStrictRegex:this._monthsShortRegex)},hn.week=function(e){return Ie(e,this._week.dow,this._week.doy).week},hn.firstDayOfYear=function(){return this._week.doy},hn.firstDayOfWeek=function(){return this._week.dow},hn.weekdays=function(e,t){return e?o(this._weekdays)?this._weekdays[e.day()]:this._weekdays[this._weekdays.isFormat.test(t)?"format":"standalone"][e.day()]:o(this._weekdays)?this._weekdays:this._weekdays.standalone},hn.weekdaysMin=function(e){return e?this._weekdaysMin[e.day()]:this._weekdaysMin},hn.weekdaysShort=function(e){return e?this._weekdaysShort[e.day()]:this._weekdaysShort},hn.weekdaysParse=function(e,t,n){var s,i,r;if(this._weekdaysParseExact)return function(e,t,n){var s,i,r,a=e.toLocaleLowerCase();if(!this._weekdaysParse)for(this._weekdaysParse=[],this._shortWeekdaysParse=[],this._minWeekdaysParse=[],s=0;s<7;++s)r=y([2e3,1]).day(s),this._minWeekdaysParse[s]=this.weekdaysMin(r,"").toLocaleLowerCase(),this._shortWeekdaysParse[s]=this.weekdaysShort(r,"").toLocaleLowerCase(),this._weekdaysParse[s]=this.weekdays(r,"").toLocaleLowerCase();return n?"dddd"===t?-1!==(i=Ye.call(this._weekdaysParse,a))?i:null:"ddd"===t?-1!==(i=Ye.call(this._shortWeekdaysParse,a))?i:null:-1!==(i=Ye.call(this._minWeekdaysParse,a))?i:null:"dddd"===t?-1!==(i=Ye.call(this._weekdaysParse,a))?i:-1!==(i=Ye.call(this._shortWeekdaysParse,a))?i:-1!==(i=Ye.call(this._minWeekdaysParse,a))?i:null:"ddd"===t?-1!==(i=Ye.call(this._shortWeekdaysParse,a))?i:-1!==(i=Ye.call(this._weekdaysParse,a))?i:-1!==(i=Ye.call(this._minWeekdaysParse,a))?i:null:-1!==(i=Ye.call(this._minWeekdaysParse,a))?i:-1!==(i=Ye.call(this._weekdaysParse,a))?i:-1!==(i=Ye.call(this._shortWeekdaysParse,a))?i:null}.call(this,e,t,n);for(this._weekdaysParse||(this._weekdaysParse=[],this._minWeekdaysParse=[],this._shortWeekdaysParse=[],this._fullWeekdaysParse=[]),s=0;s<7;s++){if(i=y([2e3,1]).day(s),n&&!this._fullWeekdaysParse[s]&&(this._fullWeekdaysParse[s]=new RegExp("^"+this.weekdays(i,"").replace(".","\\.?")+"$","i"),this._shortWeekdaysParse[s]=new RegExp("^"+this.weekdaysShort(i,"").replace(".","\\.?")+"$","i"),this._minWeekdaysParse[s]=new RegExp("^"+this.weekdaysMin(i,"").replace(".","\\.?")+"$","i")),this._weekdaysParse[s]||(r="^"+this.weekdays(i,"")+"|^"+this.weekdaysShort(i,"")+"|^"+this.weekdaysMin(i,""),this._weekdaysParse[s]=new RegExp(r.replace(".",""),"i")),n&&"dddd"===t&&this._fullWeekdaysParse[s].test(e))return s;if(n&&"ddd"===t&&this._shortWeekdaysParse[s].test(e))return s;if(n&&"dd"===t&&this._minWeekdaysParse[s].test(e))return s;if(!n&&this._weekdaysParse[s].test(e))return s}},hn.weekdaysRegex=function(e){return this._weekdaysParseExact?(m(this,"_weekdaysRegex")||Be.call(this),e?this._weekdaysStrictRegex:this._weekdaysRegex):(m(this,"_weekdaysRegex")||(this._weekdaysRegex=$e),this._weekdaysStrictRegex&&e?this._weekdaysStrictRegex:this._weekdaysRegex)},hn.weekdaysShortRegex=function(e){return this._weekdaysParseExact?(m(this,"_weekdaysRegex")||Be.call(this),e?this._weekdaysShortStrictRegex:this._weekdaysShortRegex):(m(this,"_weekdaysShortRegex")||(this._weekdaysShortRegex=qe),this._weekdaysShortStrictRegex&&e?this._weekdaysShortStrictRegex:this._weekdaysShortRegex)},hn.weekdaysMinRegex=function(e){return this._weekdaysParseExact?(m(this,"_weekdaysRegex")||Be.call(this),e?this._weekdaysMinStrictRegex:this._weekdaysMinRegex):(m(this,"_weekdaysMinRegex")||(this._weekdaysMinRegex=Je),this._weekdaysMinStrictRegex&&e?this._weekdaysMinStrictRegex:this._weekdaysMinRegex)},hn.isPM=function(e){return"p"===(e+"").toLowerCase().charAt(0)},hn.meridiem=function(e,t,n){return 11<e?n?"pm":"PM":n?"am":"AM"},ot("en",{dayOfMonthOrdinalParse:/\d{1,2}(th|st|nd|rd)/,ordinal:function(e){var t=e%10;return e+(1===k(e%100/10)?"th":1===t?"st":2===t?"nd":3===t?"rd":"th")}}),c.lang=n("moment.lang is deprecated. Use moment.locale instead.",ot),c.langData=n("moment.langData is deprecated. Use moment.localeData instead.",lt);var _n=Math.abs;function yn(e,t,n,s){var i=At(t,n);return e._milliseconds+=s*i._milliseconds,e._days+=s*i._days,e._months+=s*i._months,e._bubble()}function gn(e){return e<0?Math.floor(e):Math.ceil(e)}function pn(e){return 4800*e/146097}function vn(e){return 146097*e/4800}function wn(e){return function(){return this.as(e)}}var Mn=wn("ms"),Sn=wn("s"),Dn=wn("m"),kn=wn("h"),Yn=wn("d"),On=wn("w"),Tn=wn("M"),xn=wn("y");function bn(e){return function(){return this.isValid()?this._data[e]:NaN}}var Pn=bn("milliseconds"),Wn=bn("seconds"),Hn=bn("minutes"),Rn=bn("hours"),Cn=bn("days"),Fn=bn("months"),Ln=bn("years");var Un=Math.round,Nn={ss:44,s:45,m:45,h:22,d:26,M:11};var Gn=Math.abs;function Vn(e){return(0<e)-(e<0)||+e}function En(){if(!this.isValid())return this.localeData().invalidDate();var e,t,n=Gn(this._milliseconds)/1e3,s=Gn(this._days),i=Gn(this._months);t=D((e=D(n/60))/60),n%=60,e%=60;var r=D(i/12),a=i%=12,o=s,u=t,l=e,d=n?n.toFixed(3).replace(/\.?0+$/,""):"",h=this.asSeconds();if(!h)return"P0D";var c=h<0?"-":"",f=Vn(this._months)!==Vn(h)?"-":"",m=Vn(this._days)!==Vn(h)?"-":"",_=Vn(this._milliseconds)!==Vn(h)?"-":"";return c+"P"+(r?f+r+"Y":"")+(a?f+a+"M":"")+(o?m+o+"D":"")+(u||l||d?"T":"")+(u?_+u+"H":"")+(l?_+l+"M":"")+(d?_+d+"S":"")}var In=Ht.prototype;return In.isValid=function(){return this._isValid},In.abs=function(){var e=this._data;return this._milliseconds=_n(this._milliseconds),this._days=_n(this._days),this._months=_n(this._months),e.milliseconds=_n(e.milliseconds),e.seconds=_n(e.seconds),e.minutes=_n(e.minutes),e.hours=_n(e.hours),e.months=_n(e.months),e.years=_n(e.years),this},In.add=function(e,t){return yn(this,e,t,1)},In.subtract=function(e,t){return yn(this,e,t,-1)},In.as=function(e){if(!this.isValid())return NaN;var t,n,s=this._milliseconds;if("month"===(e=R(e))||"year"===e)return t=this._days+s/864e5,n=this._months+pn(t),"month"===e?n:n/12;switch(t=this._days+Math.round(vn(this._months)),e){case"week":return t/7+s/6048e5;case"day":return t+s/864e5;case"hour":return 24*t+s/36e5;case"minute":return 1440*t+s/6e4;case"second":return 86400*t+s/1e3;case"millisecond":return Math.floor(864e5*t)+s;default:throw new Error("Unknown unit "+e)}},In.asMilliseconds=Mn,In.asSeconds=Sn,In.asMinutes=Dn,In.asHours=kn,In.asDays=Yn,In.asWeeks=On,In.asMonths=Tn,In.asYears=xn,In.valueOf=function(){return this.isValid()?this._milliseconds+864e5*this._days+this._months%12*2592e6+31536e6*k(this._months/12):NaN},In._bubble=function(){var e,t,n,s,i,r=this._milliseconds,a=this._days,o=this._months,u=this._data;return 0<=r&&0<=a&&0<=o||r<=0&&a<=0&&o<=0||(r+=864e5*gn(vn(o)+a),o=a=0),u.milliseconds=r%1e3,e=D(r/1e3),u.seconds=e%60,t=D(e/60),u.minutes=t%60,n=D(t/60),u.hours=n%24,o+=i=D(pn(a+=D(n/24))),a-=gn(vn(i)),s=D(o/12),o%=12,u.days=a,u.months=o,u.years=s,this},In.clone=function(){return At(this)},In.get=function(e){return e=R(e),this.isValid()?this[e+"s"]():NaN},In.milliseconds=Pn,In.seconds=Wn,In.minutes=Hn,In.hours=Rn,In.days=Cn,In.weeks=function(){return D(this.days()/7)},In.months=Fn,In.years=Ln,In.humanize=function(e){if(!this.isValid())return this.localeData().invalidDate();var t,n,s,i,r,a,o,u,l,d,h,c=this.localeData(),f=(n=!e,s=c,i=At(t=this).abs(),r=Un(i.as("s")),a=Un(i.as("m")),o=Un(i.as("h")),u=Un(i.as("d")),l=Un(i.as("M")),d=Un(i.as("y")),(h=r<=Nn.ss&&["s",r]||r<Nn.s&&["ss",r]||a<=1&&["m"]||a<Nn.m&&["mm",a]||o<=1&&["h"]||o<Nn.h&&["hh",o]||u<=1&&["d"]||u<Nn.d&&["dd",u]||l<=1&&["M"]||l<Nn.M&&["MM",l]||d<=1&&["y"]||["yy",d])[2]=n,h[3]=0<+t,h[4]=s,function(e,t,n,s,i){return i.relativeTime(t||1,!!n,e,s)}.apply(null,h));return e&&(f=c.pastFuture(+this,f)),c.postformat(f)},In.toISOString=En,In.toString=En,In.toJSON=En,In.locale=Qt,In.localeData=Kt,In.toIsoString=n("toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)",En),In.lang=Xt,I("X",0,0,"unix"),I("x",0,0,"valueOf"),ue("x",se),ue("X",/[+-]?\d+(\.\d{1,3})?/),ce("X",function(e,t,n){n._d=new Date(1e3*parseFloat(e,10))}),ce("x",function(e,t,n){n._d=new Date(k(e))}),c.version="2.22.2",e=Tt,c.fn=ln,c.min=function(){return Pt("isBefore",[].slice.call(arguments,0))},c.max=function(){return Pt("isAfter",[].slice.call(arguments,0))},c.now=function(){return Date.now?Date.now():+new Date},c.utc=y,c.unix=function(e){return Tt(1e3*e)},c.months=function(e,t){return fn(e,t,"months")},c.isDate=h,c.locale=ot,c.invalid=v,c.duration=At,c.isMoment=S,c.weekdays=function(e,t,n){return mn(e,t,n,"weekdays")},c.parseZone=function(){return Tt.apply(null,arguments).parseZone()},c.localeData=lt,c.isDuration=Rt,c.monthsShort=function(e,t){return fn(e,t,"monthsShort")},c.weekdaysMin=function(e,t,n){return mn(e,t,n,"weekdaysMin")},c.defineLocale=ut,c.updateLocale=function(e,t){if(null!=t){var n,s,i=nt;null!=(s=at(e))&&(i=s._config),(n=new P(t=b(i,t))).parentLocale=st[e],st[e]=n,ot(e)}else null!=st[e]&&(null!=st[e].parentLocale?st[e]=st[e].parentLocale:null!=st[e]&&delete st[e]);return st[e]},c.locales=function(){return s(st)},c.weekdaysShort=function(e,t,n){return mn(e,t,n,"weekdaysShort")},c.normalizeUnits=R,c.relativeTimeRounding=function(e){return void 0===e?Un:"function"==typeof e&&(Un=e,!0)},c.relativeTimeThreshold=function(e,t){return void 0!==Nn[e]&&(void 0===t?Nn[e]:(Nn[e]=t,"s"===e&&(Nn.ss=t-1),!0))},c.calendarFormat=function(e,t){var n=e.diff(t,"days",!0);return n<-6?"sameElse":n<-1?"lastWeek":n<0?"lastDay":n<1?"sameDay":n<2?"nextDay":n<7?"nextWeek":"sameElse"},c.prototype=ln,c.HTML5_FMT={DATETIME_LOCAL:"YYYY-MM-DDTHH:mm",DATETIME_LOCAL_SECONDS:"YYYY-MM-DDTHH:mm:ss",DATETIME_LOCAL_MS:"YYYY-MM-DDTHH:mm:ss.SSS",DATE:"YYYY-MM-DD",TIME:"HH:mm",TIME_SECONDS:"HH:mm:ss",TIME_MS:"HH:mm:ss.SSS",WEEK:"YYYY-[W]WW",MONTH:"YYYY-MM"},c});
moment.defineLocale('zh-cn', {
  months : '一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月'.split('_'),
  monthsShort : '1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月'.split('_'),
  weekdays : '星期日_星期一_星期二_星期三_星期四_星期五_星期六'.split('_'),
  weekdaysShort : '周日_周一_周二_周三_周四_周五_周六'.split('_'),
  weekdaysMin : '日_一_二_三_四_五_六'.split('_'),
  longDateFormat : {
    LT : 'Ah点mm分',
    LTS : 'Ah点m分s秒',
    L : 'YYYY-MM-DD',
    LL : 'YYYY年MMMD日',
    LLL : 'YYYY年MMMD日Ah点mm分',
    LLLL : 'YYYY年MMMD日ddddAh点mm分',
    l : 'YYYY-MM-DD',
    ll : 'YYYY年MMMD日',
    lll : 'YYYY年MMMD日Ah点mm分',
    llll : 'YYYY年MMMD日ddddAh点mm分'
  },
  meridiemParse: /凌晨|早上|上午|中午|下午|晚上/,
  meridiemHour: function (hour, meridiem) {
    if (hour === 12) {
      hour = 0;
    }
    if (meridiem === '凌晨' || meridiem === '早上' ||
      meridiem === '上午') {
      return hour;
    } else if (meridiem === '下午' || meridiem === '晚上') {
      return hour + 12;
    } else {
      // '中午'
      return hour >= 11 ? hour : hour + 12;
    }
  },
  meridiem : function (hour, minute, isLower) {
    var hm = hour * 100 + minute;
    if (hm < 600) {
      return '凌晨';
    } else if (hm < 900) {
      return '早上';
    } else if (hm < 1130) {
      return '上午';
    } else if (hm < 1230) {
      return '中午';
    } else if (hm < 1800) {
      return '下午';
    } else {
      return '晚上';
    }
  },
  calendar : {
    sameDay : function () {
      return this.minutes() === 0 ? '[今天]Ah[点整]' : '[今天]LT';
    },
    nextDay : function () {
      return this.minutes() === 0 ? '[明天]Ah[点整]' : '[明天]LT';
    },
    lastDay : function () {
      return this.minutes() === 0 ? '[昨天]Ah[点整]' : '[昨天]LT';
    },
    nextWeek : function () {
      var startOfWeek, prefix;
      startOfWeek = moment().startOf('week');
      prefix = this.unix() - startOfWeek.unix() >= 7 * 24 * 3600 ? '[下]' : '[本]';
      return this.minutes() === 0 ? prefix + 'dddAh点整' : prefix + 'dddAh点mm';
    },
    lastWeek : function () {
      var startOfWeek, prefix;
      startOfWeek = moment().startOf('week');
      prefix = this.unix() < startOfWeek.unix()  ? '[上]' : '[本]';
      return this.minutes() === 0 ? prefix + 'dddAh点整' : prefix + 'dddAh点mm';
    },
    sameElse : 'LL'
  },
  ordinalParse: /\d{1,2}(日|月|周)/,
  ordinal : function (number, period) {
    switch (period) {
      case 'd':
      case 'D':
      case 'DDD':
        return number + '日';
      case 'M':
        return number + '月';
      case 'w':
      case 'W':
        return number + '周';
      default:
        return number;
    }
  },
  relativeTime : {
    future : '%s内',
    past : '%s前',
    s : '几秒',
    m : '1 分钟',
    mm : '%d 分钟',
    h : '1 小时',
    hh : '%d 小时',
    d : '1 天',
    dd : '%d 天',
    M : '1 个月',
    MM : '%d 个月',
    y : '1 年',
    yy : '%d 年'
  },
  week : {
    // GB/T 7408-1994《数据元和交换格式·信息交换·日期和时间表示法》与ISO 8601:1988等效
    dow : 1, // Monday is the first day of the week.
    doy : 4  // The week that contains Jan 4th is the first week of the year.
  }
});


/*! Angular Moment Picker - v0.10.2 - http://indrimuska.github.io/angular-moment-picker - (c) 2015 Indri Muska - MIT */
!function(e){function t(o){if(i[o])return i[o].exports;var n=i[o]={i:o,l:!1,exports:{}};return e[o].call(n.exports,n,n.exports,t),n.l=!0,n.exports}var i={};t.m=e,t.c=i,t.i=function(e){return e},t.d=function(e,i,o){t.o(e,i)||Object.defineProperty(e,i,{configurable:!1,enumerable:!0,get:o})},t.n=function(e){var i=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(i,"a",i),i},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=17)}([function(e,t,i){"use strict";t.__esModule=!0;var o=i(1),n=i(2);t.KEYS={up:38,down:40,left:37,right:39,escape:27,enter:13},t.isValidMoment=function(e){return n.isMoment(e)&&e.isValid()},t.toValue=function(e,i,o){var n=e;return t.isValidMoment(e)||(n=t.toMoment(e,i,o)),t.momentToValue(n,i)},t.toMoment=function(e,i,o){var s=n(e,i,o);return t.isValidMoment(s)||(s=void 0),s},t.momentToValue=function(e,i){if(t.isValidMoment(e))return i?e.format(i):e.valueOf()},t.valueToMoment=function(e,t){var i;if(!e)return i;if(i=t.format?n(e,t.format,t.locale):n(e),t.model){var s=t.views.all.slice(0,t.views.all.indexOf(t.detectedMinView));o.forEach(s,function(e){var o=t.views.precisions[e];i[o](t.model[o]())})}return i},t.setValue=function(e,i,o,n){var s=t.isValidMoment(e)?e.clone():t.valueToMoment(e,i),r=t.momentToValue(s,i.format);i.model=t.updateMoment(i.model,s,i),o.$modelValue=t.updateMoment(o.$modelValue,s,i),n.ngModel!=n.momentPicker&&(i.value=r),n.ngModel&&(o.$setViewValue(r),o.$render())},t.updateMoment=function(e,i,n){if(t.isValidMoment(e)&&i){if(!e.isSame(i)){var s=n.views.all.slice(0,n.views.all.indexOf(n.detectedMaxView)+1);o.forEach(s,function(t){var o=n.views.precisions[t];e[o](i[o]())})}}else e=i;return e}},function(e,t){e.exports=angular},function(e,t){e.exports=moment},function(e,t){},function(e,t){},function(e,t,i){"use strict";t.__esModule=!0;var o=i(1),n=i(9);t.Provider=n.default;var s=i(7);t.Directive=s.default,o.module("moment-picker",[]).provider("momentPicker",[function(){return new n.default}]).directive("momentPicker",["$timeout","$sce","$log","$window","momentPicker","$compile","$templateCache",function(e,t,i,o,n,r,a){return new s.default(e,t,i,o,n,r,a)}])},function(e,t){e.exports='<div class=moment-picker> <div class="moment-picker-container {{view.selected}}-view" ng-class="{\'moment-picker-disabled\': disabled, open: view.isOpen}"> <div ng-if=additions.top class="moment-picker-addition top"></div> <table class=header-view ng-if=showHeader> <thead> <tr> <th ng-class="{disabled: !view.previous.selectable}" ng-bind-html=view.previous.label ng-click=view.previous.set()></th> <th ng-bind=view.title ng-click=view.setParentView()></th> <th ng-class="{disabled: !view.next.selectable}" ng-bind-html=view.next.label ng-click=view.next.set()></th> </tr> </thead> </table> <div class=moment-picker-specific-views> <table class=moment-picker-content> <thead ng-if=views[view.selected].headers> <tr> <th ng-repeat="header in views[view.selected].headers" ng-bind=header></th> </tr> </thead> <tbody> <tr ng-repeat="row in views[view.selected].rows"> <td ng-repeat="item in row track by item.index" ng-class=item.class ng-click="!disabled && views[view.selected].set(item)"><span ng-bind=item.label></span></td> </tr> </tbody> </table> </div> <div ng-if=additions.bottom class="moment-picker-addition bottom"></div> </div> </div>'},function(e,t,i){"use strict";t.__esModule=!0;var o=i(1),n=i(2),s=i(8),r=i(13),a=i(0),l=i(6),c=function(){function e(e,t,i,c,d,m,u){var h=this;this.$timeout=e,this.$sce=t,this.$log=i,this.$window=c,this.provider=d,this.$compile=m,this.$templateCache=u,this.restrict="A",this.require="?ngModel",this.transclude=!0,this.template=l,this.scope={value:"=?momentPicker",model:"=?ngModel",locale:"@?",format:"@?",minView:"@?",maxView:"@?",startView:"@?",minDate:"=?",maxDate:"=?",startDate:"=?",disabled:"=?disable",position:"@?",inline:"@?",validate:"=?",autoclose:"=?",setOnSelect:"=?",isOpen:"=?",today:"=?",keyboard:"=?",showHeader:"=?",additions:"=?",change:"&?",selectable:"&?"},this.link=function(e,t,i,l,c){c(function(c){o.forEach(["locale","format","minView","maxView","startView","position","inline","validate","autoclose","setOnSelect","today","keyboard","showHeader","leftArrow","rightArrow","additions"],function(t){o.isDefined(e[t])||(e[t]=h.provider[t]),o.isDefined(i[t])||(i[t]=e[t])}),i.ngModel||(l={}),e.limits={minDate:a.toMoment(e.minDate,e.format,e.locale),maxDate:a.toMoment(e.maxDate,e.format,e.locale),isAfterOrEqualMin:function(t,i){return!o.isDefined(e.limits.minDate)||t.isAfter(e.limits.minDate,i)||t.isSame(e.limits.minDate,i)},isBeforeOrEqualMax:function(t,i){return!o.isDefined(e.limits.maxDate)||t.isBefore(e.limits.maxDate,i)||t.isSame(e.limits.maxDate,i)},isSelectable:function(t,n){var s=!0;try{o.isFunction(e.selectable)&&i.selectable&&(s=e.selectable({date:t,type:n}))}catch(e){h.$log.error(e)}return e.limits.isAfterOrEqualMin(t,n)&&e.limits.isBeforeOrEqualMax(t,n)&&s},checkValue:function(){a.isValidMoment(l.$modelValue)&&e.validate&&(e.limits.isAfterOrEqualMin(l.$modelValue)||a.setValue(e.limits.minDate,e,l,i),e.limits.isBeforeOrEqualMax(l.$modelValue)||a.setValue(e.limits.maxDate,e,l,i))},checkView:function(){o.isDefined(e.view.moment)||(e.view.moment=n().locale(e.locale)),e.limits.isAfterOrEqualMin(e.view.moment)||(e.view.moment=e.limits.minDate.clone()),e.limits.isBeforeOrEqualMax(e.view.moment)||(e.view.moment=e.limits.maxDate.clone()),e.view.update(),e.view.render()}},e.views={all:["decade","year","month","day","hour","minute"],precisions:{decade:"year",year:"month",month:"date",day:"hour",hour:"minute",minute:"second"},formats:{decade:"Y{1,2}(?!Y)|YYYY|[Ll]{1,4}(?!T)",year:"M{1,4}(?![Mo])|Mo|Q",month:"[Dd]{1,4}(?![Ddo])|DDDo|[Dd]o|[Ww]{1,2}(?![Wwo])|[Ww]o|[Ee]|L{1,2}(?!T)|l{1,2}",day:"[Hh]{1,2}|LTS?",hour:"m{1,2}|[Ll]{3,4}|LT(?!S)",minute:"s{1,2}|S{1,}|X|LTS"},detectMinMax:function(){if(e.detectedMinView=e.detectedMaxView=void 0,e.format){var t,i;o.forEach(e.views.formats,function(n,s){var r=new RegExp("("+n+")(?![^[]*])","g");e.format.match(r)&&(o.isDefined(t)||(t=s),i=s)}),t=o.isDefined(t)?Math.max(0,e.views.all.indexOf(t)):0,i=o.isDefined(i)?Math.min(e.views.all.length-1,e.views.all.indexOf(i)):e.views.all.length-1,t>e.views.all.indexOf(e.minView)&&(e.minView=e.views.all[t]),i<e.views.all.indexOf(e.maxView)&&(e.maxView=e.views.all[i]),e.detectedMinView=e.views.all[t],e.detectedMaxView=e.views.all[i]}},decade:new r.DecadeView(e,l,h.provider),year:new r.YearView(e,l,h.provider),month:new r.MonthView(e,l,h.provider),day:new r.DayView(e,l,h.provider),hour:new r.HourView(e,l,h.provider),minute:new r.MinuteView(e,l,h.provider)},e.view={moment:void 0,value:void 0,isOpen:!1,selected:e.startView,update:function(){e.view.value=a.momentToValue(e.view.moment,e.format)},toggle:function(){e.view.isOpen?e.view.close():e.view.open()},open:function(){e.disabled||e.view.isOpen||e.inline||(e.isOpen=!0,e.view.isOpen=!0,document.body.appendChild(e.picker[0]),e.view.position())},close:function(){e.view.isOpen&&!e.inline&&(e.isOpen=!1,e.view.isOpen=!1,e.view.selected=e.startView,e.picker[0].parentNode.removeChild(e.picker[0]))},position:function(){if(e.view.isOpen&&!e.position&&!e.inline){var i=t[0],o=e.picker.children()[0],n=e.picker.hasClass("top"),r=e.picker.hasClass("right"),a=s.getOffset(t[0]),l=a.top-h.$window.pageYOffset,c=a.left-h.$window.pageXOffset,d=h.$window.innerWidth,m=h.$window.innerHeight,u=l+h.$window.pageYOffset-o.offsetHeight>0&&l>m/2,p=c+o.offsetWidth>d,v=a.top+(u?0:i.offsetHeight)+"px",w=a.left+"px",f=i.offsetWidth+"px";!n&&u&&e.picker.addClass("top"),n&&!u&&e.picker.removeClass("top"),!r&&p&&e.picker.addClass("right"),r&&!p&&e.picker.removeClass("right"),e.picker.css("top")!==v&&e.picker.css("top",v),e.picker.css("left")!==w&&e.picker.css("left",w),e.picker.css("width")!==f&&e.picker.css("width",f)}},keydown:function(t){var i=e.views[e.view.selected],o=e.views.precisions[e.view.selected].replace("date","day"),n=h.provider[o+"sStep"]||1,s=[a.KEYS.up,a.KEYS.left].indexOf(t.keyCode)>=0?"subtract":"add",r=function(t){var r=t?i.perLine:1,a=e.view.moment.clone()[s](n*r,o);e.limits.isSelectable(a,o)&&(e.view.moment=a,e.view.update(),e.view.render())};switch(t.keyCode){case a.KEYS.up:case a.KEYS.down:t.preventDefault(),e.view.isOpen?r(!0):e.view.open();break;case a.KEYS.left:case a.KEYS.right:if(!e.view.isOpen)break;t.preventDefault(),r();break;case a.KEYS.enter:if(!e.view.isOpen)break;e.view.change(o),t.preventDefault();break;case a.KEYS.escape:e.view.toggle()}e.$evalAsync()},unit:function(){return"decade"==e.view.selected?10:1},precision:function(){return e.view.selected.replace("decade","year")},title:"",previous:{label:h.$sce.trustAsHtml(e.leftArrow),selectable:!0,set:function(){e.view.previous.selectable&&(e.view.moment.subtract(e.view.unit(),e.view.precision()),e.view.update(),e.view.render())}},next:{selectable:!0,label:h.$sce.trustAsHtml(e.rightArrow),set:function(){e.view.next.selectable&&(e.view.moment.add(e.view.unit(),e.view.precision()),e.view.update(),e.view.render())}},setParentView:function(){e.view.change(e.views.all[Math.max(0,e.views.all.indexOf(e.view.selected)-1)])},render:function(){var t=e.view.moment.clone().startOf(e.view.precision()).subtract(e.view.unit(),e.view.precision()),i=e.view.moment.clone().endOf(e.view.precision()).add(e.view.unit(),e.view.precision());e.view.previous.selectable=e.limits.isAfterOrEqualMin(t,e.view.precision()),e.view.previous.label=h.$sce.trustAsHtml(e.view.previous.selectable?e.leftArrow:"&nbsp;"),e.view.next.selectable=e.limits.isBeforeOrEqualMax(i,e.view.precision()),e.view.next.label=h.$sce.trustAsHtml(e.view.next.selectable?e.rightArrow:"&nbsp;"),e.view.title=e.views[e.view.selected].render()},change:function(t){var o=e.views.all.indexOf(t),n=e.views.all.indexOf(e.minView),s=e.views.all.indexOf(e.maxView),r=function(){a.setValue(e.view.moment,e,l,i),e.view.update(),i.ngModel&&l.$commitViewValue()};e.setOnSelect&&r(),o<0||o>s?(e.setOnSelect||r(),e.autoclose&&h.$timeout(e.view.close)):o>=n&&(e.view.selected=t)}},t.prepend(c),e.picker=o.element(t[0].querySelectorAll(".moment-picker")),e.container=o.element(e.picker[0].querySelectorAll(".moment-picker-container")),e.input="input"!=t[0].tagName.toLowerCase()&&t[0].querySelectorAll("input").length>0?o.element(t[0].querySelectorAll("input")):o.element(t[0]),e.input.addClass("moment-picker-input").attr("tabindex",0),(e.position||"").split(" ").forEach(function(t){return e.picker.addClass(t)}),e.inline?(t.after(e.picker),e.picker.addClass("inline")):e.picker[0].parentNode.removeChild(e.picker[0]),h.$timeout(function(){o.forEach(e.additions||{},function(t,i){var n=o.element(e.container[0].querySelector(".moment-picker-addition."+i)),s=h.$templateCache.get(t),r=h.$compile(s)(e.$parent);n.append(r)})}),e.views.detectMinMax(),e.limits.checkView(),h.$timeout(function(){i.ngModel?(!l.$modelValue&&e.value&&l.$setViewValue(e.value),l.$commitViewValue(),l.$render()):e.value&&(l.$modelValue=a.valueToMoment(e.value,e)),e.startDate?e.view.moment=a.toMoment(e.startDate,e.format,e.locale):a.isValidMoment(l.$modelValue)&&(e.view.moment=l.$modelValue.clone()),e.view.update(),e.view.render()}),i.ngModel&&(l.$parsers.push(function(t){return a.updateMoment(l.$modelValue,a.valueToMoment(t,e),e)||!0}),l.$formatters.push(function(t){return a.momentToValue(t,e.format)||""}),l.$viewChangeListeners.push(function(){i.ngModel!=i.momentPicker&&(e.value=l.$viewValue)}),l.$validators.minDate=function(t){return e.validate||!a.isValidMoment(t)||e.limits.isAfterOrEqualMin(t)},l.$validators.maxDate=function(t){return e.validate||!a.isValidMoment(t)||e.limits.isBeforeOrEqualMax(t)}),i.ngModel!=i.momentPicker&&e.$watch("value",function(t,o){t!==o&&a.setValue(t,e,l,i)}),e.$watch(function(){return a.momentToValue(l.$modelValue,e.format)},function(t,s){if(t!=s){var r=a.valueToMoment(t,e);if(a.setValue(r,e,l,i),e.limits.checkValue(),e.view.moment=(r||n().locale(e.locale)).clone(),e.view.update(),e.view.render(),o.isFunction(e.change)&&i.change){var c=a.valueToMoment(s,e);e.$evalAsync(function(){return e.change({newValue:r,oldValue:c})})}}}),e.$watch(function(){return l.$modelValue&&l.$modelValue.valueOf()},function(){var t=(a.isValidMoment(l.$modelValue)?l.$modelValue:n().locale(e.locale)).clone();t.isSame(e.view.moment)||(e.view.moment=t,e.view.update(),e.view.render())}),e.$watch("view.selected",function(){return e.view.render()}),e.$watchGroup(["minView","maxView"],function(){e.views.detectMinMax(),e.startView=e.views.all[Math.max(Math.min(e.views.all.indexOf(e.startView),e.views.all.indexOf(e.maxView)),e.views.all.indexOf(e.minView))],e.view.selected=e.startView}),e.$watchGroup([function(){return a.toValue(e.minDate,e.format,e.locale)},function(){return a.toValue(e.maxDate,e.format,e.locale)}],function(){o.forEach(["minDate","maxDate"],function(t){e.limits[t]=a.toMoment(e[t],e.format,e.locale)}),e.limits.checkValue(),e.limits.checkView(),e.view.render()}),e.$watch(function(){return a.toValue(e.startDate,e.format,e.locale)},function(t,i){t!=i&&(e.view.moment=a.valueToMoment(t,e),e.view.update(),e.view.render())}),i.$observe("locale",function(t){return e.locale=t}),e.$watch("locale",function(t,n){o.isDefined(n)&&t!=n&&(a.isValidMoment(l.$modelValue)&&a.setValue(l.$modelValue.locale(t),e,l,i),a.isValidMoment(e.view.moment)&&(e.view.moment=e.view.moment.locale(t)),a.isValidMoment(e.limits.minDate)&&(e.limits.minDate=e.limits.minDate.locale(t)),a.isValidMoment(e.limits.maxDate)&&(e.limits.maxDate=e.limits.maxDate.locale(t)),e.view.render())}),e.$watch("validate",e.limits.checkValue),e.$watch("isOpen",function(t){e.inline?e.view.isOpen=!0:o.isDefined(t)&&t!=e.view.isOpen&&e.view.toggle()});var d=function(t){t&&t.preventDefault(),e.input[0].focus()};e.input.on("focus click touchstart",function(){return e.$evalAsync(e.view.open)}).on("blur",function(){return e.$evalAsync(e.view.close)}).on("keydown",function(t){e.keyboard&&e.view.keydown(t)}),t.on("click touchstart",function(){return d()}),e.container.on("mousedown",function(e){return d(e)}),o.element(h.$window).on("resize scroll",e.view.position),e.$on("$destroy",function(){e.input.off("focus click touchstart blur keydown"),t.off("click touchstart"),e.container.off("mousedown"),e.picker.remove(),o.element(h.$window).off("resize scroll",e.view.position)})})}}return e}();t.default=c},function(e,t,i){"use strict";t.__esModule=!0,t.getOffset=function(e){if(e){if(!e.getClientRects().length)return{top:0,left:0};var t=function(e){return null!=e&&e===e.window},i=e.getBoundingClientRect();if(!i.width&&!i.height)return i;var o=e.ownerDocument,n=function(e){return t(e)?e:9===e.nodeType&&e.defaultView}(o),s=o.documentElement;return{top:i.top+n.pageYOffset-s.clientTop,left:i.left+n.pageXOffset-s.clientLeft}}}},function(e,t,i){"use strict";t.__esModule=!0;var o=i(1),n=function(){function e(){this.settings={locale:"zh-cn",format:"L LTS",minView:"decade",maxView:"minute",startView:"year",inline:!1,validate:!0,autoclose:!0,setOnSelect:!1,today:!1,keyboard:!1,showHeader:!0,leftArrow:"&larr;",rightArrow:"&rarr;",yearsFormat:"YYYY",monthsFormat:"MMM",daysFormat:"D",hoursFormat:"HH:[00]",hoursStart:0,hoursEnd:23,minutesStep:5,minutesStart:0,minutesEnd:59,secondsFormat:"ss",secondsStep:1,secondsStart:0,secondsEnd:59}}return e.prototype.options=function(e){return o.extend(this.settings,e),o.copy(this.settings)},e.prototype.$get=function(){return this.settings},e}();t.default=n},function(e,t,i){"use strict";t.__esModule=!0;var o=i(0),n=function(){function e(e,t,i){this.$scope=e,this.$ctrl=t,this.provider=i,this.perLine=4,this.rows={}}return e.prototype.render=function(){var e=this.$scope.view.moment.clone().startOf("day").hour(this.provider.hoursStart);this.rows={};for(var t=0;t<=this.provider.hoursEnd-this.provider.hoursStart;t++){var i=Math.floor(t/this.perLine),n=this.$scope.limits.isSelectable(e,"hour");this.rows[i]||(this.rows[i]=[]),this.rows[i].push({index:t,label:e.format(this.provider.hoursFormat),year:e.year(),month:e.month(),date:e.date(),hour:e.hour(),class:[this.$scope.keyboard&&e.isSame(this.$scope.view.moment,"hour")?"highlighted":"",n?o.isValidMoment(this.$ctrl.$modelValue)&&e.isSame(this.$ctrl.$modelValue,"hour")?"selected":"":"disabled"].join(" ").trim(),selectable:n}),e.add(1,"hours")}return this.$scope.view.moment.format("LL")},e.prototype.set=function(e){e.selectable&&(this.$scope.view.moment.year(e.year).month(e.month).date(e.date).hour(e.hour),this.$scope.view.update(),this.$scope.view.change("hour"))},e}();t.default=n},function(e,t,i){"use strict";t.__esModule=!0;var o=i(0),n=function(){function e(e,t,i){this.$scope=e,this.$ctrl=t,this.provider=i,this.perLine=4,this.rows={}}return e.prototype.render=function(){var e=this.$scope.view.moment.clone(),t=10*Math.floor(e.year()/10)-1;this.rows={},e.year(t);for(var i=0;i<12;i++){var n=Math.floor(i/this.perLine),s=this.$scope.limits.isSelectable(e,"year");this.rows[n]||(this.rows[n]=[]),this.rows[n].push({index:e.year(),label:e.format(this.provider.yearsFormat),year:e.year(),class:[this.$scope.keyboard&&e.isSame(this.$scope.view.moment,"year")?"highlighted":"",!s||[0,11].indexOf(i)>=0?"disabled":o.isValidMoment(this.$ctrl.$modelValue)&&e.isSame(this.$ctrl.$modelValue,"year")?"selected":""].join(" ").trim(),selectable:s}),e.add(1,"years")}return[e.subtract(2,"years").format("YYYY"),e.subtract(9,"years").format("YYYY")].reverse().join(" - ")},e.prototype.set=function(e){e.selectable&&(this.$scope.view.moment.year(e.year),this.$scope.view.update(),this.$scope.view.change("year"))},e}();t.default=n},function(e,t,i){"use strict";t.__esModule=!0;var o=i(1),n=i(2),s=i(0),r=function(){function e(e,t,i){this.$scope=e,this.$ctrl=t,this.provider=i,this.perLine=4,this.rows={}}return e.prototype.render=function(){var e=0,t=this.$scope.view.moment.clone().startOf("hour").minute(this.provider.minutesStart),i=this.provider.minutesFormat||n.localeData(this.$scope.locale).longDateFormat("LT").replace(/[aA]/,"").trim();this.rows={};for(var o=0;o<=this.provider.minutesEnd-this.provider.minutesStart;o+=this.provider.minutesStep){var r=Math.floor(e/this.perLine),a=this.$scope.limits.isSelectable(t,"minute");this.rows[r]||(this.rows[r]=[]),this.rows[r].push({index:t.minute(),label:t.format(i),year:t.year(),month:t.month(),date:t.date(),hour:t.hour(),minute:t.minute(),class:[this.$scope.keyboard&&t.isSame(this.$scope.view.moment,"minute")?"highlighted":"",a?s.isValidMoment(this.$ctrl.$modelValue)&&t.isSame(this.$ctrl.$modelValue,"minute")?"selected":"":"disabled"].join(" ").trim(),selectable:a}),e++,t.add(this.provider.minutesStep,"minutes")}return this.$scope.keyboard&&this.highlightClosest(),this.$scope.view.moment.clone().startOf("hour").format("lll")},e.prototype.set=function(e){e.selectable&&(this.$scope.view.moment.year(e.year).month(e.month).date(e.date).hour(e.hour).minute(e.minute),this.$scope.view.update(),this.$scope.view.change("minute"))},e.prototype.highlightClosest=function(){var e,t=this,i=[];o.forEach(this.rows,function(e){o.forEach(e,function(e){Math.abs(e.minute-t.$scope.view.moment.minute())<t.provider.minutesStep&&i.push(e)})}),(e=i.sort(function(e,i){return Math.abs(e.minute-t.$scope.view.moment.minute())>Math.abs(i.minute-t.$scope.view.moment.minute())?1:0})[0])&&e.minute-this.$scope.view.moment.minute()!=0&&(this.$scope.view.moment.year(e.year).month(e.month).date(e.date).hour(e.hour).minute(e.minute),this.$scope.view.update(),e.selectable&&(e.class=(e.class+" highlighted").trim()))},e}();t.default=r},function(e,t,i){"use strict";t.__esModule=!0;var o=i(11);t.DecadeView=o.default;var n=i(16);t.YearView=n.default;var s=i(15);t.MonthView=s.default;var r=i(10);t.DayView=r.default;var a=i(12);t.HourView=a.default;var l=i(14);t.MinuteView=l.default},function(e,t,i){"use strict";t.__esModule=!0;var o=i(1),n=i(0),s=function(){function e(e,t,i){this.$scope=e,this.$ctrl=t,this.provider=i,this.perLine=6,this.rows={}}return e.prototype.render=function(){var e=0,t=this.$scope.view.moment.clone().startOf("minute").second(this.provider.secondsStart);this.rows={};for(var i=0;i<=this.provider.secondsEnd-this.provider.secondsStart;i+=this.provider.secondsStep){var o=Math.floor(e/this.perLine),s=this.$scope.limits.isSelectable(t,"second");this.rows[o]||(this.rows[o]=[]),this.rows[o].push({index:t.second(),label:t.format(this.provider.secondsFormat),year:t.year(),month:t.month(),date:t.date(),hour:t.hour(),minute:t.minute(),second:t.second(),class:[this.$scope.keyboard&&t.isSame(this.$scope.view.moment,"second")?"highlighted":"",s?n.isValidMoment(this.$ctrl.$modelValue)&&t.isSame(this.$ctrl.$modelValue,"second")?"selected":"":"disabled"].join(" ").trim(),selectable:s}),e++,t.add(this.provider.secondsStep,"seconds")}return this.$scope.keyboard&&this.highlightClosest(),this.$scope.view.moment.clone().startOf("minute").format("lll")},e.prototype.set=function(e){e.selectable&&(this.$scope.view.moment.year(e.year).month(e.month).date(e.date).hour(e.hour).minute(e.minute).second(e.second),this.$scope.view.update(),this.$scope.view.change())},e.prototype.highlightClosest=function(){var e,t=this,i=[];o.forEach(this.rows,function(e){o.forEach(e,function(e){Math.abs(e.second-t.$scope.view.moment.second())<t.provider.secondsStep&&i.push(e)})}),(e=i.sort(function(e,i){return Math.abs(e.second-t.$scope.view.moment.second())>Math.abs(i.second-t.$scope.view.moment.second())?1:0})[0])&&e.second-this.$scope.view.moment.second()!=0&&(this.$scope.view.moment.year(e.year).month(e.month).date(e.date).hour(e.hour).minute(e.minute).second(e.second),this.$scope.view.update(),e.selectable&&(e.class=(e.class+" highlighted").trim()))},e}();t.default=s},function(e,t,i){"use strict";t.__esModule=!0;var o=i(1),n=i(2),s=i(0),r=function(){function e(e,t,i){this.$scope=e,this.$ctrl=t,this.provider=i,this.perLine=n.weekdays().length,this.rows=[]}return e.prototype.render=function(){var e=this,t=this.$scope.view.moment.month(),i=this.$scope.view.moment.clone().startOf("month").startOf("week").hour(12),r={},a=i.week(),l=a+5;this.rows=[];for(var c=a;c<=l;c++)r[c]=Array.apply(null,Array(this.perLine)).map(function(){var o=e.$scope.limits.isSelectable(i,"day"),n={index:i.date(),label:i.format(e.provider.daysFormat),year:i.year(),month:i.month(),date:i.date(),class:[e.$scope.keyboard&&i.isSame(e.$scope.view.moment,"day")?"highlighted":"",e.$scope.today&&i.isSame(new Date,"day")?"today":"",o&&i.month()==t?s.isValidMoment(e.$ctrl.$modelValue)&&i.isSame(e.$ctrl.$modelValue,"day")?"selected":"":"disabled"].join(" ").trim(),selectable:o};return i.add(1,"days"),n});return o.forEach(r,function(t){return e.rows.push(t)}),this.headers=n.weekdays().map(function(t,i){return n().locale(e.$scope.locale).startOf("week").add(i,"day").format("dd")}),this.$scope.view.moment.format("MMMM YYYY")},e.prototype.set=function(e){e.selectable&&(this.$scope.view.moment.year(e.year).month(e.month).date(e.date),this.$scope.view.update(),this.$scope.view.change("day"))},e}();t.default=r},function(e,t,i){"use strict";t.__esModule=!0;var o=i(2),n=i(0),s=function(){function e(e,t,i){this.$scope=e,this.$ctrl=t,this.provider=i,this.perLine=4,this.rows={}}return e.prototype.render=function(){var e=this,t=this.$scope.view.moment.clone().startOf("year"),i=o.monthsShort();return this.rows={},i.forEach(function(i,o){var s=Math.floor(o/e.perLine),r=e.$scope.limits.isSelectable(t,"month");e.rows[s]||(e.rows[s]=[]),e.rows[s].push({index:t.month(),label:t.format(e.provider.monthsFormat),year:t.year(),month:t.month(),class:[e.$scope.keyboard&&t.isSame(e.$scope.view.moment,"month")?"highlighted":"",r?n.isValidMoment(e.$ctrl.$modelValue)&&t.isSame(e.$ctrl.$modelValue,"month")?"selected":"":"disabled"].join(" ").trim(),selectable:r}),t.add(1,"months")}),this.$scope.view.moment.format("YYYY")},e.prototype.set=function(e){e.selectable&&(this.$scope.view.moment.year(e.year).month(e.month),this.$scope.view.update(),this.$scope.view.change("month"))},e}();t.default=s},function(e,t,i){i(5),i(3),e.exports=i(4)}]);

!function(a){"use strict";a.module("uuid4",[]).factory("uuid4",function(){var a=function(a){return Math.pow(2,a)},b=(a(4),a(6)),c=a(8),d=a(12),e=(a(14),a(16)),f=a(32),g=(a(40),a(48),function(a,b){return Math.floor(Math.random()*(b-a+1))+a}),h=function(){return g(0,b-1)},i=function(){return g(0,c-1)},j=function(){return g(0,d-1)},k=function(){return g(0,e-1)},l=function(){return g(0,f-1)},m=function(){return(0|Math.random()*(1<<30))+(0|Math.random()*(1<<18))*(1<<30)},n=function(a,b,c){a=String(a),c=c?c:"0";for(var d=b-a.length;d>0;d>>>=1,c+=c)1&d&&(a=c+a);return a},o=function(a,b,c,d,e,f){var g=n(a.toString(16),8)+"-"+n(b.toString(16),4)+"-"+n(c.toString(16),4)+"-"+n(d.toString(16),2)+n(e.toString(16),2)+"-"+n(f.toString(16),12);return g};return{generate:function(){return o(l(),k(),16384|j(),128|h(),i(),m())},validate:function(a){var b=/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;return b.test(a)}}})}(angular);
!function(e){"function"==typeof define&&define.amd?define(["jquery"],e):e("object"==typeof exports?require("jquery"):jQuery)}(function(e){"use strict";function t(e){for(var t,n=e.split(/\s+/),a=[],o=0;t=n[o];o++)t=t.charAt(0).toUpperCase(),a.push(t);return a}function n(t){return t.id&&e('label[for="'+t.id+'"]').val()||t.name}function a(t,o,i){return i||(i=0),o.each(function(){var o,s,c=e(this),r=this,l=this.nodeName.toLowerCase();switch("label"===l&&c.find("input, textarea, select").length&&(o=c.text(),c=c.children().first(),r=c.get(0),l=r.nodeName.toLowerCase()),l){case"menu":s={name:c.attr("label"),items:{}},i=a(s.items,c.children(),i);break;case"a":case"button":s={name:c.text(),disabled:!!c.attr("disabled"),callback:function(){return function(){c.click()}}()};break;case"menuitem":case"command":switch(c.attr("type")){case void 0:case"command":case"menuitem":s={name:c.attr("label"),disabled:!!c.attr("disabled"),icon:c.attr("icon"),callback:function(){return function(){c.click()}}()};break;case"checkbox":s={type:"checkbox",disabled:!!c.attr("disabled"),name:c.attr("label"),selected:!!c.attr("checked")};break;case"radio":s={type:"radio",disabled:!!c.attr("disabled"),name:c.attr("label"),radio:c.attr("radiogroup"),value:c.attr("id"),selected:!!c.attr("checked")};break;default:s=void 0}break;case"hr":s="-------";break;case"input":switch(c.attr("type")){case"text":s={type:"text",name:o||n(r),disabled:!!c.attr("disabled"),value:c.val()};break;case"checkbox":s={type:"checkbox",name:o||n(r),disabled:!!c.attr("disabled"),selected:!!c.attr("checked")};break;case"radio":s={type:"radio",name:o||n(r),disabled:!!c.attr("disabled"),radio:!!c.attr("name"),value:c.val(),selected:!!c.attr("checked")};break;default:s=void 0}break;case"select":s={type:"select",name:o||n(r),disabled:!!c.attr("disabled"),selected:c.val(),options:{}},c.children().each(function(){s.options[this.value]=e(this).text()});break;case"textarea":s={type:"textarea",name:o||n(r),disabled:!!c.attr("disabled"),value:c.val()};break;case"label":break;default:s={type:"html",html:c.clone(!0)}}s&&(i++,t["key"+i]=s)}),i}e.support.htmlMenuitem="HTMLMenuItemElement"in window,e.support.htmlCommand="HTMLCommandElement"in window,e.support.eventSelectstart="onselectstart"in document.documentElement,e.ui&&e.widget||(e.cleanData=function(t){return function(n){var a,o,i;for(i=0;null!=n[i];i++){o=n[i];try{a=e._data(o,"events"),a&&a.remove&&e(o).triggerHandler("remove")}catch(e){}}t(n)}}(e.cleanData));var o=null,i=!1,s=e(window),c=0,r={},l={},u={},d={selector:null,appendTo:null,trigger:"right",autoHide:!1,delay:200,reposition:!0,selectableSubMenu:!1,classNames:{hover:"context-menu-hover",disabled:"context-menu-disabled",visible:"context-menu-visible",notSelectable:"context-menu-not-selectable",icon:"context-menu-icon",iconEdit:"context-menu-icon-edit",iconCut:"context-menu-icon-cut",iconCopy:"context-menu-icon-copy",iconPaste:"context-menu-icon-paste",iconDelete:"context-menu-icon-delete",iconAdd:"context-menu-icon-add",iconQuit:"context-menu-icon-quit",iconLoadingClass:"context-menu-icon-loading"},determinePosition:function(t){if(e.ui&&e.ui.position)t.css("display","block").position({my:"center top",at:"center bottom",of:this,offset:"0 5",collision:"fit"}).css("display","none");else{var n=this.offset();n.top+=this.outerHeight(),n.left+=this.outerWidth()/2-t.outerWidth()/2,t.css(n)}},position:function(e,t,n){var a;if(!t&&!n)return void e.determinePosition.call(this,e.$menu);a="maintain"===t&&"maintain"===n?e.$menu.position():{top:n,left:t};var o=s.scrollTop()+s.height(),i=s.scrollLeft()+s.width(),c=e.$menu.outerHeight(),r=e.$menu.outerWidth();a.top+c>o&&(a.top-=c),a.top<0&&(a.top=0),a.left+r>i&&(a.left-=r),a.left<0&&(a.left=0),e.$menu.css(a)},positionSubmenu:function(t){if("undefined"!=typeof t)if(e.ui&&e.ui.position)t.css("display","block").position({my:"left top-5",at:"right top",of:this,collision:"flipfit fit"}).css("display","");else{var n={top:-9,left:this.outerWidth()-5};t.css(n)}},zIndex:1,animation:{duration:50,show:"slideDown",hide:"slideUp"},events:{show:e.noop,hide:e.noop},callback:null,items:{}},m={timer:null,pageX:null,pageY:null},p=function(e){for(var t=0,n=e;;)if(t=Math.max(t,parseInt(n.css("z-index"),10)||0),n=n.parent(),!n||!n.length||"html body".indexOf(n.prop("nodeName").toLowerCase())>-1)break;return t},f={abortevent:function(e){e.preventDefault(),e.stopImmediatePropagation()},contextmenu:function(t){var n=e(this);if("right"===t.data.trigger&&(t.preventDefault(),t.stopImmediatePropagation()),!("right"!==t.data.trigger&&"demand"!==t.data.trigger&&t.originalEvent||!("undefined"==typeof t.mouseButton||!t.data||"left"===t.data.trigger&&0===t.mouseButton||"right"===t.data.trigger&&2===t.mouseButton)||n.hasClass("context-menu-active")||n.hasClass("context-menu-disabled"))){if(o=n,t.data.build){var a=t.data.build(o,t);if(a===!1)return;if(t.data=e.extend(!0,{},d,t.data,a||{}),!t.data.items||e.isEmptyObject(t.data.items))throw window.console&&(console.error||console.log).call(console,"No items specified to show in contextMenu"),new Error("No Items specified");t.data.$trigger=o,h.create(t.data)}var i=!1;for(var s in t.data.items)if(t.data.items.hasOwnProperty(s)){var c;c=e.isFunction(t.data.items[s].visible)?t.data.items[s].visible.call(e(t.currentTarget),s,t.data):"undefined"==typeof t.data.items[s]||!t.data.items[s].visible||t.data.items[s].visible===!0,c&&(i=!0)}i&&h.show.call(n,t.data,t.pageX,t.pageY)}},click:function(t){t.preventDefault(),t.stopImmediatePropagation(),e(this).trigger(e.Event("contextmenu",{data:t.data,pageX:t.pageX,pageY:t.pageY}))},mousedown:function(t){var n=e(this);o&&o.length&&!o.is(n)&&o.data("contextMenu").$menu.trigger("contextmenu:hide"),2===t.button&&(o=n.data("contextMenuActive",!0))},mouseup:function(t){var n=e(this);n.data("contextMenuActive")&&o&&o.length&&o.is(n)&&!n.hasClass("context-menu-disabled")&&(t.preventDefault(),t.stopImmediatePropagation(),o=n,n.trigger(e.Event("contextmenu",{data:t.data,pageX:t.pageX,pageY:t.pageY}))),n.removeData("contextMenuActive")},mouseenter:function(t){var n=e(this),a=e(t.relatedTarget),i=e(document);a.is(".context-menu-list")||a.closest(".context-menu-list").length||o&&o.length||(m.pageX=t.pageX,m.pageY=t.pageY,m.data=t.data,i.on("mousemove.contextMenuShow",f.mousemove),m.timer=setTimeout(function(){m.timer=null,i.off("mousemove.contextMenuShow"),o=n,n.trigger(e.Event("contextmenu",{data:m.data,pageX:m.pageX,pageY:m.pageY}))},t.data.delay))},mousemove:function(e){m.pageX=e.pageX,m.pageY=e.pageY},mouseleave:function(t){var n=e(t.relatedTarget);if(!n.is(".context-menu-list")&&!n.closest(".context-menu-list").length){try{clearTimeout(m.timer)}catch(e){}m.timer=null}},layerClick:function(t){var n,a,o=e(this),i=o.data("contextMenuRoot"),c=t.button,r=t.pageX,l=t.pageY;t.preventDefault(),t.stopImmediatePropagation(),setTimeout(function(){var o,u="left"===i.trigger&&0===c||"right"===i.trigger&&2===c;if(document.elementFromPoint&&i.$layer){if(i.$layer.hide(),n=document.elementFromPoint(r-s.scrollLeft(),l-s.scrollTop()),n.isContentEditable){var d=document.createRange(),m=window.getSelection();d.selectNode(n),d.collapse(!0),m.removeAllRanges(),m.addRange(d)}i.$layer.show()}if(i.reposition&&u)if(document.elementFromPoint){if(i.$trigger.is(n)||i.$trigger.has(n).length)return void i.position.call(i.$trigger,i,r,l)}else if(a=i.$trigger.offset(),o=e(window),a.top+=o.scrollTop(),a.top<=t.pageY&&(a.left+=o.scrollLeft(),a.left<=t.pageX&&(a.bottom=a.top+i.$trigger.outerHeight(),a.bottom>=t.pageY&&(a.right=a.left+i.$trigger.outerWidth(),a.right>=t.pageX))))return void i.position.call(i.$trigger,i,r,l);n&&u&&i.$trigger.one("contextmenu:hidden",function(){e(n).contextMenu({x:r,y:l,button:c})}),null!==i&&"undefined"!=typeof i&&null!==i.$menu&&"undefined"!=typeof i.$menu&&i.$menu.trigger("contextmenu:hide")},50)},keyStop:function(e,t){t.isInput||e.preventDefault(),e.stopPropagation()},key:function(e){var t={};o&&(t=o.data("contextMenu")||{}),"undefined"==typeof t.zIndex&&(t.zIndex=0);var n=0,a=function(e){""!==e.style.zIndex?n=e.style.zIndex:null!==e.offsetParent&&"undefined"!=typeof e.offsetParent?a(e.offsetParent):null!==e.parentElement&&"undefined"!=typeof e.parentElement&&a(e.parentElement)};if(a(e.target),!(n>t.zIndex)){switch(e.keyCode){case 9:case 38:if(f.keyStop(e,t),t.isInput){if(9===e.keyCode&&e.shiftKey)return e.preventDefault(),t.$selected&&t.$selected.find("input, textarea, select").blur(),void(null!==t.$menu&&"undefined"!=typeof t.$menu&&t.$menu.trigger("prevcommand"));if(38===e.keyCode&&"checkbox"===t.$selected.find("input, textarea, select").prop("type"))return void e.preventDefault()}else if(9!==e.keyCode||e.shiftKey)return void(null!==t.$menu&&"undefined"!=typeof t.$menu&&t.$menu.trigger("prevcommand"));break;case 40:if(f.keyStop(e,t),!t.isInput)return void(null!==t.$menu&&"undefined"!=typeof t.$menu&&t.$menu.trigger("nextcommand"));if(9===e.keyCode)return e.preventDefault(),t.$selected&&t.$selected.find("input, textarea, select").blur(),void(null!==t.$menu&&"undefined"!=typeof t.$menu&&t.$menu.trigger("nextcommand"));if(40===e.keyCode&&"checkbox"===t.$selected.find("input, textarea, select").prop("type"))return void e.preventDefault();break;case 37:if(f.keyStop(e,t),t.isInput||!t.$selected||!t.$selected.length)break;if(!t.$selected.parent().hasClass("context-menu-root")){var i=t.$selected.parent().parent();return t.$selected.trigger("contextmenu:blur"),void(t.$selected=i)}break;case 39:if(f.keyStop(e,t),t.isInput||!t.$selected||!t.$selected.length)break;var s=t.$selected.data("contextMenu")||{};if(s.$menu&&t.$selected.hasClass("context-menu-submenu"))return t.$selected=null,s.$selected=null,void s.$menu.trigger("nextcommand");break;case 35:case 36:return t.$selected&&t.$selected.find("input, textarea, select").length?void 0:((t.$selected&&t.$selected.parent()||t.$menu).children(":not(."+t.classNames.disabled+", ."+t.classNames.notSelectable+")")[36===e.keyCode?"first":"last"]().trigger("contextmenu:focus"),void e.preventDefault());case 13:if(f.keyStop(e,t),t.isInput){if(t.$selected&&!t.$selected.is("textarea, select"))return void e.preventDefault();break}return void("undefined"!=typeof t.$selected&&null!==t.$selected&&t.$selected.trigger("mouseup"));case 32:case 33:case 34:return void f.keyStop(e,t);case 27:return f.keyStop(e,t),void(null!==t.$menu&&"undefined"!=typeof t.$menu&&t.$menu.trigger("contextmenu:hide"));default:var c=String.fromCharCode(e.keyCode).toUpperCase();if(t.accesskeys&&t.accesskeys[c])return void t.accesskeys[c].$node.trigger(t.accesskeys[c].$menu?"contextmenu:focus":"mouseup")}e.stopPropagation(),"undefined"!=typeof t.$selected&&null!==t.$selected&&t.$selected.trigger(e)}},prevItem:function(t){t.stopPropagation();var n=e(this).data("contextMenu")||{},a=e(this).data("contextMenuRoot")||{};if(n.$selected){var o=n.$selected;n=n.$selected.parent().data("contextMenu")||{},n.$selected=o}for(var i=n.$menu.children(),s=n.$selected&&n.$selected.prev().length?n.$selected.prev():i.last(),c=s;s.hasClass(a.classNames.disabled)||s.hasClass(a.classNames.notSelectable)||s.is(":hidden");)if(s=s.prev().length?s.prev():i.last(),s.is(c))return;n.$selected&&f.itemMouseleave.call(n.$selected.get(0),t),f.itemMouseenter.call(s.get(0),t);var r=s.find("input, textarea, select");r.length&&r.focus()},nextItem:function(t){t.stopPropagation();var n=e(this).data("contextMenu")||{},a=e(this).data("contextMenuRoot")||{};if(n.$selected){var o=n.$selected;n=n.$selected.parent().data("contextMenu")||{},n.$selected=o}for(var i=n.$menu.children(),s=n.$selected&&n.$selected.next().length?n.$selected.next():i.first(),c=s;s.hasClass(a.classNames.disabled)||s.hasClass(a.classNames.notSelectable)||s.is(":hidden");)if(s=s.next().length?s.next():i.first(),s.is(c))return;n.$selected&&f.itemMouseleave.call(n.$selected.get(0),t),f.itemMouseenter.call(s.get(0),t);var r=s.find("input, textarea, select");r.length&&r.focus()},focusInput:function(){var t=e(this).closest(".context-menu-item"),n=t.data(),a=n.contextMenu,o=n.contextMenuRoot;o.$selected=a.$selected=t,o.isInput=a.isInput=!0},blurInput:function(){var t=e(this).closest(".context-menu-item"),n=t.data(),a=n.contextMenu,o=n.contextMenuRoot;o.isInput=a.isInput=!1},menuMouseenter:function(){var t=e(this).data().contextMenuRoot;t.hovering=!0},menuMouseleave:function(t){var n=e(this).data().contextMenuRoot;n.$layer&&n.$layer.is(t.relatedTarget)&&(n.hovering=!1)},itemMouseenter:function(t){var n=e(this),a=n.data(),o=a.contextMenu,i=a.contextMenuRoot;return i.hovering=!0,t&&i.$layer&&i.$layer.is(t.relatedTarget)&&(t.preventDefault(),t.stopImmediatePropagation()),(o.$menu?o:i).$menu.children("."+i.classNames.hover).trigger("contextmenu:blur").children(".hover").trigger("contextmenu:blur"),n.hasClass(i.classNames.disabled)||n.hasClass(i.classNames.notSelectable)?void(o.$selected=null):void n.trigger("contextmenu:focus")},itemMouseleave:function(t){var n=e(this),a=n.data(),o=a.contextMenu,i=a.contextMenuRoot;return i!==o&&i.$layer&&i.$layer.is(t.relatedTarget)?("undefined"!=typeof i.$selected&&null!==i.$selected&&i.$selected.trigger("contextmenu:blur"),t.preventDefault(),t.stopImmediatePropagation(),void(i.$selected=o.$selected=o.$node)):void n.trigger("contextmenu:blur")},itemClick:function(t){var n,a=e(this),o=a.data(),i=o.contextMenu,s=o.contextMenuRoot,c=o.contextMenuKey;if(!(!i.items[c]||a.is("."+s.classNames.disabled+", .context-menu-separator, ."+s.classNames.notSelectable)||a.is(".context-menu-submenu")&&s.selectableSubMenu===!1)){if(t.preventDefault(),t.stopImmediatePropagation(),e.isFunction(i.callbacks[c])&&Object.prototype.hasOwnProperty.call(i.callbacks,c))n=i.callbacks[c];else{if(!e.isFunction(s.callback))return;n=s.callback}n.call(s.$trigger,c,s)!==!1?s.$menu.trigger("contextmenu:hide"):s.$menu.parent().length&&h.update.call(s.$trigger,s)}},inputClick:function(e){e.stopImmediatePropagation()},hideMenu:function(t,n){var a=e(this).data("contextMenuRoot");h.hide.call(a.$trigger,a,n&&n.force)},focusItem:function(t){t.stopPropagation();var n=e(this),a=n.data(),o=a.contextMenu,i=a.contextMenuRoot;n.hasClass(i.classNames.disabled)||n.hasClass(i.classNames.notSelectable)||(n.addClass([i.classNames.hover,i.classNames.visible].join(" ")).parent().find(".context-menu-item").not(n).removeClass(i.classNames.visible).filter("."+i.classNames.hover).trigger("contextmenu:blur"),o.$selected=i.$selected=n,o.$node&&i.positionSubmenu.call(o.$node,o.$menu))},blurItem:function(t){t.stopPropagation();var n=e(this),a=n.data(),o=a.contextMenu,i=a.contextMenuRoot;o.autoHide&&n.removeClass(i.classNames.visible),n.removeClass(i.classNames.hover),o.$selected=null}},h={show:function(t,n,a){var i=e(this),s={};if(e("#context-menu-layer").trigger("mousedown"),t.$trigger=i,t.events.show.call(i,t)===!1)return void(o=null);if(h.update.call(i,t),t.position.call(i,t,n,a),t.zIndex){var c=t.zIndex;"function"==typeof t.zIndex&&(c=t.zIndex.call(i,t)),s.zIndex=p(i)+c}h.layer.call(t.$menu,t,s.zIndex),t.$menu.find("ul").css("zIndex",s.zIndex+1),t.$menu.css(s)[t.animation.show](t.animation.duration,function(){i.trigger("contextmenu:visible")}),i.data("contextMenu",t).addClass("context-menu-active"),e(document).off("keydown.contextMenu").on("keydown.contextMenu",f.key),t.autoHide&&e(document).on("mousemove.contextMenuAutoHide",function(e){var n=i.offset();n.right=n.left+i.outerWidth(),n.bottom=n.top+i.outerHeight(),!t.$layer||t.hovering||e.pageX>=n.left&&e.pageX<=n.right&&e.pageY>=n.top&&e.pageY<=n.bottom||setTimeout(function(){t.hovering||null===t.$menu||"undefined"==typeof t.$menu||t.$menu.trigger("contextmenu:hide")},50)})},hide:function(t,n){var a=e(this);if(t||(t=a.data("contextMenu")||{}),n||!t.events||t.events.hide.call(a,t)!==!1){if(a.removeData("contextMenu").removeClass("context-menu-active"),t.$layer){setTimeout(function(e){return function(){e.remove()}}(t.$layer),10);try{delete t.$layer}catch(e){t.$layer=null}}o=null,t.$menu.find("."+t.classNames.hover).trigger("contextmenu:blur"),t.$selected=null,t.$menu.find("."+t.classNames.visible).removeClass(t.classNames.visible),e(document).off(".contextMenuAutoHide").off("keydown.contextMenu"),t.$menu&&t.$menu[t.animation.hide](t.animation.duration,function(){t.build&&(t.$menu.remove(),e.each(t,function(e){switch(e){case"ns":case"selector":case"build":case"trigger":return!0;default:t[e]=void 0;try{delete t[e]}catch(e){}return!0}})),setTimeout(function(){a.trigger("contextmenu:hidden")},10)})}},create:function(n,a){function o(t){var n=e("<span></span>");if(t._accesskey)t._beforeAccesskey&&n.append(document.createTextNode(t._beforeAccesskey)),e("<span></span>").addClass("context-menu-accesskey").text(t._accesskey).appendTo(n),t._afterAccesskey&&n.append(document.createTextNode(t._afterAccesskey));else if(t.isHtmlName){if("undefined"!=typeof t.accesskey)throw new Error("accesskeys are not compatible with HTML names and cannot be used together in the same item");n.html(t.name)}else n.text(t.name);return n}"undefined"==typeof a&&(a=n),n.$menu=e('<ul class="context-menu-list"></ul>').addClass(n.className||"").data({contextMenu:n,contextMenuRoot:a}),e.each(["callbacks","commands","inputs"],function(e,t){n[t]={},a[t]||(a[t]={})}),a.accesskeys||(a.accesskeys={}),e.each(n.items,function(i,s){var c=e('<li class="context-menu-item"></li>').addClass(s.className||""),r=null,l=null;if(c.on("click",e.noop),"string"!=typeof s&&"cm_separator"!==s.type||(s={type:"cm_seperator"}),s.$node=c.data({contextMenu:n,contextMenuRoot:a,contextMenuKey:i}),"undefined"!=typeof s.accesskey)for(var d,m=t(s.accesskey),p=0;d=m[p];p++)if(!a.accesskeys[d]){a.accesskeys[d]=s;var x=s.name.match(new RegExp("^(.*?)("+d+")(.*)$","i"));x&&(s._beforeAccesskey=x[1],s._accesskey=x[2],s._afterAccesskey=x[3]);break}if(s.type&&u[s.type])u[s.type].call(c,s,n,a),e.each([n,a],function(t,a){a.commands[i]=s,!e.isFunction(s.callback)||"undefined"!=typeof a.callbacks[i]&&"undefined"!=typeof n.type||(a.callbacks[i]=s.callback)});else{switch("cm_seperator"===s.type?c.addClass("context-menu-separator "+a.classNames.notSelectable):"html"===s.type?c.addClass("context-menu-html "+a.classNames.notSelectable):"sub"===s.type||(s.type?(r=e("<label></label>").appendTo(c),o(s).appendTo(r),c.addClass("context-menu-input"),n.hasTypes=!0,e.each([n,a],function(e,t){t.commands[i]=s,t.inputs[i]=s})):s.items&&(s.type="sub")),s.type){case"cm_seperator":break;case"text":l=e('<input type="text" value="1" name="" />').attr("name","context-menu-input-"+i).val(s.value||"").appendTo(r);break;case"textarea":l=e('<textarea name=""></textarea>').attr("name","context-menu-input-"+i).val(s.value||"").appendTo(r),s.height&&l.height(s.height);break;case"checkbox":l=e('<input type="checkbox" value="1" name="" />').attr("name","context-menu-input-"+i).val(s.value||"").prop("checked",!!s.selected).prependTo(r);break;case"radio":l=e('<input type="radio" value="1" name="" />').attr("name","context-menu-input-"+s.radio).val(s.value||"").prop("checked",!!s.selected).prependTo(r);break;case"select":l=e('<select name=""></select>').attr("name","context-menu-input-"+i).appendTo(r),s.options&&(e.each(s.options,function(t,n){e("<option></option>").val(t).text(n).appendTo(l)}),l.val(s.selected));break;case"sub":o(s).appendTo(c),s.appendTo=s.$node,c.data("contextMenu",s).addClass("context-menu-submenu"),s.callback=null,"function"==typeof s.items.then?h.processPromises(s,a,s.items):h.create(s,a);break;case"html":e(s.html).appendTo(c);break;default:e.each([n,a],function(t,a){a.commands[i]=s,!e.isFunction(s.callback)||"undefined"!=typeof a.callbacks[i]&&"undefined"!=typeof n.type||(a.callbacks[i]=s.callback)}),o(s).appendTo(c)}s.type&&"sub"!==s.type&&"html"!==s.type&&"cm_seperator"!==s.type&&(l.on("focus",f.focusInput).on("blur",f.blurInput),s.events&&l.on(s.events,n)),s.icon&&(e.isFunction(s.icon)?s._icon=s.icon.call(this,this,c,i,s):"string"==typeof s.icon&&"fa-"===s.icon.substring(0,3)?s._icon=a.classNames.icon+" "+a.classNames.icon+"--fa fa "+s.icon:s._icon=a.classNames.icon+" "+a.classNames.icon+"-"+s.icon,c.addClass(s._icon))}s.$input=l,s.$label=r,c.appendTo(n.$menu),!n.hasTypes&&e.support.eventSelectstart&&c.on("selectstart.disableTextSelect",f.abortevent)}),n.$node||n.$menu.css("display","none").addClass("context-menu-root"),n.$menu.appendTo(n.appendTo||document.body)},resize:function(t,n){var a;t.css({position:"absolute",display:"block"}),t.data("width",(a=t.get(0)).getBoundingClientRect?Math.ceil(a.getBoundingClientRect().width):t.outerWidth()+1),t.css({position:"static",minWidth:"0px",maxWidth:"100000px"}),t.find("> li > ul").each(function(){h.resize(e(this),!0)}),n||t.find("ul").addBack().css({position:"",display:"",minWidth:"",maxWidth:""}).outerWidth(function(){return e(this).data("width")})},update:function(t,n){var a=this;"undefined"==typeof n&&(n=t,h.resize(t.$menu)),t.$menu.children().each(function(){var o,i=e(this),s=i.data("contextMenuKey"),c=t.items[s],r=e.isFunction(c.disabled)&&c.disabled.call(a,s,n)||c.disabled===!0;if(o=e.isFunction(c.visible)?c.visible.call(a,s,n):"undefined"==typeof c.visible||c.visible===!0,i[o?"show":"hide"](),i[r?"addClass":"removeClass"](n.classNames.disabled),e.isFunction(c.icon)&&(i.removeClass(c._icon),c._icon=c.icon.call(this,a,i,s,c),i.addClass(c._icon)),c.type)switch(i.find("input, select, textarea").prop("disabled",r),c.type){case"text":case"textarea":c.$input.val(c.value||"");break;case"checkbox":case"radio":c.$input.val(c.value||"").prop("checked",!!c.selected);break;case"select":c.$input.val(c.selected||"")}c.$menu&&h.update.call(a,c,n)})},layer:function(t,n){var a=t.$layer=e('<div id="context-menu-layer"></div>').css({height:s.height(),width:s.width(),display:"block",position:"fixed","z-index":n,top:0,left:0,opacity:0,filter:"alpha(opacity=0)","background-color":"#000"}).data("contextMenuRoot",t).insertBefore(this).on("contextmenu",f.abortevent).on("mousedown",f.layerClick);return"undefined"==typeof document.body.style.maxWidth&&a.css({position:"absolute",height:e(document).height()}),a},processPromises:function(e,t,n){function a(e,t,n){"undefined"==typeof n&&o(void 0),i(e,t,n)}function o(e,t,n){"undefined"==typeof n?(n={error:{name:"No items and no error item",icon:"context-menu-icon context-menu-icon-quit"}},window.console&&(console.error||console.log).call(console,'When you reject a promise, provide an "items" object, equal to normal sub-menu items')):"string"==typeof n&&(n={error:{name:n}}),i(e,t,n)}function i(e,t,n){"undefined"!=typeof t.$menu&&t.$menu.is(":visible")&&(e.$node.removeClass(t.classNames.iconLoadingClass),e.items=n,h.create(e,t,!0),h.update(e,t),t.positionSubmenu.call(e.$node,e.$menu))}e.$node.addClass(t.classNames.iconLoadingClass),n.then(a.bind(this,e,t),o.bind(this,e,t))}};e.fn.contextMenu=function(t){var n=this,a=t;if(this.length>0)if("undefined"==typeof t)this.first().trigger("contextmenu");else if("undefined"!=typeof t.x&&"undefined"!=typeof t.y)this.first().trigger(e.Event("contextmenu",{pageX:t.x,pageY:t.y,mouseButton:t.button}));else if("hide"===t){var o=this.first().data("contextMenu")?this.first().data("contextMenu").$menu:null;o&&o.trigger("contextmenu:hide")}else"destroy"===t?e.contextMenu("destroy",{context:this}):e.isPlainObject(t)?(t.context=this,e.contextMenu("create",t)):t?this.removeClass("context-menu-disabled"):t||this.addClass("context-menu-disabled");else e.each(l,function(){this.selector===n.selector&&(a.data=this,e.extend(a.data,{trigger:"demand"}))}),f.contextmenu.call(a.target,a);return this},e.contextMenu=function(t,n){"string"!=typeof t&&(n=t,t="create"),"string"==typeof n?n={selector:n}:"undefined"==typeof n&&(n={});var a=e.extend(!0,{},d,n||{}),o=e(document),s=o,u=!1;switch(a.context&&a.context.length?(s=e(a.context).first(),a.context=s.get(0),u=!e(a.context).is(document)):a.context=document,t){case"create":if(!a.selector)throw new Error("No selector specified");if(a.selector.match(/.context-menu-(list|item|input)($|\s)/))throw new Error('Cannot bind to selector "'+a.selector+'" as it contains a reserved className');if(!a.build&&(!a.items||e.isEmptyObject(a.items)))throw new Error("No Items specified");if(c++,a.ns=".contextMenu"+c,u||(r[a.selector]=a.ns),l[a.ns]=a,a.trigger||(a.trigger="right"),!i){var m="click"===a.itemClickEvent?"click.contextMenu":"mouseup.contextMenu",p={"contextmenu:focus.contextMenu":f.focusItem,"contextmenu:blur.contextMenu":f.blurItem,"contextmenu.contextMenu":f.abortevent,"mouseenter.contextMenu":f.itemMouseenter,"mouseleave.contextMenu":f.itemMouseleave};p[m]=f.itemClick,o.on({"contextmenu:hide.contextMenu":f.hideMenu,"prevcommand.contextMenu":f.prevItem,"nextcommand.contextMenu":f.nextItem,"contextmenu.contextMenu":f.abortevent,"mouseenter.contextMenu":f.menuMouseenter,"mouseleave.contextMenu":f.menuMouseleave},".context-menu-list").on("mouseup.contextMenu",".context-menu-input",f.inputClick).on(p,".context-menu-item"),i=!0}switch(s.on("contextmenu"+a.ns,a.selector,a,f.contextmenu),u&&s.on("remove"+a.ns,function(){e(this).contextMenu("destroy")}),a.trigger){case"hover":s.on("mouseenter"+a.ns,a.selector,a,f.mouseenter).on("mouseleave"+a.ns,a.selector,a,f.mouseleave);break;case"left":s.on("click"+a.ns,a.selector,a,f.click)}a.build||h.create(a);break;case"destroy":var x;if(u){var g=a.context;e.each(l,function(t,n){if(!n)return!0;if(!e(g).is(n.selector))return!0;x=e(".context-menu-list").filter(":visible"),x.length&&x.data().contextMenuRoot.$trigger.is(e(n.context).find(n.selector))&&x.trigger("contextmenu:hide",{force:!0});try{l[n.ns].$menu&&l[n.ns].$menu.remove(),delete l[n.ns]}catch(e){l[n.ns]=null}return e(n.context).off(n.ns),!0})}else if(a.selector){if(r[a.selector]){x=e(".context-menu-list").filter(":visible"),x.length&&x.data().contextMenuRoot.$trigger.is(a.selector)&&x.trigger("contextmenu:hide",{force:!0});try{l[r[a.selector]].$menu&&l[r[a.selector]].$menu.remove(),delete l[r[a.selector]]}catch(e){l[r[a.selector]]=null}o.off(r[a.selector])}}else o.off(".contextMenu .contextMenuAutoHide"),e.each(l,function(t,n){e(n.context).off(n.ns)}),r={},l={},c=0,i=!1,e("#context-menu-layer, .context-menu-list").remove();break;case"html5":(!e.support.htmlCommand&&!e.support.htmlMenuitem||"boolean"==typeof n&&n)&&e('menu[type="context"]').each(function(){this.id&&e.contextMenu({selector:"[contextmenu="+this.id+"]",items:e.contextMenu.fromMenu(this)})}).css("display","none");break;default:throw new Error('Unknown operation "'+t+'"')}return this},e.contextMenu.setInputValues=function(t,n){"undefined"==typeof n&&(n={}),e.each(t.inputs,function(e,t){switch(t.type){case"text":case"textarea":t.value=n[e]||"";break;case"checkbox":t.selected=!!n[e];break;case"radio":t.selected=(n[t.radio]||"")===t.value;break;case"select":t.selected=n[e]||""}})},e.contextMenu.getInputValues=function(t,n){return"undefined"==typeof n&&(n={}),e.each(t.inputs,function(e,t){switch(t.type){case"text":case"textarea":case"select":n[e]=t.$input.val();break;case"checkbox":n[e]=t.$input.prop("checked");break;case"radio":t.$input.prop("checked")&&(n[t.radio]=t.value)}}),n},e.contextMenu.fromMenu=function(t){var n=e(t),o={};return a(o,n.children()),o},e.contextMenu.defaults=d,e.contextMenu.types=u,e.contextMenu.handle=f,e.contextMenu.op=h,e.contextMenu.menus=l});
//# sourceMappingURL=jquery.contextMenu.min.js.map

//     Underscore.js 1.8.3
//     http://underscorejs.org
//     (c) 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
//     Underscore may be freely distributed under the MIT license.
(function(){function n(n){function t(t,r,e,u,i,o){for(;i>=0&&o>i;i+=n){var a=u?u[i]:i;e=r(e,t[a],a,t)}return e}return function(r,e,u,i){e=b(e,i,4);var o=!k(r)&&m.keys(r),a=(o||r).length,c=n>0?0:a-1;return arguments.length<3&&(u=r[o?o[c]:c],c+=n),t(r,e,u,o,c,a)}}function t(n){return function(t,r,e){r=x(r,e);for(var u=O(t),i=n>0?0:u-1;i>=0&&u>i;i+=n)if(r(t[i],i,t))return i;return-1}}function r(n,t,r){return function(e,u,i){var o=0,a=O(e);if("number"==typeof i)n>0?o=i>=0?i:Math.max(i+a,o):a=i>=0?Math.min(i+1,a):i+a+1;else if(r&&i&&a)return i=r(e,u),e[i]===u?i:-1;if(u!==u)return i=t(l.call(e,o,a),m.isNaN),i>=0?i+o:-1;for(i=n>0?o:a-1;i>=0&&a>i;i+=n)if(e[i]===u)return i;return-1}}function e(n,t){var r=I.length,e=n.constructor,u=m.isFunction(e)&&e.prototype||a,i="constructor";for(m.has(n,i)&&!m.contains(t,i)&&t.push(i);r--;)i=I[r],i in n&&n[i]!==u[i]&&!m.contains(t,i)&&t.push(i)}var u=this,i=u._,o=Array.prototype,a=Object.prototype,c=Function.prototype,f=o.push,l=o.slice,s=a.toString,p=a.hasOwnProperty,h=Array.isArray,v=Object.keys,g=c.bind,y=Object.create,d=function(){},m=function(n){return n instanceof m?n:this instanceof m?void(this._wrapped=n):new m(n)};"undefined"!=typeof exports?("undefined"!=typeof module&&module.exports&&(exports=module.exports=m),exports._=m):u._=m,m.VERSION="1.8.3";var b=function(n,t,r){if(t===void 0)return n;switch(null==r?3:r){case 1:return function(r){return n.call(t,r)};case 2:return function(r,e){return n.call(t,r,e)};case 3:return function(r,e,u){return n.call(t,r,e,u)};case 4:return function(r,e,u,i){return n.call(t,r,e,u,i)}}return function(){return n.apply(t,arguments)}},x=function(n,t,r){return null==n?m.identity:m.isFunction(n)?b(n,t,r):m.isObject(n)?m.matcher(n):m.property(n)};m.iteratee=function(n,t){return x(n,t,1/0)};var _=function(n,t){return function(r){var e=arguments.length;if(2>e||null==r)return r;for(var u=1;e>u;u++)for(var i=arguments[u],o=n(i),a=o.length,c=0;a>c;c++){var f=o[c];t&&r[f]!==void 0||(r[f]=i[f])}return r}},j=function(n){if(!m.isObject(n))return{};if(y)return y(n);d.prototype=n;var t=new d;return d.prototype=null,t},w=function(n){return function(t){return null==t?void 0:t[n]}},A=Math.pow(2,53)-1,O=w("length"),k=function(n){var t=O(n);return"number"==typeof t&&t>=0&&A>=t};m.each=m.forEach=function(n,t,r){t=b(t,r);var e,u;if(k(n))for(e=0,u=n.length;u>e;e++)t(n[e],e,n);else{var i=m.keys(n);for(e=0,u=i.length;u>e;e++)t(n[i[e]],i[e],n)}return n},m.map=m.collect=function(n,t,r){t=x(t,r);for(var e=!k(n)&&m.keys(n),u=(e||n).length,i=Array(u),o=0;u>o;o++){var a=e?e[o]:o;i[o]=t(n[a],a,n)}return i},m.reduce=m.foldl=m.inject=n(1),m.reduceRight=m.foldr=n(-1),m.find=m.detect=function(n,t,r){var e;return e=k(n)?m.findIndex(n,t,r):m.findKey(n,t,r),e!==void 0&&e!==-1?n[e]:void 0},m.filter=m.select=function(n,t,r){var e=[];return t=x(t,r),m.each(n,function(n,r,u){t(n,r,u)&&e.push(n)}),e},m.reject=function(n,t,r){return m.filter(n,m.negate(x(t)),r)},m.every=m.all=function(n,t,r){t=x(t,r);for(var e=!k(n)&&m.keys(n),u=(e||n).length,i=0;u>i;i++){var o=e?e[i]:i;if(!t(n[o],o,n))return!1}return!0},m.some=m.any=function(n,t,r){t=x(t,r);for(var e=!k(n)&&m.keys(n),u=(e||n).length,i=0;u>i;i++){var o=e?e[i]:i;if(t(n[o],o,n))return!0}return!1},m.contains=m.includes=m.include=function(n,t,r,e){return k(n)||(n=m.values(n)),("number"!=typeof r||e)&&(r=0),m.indexOf(n,t,r)>=0},m.invoke=function(n,t){ var r=l.call(arguments,2),e=m.isFunction(t);return m.map(n,function(n){var u=e?t:n[t];return null==u?u:u.apply(n,r)})},m.pluck=function(n,t){return m.map(n,m.property(t))},m.where=function(n,t){return m.filter(n,m.matcher(t))},m.findWhere=function(n,t){return m.find(n,m.matcher(t))},m.max=function(n,t,r){var e,u,i=-1/0,o=-1/0;if(null==t&&null!=n){n=k(n)?n:m.values(n);for(var a=0,c=n.length;c>a;a++)e=n[a],e>i&&(i=e)}else t=x(t,r),m.each(n,function(n,r,e){u=t(n,r,e),(u>o||u===-1/0&&i===-1/0)&&(i=n,o=u)});return i},m.min=function(n,t,r){var e,u,i=1/0,o=1/0;if(null==t&&null!=n){n=k(n)?n:m.values(n);for(var a=0,c=n.length;c>a;a++)e=n[a],i>e&&(i=e)}else t=x(t,r),m.each(n,function(n,r,e){u=t(n,r,e),(o>u||1/0===u&&1/0===i)&&(i=n,o=u)});return i},m.shuffle=function(n){for(var t,r=k(n)?n:m.values(n),e=r.length,u=Array(e),i=0;e>i;i++)t=m.random(0,i),t!==i&&(u[i]=u[t]),u[t]=r[i];return u},m.sample=function(n,t,r){return null==t||r?(k(n)||(n=m.values(n)),n[m.random(n.length-1)]):m.shuffle(n).slice(0,Math.max(0,t))},m.sortBy=function(n,t,r){return t=x(t,r),m.pluck(m.map(n,function(n,r,e){return{value:n,index:r,criteria:t(n,r,e)}}).sort(function(n,t){var r=n.criteria,e=t.criteria;if(r!==e){if(r>e||r===void 0)return 1;if(e>r||e===void 0)return-1}return n.index-t.index}),"value")};var F=function(n){return function(t,r,e){var u={};return r=x(r,e),m.each(t,function(e,i){var o=r(e,i,t);n(u,e,o)}),u}};m.groupBy=F(function(n,t,r){m.has(n,r)?n[r].push(t):n[r]=[t]}),m.indexBy=F(function(n,t,r){n[r]=t}),m.countBy=F(function(n,t,r){m.has(n,r)?n[r]++:n[r]=1}),m.toArray=function(n){return n?m.isArray(n)?l.call(n):k(n)?m.map(n,m.identity):m.values(n):[]},m.size=function(n){return null==n?0:k(n)?n.length:m.keys(n).length},m.partition=function(n,t,r){t=x(t,r);var e=[],u=[];return m.each(n,function(n,r,i){(t(n,r,i)?e:u).push(n)}),[e,u]},m.first=m.head=m.take=function(n,t,r){return null==n?void 0:null==t||r?n[0]:m.initial(n,n.length-t)},m.initial=function(n,t,r){return l.call(n,0,Math.max(0,n.length-(null==t||r?1:t)))},m.last=function(n,t,r){return null==n?void 0:null==t||r?n[n.length-1]:m.rest(n,Math.max(0,n.length-t))},m.rest=m.tail=m.drop=function(n,t,r){return l.call(n,null==t||r?1:t)},m.compact=function(n){return m.filter(n,m.identity)};var S=function(n,t,r,e){for(var u=[],i=0,o=e||0,a=O(n);a>o;o++){var c=n[o];if(k(c)&&(m.isArray(c)||m.isArguments(c))){t||(c=S(c,t,r));var f=0,l=c.length;for(u.length+=l;l>f;)u[i++]=c[f++]}else r||(u[i++]=c)}return u};m.flatten=function(n,t){return S(n,t,!1)},m.without=function(n){return m.difference(n,l.call(arguments,1))},m.uniq=m.unique=function(n,t,r,e){m.isBoolean(t)||(e=r,r=t,t=!1),null!=r&&(r=x(r,e));for(var u=[],i=[],o=0,a=O(n);a>o;o++){var c=n[o],f=r?r(c,o,n):c;t?(o&&i===f||u.push(c),i=f):r?m.contains(i,f)||(i.push(f),u.push(c)):m.contains(u,c)||u.push(c)}return u},m.union=function(){return m.uniq(S(arguments,!0,!0))},m.intersection=function(n){for(var t=[],r=arguments.length,e=0,u=O(n);u>e;e++){var i=n[e];if(!m.contains(t,i)){for(var o=1;r>o&&m.contains(arguments[o],i);o++);o===r&&t.push(i)}}return t},m.difference=function(n){var t=S(arguments,!0,!0,1);return m.filter(n,function(n){return!m.contains(t,n)})},m.zip=function(){return m.unzip(arguments)},m.unzip=function(n){for(var t=n&&m.max(n,O).length||0,r=Array(t),e=0;t>e;e++)r[e]=m.pluck(n,e);return r},m.object=function(n,t){for(var r={},e=0,u=O(n);u>e;e++)t?r[n[e]]=t[e]:r[n[e][0]]=n[e][1];return r},m.findIndex=t(1),m.findLastIndex=t(-1),m.sortedIndex=function(n,t,r,e){r=x(r,e,1);for(var u=r(t),i=0,o=O(n);o>i;){var a=Math.floor((i+o)/2);r(n[a])<u?i=a+1:o=a}return i},m.indexOf=r(1,m.findIndex,m.sortedIndex),m.lastIndexOf=r(-1,m.findLastIndex),m.range=function(n,t,r){null==t&&(t=n||0,n=0),r=r||1;for(var e=Math.max(Math.ceil((t-n)/r),0),u=Array(e),i=0;e>i;i++,n+=r)u[i]=n;return u};var E=function(n,t,r,e,u){if(!(e instanceof t))return n.apply(r,u);var i=j(n.prototype),o=n.apply(i,u);return m.isObject(o)?o:i};m.bind=function(n,t){if(g&&n.bind===g)return g.apply(n,l.call(arguments,1));if(!m.isFunction(n))throw new TypeError("Bind must be called on a function");var r=l.call(arguments,2),e=function(){return E(n,e,t,this,r.concat(l.call(arguments)))};return e},m.partial=function(n){var t=l.call(arguments,1),r=function(){for(var e=0,u=t.length,i=Array(u),o=0;u>o;o++)i[o]=t[o]===m?arguments[e++]:t[o];for(;e<arguments.length;)i.push(arguments[e++]);return E(n,r,this,this,i)};return r},m.bindAll=function(n){var t,r,e=arguments.length;if(1>=e)throw new Error("bindAll must be passed function names");for(t=1;e>t;t++)r=arguments[t],n[r]=m.bind(n[r],n);return n},m.memoize=function(n,t){var r=function(e){var u=r.cache,i=""+(t?t.apply(this,arguments):e);return m.has(u,i)||(u[i]=n.apply(this,arguments)),u[i]};return r.cache={},r},m.delay=function(n,t){var r=l.call(arguments,2);return setTimeout(function(){return n.apply(null,r)},t)},m.defer=m.partial(m.delay,m,1),m.throttle=function(n,t,r){var e,u,i,o=null,a=0;r||(r={});var c=function(){a=r.leading===!1?0:m.now(),o=null,i=n.apply(e,u),o||(e=u=null)};return function(){var f=m.now();a||r.leading!==!1||(a=f);var l=t-(f-a);return e=this,u=arguments,0>=l||l>t?(o&&(clearTimeout(o),o=null),a=f,i=n.apply(e,u),o||(e=u=null)):o||r.trailing===!1||(o=setTimeout(c,l)),i}},m.debounce=function(n,t,r){var e,u,i,o,a,c=function(){var f=m.now()-o;t>f&&f>=0?e=setTimeout(c,t-f):(e=null,r||(a=n.apply(i,u),e||(i=u=null)))};return function(){i=this,u=arguments,o=m.now();var f=r&&!e;return e||(e=setTimeout(c,t)),f&&(a=n.apply(i,u),i=u=null),a}},m.wrap=function(n,t){return m.partial(t,n)},m.negate=function(n){return function(){return!n.apply(this,arguments)}},m.compose=function(){var n=arguments,t=n.length-1;return function(){for(var r=t,e=n[t].apply(this,arguments);r--;)e=n[r].call(this,e);return e}},m.after=function(n,t){return function(){return--n<1?t.apply(this,arguments):void 0}},m.before=function(n,t){var r;return function(){return--n>0&&(r=t.apply(this,arguments)),1>=n&&(t=null),r}},m.once=m.partial(m.before,2);var M=!{toString:null}.propertyIsEnumerable("toString"),I=["valueOf","isPrototypeOf","toString","propertyIsEnumerable","hasOwnProperty","toLocaleString"];m.keys=function(n){if(!m.isObject(n))return[];if(v)return v(n);var t=[];for(var r in n)m.has(n,r)&&t.push(r);return M&&e(n,t),t},m.allKeys=function(n){if(!m.isObject(n))return[];var t=[];for(var r in n)t.push(r);return M&&e(n,t),t},m.values=function(n){for(var t=m.keys(n),r=t.length,e=Array(r),u=0;r>u;u++)e[u]=n[t[u]];return e},m.mapObject=function(n,t,r){t=x(t,r);for(var e,u=m.keys(n),i=u.length,o={},a=0;i>a;a++)e=u[a],o[e]=t(n[e],e,n);return o},m.pairs=function(n){for(var t=m.keys(n),r=t.length,e=Array(r),u=0;r>u;u++)e[u]=[t[u],n[t[u]]];return e},m.invert=function(n){for(var t={},r=m.keys(n),e=0,u=r.length;u>e;e++)t[n[r[e]]]=r[e];return t},m.functions=m.methods=function(n){var t=[];for(var r in n)m.isFunction(n[r])&&t.push(r);return t.sort()},m.extend=_(m.allKeys),m.extendOwn=m.assign=_(m.keys),m.findKey=function(n,t,r){t=x(t,r);for(var e,u=m.keys(n),i=0,o=u.length;o>i;i++)if(e=u[i],t(n[e],e,n))return e},m.pick=function(n,t,r){var e,u,i={},o=n;if(null==o)return i;m.isFunction(t)?(u=m.allKeys(o),e=b(t,r)):(u=S(arguments,!1,!1,1),e=function(n,t,r){return t in r},o=Object(o));for(var a=0,c=u.length;c>a;a++){var f=u[a],l=o[f];e(l,f,o)&&(i[f]=l)}return i},m.omit=function(n,t,r){if(m.isFunction(t))t=m.negate(t);else{var e=m.map(S(arguments,!1,!1,1),String);t=function(n,t){return!m.contains(e,t)}}return m.pick(n,t,r)},m.defaults=_(m.allKeys,!0),m.create=function(n,t){var r=j(n);return t&&m.extendOwn(r,t),r},m.clone=function(n){return m.isObject(n)?m.isArray(n)?n.slice():m.extend({},n):n},m.tap=function(n,t){return t(n),n},m.isMatch=function(n,t){var r=m.keys(t),e=r.length;if(null==n)return!e;for(var u=Object(n),i=0;e>i;i++){var o=r[i];if(t[o]!==u[o]||!(o in u))return!1}return!0};var N=function(n,t,r,e){if(n===t)return 0!==n||1/n===1/t;if(null==n||null==t)return n===t;n instanceof m&&(n=n._wrapped),t instanceof m&&(t=t._wrapped);var u=s.call(n);if(u!==s.call(t))return!1;switch(u){case"[object RegExp]":case"[object String]":return""+n==""+t;case"[object Number]":return+n!==+n?+t!==+t:0===+n?1/+n===1/t:+n===+t;case"[object Date]":case"[object Boolean]":return+n===+t}var i="[object Array]"===u;if(!i){if("object"!=typeof n||"object"!=typeof t)return!1;var o=n.constructor,a=t.constructor;if(o!==a&&!(m.isFunction(o)&&o instanceof o&&m.isFunction(a)&&a instanceof a)&&"constructor"in n&&"constructor"in t)return!1}r=r||[],e=e||[];for(var c=r.length;c--;)if(r[c]===n)return e[c]===t;if(r.push(n),e.push(t),i){if(c=n.length,c!==t.length)return!1;for(;c--;)if(!N(n[c],t[c],r,e))return!1}else{var f,l=m.keys(n);if(c=l.length,m.keys(t).length!==c)return!1;for(;c--;)if(f=l[c],!m.has(t,f)||!N(n[f],t[f],r,e))return!1}return r.pop(),e.pop(),!0};m.isEqual=function(n,t){return N(n,t)},m.isEmpty=function(n){return null==n?!0:k(n)&&(m.isArray(n)||m.isString(n)||m.isArguments(n))?0===n.length:0===m.keys(n).length},m.isElement=function(n){return!(!n||1!==n.nodeType)},m.isArray=h||function(n){return"[object Array]"===s.call(n)},m.isObject=function(n){var t=typeof n;return"function"===t||"object"===t&&!!n},m.each(["Arguments","Function","String","Number","Date","RegExp","Error"],function(n){m["is"+n]=function(t){return s.call(t)==="[object "+n+"]"}}),m.isArguments(arguments)||(m.isArguments=function(n){return m.has(n,"callee")}),"function"!=typeof/./&&"object"!=typeof Int8Array&&(m.isFunction=function(n){return"function"==typeof n||!1}),m.isFinite=function(n){return isFinite(n)&&!isNaN(parseFloat(n))},m.isNaN=function(n){return m.isNumber(n)&&n!==+n},m.isBoolean=function(n){return n===!0||n===!1||"[object Boolean]"===s.call(n)},m.isNull=function(n){return null===n},m.isUndefined=function(n){return n===void 0},m.has=function(n,t){return null!=n&&p.call(n,t)},m.noConflict=function(){return u._=i,this},m.identity=function(n){return n},m.constant=function(n){return function(){return n}},m.noop=function(){},m.property=w,m.propertyOf=function(n){return null==n?function(){}:function(t){return n[t]}},m.matcher=m.matches=function(n){return n=m.extendOwn({},n),function(t){return m.isMatch(t,n)}},m.times=function(n,t,r){var e=Array(Math.max(0,n));t=b(t,r,1);for(var u=0;n>u;u++)e[u]=t(u);return e},m.random=function(n,t){return null==t&&(t=n,n=0),n+Math.floor(Math.random()*(t-n+1))},m.now=Date.now||function(){return(new Date).getTime()};var B={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","`":"&#x60;"},T=m.invert(B),R=function(n){var t=function(t){return n[t]},r="(?:"+m.keys(n).join("|")+")",e=RegExp(r),u=RegExp(r,"g");return function(n){return n=null==n?"":""+n,e.test(n)?n.replace(u,t):n}};m.escape=R(B),m.unescape=R(T),m.result=function(n,t,r){var e=null==n?void 0:n[t];return e===void 0&&(e=r),m.isFunction(e)?e.call(n):e};var q=0;m.uniqueId=function(n){var t=++q+"";return n?n+t:t},m.templateSettings={evaluate:/<%([\s\S]+?)%>/g,interpolate:/<%=([\s\S]+?)%>/g,escape:/<%-([\s\S]+?)%>/g};var K=/(.)^/,z={"'":"'","\\":"\\","\r":"r","\n":"n","\u2028":"u2028","\u2029":"u2029"},D=/\\|'|\r|\n|\u2028|\u2029/g,L=function(n){return"\\"+z[n]};m.template=function(n,t,r){!t&&r&&(t=r),t=m.defaults({},t,m.templateSettings);var e=RegExp([(t.escape||K).source,(t.interpolate||K).source,(t.evaluate||K).source].join("|")+"|$","g"),u=0,i="__p+='";n.replace(e,function(t,r,e,o,a){return i+=n.slice(u,a).replace(D,L),u=a+t.length,r?i+="'+\n((__t=("+r+"))==null?'':_.escape(__t))+\n'":e?i+="'+\n((__t=("+e+"))==null?'':__t)+\n'":o&&(i+="';\n"+o+"\n__p+='"),t}),i+="';\n",t.variable||(i="with(obj||{}){\n"+i+"}\n"),i="var __t,__p='',__j=Array.prototype.join,"+"print=function(){__p+=__j.call(arguments,'');};\n"+i+"return __p;\n";try{var o=new Function(t.variable||"obj","_",i)}catch(a){throw a.source=i,a}var c=function(n){return o.call(this,n,m)},f=t.variable||"obj";return c.source="function("+f+"){\n"+i+"}",c},m.chain=function(n){var t=m(n);return t._chain=!0,t};var P=function(n,t){return n._chain?m(t).chain():t};m.mixin=function(n){m.each(m.functions(n),function(t){var r=m[t]=n[t];m.prototype[t]=function(){var n=[this._wrapped];return f.apply(n,arguments),P(this,r.apply(m,n))}})},m.mixin(m),m.each(["pop","push","reverse","shift","sort","splice","unshift"],function(n){var t=o[n];m.prototype[n]=function(){var r=this._wrapped;return t.apply(r,arguments),"shift"!==n&&"splice"!==n||0!==r.length||delete r[0],P(this,r)}}),m.each(["concat","join","slice"],function(n){var t=o[n];m.prototype[n]=function(){return P(this,t.apply(this._wrapped,arguments))}}),m.prototype.value=function(){return this._wrapped},m.prototype.valueOf=m.prototype.toJSON=m.prototype.value,m.prototype.toString=function(){return""+this._wrapped},"function"==typeof define&&define.amd&&define("underscore",[],function(){return m})}).call(this);
//# sourceMappingURL=underscore-min.map
/**
 * Created by Fine on 2016/12/4.
 */

var crossTable = {
  table: function (args) {
    var self = this
    var keyList = []
    var deleteList = []
    for (var i = 0; i < args.chartConfig.keys.length; i++) {
      var item = args.chartConfig.keys[i]
      if (item.hide != true) {
        keyList.push(item)
      } else {
        deleteList.push(item.col)
      }
    }
    if (deleteList.length > 0) {
      args.chartConfig.keys = keyList
      if (args.data.length > 0) {
        var dataList = []
        for (var i = 0; i < args.data.length; i++) {
          var data = []
          for (var j = 0; j < args.data[i].length; j++) {
            var found = false
            if (args.data[i][j] && args.data[i][j].column_header_header)
              for (var k = 0; k < deleteList.length; k++) {
                if (args.data[i][j].data == deleteList[k]) {
                  found = true
                  break
                }
              }
            if (!found && typeof args.data[i][j] != 'undefined') {
              data.push(args.data[i][j])
            }
          }
          dataList.push(data)
        }
        args.data = dataList
      }
    }
    // 处理 标为不显示的列
    for (var i = 0; i < args.data.length; i++) {
      if (args.data[i]) {
        for (var j = 0; j < args.data[i].length; j++) {
          if (args.data[i][j].showType && args.data[i][j].showType === 'hidden') {
            args.data[i][j].showType = 'hidden'
          }
        }
      }
      // if (i > 1) {   // 便利到一次数据就可以
      //   break
      // }
    }
    var data = args.data,
      chartConfig = args.chartConfig,
      tall = args.tall,
      pageDataNum = 10000,
      drill = args.drill,
      random = Math.random().toString(36).substring(2),
      container = args.container

    if (chartConfig.option.isPagenation) {
      pageDataNum = chartConfig.option.pageDataNum ? chartConfig.option.pageDataNum : 20
      pageDataNum = parseInt(pageDataNum)
    }
    var html = "<table class = 'table_wrapper'  widget='" + args.wName + "' id='tableWrapper" + random +
      "'><thead class='fixedHeader'>",
      colContent = "<tr>"
    if (_.isUndefined($.tooltipArr)) {
      $.tooltipArr = {}
    }
    $.tooltipArr[args.wName] = []

    if (chartConfig.option.isTh) {
      function parseHeader(pdata) {
        var returnData = [];
        var header = [];
        if (pdata.length > 0) {
          header = angular.copy(pdata[0])
        }
        if (header.length > 0) {
          // 转数组，求最大
          var max = 0;
          for (var i = 0; i < header.length; i++) {
            var headeri = header[i];
            headeri.arr = headeri.data.split(":");
            if (headeri.arr && headeri.arr.length > max)
              max = headeri.arr.length
          }
          for (i = 0; i < max; i++) {
            var line = [];
            var item = null;
            // rowspan
            for (var j = 0; j < header.length; j++) {
              var orgin = header[j];
              if (orgin.arr[i]) {
                item = {property: "header_key", data: orgin.arr[i], width: orgin.width, showType: orgin.showType};
                if (orgin.arr.length - 1 === i)
                  item.rowspan = max - orgin.arr.length + 1;
                line.push(item);
              }
            }
            var newLine = [];
            // colspan
            if (line.length > 0) {
              for (j = 0; j < line.length; j++) {
                var cell = line[j];
                if (cell && typeof cell.rowspan !== 'undefined') {
                  newLine.push(cell)
                } else if (j !== 0 && cell.data === line[j - 1].data) {
                } else {
                  var colspan = 1;
                  for (var k = j + 1; k <= line.length; k++) {
                    if (typeof line[k] === 'undefined' || cell.data !== line[k].data) {
                      cell.colspan = colspan;
                      break
                    } else {
                      colspan++
                    }
                  }
                  newLine.push(cell)
                }
              }
            }
            returnData.push(newLine)
          }
        }
        return returnData;
      }

      var headerData = parseHeader(data);

      for (var i = 0; i < headerData.length; i++) {
        var headerLine = headerData[i];
        for (var j = 0; j < headerLine.length; j++) {
          var headerCell = headerLine[j];

          var width = ''
          if (headerCell.width && headerCell.width.indexOf) {
            if (headerCell.width.indexOf('%') !== -1 || headerCell.width.indexOf('auto') !== -1) {
              width = headerCell.width
            }
            else {
              if(headerCell.colspan <= 1 || _.isUndefined(headerCell.colspan)) {
                width = headerCell.width + 'px'
              }
            }
          }

          var isShow = headerCell.showType === 'hidden' ? 'none' : ''
          colContent += '<th style="display:' + isShow + '"';
          if (headerCell.rowspan) colContent += 'rowspan="' + headerCell.rowspan + '" ';
          if (headerCell.colspan) colContent += 'colspan="' + headerCell.colspan + '" ';
          colContent += 'class="header_key"><div style="width:'+width+'">' + headerCell.data + '</div></th>'
        }
        colContent += "</tr>"
      }
    } else {
      for (var i = 0; i < chartConfig.groups.length; i++) {
        var groupId = chartConfig.groups[i].id
        var colspan = 1
        var colList = []
        var header_data = angular.copy(data)
        for (var t = 0; t < chartConfig.keys.length; t++) {
          colContent += "<th class=" + data[i][t].property + "><div></div></th>"
        }
        var spliceList = []
        var sn = 0
        for (var fd = 0; fd < header_data[i].length; fd++) {
          if (header_data[i][fd].showType == 'hidden') {
            spliceList.push(fd)
          }
        }
        for (var sl = 0; sl < spliceList.length; sl++) {
          header_data[i].splice(spliceList[sl] - sn, 1)
          sn++
        }
        // console.log('spliceList', header_data)
        for (var y = chartConfig.keys.length; y < header_data[i].length; y++) {
          if ((header_data[i][y + 1]) && (header_data[i][y].data == header_data[i][y + 1].data)) {
            if (i > 0) {
              var noEqual = false
              for (var s = i - 1; s > -1; s--) {
                if (header_data[s][y].data != header_data[s][y + 1].data) {
                  noEqual = true
                  break
                }
              }
              if (noEqual) {
                colList.push({
                  data: header_data[i][y].data,
                  colSpan: colspan,
                  property: header_data[i][y].property,
                  showType: header_data[i][y].showType
                })
                colspan = 1
              }
              else {
                // if (header_data[y + 1].showType != 'hidden' || header_data[y].showType != 'hidden') colspan++
                colspan++
              }
            }
            else if (i == 0) {
              colspan++
              // if (header_data[y + 1].showType != 'hidden' || header_data[y].showType != 'hidden') colspan++
            }
          }
          else {
            header_data[i][y] != header_data[i][y + 1] ? colList.push({
              data: header_data[i][y].data,
              colSpan: colspan,
              property: header_data[i][y].property
            }) : null
            colspan = 1
          }
        }
        // console.log('colList', colList)
        for (var c = 0; c < colList.length; c++) {
          var d = ""
          if (drill && drill.config[groupId] &&
            (drill.config[groupId].down || drill.config[groupId].up)) {
            d += " class='table_drill_cell'"
            if (drill.config[groupId].down) {
              d += " drill-down='" + groupId + "'"
            }
            if (drill.config[groupId].up) {
              d += " drill-up='" + groupId + "'"
            }
          }
          var value = "<div" + d + ">" + colList[c].data + "</div>"
          colContent += colList[c].colSpan > 1
            ? "<th colspan='" + colList[c].colSpan +
            "' class='" + colList[c].property + "'>" + value + "</th>"
            : "<th class='" + colList[c].property + "'>" + value + "</th>"
        }
        colContent += "</tr><tr>"
      }
    }
    self.totalIndex = undefined
    _.each(data[chartConfig.groups.length], function (d, index) {
      if (d.data === '总计') {
        self.totalIndex = index
      }
    })
    if (_.isNumber(self.totalIndex)) {
      data[chartConfig.groups.length].splice(chartConfig.keys.length, 0, data[chartConfig.groups.length][self.totalIndex])
      data[chartConfig.groups.length].splice(self.totalIndex + 1, 1)
    }

    self.foreMostIndex = undefined
    var trimForemost = $.trim(chartConfig.option.foremost)
    if (trimForemost.length) {
      _.each(data[chartConfig.groups.length], function (d, index) {
        if (d.data === trimForemost) {
          self.foreMostIndex = index
        }
      })
    }

    if (_.isNumber(self.foreMostIndex)) {
      data[chartConfig.groups.length].unshift(data[chartConfig.groups.length][self.foreMostIndex])
      data[chartConfig.groups.length].splice(self.foreMostIndex + 1, 1)
    }
    // console.log('thead', data[chartConfig.groups.length])
    if (!chartConfig.option.isValueTh && !chartConfig.option.isTh) {
      for (var k = 0; k < data[chartConfig.groups.length].length; k++) {
        var d = data[chartConfig.groups.length][k]
        var d_1 = data[chartConfig.groups.length][k + 1]
        var isDrilldown = false
        var isDrillup = false
        var drilldown, drillup

        if (drill && drill.config[d.id] && (drill.config[d.id].down || drill.config[d.id].up)) {
          if (drill.config[d.id].down) {
            drilldown = " drill-down='" + d.id + "' "
            isDrilldown = true
          }

          if (d_1) {
            if (drill.config[d_1.id] && (drill.config[d_1.id].dimensionId === drill.config[d.id].dimensionId)) {
              drillup = " drill-up='" + d_1.id + "' "
              isDrillup = true
              isDrilldown = false
            }
          }
        }

        var width = ''
        if (d.width && d.width.indexOf) {
          if (d.width.indexOf('%') !== -1 || d.width.indexOf('auto') !== -1) {
            width = d.width
          }
          else {
            width = d.width + 'px'
          }
        }
        var sort = (d.sort !== 'sort' && d.sort !== null && !_.isUndefined(d.sort)) ? 'sort-' + d.sort : 'sort'
        var isShow = d.showType === 'hidden' ? 'none' : ''
        colContent += "<th style='display:" + isShow + "' data-column='" + d.data + "' class='"
        if (!d.column_header_header && chartConfig.option.isSort) {
          colContent += " self-table-sort "
        }

        if (isDrilldown && d.column_header_header) {
          colContent += " drill-down "
        }
        if (isDrillup && d.column_header_header) {
          colContent += " drill-up "
        }

        colContent += d.property + "'" + "><div style='width: " + width + ";'>" + d.data
        if (!d.column_header_header && chartConfig.option.isSort) {
          colContent += "<i class='fa fa-" + sort + "' style='margin-left: 5px;'></i>"
        }

        if (isDrilldown && d.column_header_header) {
          colContent += "<span class='drill-plus' " + drilldown + ">+</span>"
        }
        if (isDrillup && d.column_header_header) {
          colContent += "<span class='drill-minus' " + drillup + ">-</span>"
        }

        colContent += "</div></th>"
      }
    }

    var dataColumn = data.splice(0, chartConfig.groups.length + 1)
    var sdIndex = undefined
    _.each(data, function (sData, index) {
      _.each(sData, function (d) {
        if (d.data === '总计') {
          sdIndex = index
        }
      })
    })

    if (_.isNumber(sdIndex)) {
      data.unshift(data[sdIndex])
      data.splice(sdIndex + 1, 1)
    }

    data = dataColumn.concat(data)
    var fixedHeader = colContent + '</tr>'
    html += colContent + "</tr></thead><tbody class='scrollContent self-table-tbody'>"
    var headerLines = chartConfig.groups.length + 1

    var dataPage = this.paginationProcessData(data, headerLines, pageDataNum)

    var hasPageContainer = false// 如果设置了分页，但是数据没有第二页，则不加载分页的容器
    var fullSizePages = parseInt(data.length / pageDataNum)
    if(args.chartConfig.option.isPagenation && fullSizePages > 1) hasPageContainer = true

    var colNum = data[0].length
    var rowNum = colNum ? data.length - headerLines : 0
    var trDom = this.render(dataPage[0], chartConfig, drill, data[0], args.wName)
    html = html + trDom + '</tbody></table>'
    var optionDom = '<select><option value=\'20\'>20</option><option value=\'50\'>50</option><option value=\'100\'>100</option><option value=\'150\'>150</option></select>'
    var p_class = 'p_' + random
    var PaginationDom = '<div class=\'' + p_class +
      '\'><div class=\'optionNum\'></div><div class=\'page\'><ul></ul></div></div>'
    var operate = '<div class=\'toolbar toolbar' + random +
      '\'><span class=\'info\'><b>info: </b>' + rowNum + ' x ' + colNum +
      '</span>' +
      '<span class=\'exportBnt\' title=\'export\'></span></div>'
    $(container).html(operate)
    var fixedContent = '<div class="fixed-header"><table widget="' + args.wName + '" style="width: 100%" class="table_wrapper"><thead>' + fixedHeader + '</thead></table></div>'
    var fixedBody = '<div class="fixed-container" style="height: 100% !important;">' + html + '</div>'
    var tableContainer = '<div class=\'tableView table_' + random + '\' style=\'width:100%;max-height:' + tall + 'px;overflow:auto\'>' +
      html + '</div>'
    $(container).append(tableContainer)
    // $(container)
    //     .append(fixedContent + '<div class=\'tableView table_' + random +
    //         '\' style=\'width:100%;max-height:' + tall + 'px;overflow:auto\'>' +
    //         fixedBody +
    //         '</div>')

    args.EventService.trigger('$ready', {wName: args.wName})
    if (hasPageContainer) {
      $(container).append(PaginationDom)
    }
    var dataTitle = null                                   //  表头
    if (_.isUndefined(self.dataEventList)) {             // 无数据，只有表头
      var index = data.length
      if (index > 0) {
        dataTitle = data[data.length - 1]
      }
    } else {
      for (var m = 0; m < data.length; m++) {
        var isBreak = false
        for (var n = 0; n < data[m].length; n++) {
          if (data[m][n].property.indexOf('header_') < 0) {
            isBreak = true
            break
          }
        }
        if (isBreak) {
          dataTitle = data[m - 1]
          break
        }
      }
    }
    var valueLength = args.chartConfig.values[0].cols.length     // 指标个数
    var keyLength = args.chartConfig.keys.length                  // 列维个数
    if (dataTitle) {
      for (var k = keyLength; k < dataTitle.length; k += valueLength) {
        for (var j = 0; j < valueLength; j++) {
          if (!_.isUndefined(dataTitle[k + j])) {
            dataTitle[k + j]['sameNum'] = k
          }
        }
      }
      var tooltipData = {
        isCross: args.chartConfig.groups.length > 0 ? true : false,
        title: dataTitle,
        data: data.slice(1)
      }
      $(container).find('tbody').data('tooltipData', tooltipData)
    }
    $(container).find('tbody').data('eventData', self.dataEventList)
    var pageObj = {
      data: dataPage,
      chartConfig: chartConfig,
      drill: drill
    }
    data.length ? this.renderPagination(dataPage.length, 1, pageObj,
      $('.' + p_class + ' .page>ul')[0]) : null
    this.clickPageNum(dataPage, chartConfig, drill, p_class, data[0])
    this.clickNextPrev(dataPage.length, pageObj, p_class, data[0])
    this.selectDataNum(data, chartConfig.groups.length + 1, chartConfig, drill,
      p_class, data[0])
    this.export(random, data)
    this.clickDrill('table_' + random, drill, args.render)

    // 表格一列两个上下箭头
    var tdArr = $('td.data')
    for (var i in tdArr) {
      if (tdArr[i].children && tdArr[i].children.length === 2) {
        if (tdArr[i].children[0] && tdArr[i].children[1]) {
          if (tdArr[i].children[0].tagName === 'A' && tdArr[i].children[0].tagName === tdArr[i].children[1].tagName) {
            tdArr[i].classList.add('flex-t')
            tdArr[i].children[0].classList.add('w-50-1')
            tdArr[i].children[1].classList.add('w-50-2')
          } else if (tdArr[i].children[0].tagName === 'I' && tdArr[i].children[0].tagName === tdArr[i].children[1].tagName) {
          }
        }
      }
    }

    // tooltip
    var info = {}
    var position = {
      rowIndex: null,
      colIndex: null
    }
    var formatter = function (info) {
      var html = '<ul>'
      if (chartConfig.option.tooltipCode) {
        try {
          info = (new Function('info, tooltipData, position',
            'return (' + chartConfig.option.tooltipCode + ')(info, tooltipData, position)'))
          (info, tooltipData, position)
        } catch (e) {
          console.error('tooltip自定义错误', chartConfig.option.tooltipCode, e)
        }
      }
      for (var i in info) {
        html += '<li>' + i + ':' + info[i] + '</li>'
      }
      html += '</ul>'
      return html
    }
    $(container).find('tbody')
      .data('powertip', function () {
        return formatter(info)
      })
      .powerTip({
        followMouse: true,
        fadeInTime: 1000
      })
      .on('mouseover', 'tr', function (e) {
        var trDom = null
        var trIndex = null
        if (e.target.offsetParent.parentElement.tagName === 'TR') {
          trDom = e.target.offsetParent.parentElement
          trIndex = e.target.offsetParent.parentElement.getAttribute('data-i')
        }
        if (e.target.parentElement.tagName === 'TR') {
          trDom = e.target.parentElement
          trIndex = e.target.parentElement.getAttribute('data-i')
        }
        position.rowIndex = trIndex
        var tooltipData = $(container).find('tbody').data('tooltipData')
        if (tooltipData && tooltipData.isCross) {
          var tdIndex = null
          if (e.target.offsetParent.parentElement.tagName === 'TD') {
            tdIndex = e.target.offsetParent.parentElement.getAttribute('data-j')
          }
          if (e.target.parentElement.tagName === 'TD') {
            tdIndex = e.target.parentElement.getAttribute('data-j')
          }
          if (e.target.tagName === 'TD') {
            tdIndex = e.target.getAttribute('data-j')
          }
          if (tdIndex) {
            position.colIndex = tdIndex
            for (var i = 0; i < tooltipData.title.length; i++) {
              if (tooltipData.title[tdIndex].sameNum === tooltipData.title[i].sameNum) {
                var content = trDom.childNodes[i].textContent
                var key = tooltipData.title[i].data
                var value = content === '' ? trDom.childNodes[i].getAttribute('data-value') : content
                info[key] = value
              }
            }
          }
        } else {
          var tdIndex = null
          if (e.target.offsetParent.parentElement.tagName === 'TD') {
            tdIndex = e.target.offsetParent.parentElement.getAttribute('data-j')
          }
          if (e.target.parentElement.tagName === 'TD') {
            tdIndex = e.target.parentElement.getAttribute('data-j')
          }
          if (e.target.tagName === 'TD') {
            tdIndex = e.target.getAttribute('data-j')
          }
          position.colIndex = tdIndex
          for (var i = 0; i < trDom.childNodes.length; i++) {
            var content = trDom.childNodes[i].textContent
            var key = trDom.childNodes[i].getAttribute('data-column')
            var value = content === '' ? trDom.childNodes[i].getAttribute('data-value') : content
            info[key] = value
          }
        }
        $("#powerTip").html(formatter(info))
      })

    // 表头固定
    // $(container).resize(this.resizeTable('tableWrapper' + random))
  },
  resizeTable: function (id) {
    var $target = $('#' + id)
    var height = $target.parents('.box-body')[0].scrollHeight
    var marginHeight = $target.find('thead')[0].scrollHeight
    var widthList = []
    $target.find('thead').find('th').each(function (i, dom) {
      $(dom).css('color', 'transparent')
      widthList.push($(dom).css('width'))
    })
    $target.css('margin-top', -marginHeight + 'px')
    $target.parent().css('height', height)
  },
  clickDrill: function (t_class, drill, render) {
    $('.' + t_class + ' .drill-plus[drill-down]').click(function () {
      var down = $(this).attr('drill-down')
      drill.drillDown(down, render)
    })
    $('.' + t_class + ' .drill-minus[drill-up]').click(function () {
      var up = $(this).attr('drill-up')
      drill.drillUp(up, render)
    })

    // $('.' + t_class + ' .table_drill_cell[drill-down]').click(function () {
    //   var down = $(this).attr('drill-down')
    //   var value = $(this).html()
    //   drill.drillDown(down, value, render)
    // })
    // $.contextMenu({
    //   selector: '.' + t_class + ' .table_drill_cell',
    //   build: function ($trigger, e) {
    //     var down = $trigger.attr('drill-down')
    //     var up = $trigger.attr('drill-up')
    //     var value = $trigger.html()
    //     var items = {}
    //     if (up) {
    //       items.up = {
    //         name: cboardTranslate('COMMON.ROLL_UP'),
    //         icon: 'fa-arrow-up'
    //       }
    //     }
    //     if (down) {
    //       items.down = {
    //         name: cboardTranslate('COMMON.DRILL_DOWN'),
    //         icon: 'fa-arrow-down'
    //       }
    //     }
    //     return {
    //       callback: function (key, options) {
    //         if ('up' == key) {
    //           drill.drillUp(up, render)
    //         } else if ('down' == key) {
    //           drill.drillDown(down, value, render)
    //         }
    //       },
    //       items: items
    //     }
    //   }
    // })

  },
  paginationProcessData: function (rawData, headerLines, pageSize) {
    var dataLength = rawData.length - headerLines
    var lastPageLines = dataLength % pageSize
    var fullSizePages = parseInt(dataLength / pageSize)
    var totalPages
    lastPageLines == 0
      ? totalPages = fullSizePages
      : totalPages = fullSizePages + 1
    var pageData = []
    for (var currentPage = 1; currentPage < totalPages + 1; currentPage++) {
      var startRow = (currentPage - 1) * pageSize + headerLines
      var partData = rawData.slice(startRow, startRow + pageSize)
      pageData.push(partData)
    }
    return pageData
  },
  render: function (data, chartConfig, drill, CDATA, wName) {
    var self = this
    var html = ''
    if (data === undefined) {
      return html
    }

    if (_.isNumber(self.totalIndex)) {
      _.each(data, function (sData, index) {
        sData.splice(chartConfig.keys.length, 0, sData[self.totalIndex])
        sData.splice(self.totalIndex + 1, 1)
      })
    }

    if (_.isNumber(self.foreMostIndex)) {
      _.each(data, function (sData, index) {
        sData.unshift(sData[self.foreMostIndex])
        sData.splice(self.foreMostIndex + 1, 1)
      })
    }

    for (var r = 0; r < chartConfig.keys.length; r++) {
      for (var n = 1; n < data.length; n++) {
        var node = data[n][r].data
        if (r > 0) {
          var parent = data[n][r - 1].data
          var next
          n > 0 ? next = data[n - 1][r - 1].data : null;
          (node == data[n - 1][r].data && parent == next && !chartConfig.option.showAllContent) ? data[n][r] = {
            data: data[n][r].data,
            rowSpan: 'row_null',
            property: data[n][r].property
          } : data[n][r] = {
            data: data[n][r].data,
            rowSpan: 'row',
            property: data[n][r].property
          }
        }
        else if (r == 0) {
          var preNode = n > 0 ? data[n - 1][r].data : null;
          //如果和上面内容相同且没有选中"显示所有内容"showAllContent的话隐藏
          (node == preNode && !chartConfig.option.showAllContent) ? data[n][r] = {
            data: data[n][r].data,
            rowSpan: 'row_null',
            property: data[n][r].property
          } : data[n][r] = {
            data: data[n][r].data,
            rowSpan: 'row',
            property: data[n][r].property
          }
        }
      }
    }
    self.dataEventList = []
    $.tooltipArr[wName] = []
    for (var n = 0; n < data.length; n++) {
      $.tooltipArr[wName].push(_.map(data[n], function (item) {             // 存储tooltip的data
        var result = {
          col: '',
          sameColumnNum: '',
          value: item.data,
          isKey: false
        }
        return result
      }))
      var rowContent = "<tr data-i='" + n + "'>"
      var isFirstLine = (n == 0) ? true : false
      var lineEventList = []
      for (var m = 0; m < chartConfig.keys.length; m++) {
        var currentCell = data[n][m]
        var rowParentCell = data[n][m - 1]
        var cur_data = currentCell.data ? currentCell.data : ''
        var keyId = chartConfig.keys[m].id
        var align = chartConfig.keys[m].align

        //算eventInfo
        if (data[n] && data[n][m] && data[n][m].property === 'column_key') {
          lineEventList.push({col: CDATA[m].data, value: cur_data})
        }

        if (m > 0) {
          if (currentCell.rowSpan == 'row_null' &&
            rowParentCell.rowSpan == 'row_null' && !isFirstLine) {
            rowContent += "<td class='row_null' data-column='" + CDATA[m].data + "' data-value='" + currentCell.data + "'><div></div></td>"
          } else {
            rowContent += "<td style='text-align:" + align +
              "' class='row' data-column='" + CDATA[m].data + "' data-value='" + currentCell.data + "'><div>" + cur_data + "</div></td>"
          }
        } else {
          if (currentCell.rowSpan == 'row_null' && !isFirstLine) {
            rowContent += "<td class='row_null' data-column='" + CDATA[m].data + "' data-value='" + currentCell.data + "'><div></div></td>"
          } else {
            rowContent += "<td style='text-align:" + align +
              "' class='row' data-column='" + CDATA[m].data + "' data-value='" + currentCell.data + "'><div>" + cur_data + "</div></td>"
          }
        }
      }
      for (var y = chartConfig.keys.length; y < data[n].length; y++) {
        var align = chartConfig.values[0].cols[(y - chartConfig.keys.length) %
        chartConfig.values[0].cols.length].align
        var isShow = data[n][y].showType === 'hidden' ? 'none' : ''
        rowContent += "<td data-j='" + y + "' style='text-align:" + align + "; display: " + isShow + "' class='" +
          data[n][m].property + "' data-column='" + CDATA[y].data + "' data-value='" + data[n][y].data + "'>"
        rowContent += self.dataStyleRender(data[n][y], n, y, data, CDATA)
        rowContent += "</td>"
      }
      html = html + rowContent + "</tr>"
      self.dataEventList.push(lineEventList)
    }

    // 表格一列两个上下箭头
    var tdArr = $('td.data')
    for (var i in tdArr) {
      if (tdArr[i].children && tdArr[i].children.length === 2) {
        if (tdArr[i].children[0] && tdArr[i].children[1]) {
          if (tdArr[i].children[0].tagName === 'A' && tdArr[i].children[0].tagName === tdArr[i].children[1].tagName) {
            tdArr[i].classList.add('flex-t')
            tdArr[i].children[0].classList.add('w-50-1')
            tdArr[i].children[1].classList.add('w-50-2')
          } else if (tdArr[i].children[0].tagName === 'I' && tdArr[i].children[0].tagName === tdArr[i].children[1].tagName) {
          }
        }
      }
    }
    return html
  },
  selectDataNum: function (data, num, chartConfig, drill, random, CDATA) {
    var _this = this
    $('.' + random).on('change', '.optionNum select', function (e) {
      var pageDataNum = e.target.value
      var dataPage = _this.paginationProcessData(data, num, pageDataNum)

      var dom = $(e.target.offsetParent).find('.page>ul')[0]
      var tbody = $(e.target.offsetParent).find('tbody')[0]
      tbody.innerHTML = (_this.render(dataPage[0], chartConfig, drill, CDATA))
      $(tbody).data('eventData', _this.dataEventList)
      _this.renderPagination(dataPage.length, 1, null, dom)
      $('.' + random).off('click')
      _this.clickPageNum(dataPage, chartConfig, random)
      var pageObj = {
        data: dataPage,
        chartConfig: chartConfig,
        drill: drill
      }
      _this.clickNextPrev(dataPage.length, pageObj, random, CDATA)
    })
  },
  clickPageNum: function (data, chartConfig, drill, random, CDATA) {
    var _this = this
    $('.' + random).on('click', 'a.pageLink', function (e) {
      var pageNum = e.target.innerText - 1
      var pageObj = {
        data: data,
        chartConfig: chartConfig,
        drill: drill
      }

      var dom = $(e.target.offsetParent).find('.page>ul')[0]
      var tbody = $(e.target.offsetParent).find('tbody')[0]
      tbody.innerHTML = _this.render(data[pageNum], chartConfig, drill, CDATA)
      $(tbody).data('eventData', _this.dataEventList)
      _this.renderPagination(data.length, parseInt(e.target.innerText), pageObj,
        dom)
    })
  },
  renderPagination: function (pageCount, pageNumber, pageObj, target) {
    if (pageCount == 1) return ''
    var liStr = '<li><a class="previewLink">上一页</a></li>'
    if (pageCount < 10) {
      for (var a = 0; a < pageCount; a++) {
        liStr += '<li><a class="pageLink">' + (a + 1) + '</a></li>'
      }
    }
    else {
      if (pageNumber < 6) {
        for (var a = 0; a < pageNumber + 2; a++) {
          liStr += '<li><a class="pageLink">' + (a + 1) + '</a></li>'
        }
        liStr += '<li class="disable"><span class="ellipse">...</span></li>'
        for (var i = pageCount - 2; i < pageCount; i++) {
          liStr += '<li><a class="pageLink">' + (i + 1) + '</a></li>'
        }
      } else if (pageNumber <= (pageCount - 5)) {
        for (var c = 0; c < 2; c++) {
          liStr += '<li><a class="pageLink">' + (c + 1) + '</a></li>'
        }
        liStr += '<li class="disable"><span class="ellipse">...</span></li>'
        for (var j = pageNumber - 2; j < pageNumber + 3; j++) {
          liStr += '<li><a class="pageLink">' + j + '</a></li>'
        }
        liStr += '<li class="disable"><span class="ellipse">...</span></li>'
        for (var i = pageCount - 2; i < pageCount; i++) {
          liStr += '<li><a class="pageLink">' + (i + 1) + '</a></li>'
        }
      } else {
        for (var c = 0; c < 2; c++) {
          liStr += '<li><a class="pageLink">' + (c + 1) + '</a></li>'
        }
        liStr += '<li class="disable"><span class="ellipse">...</span></li>'
        for (var i = pageNumber - 2; i < pageCount + 1; i++) {
          liStr += '<li><a class="pageLink">' + i + '</a></li>'
        }
      }
    }
    liStr += '<li><a class="nextLink">下一页</a></li>'
    if (target) {
      target.innerHTML = liStr
      if (pageNumber == 1) {
        target.childNodes[0].setAttribute('class', 'hide')
      } else if (pageNumber == pageCount) {
        target.childNodes[target.childNodes.length - 1].setAttribute('class',
          'hide')
      }
      this.buttonColor(pageNumber, target)
    }
    // else {
    //     $('.page>ul').html(liStr);
    //     if (pageNumber == 1) {
    //         $('.page a.previewLink').addClass('hide');
    //     } else if (pageNumber == pageCount) {
    //         $('.page a.nextLink').addClass('hide');
    //     }
    //     this.buttonColor(pageNumber);
    //     this.clickNextPrev(pageCount, pageObj);
    // }
    // 表格一列两个上下箭头
    var tdArr = $('td.data')
    for (var i in tdArr) {
      if (tdArr[i].children && tdArr[i].children.length === 2) {
        if (tdArr[i].children[0] && tdArr[i].children[1]) {
          if (tdArr[i].children[0].tagName === 'A' && tdArr[i].children[0].tagName === tdArr[i].children[1].tagName) {
            tdArr[i].classList.add('flex-t')
            tdArr[i].children[0].classList.add('w-50-1')
            tdArr[i].children[1].classList.add('w-50-2')
          } else if (tdArr[i].children[0].tagName === 'I' && tdArr[i].children[0].tagName === tdArr[i].children[1].tagName) {
          }
        }
      }
    }
  },
  buttonColor: function (pageNum, target) {
    if (target) {
      var buttons = target.childNodes
      for (var i = 0; i < buttons.length; i++) {
        buttons[i].childNodes[0].innerText == pageNum ? $(
          buttons[i].childNodes[0]).addClass('current') : null
      }
    }
  },
  clickNextPrev: function (pageCount, pageObj, random, CDATA) {
    var _this = this
    $('.' + random).on('click', '.page a.previewLink', function (e) {
      var kids = e.target.parentNode.parentNode.childNodes
      var dom = e.target.parentNode.parentNode.parentNode.childNodes[0]
      var tbody = $(e.target.offsetParent).find('tbody')[0]

      for (var i = 0; i < kids.length; i++) {
        if (kids[i].childNodes[0].className.indexOf('current') > -1) {
          var pageNum = parseInt(kids[i].childNodes[0].text) - 1
        }
      }
      tbody.innerHTML = _this.render(pageObj.data[pageNum - 1],
        pageObj.chartConfig, pageObj.drill, CDATA)
      $(tbody).data('eventData', _this.dataEventList)
      _this.renderPagination(pageCount, pageNum, pageObj, dom)
      //_this.clickPageNum(pageObj.data, pageObj.chartConfig);
    })
    $('.' + random).on('click', '.page a.nextLink', function (e) {
      var kids = e.target.parentNode.parentNode.childNodes
      var dom = e.target.parentNode.parentNode.parentNode.childNodes[0]
      var tbody = $(e.target.offsetParent).find('tbody')[0]

      for (var i = 0; i < kids.length; i++) {
        if (kids[i].childNodes[0].className.indexOf('current') > -1) {
          var pageNum = parseInt(kids[i].childNodes[0].text) + 1
        }
      }
      tbody.innerHTML = _this.render(pageObj.data[pageNum - 1],
        pageObj.chartConfig, pageObj.drill, CDATA)
      $(tbody).data('eventData', _this.dataEventList)
      _this.renderPagination(pageCount, pageNum, pageObj, dom)
      //_this.clickPageNum(pageObj.data, pageObj.chartConfig);
    })
  },
  export: function (random, data) {
    $('.toolbar' + random + ' .exportBnt').on('click', function () {
      var xhr = new XMLHttpRequest()
      var formData = new FormData()
      formData.append('data', JSON.stringify({data: data, type: 'table'}))
      xhr.open('POST', 'dashboard/tableToxls.do')
      xhr.responseType = 'arraybuffer'
      xhr.onload = function (e) {
        var blob = new Blob([this.response],
          {type: 'application/vnd.ms-excel'})
        var objectUrl = URL.createObjectURL(blob)
        var aForExcel = $('<a><span class=\'forExcel\'>下载excel</span></a>')
          .attr('href', objectUrl)
        aForExcel.attr('download', 'table.xls')
        $('body').append(aForExcel)
        $('.forExcel').click()
        aForExcel.remove()
      }
      xhr.send(formData)
    })
  },
  dataStyleRender: function (data, n, y, d, CDATA) {
    var returnData = data.data
    if (_.isNaN(data.data)) returnData = '-'
    if (data.data === Infinity || data.data === -Infinity) returnData = '-'
    switch (data.showType) {
      case 'bar':
        var maxBur = _.max(d, function (item) {
          if (parseInt(item[y].data)) {
            var num = parseInt(item[y].data)
            return num
          }
        })
        var htmlBar = ''
        if (maxBur && maxBur[y])
          htmlBar += '<div class="progress" style="margin-bottom: 0px;padding: 0">'
            + '<div class="progress-bar" role="progressbar" ' +
            'aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width:' +
            toPercent(data.data / maxBur[y].data) + '">' + "<span style='float: left; color: black'>" +
            +dlut.math.to2Decimal(data.data)
            + '</span></div> </div>'
        return htmlBar
        break
      case 'percent':
        var num = parseInt(data.data * data.showNum * 100)
        var htmlPercent = '' + (num / 100).toFixed(2) + '%'
        // if (toPoint(data.data, data.showNum) > data.showNum) {
        //   htmlPercent = '<a style="color: green">' + num.toFixed(1) + '%</a>'
        // }
        return htmlPercent
        break
      case 'updown':
        if (!parseInt(data.data)) {
          return data.data
        }
        var htmlUpdown = '<a>' + data.data +
          '<i class="fa fa-arrow-up" aria-hidden="true" style="color: green; margin-left: 5px"></i></a>'
        if (parseInt(data.data) < 0) {
          htmlUpdown = '<a>' + data.data +
            '<i class="fa fa-arrow-down" aria-hidden="true" style="color: red; margin-left: 5px"></i></a>'
        }
        return htmlUpdown
        break
      case 'custom':
        var result = data.data
        var customCode = data.showNum
        var autoTemp = data.temp
        var tdData = angular.copy(data.data)
        var rowData = []
        var preRowData = []

        _.each(CDATA, function (column, index) {
          rowData[column.data] = d[n][index].data
        })

        _.each(CDATA, function (column, index) {
          preRowData[column.data] = d[n - 1 < 0 ? 0 : n - 1][index].data
        })

        if (customCode) {
          // result = eval(customCode)
          var temp = ''
          try {
            temp = (new Function('serie,params,rowData,preRowData,autoTemp',
              'return (' + customCode + ')(serie,params,rowData,preRowData,autoTemp)'))
            (tdData, window.$$dlut_param, rowData, preRowData, autoTemp)
            result = temp
          } catch (e) {
            temp = 'ERROR'
            console.error('crossTable自定义计算错误', customCode, tdData, window.$$dlut_param, e)
          } finally {
            result = temp
          }
        }
        return result
      default:
        return '<div>' + returnData + '</div>'
        break
    }

    function toPercent(point) {
      var str = Number(point * 100).toFixed(1)
      str += '%'
      return str
    }

    function toPoint(percent, num) {
      var str = percent.replace('%', '')
      str = parseFloat(str * num)
      return str
    }
  }
}

/*
 * angular-gridster
 * http://manifestwebdesign.github.io/angular-gridster
 *
 * @version: 0.13.14
 * @license: MIT
 */
!function(a,b){"use strict";"function"==typeof define&&define.amd?define(["angular"],b):"object"==typeof exports?module.exports=b(require("angular")):b(a.angular)}(this,function(a){"use strict";return a.module("gridster",[]).constant("gridsterConfig",{columns:6,pushing:!0,floating:!0,swapping:!1,width:"auto",colWidth:"auto",rowHeight:"match",margins:[10,10],outerMargin:!0,sparse:!1,isMobile:!1,mobileBreakPoint:600,mobileModeEnabled:!0,minColumns:1,minRows:1,maxRows:100,defaultSizeX:2,defaultSizeY:1,minSizeX:1,maxSizeX:null,minSizeY:1,maxSizeY:null,saveGridItemCalculatedHeightInMobile:!1,resizable:{enabled:!0,handles:["s","e","n","w","se","ne","sw","nw"]},draggable:{enabled:!0,scrollSensitivity:20,scrollSpeed:15}}).controller("GridsterCtrl",["gridsterConfig","$timeout",function(b,c){var d=this;a.extend(this,b),this.resizable=a.extend({},b.resizable||{}),this.draggable=a.extend({},b.draggable||{});var e=!1;this.layoutChanged=function(){e||(e=!0,c(function(){e=!1,d.loaded&&d.floatItemsUp(),d.updateHeight(d.movingItem?d.movingItem.sizeY:0)},30))},this.grid=[],this.allItems=[],this.destroy=function(){this.grid&&(this.grid=[]),this.$element=null,this.allItems&&(this.allItems.length=0,this.allItems=null)},this.setOptions=function(b){if(b)if(b=a.extend({},b),b.draggable&&(a.extend(this.draggable,b.draggable),delete b.draggable),b.resizable&&(a.extend(this.resizable,b.resizable),delete b.resizable),a.extend(this,b),this.margins&&2===this.margins.length)for(var c=0,d=this.margins.length;c<d;++c)this.margins[c]=parseInt(this.margins[c],10),isNaN(this.margins[c])&&(this.margins[c]=0);else this.margins=[0,0]},this.canItemOccupy=function(a,b,c){return b>-1&&c>-1&&a.sizeX+c<=this.columns&&a.sizeY+b<=this.maxRows},this.autoSetItemPosition=function(a){for(var b=0;b<this.maxRows;++b)for(var c=0;c<this.columns;++c){var d=this.getItems(b,c,a.sizeX,a.sizeY,a);if(0===d.length&&this.canItemOccupy(a,b,c))return void this.putItem(a,b,c)}throw new Error("Unable to place item!")},this.getItems=function(a,b,c,d,e){var f=[];c&&d||(c=d=1),!e||e instanceof Array||(e=[e]);var g;if(this.sparse===!1)for(var h=0;h<d;++h)for(var i=0;i<c;++i)g=this.getItem(a+h,b+i,e),!g||e&&e.indexOf(g)!==-1||f.indexOf(g)!==-1||f.push(g);else for(var j=a+d-1,k=b+c-1,l=0;l<this.allItems.length;++l)g=this.allItems[l],!g||e&&e.indexOf(g)!==-1||f.indexOf(g)!==-1||!this.intersect(g,b,k,a,j)||f.push(g);return f},this.getBoundingBox=function(a){if(0===a.length)return null;if(1===a.length)return{row:a[0].row,col:a[0].col,sizeY:a[0].sizeY,sizeX:a[0].sizeX};for(var b=0,c=0,d=9999,e=9999,f=0,g=a.length;f<g;++f){var h=a[f];d=Math.min(h.row,d),e=Math.min(h.col,e),b=Math.max(h.row+h.sizeY,b),c=Math.max(h.col+h.sizeX,c)}return{row:d,col:e,sizeY:b-d,sizeX:c-e}},this.intersect=function(a,b,c,d,e){return b<=a.col+a.sizeX-1&&c>=a.col&&d<=a.row+a.sizeY-1&&e>=a.row},this.removeItem=function(a){for(var b,c=0,d=this.grid.length;c<d;++c){var e=this.grid[c];if(e&&(b=e.indexOf(a),b!==-1)){e[b]=null;break}}this.sparse&&(b=this.allItems.indexOf(a),b!==-1&&this.allItems.splice(b,1)),this.layoutChanged()},this.getItem=function(a,b,c){!c||c instanceof Array||(c=[c]);for(var d=1;a>-1;){for(var e=1,f=b;f>-1;){var g=this.grid[a];if(g){var h=g[f];if(h&&(!c||c.indexOf(h)===-1)&&h.sizeX>=e&&h.sizeY>=d)return h}++e,--f}--a,++d}return null},this.putItems=function(a){for(var b=0,c=a.length;b<c;++b)this.putItem(a[b])},this.putItem=function(a,b,c,d){if(("undefined"==typeof b||null===b)&&(b=a.row,c=a.col,"undefined"==typeof b||null===b))return void this.autoSetItemPosition(a);if(this.canItemOccupy(a,b,c)||(c=Math.min(this.columns-a.sizeX,Math.max(0,c)),b=Math.min(this.maxRows-a.sizeY,Math.max(0,b))),null!==a.oldRow&&"undefined"!=typeof a.oldRow){var e=a.oldRow===b&&a.oldColumn===c,f=this.grid[b]&&this.grid[b][c]===a;if(e&&f)return a.row=b,void(a.col=c);var g=this.grid[a.oldRow];g&&g[a.oldColumn]===a&&delete g[a.oldColumn]}a.oldRow=a.row=b,a.oldColumn=a.col=c,this.moveOverlappingItems(a,d),this.grid[b]||(this.grid[b]=[]),this.grid[b][c]=a,this.sparse&&this.allItems.indexOf(a)===-1&&this.allItems.push(a),this.movingItem===a&&this.floatItemUp(a),this.layoutChanged()},this.swapItems=function(a,b){this.grid[a.row][a.col]=b,this.grid[b.row][b.col]=a;var c=a.row,d=a.col;a.row=b.row,a.col=b.col,b.row=c,b.col=d},this.moveOverlappingItems=function(a,b){b?b.indexOf(a)===-1&&(b=b.slice(0),b.push(a)):b=[a];var c=this.getItems(a.row,a.col,a.sizeX,a.sizeY,b);this.moveItemsDown(c,a.row+a.sizeY,b)},this.moveItemsDown=function(a,b,c){if(a&&0!==a.length){a.sort(function(a,b){return a.row-b.row}),c=c?c.slice(0):[];var d,e,f,g={};for(e=0,f=a.length;e<f;++e){d=a[e];var h=g[d.col];("undefined"==typeof h||d.row<h)&&(g[d.col]=d.row)}for(e=0,f=a.length;e<f;++e){d=a[e];var i=b-g[d.col];this.moveItemDown(d,d.row+i,c),c.push(d)}}},this.moveItemDown=function(a,b,c){if(!(a.row>=b)){for(;a.row<b;)++a.row,this.moveOverlappingItems(a,c);this.putItem(a,a.row,a.col,c)}},this.floatItemsUp=function(){if(this.floating!==!1)for(var a=0,b=this.grid.length;a<b;++a){var c=this.grid[a];if(c)for(var d=0,e=c.length;d<e;++d){var f=c[d];f&&this.floatItemUp(f)}}},this.floatItemUp=function(a){if(this.floating!==!1){for(var b=a.col,c=a.sizeY,d=a.sizeX,e=null,f=null,g=a.row-1;g>-1;){var h=this.getItems(g,b,d,c,a);if(0!==h.length)break;e=g,f=b,--g}null!==e&&this.putItem(a,e,f)}},this.updateHeight=function(a){var b=this.minRows;a=a||0;for(var c=this.grid.length;c>=0;--c){var d=this.grid[c];if(d)for(var e=0,f=d.length;e<f;++e)d[e]&&(b=Math.max(b,c+a+d[e].sizeY))}this.gridHeight=this.maxRows-b>0?Math.min(this.maxRows,b):Math.max(this.maxRows,b)},this.pixelsToRows=function(a,b){return this.outerMargin||(a+=this.margins[0]/2),b===!0?Math.ceil(a/this.curRowHeight):b===!1?Math.floor(a/this.curRowHeight):Math.round(a/this.curRowHeight)},this.pixelsToColumns=function(a,b){return this.outerMargin||(a+=this.margins[1]/2),b===!0?Math.ceil(a/this.curColWidth):b===!1?Math.floor(a/this.curColWidth):Math.round(a/this.curColWidth)}}]).directive("gridsterPreview",function(){return{replace:!0,scope:!0,require:"^gridster",template:'<div ng-style="previewStyle()" class="gridster-item gridster-preview-holder"></div>',link:function(a,b,c,d){a.previewStyle=function(){return d.movingItem?{display:"block",height:d.movingItem.sizeY*d.curRowHeight-d.margins[0]+"px",width:d.movingItem.sizeX*d.curColWidth-d.margins[1]+"px",top:d.movingItem.row*d.curRowHeight+(d.outerMargin?d.margins[0]:0)+"px",left:d.movingItem.col*d.curColWidth+(d.outerMargin?d.margins[1]:0)+"px"}:{display:"none"}}}}}).directive("gridster",["$timeout","$window","$rootScope","gridsterDebounce",function(b,c,d,e){return{scope:!0,restrict:"EAC",controller:"GridsterCtrl",controllerAs:"gridster",compile:function(f){return f.prepend('<div ng-if="gridster.movingItem" gridster-preview></div>'),function(f,g,h,i){function j(){g.css("height",i.gridHeight*i.curRowHeight+(i.outerMargin?i.margins[0]:-i.margins[0])+"px")}function k(a){if(i.setOptions(a),l(g[0])){"auto"===i.width?i.curWidth=g[0].offsetWidth||parseInt(g.css("width"),10):i.curWidth=i.width,"auto"===i.colWidth?i.curColWidth=(i.curWidth+(i.outerMargin?-i.margins[1]:i.margins[1]))/i.columns:i.curColWidth=i.colWidth,i.curRowHeight=i.rowHeight,"string"==typeof i.rowHeight&&("match"===i.rowHeight?i.curRowHeight=Math.round(i.curColWidth):i.rowHeight.indexOf("*")!==-1?i.curRowHeight=Math.round(i.curColWidth*i.rowHeight.replace("*","").replace(" ","")):i.rowHeight.indexOf("/")!==-1&&(i.curRowHeight=Math.round(i.curColWidth/i.rowHeight.replace("/","").replace(" ","")))),i.isMobile=i.mobileModeEnabled&&i.curWidth<=i.mobileBreakPoint;for(var b=0,c=i.grid.length;b<c;++b){var d=i.grid[b];if(d)for(var e=0,f=d.length;e<f;++e)if(d[e]){var h=d[e];h.setElementPosition(),h.setElementSizeY(),h.setElementSizeX()}}j()}}i.loaded=!1,i.$element=g,f.gridster=i,g.addClass("gridster");var l=function(a){return"hidden"!==a.style.visibility&&"none"!==a.style.display};f.$watch(function(){return i.gridHeight},j),f.$watch(function(){return i.movingItem},function(){i.updateHeight(i.movingItem?i.movingItem.sizeY:0)});var m=h.gridster;m?f.$parent.$watch(m,function(a){k(a)},!0):k({}),f.$watch(function(){return i.loaded},function(){i.loaded?(g.addClass("gridster-loaded"),d.$broadcast("gridster-loaded",i)):g.removeClass("gridster-loaded")}),f.$watch(function(){return i.isMobile},function(){i.isMobile?g.addClass("gridster-mobile").removeClass("gridster-desktop"):g.removeClass("gridster-mobile").addClass("gridster-desktop"),d.$broadcast("gridster-mobile-changed",i)}),f.$watch(function(){return i.draggable},function(){d.$broadcast("gridster-draggable-changed",i)},!0),f.$watch(function(){return i.resizable},function(){d.$broadcast("gridster-resizable-changed",i)},!0);var n=g[0].offsetWidth||parseInt(g.css("width"),10),o=function(){var a=g[0].offsetWidth||parseInt(g.css("width"),10);a&&a!==n&&!i.movingItem&&(n=a,i.loaded&&g.removeClass("gridster-loaded"),k(),i.loaded&&g.addClass("gridster-loaded"),d.$broadcast("gridster-resized",[a,g[0].offsetHeight],i))},p=e(function(){o(),b(function(){f.$apply()})},100);f.$watch(function(){return l(g[0])},p),"function"==typeof window.addResizeListener?window.addResizeListener(g[0],p):f.$watch(function(){return g[0].offsetWidth||parseInt(g.css("width"),10)},o);var q=a.element(c);q.on("resize",p),f.$on("$destroy",function(){i.destroy(),q.off("resize",p),"function"==typeof window.removeResizeListener&&window.removeResizeListener(g[0],p)}),b(function(){f.$watch("gridster.floating",function(){i.floatItemsUp()}),i.loaded=!0},100)}}}}]).controller("GridsterItemCtrl",function(){this.$element=null,this.gridster=null,this.row=null,this.col=null,this.sizeX=null,this.sizeY=null,this.minSizeX=0,this.minSizeY=0,this.maxSizeX=null,this.maxSizeY=null,this.init=function(a,b){this.$element=a,this.gridster=b,this.sizeX=b.defaultSizeX,this.sizeY=b.defaultSizeY},this.destroy=function(){this.gridster=null,this.$element=null},this.toJSON=function(){return{row:this.row,col:this.col,sizeY:this.sizeY,sizeX:this.sizeX}},this.isMoving=function(){return this.gridster.movingItem===this},this.setPosition=function(a,b){this.gridster.putItem(this,a,b),this.isMoving()||this.setElementPosition()},this.setSize=function(a,b,c){a=a.toUpperCase();var d="size"+a,e="Size"+a;if(""!==b){b=parseInt(b,10),(isNaN(b)||0===b)&&(b=this.gridster["default"+e]);var f="X"===a?this.gridster.columns:this.gridster.maxRows;this["max"+e]&&(f=Math.min(this["max"+e],f)),this.gridster["max"+e]&&(f=Math.min(this.gridster["max"+e],f)),"X"===a&&this.cols?f-=this.cols:"Y"===a&&this.rows&&(f-=this.rows);var g=0;this["min"+e]&&(g=Math.max(this["min"+e],g)),this.gridster["min"+e]&&(g=Math.max(this.gridster["min"+e],g)),b=Math.max(Math.min(b,f),g);var h=this[d]!==b||this["old"+e]&&this["old"+e]!==b;return this["old"+e]=this[d]=b,this.isMoving()||this["setElement"+e](),!c&&h&&(this.gridster.moveOverlappingItems(this),this.gridster.layoutChanged()),h}},this.setSizeY=function(a,b){return this.setSize("Y",a,b)},this.setSizeX=function(a,b){return this.setSize("X",a,b)},this.setElementPosition=function(){this.gridster.isMobile?this.$element.css({marginLeft:this.gridster.margins[0]+"px",marginRight:this.gridster.margins[0]+"px",marginTop:this.gridster.margins[1]+"px",marginBottom:this.gridster.margins[1]+"px",top:"",left:""}):this.$element.css({margin:0,top:this.row*this.gridster.curRowHeight+(this.gridster.outerMargin?this.gridster.margins[0]:0)+"px",left:this.col*this.gridster.curColWidth+(this.gridster.outerMargin?this.gridster.margins[1]:0)+"px"})},this.setElementSizeY=function(){this.gridster.isMobile&&!this.gridster.saveGridItemCalculatedHeightInMobile?this.$element.css("height",""):this.$element.css("height",this.sizeY*this.gridster.curRowHeight-this.gridster.margins[0]+"px")},this.setElementSizeX=function(){this.gridster.isMobile?this.$element.css("width",""):this.$element.css("width",this.sizeX*this.gridster.curColWidth-this.gridster.margins[1]+"px")},this.getElementSizeX=function(){return this.sizeX*this.gridster.curColWidth-this.gridster.margins[1]},this.getElementSizeY=function(){return this.sizeY*this.gridster.curRowHeight-this.gridster.margins[0]}}).factory("GridsterTouch",[function(){return function(a,b,c,d){var e,f,g={},h=function(a){if(Object.keys)return Object.keys(a).length;var b,c=0;for(b in a)++c;return c},i=function(a){for(var b=0,c=0,d=navigator.userAgent.match(/\bMSIE\b/),e=a;null!=e;e=e.offsetParent)d&&(!document.documentMode||document.documentMode<8)&&"relative"===e.currentStyle.position&&e.offsetParent&&"relative"===e.offsetParent.currentStyle.position&&e.offsetLeft===e.offsetParent.offsetLeft?c+=e.offsetTop:(b+=e.offsetLeft,c+=e.offsetTop);return{x:b,y:c}},j=i(a),k=!1,l=function(e){if("mousemove"!==e.type||0!==h(g)){for(var f=!0,m=e.changedTouches?e.changedTouches:[e],n=0;n<m.length;++n){var o=m[n],p="undefined"!=typeof o.identifier?o.identifier:"undefined"!=typeof o.pointerId?o.pointerId:1;if("undefined"==typeof o.pageX)if(o.pageX=o.offsetX+j.x,o.pageY=o.offsetY+j.y,o.srcElement.offsetParent===a&&document.documentMode&&8===document.documentMode&&"mousedown"===o.type)o.pageX+=o.srcElement.offsetLeft,o.pageY+=o.srcElement.offsetTop;else if(o.srcElement!==a&&!document.documentMode||document.documentMode<8){for(var q=-2,r=-2,s=o.srcElement;null!==s;s=s.parentNode)q+=s.scrollLeft?s.scrollLeft:0,r+=s.scrollTop?s.scrollTop:0;o.pageX=o.clientX+q,o.pageY=o.clientY+r}var t=o.pageX,u=o.pageY;e.type.match(/(start|down)$/i)?(j=i(a),g[p]&&(d&&d({target:e.target,which:e.which,pointerId:p,pageX:t,pageY:u}),delete g[p]),b&&f&&(f=b({target:e.target,which:e.which,pointerId:p,pageX:t,pageY:u})),g[p]={x:t,y:u},a.msSetPointerCapture&&f?a.msSetPointerCapture(p):"mousedown"===e.type&&1===h(g)&&(k?a.setCapture(!0):(document.addEventListener("mousemove",l,!1),document.addEventListener("mouseup",l,!1)))):e.type.match(/move$/i)?!g[p]||g[p].x===t&&g[p].y===u||(c&&f&&(f=c({target:e.target,which:e.which,pointerId:p,pageX:t,pageY:u})),g[p].x=t,g[p].y=u):g[p]&&e.type.match(/(up|end|cancel)$/i)&&(d&&f&&(f=d({target:e.target,which:e.which,pointerId:p,pageX:t,pageY:u})),delete g[p],a.msReleasePointerCapture?a.msReleasePointerCapture(p):"mouseup"===e.type&&0===h(g)&&(k?a.releaseCapture():(document.removeEventListener("mousemove",l,!1),document.removeEventListener("mouseup",l,!1))))}f&&(e.preventDefault&&e.preventDefault(),e.preventManipulation&&e.preventManipulation(),e.preventMouseEvent&&e.preventMouseEvent())}};return this.enable=function(){window.navigator.msPointerEnabled?(a.addEventListener("MSPointerDown",l,!1),a.addEventListener("MSPointerMove",l,!1),a.addEventListener("MSPointerUp",l,!1),a.addEventListener("MSPointerCancel",l,!1),"undefined"!=typeof a.style.msContentZooming&&(e=a.style.msContentZooming,a.style.msContentZooming="none"),"undefined"!=typeof a.style.msTouchAction&&(f=a.style.msTouchAction,a.style.msTouchAction="none")):a.addEventListener?(a.addEventListener("touchstart",l,!1),a.addEventListener("touchmove",l,!1),a.addEventListener("touchend",l,!1),a.addEventListener("touchcancel",l,!1),a.addEventListener("mousedown",l,!1),a.setCapture&&!window.navigator.userAgent.match(/\bGecko\b/)&&(k=!0,a.addEventListener("mousemove",l,!1),a.addEventListener("mouseup",l,!1))):a.attachEvent&&a.setCapture&&(k=!0,a.attachEvent("onmousedown",function(){return l(window.event),window.event.returnValue=!1,!1}),a.attachEvent("onmousemove",function(){return l(window.event),window.event.returnValue=!1,!1}),a.attachEvent("onmouseup",function(){return l(window.event),window.event.returnValue=!1,!1}))},this.disable=function(){window.navigator.msPointerEnabled?(a.removeEventListener("MSPointerDown",l,!1),a.removeEventListener("MSPointerMove",l,!1),a.removeEventListener("MSPointerUp",l,!1),a.removeEventListener("MSPointerCancel",l,!1),e&&(a.style.msContentZooming=e),f&&(a.style.msTouchAction=f)):a.removeEventListener?(a.removeEventListener("touchstart",l,!1),a.removeEventListener("touchmove",l,!1),a.removeEventListener("touchend",l,!1),a.removeEventListener("touchcancel",l,!1),a.removeEventListener("mousedown",l,!1),a.setCapture&&!window.navigator.userAgent.match(/\bGecko\b/)&&(k=!0,a.removeEventListener("mousemove",l,!1),a.removeEventListener("mouseup",l,!1))):a.detachEvent&&a.setCapture&&(k=!0,a.detachEvent("onmousedown"),a.detachEvent("onmousemove"),a.detachEvent("onmouseup"))},this}}]).factory("GridsterDraggable",["$document","$window","GridsterTouch",function(b,c,d){function e(e,f,g,h,i){function j(a){e.addClass("gridster-item-moving"),g.movingItem=h,g.updateHeight(h.sizeY),f.$apply(function(){g.draggable&&g.draggable.start&&g.draggable.start(a,e,i,h)})}function k(a){var b=h.row,d=h.col,j=g.draggable&&g.draggable.drag,k=g.draggable.scrollSensitivity,l=g.draggable.scrollSpeed,m=Math.min(g.pixelsToRows(q),g.maxRows-1),n=Math.min(g.pixelsToColumns(p),g.columns-1),o=g.getItems(m,n,h.sizeX,h.sizeY,h),r=0!==o.length;if(g.swapping===!0&&r){var s=g.getBoundingBox(o),t=s.sizeX===h.sizeX&&s.sizeY===h.sizeY,u=s.row===b,v=s.col===d,w=s.row===m&&s.col===n,x=u||v;if(t&&1===o.length){if(w)g.swapItems(h,o[0]);else if(x)return}else if(s.sizeX<=h.sizeX&&s.sizeY<=h.sizeY&&x)for(var y=h.row<=m?h.row:m+h.sizeY,z=h.col<=n?h.col:n+h.sizeX,A=y-s.row,B=z-s.col,C=0,E=o.length;C<E;++C){var F=o[C],G=g.getItems(F.row+A,F.col+B,F.sizeX,F.sizeY,h);0===G.length&&g.putItem(F,F.row+A,F.col+B)}}g.pushing===!1&&r||(h.row=m,h.col=n),a.pageY-D.body.scrollTop<k?D.body.scrollTop=D.body.scrollTop-l:c.innerHeight-(a.pageY-D.body.scrollTop)<k&&(D.body.scrollTop=D.body.scrollTop+l),a.pageX-D.body.scrollLeft<k?D.body.scrollLeft=D.body.scrollLeft-l:c.innerWidth-(a.pageX-D.body.scrollLeft)<k&&(D.body.scrollLeft=D.body.scrollLeft+l),(j||b!==h.row||d!==h.col)&&f.$apply(function(){j&&g.draggable.drag(a,e,i,h)})}function l(a){e.removeClass("gridster-item-moving");var b=Math.min(g.pixelsToRows(q),g.maxRows-1),c=Math.min(g.pixelsToColumns(p),g.columns-1);g.pushing===!1&&0!==g.getItems(b,c,h.sizeX,h.sizeY,h).length||(h.row=b,h.col=c),g.movingItem=null,h.setPosition(h.row,h.col),f.$apply(function(){g.draggable&&g.draggable.stop&&g.draggable.stop(a,e,i,h)})}function m(b){if(E.indexOf(b.target.nodeName.toLowerCase())!==-1)return!1;var c=a.element(b.target);if(c.hasClass("gridster-item-resizable-handler"))return!1;if(c.attr("onclick")||c.attr("ng-click"))return!1;if(c.closest&&c.closest(".gridster-no-drag").length)return!1;if(g.draggable&&g.draggable.handle){var d=a.element(e[0].querySelectorAll(g.draggable.handle)),f=!1;a:for(var i=0,k=d.length;i<k;++i){var l=d[i];if(l===b.target){f=!0;break}for(var m=b.target,n=0;n<20;++n){var o=m.parentNode;if(o===e[0]||!o)break;if(o===l){f=!0;break a}m=o}}if(!f)return!1}switch(b.which){case 1:break;case 2:case 3:return}return x=b.pageX,y=b.pageY,p=parseInt(e.css("left"),10),q=parseInt(e.css("top"),10),r=e[0].offsetWidth,s=e[0].offsetHeight,t=h.col,u=h.row,j(b),!0}function n(a){if(!e.hasClass("gridster-item-moving")||e.hasClass("gridster-item-resizing"))return!1;var b=g.curWidth-1,c=g.curRowHeight*g.maxRows-1;v=a.pageX,w=a.pageY;var d=v-x+z,f=w-y+A;z=A=0,x=v,y=w;var h=d,i=f;return p+h<C?(d=C-p,z=h-d):p+r+h>b&&(d=b-p-r,z=h-d),q+i<B?(f=B-q,A=i-f):q+s+i>c&&(f=c-q-s,A=i-f),p+=d,q+=f,e.css({top:q+"px",left:p+"px"}),k(a),!0}function o(a){return!(!e.hasClass("gridster-item-moving")||e.hasClass("gridster-item-resizing"))&&(z=A=0,l(a),!0)}var p,q,r,s,t,u,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=b[0],E=["select","option","input","textarea","button"],F=null,G=null;this.enable=function(){if(F!==!0){if(F=!0,G)return void G.enable();G=new d(e[0],m,n,o),G.enable()}},this.disable=function(){F!==!1&&(F=!1,G&&G.disable())},this.toggle=function(a){a?this.enable():this.disable()},this.destroy=function(){this.disable()}}return e}]).factory("GridsterResizable",["GridsterTouch",function(b){function c(c,d,e,f,g){function h(h){function i(a){c.addClass("gridster-item-moving"),c.addClass("gridster-item-resizing"),e.movingItem=f,f.setElementSizeX(),f.setElementSizeY(),f.setElementPosition(),e.updateHeight(1),d.$apply(function(){e.resizable&&e.resizable.start&&e.resizable.start(a,c,g,f)})}function j(a){var b=f.row,i=f.col,j=f.sizeX,k=f.sizeY,l=e.resizable&&e.resizable.resize,m=f.col;["w","nw","sw"].indexOf(h)!==-1&&(m=e.pixelsToColumns(o,!1));var n=f.row;["n","ne","nw"].indexOf(h)!==-1&&(n=e.pixelsToRows(p,!1));var s=f.sizeX;["n","s"].indexOf(h)===-1&&(s=e.pixelsToColumns(q,!0));var t=f.sizeY;["e","w"].indexOf(h)===-1&&(t=e.pixelsToRows(r,!0));var u=n>-1&&m>-1&&s+m<=e.columns&&t+n<=e.maxRows;!u||e.pushing===!1&&0!==e.getItems(n,m,s,t,f).length||(f.row=n,f.col=m,f.sizeX=s,f.sizeY=t);var v=f.row!==b||f.col!==i||f.sizeX!==j||f.sizeY!==k;(l||v)&&d.$apply(function(){l&&e.resizable.resize(a,c,g,f)})}function k(a){c.removeClass("gridster-item-moving"),c.removeClass("gridster-item-resizing"),e.movingItem=null,f.setPosition(f.row,f.col),f.setSizeY(f.sizeY),f.setSizeX(f.sizeX),d.$apply(function(){e.resizable&&e.resizable.stop&&e.resizable.stop(a,c,g,f)})}function l(a){switch(a.which){case 1:break;case 2:case 3:return}return u=e.draggable.enabled,u&&(e.draggable.enabled=!1,d.$broadcast("gridster-draggable-changed",e)),z=a.pageX,A=a.pageY,o=parseInt(c.css("left"),10),p=parseInt(c.css("top"),10),q=c[0].offsetWidth,r=c[0].offsetHeight,s=f.sizeX,t=f.sizeY,i(a),!0}function m(a){var b=e.curWidth-1;x=a.pageX,y=a.pageY;var d=x-z+B,f=y-A+C;B=C=0,z=x,A=y;var g=f,h=d;return w.indexOf("n")>=0&&(r-g<G()?(f=r-G(),C=g-f):p+g<D&&(f=D-p,C=g-f),p+=f,r-=f),w.indexOf("s")>=0&&(r+g<G()?(f=G()-r,C=g-f):p+r+g>E&&(f=E-p-r,C=g-f),r+=f),w.indexOf("w")>=0&&(q-h<H()?(d=q-H(),B=h-d):o+h<F&&(d=F-o,B=h-d),o+=d,q-=d),w.indexOf("e")>=0&&(q+h<H()?(d=H()-q,B=h-d):o+q+h>b&&(d=b-o-q,B=h-d),q+=d),c.css({top:p+"px",left:o+"px",width:q+"px",height:r+"px"}),j(a),!0}function n(a){return e.draggable.enabled!==u&&(e.draggable.enabled=u,d.$broadcast("gridster-draggable-changed",e)),B=C=0,k(a),!0}var o,p,q,r,s,t,u,v,w=h,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=9999,F=0,G=function(){return(f.minSizeY?f.minSizeY:1)*e.curRowHeight-e.margins[0]},H=function(){return(f.minSizeX?f.minSizeX:1)*e.curColWidth-e.margins[1]},I=null;this.enable=function(){I||(I=a.element('<div class="gridster-item-resizable-handler handle-'+w+'"></div>'),c.append(I)),v=new b(I[0],l,m,n),v.enable()},this.disable=function(){I&&(I.remove(),I=null),v.disable(),v=void 0},this.destroy=function(){this.disable()}}var i=[],j=e.resizable.handles;"string"==typeof j&&(j=e.resizable.handles.split(","));for(var k=!1,l=0,m=j.length;l<m;l++)i.push(new h(j[l]));this.enable=function(){if(!k){for(var a=0,b=i.length;a<b;a++)i[a].enable();k=!0}},this.disable=function(){if(k){for(var a=0,b=i.length;a<b;a++)i[a].disable();k=!1}},this.toggle=function(a){a?this.enable():this.disable()},this.destroy=function(){for(var a=0,b=i.length;a<b;a++)i[a].destroy()}}return c}]).factory("gridsterDebounce",function(){return function(a,b,c){var d;return function(){var e=this,f=arguments,g=function(){d=null,c||a.apply(e,f)},h=c&&!d;clearTimeout(d),d=setTimeout(g,b),h&&a.apply(e,f)}}}).directive("gridsterItem",["$parse","GridsterDraggable","GridsterResizable","gridsterDebounce",function(a,b,c,d){return{scope:!0,restrict:"EA",controller:"GridsterItemCtrl",controllerAs:"gridsterItem",require:["^gridster","gridsterItem"],link:function(e,f,g,h){function i(){o.setPosition(o.row,o.col),r.row&&r.row.assign&&r.row.assign(e,o.row),r.col&&r.col.assign&&r.col.assign(e,o.col)}function j(){var a=o.setSizeX(o.sizeX,!0);a&&r.sizeX&&r.sizeX.assign&&r.sizeX.assign(e,o.sizeX);var b=o.setSizeY(o.sizeY,!0);b&&r.sizeY&&r.sizeY.assign&&r.sizeY.assign(e,o.sizeY),(a||b)&&(o.gridster.moveOverlappingItems(o),n.layoutChanged(),e.$broadcast("gridster-item-resized",o))}function k(){var a=document.createElement("div"),b={transition:"transitionend",OTransition:"oTransitionEnd",MozTransition:"transitionend",WebkitTransition:"webkitTransitionEnd"};for(var c in b)if(void 0!==a.style[c])return b[c]}var l,m=g.gridsterItem,n=h[0],o=h[1];if(e.gridster=n,m){var p=a(m);l=p(e)||{},!l&&p.assign&&(l={row:o.row,col:o.col,sizeX:o.sizeX,sizeY:o.sizeY,minSizeX:0,minSizeY:0,maxSizeX:null,maxSizeY:null},p.assign(e,l))}else l=g;o.init(f,n),f.addClass("gridster-item");for(var q=["minSizeX","maxSizeX","minSizeY","maxSizeY","sizeX","sizeY","row","col"],r={},s=[],t=function(b){var c;if("string"==typeof l[b])c=l[b];else if("string"==typeof l[b.toLowerCase()])c=l[b.toLowerCase()];else{if(!m)return;c=m+"."+b}s.push('"'+b+'":'+c),r[b]=a(c);var d=r[b](e);"number"==typeof d&&(o[b]=d)},u=0,v=q.length;u<v;++u)t(q[u]);var w="{"+s.join(",")+"}";e.$watchCollection(w,function(a,b){for(var c in a){var d=a[c],e=b[c];e!==d&&(d=parseInt(d,10),isNaN(d)||(o[c]=d))}}),e.$watch(function(){return o.row+","+o.col},i),e.$watch(function(){return o.sizeY+","+o.sizeX+","+o.minSizeX+","+o.maxSizeX+","+o.minSizeY+","+o.maxSizeY},j);var x=new b(f,e,n,o,l),y=new c(f,e,n,o,l),z=function(){y.toggle(!n.isMobile&&n.resizable&&n.resizable.enabled)};z();var A=function(){x.toggle(!n.isMobile&&n.draggable&&n.draggable.enabled)};A(),e.$on("gridster-draggable-changed",A),e.$on("gridster-resizable-changed",z),e.$on("gridster-resized",z),e.$on("gridster-mobile-changed",function(){z(),A()});var B=d(function(){e.$apply(function(){e.$broadcast("gridster-item-transition-end",o)})},50);return f.on(k(),B),e.$broadcast("gridster-item-initialized",o),e.$on("$destroy",function(){try{y.destroy(),x.destroy()}catch(a){}try{n.removeItem(o)}catch(a){}try{o.destroy()}catch(a){}})}}}]).directive("gridsterNoDrag",function(){return{restrict:"A",link:function(a,b){b.addClass("gridster-no-drag")}}})});
// CBoard settings
var settings = {
  preferredLanguage: 'cn' // en/cn: Switch language to Chinese
}

var CB_I18N = {
  "COMMON": {
    "OK": "确认",
    "LOAD": "加载",
    "CANCEL": "取消",
    "SAVE": "保存",
    "LOADING": "加载中...",
    "REFRESH": "刷新",
    "EDIT": "编辑",
    "DRAG": "拖拽",
    "BACK": "返回",
    "CONFIRM_DELETE": "真的想好了要删除吗?",
    "CONFIRM_SAVE_BEFORE_PREVIEW": "预览之前需要保存，确定保存？",
    "NOT_ALLOWED_TO_DELETE_BECAUSE_BE_DEPENDENT": "不允许删除，因为被依赖！",
    "TIP": "提示",
    "SUCCESS": "成功",
    "FAIL": "失败",
    "DEFAULT_CATEGORY": "默认分类",
    "NOT_EMPTY": "不能为空.",
    "NEW": "新建",
    "COPY": "复制",
    "DELETE": "删除",
    "EXPORT": "导出",
    "LOG": "日志",
    "LAST1M": "最近一月",
    "LAST1W": "最近一周",
    "LAST10D": "最近10天",
    "LAST10D_TIMESTAMP": "最近10天(时间戳)",
    "LAST3H_TIMESTAMP": "最近3小时(时间戳)",
    "LAST60MIN_TIMESTAMP": "最近60分钟(时间戳)",
    "FILTER_GROUP": "可选过滤",
    "SAVE_AS": "另存为",
    "PARAM": "条件",
    "DRILL_DOWN": "下钻",
    "ROLL_UP": "上卷",
    "WANRING": "警告！",
    "COLLAPSE": "最小化",
    "REMOVE": "关闭",
    "DATE": "日期",
    "VALUE": "值",
    "DEMAND": "提需求"
  },
  "TIPS": {
    "CAL_EXPR": "用于聚合后再计算. 使用上面的点击辅助输入避免输入错误. 如: Math.log(sum(columnA)/count(columB))"
  },
  "SIDEBAR": {
    "MENU": "菜单",
    "C_DASHBOARD": "看板",
    "MY_DASHBOARD": "我的看板",
    "CONFIG": "配置",
    "DATA_SOURCE": "数据源管理",
    "DATASET": "数据模型管理",
    "WIDGET": "图表设计",
    "CUBE": "数据模型",
    "DASHBOARD": "看板设计",
    "DASHBOARD_CATEGORY": "看板分类",
    "ADMIN": "管理",
    "USER_ADMIN": "用户管理",
    "RES_ADMIN": "资源管理",
    "JOB": "定时任务",
    "SHARE_RESOURCE": "资源分享",
    "NV": "新建页面",
    "CUBE_EDITABLE": "数据",
    "SCREEN_MENU": "大屏菜单",
    "STATISTICS": "统计",
    "DATASOURCE": "数据源"
  },
  "HEADER": {
    "SIGN_OUT": "注销",
    "TOGGLE_NAVIGATION": "切换导航",
    "CHANGE_PASSWORD": "修改密码",
    "CURRENT_PASSWORD": "当前密码",
    "NEW_PASSWORD": "新的密码",
    "CONFIRM_PASSWORD": "确认密码"
  },
  "FOOTER": {
    "COPYRIGHT": "",
    "VERSION": "版本"
  },
  "DASHBOARD": {
    "PARAM": {
      "NAME": "数据主题查询参数",
      "FIND": "查找",
      "OPT_VALUE": "值列表",
      "VALUE_LIST": "选定值列",
      "VALUE": "选定值",
      "VALUE_A": "下限",
      "VALUE_B": "上限",
      "SELECT_VALUE": "列表选值",
      "INPUT_VALUE": "输入值或表达式",
      "LIST_WARN": "值列表过大或者连续值，请不要加载数据列表!"
    }
  },
  "CONFIG": {
    "COMMON": {
      "CUSTOM_EXPRESSION": "可选表达式"
    },
    "DATA_SOURCE": {
      "DATA_SOURCE_HEADER": "数据源",
      "DATA_PROVIDER": "数据源类型",
      "NAME": "新建数据源名称",
      "TEST": "测试"
    },
    "WIDGET": {
      "MAX_COLOR": "最高颜色",
      "MIN_COLOR": "最低颜色",
      "CITY_MAX_RADIUS": "市最大半径",
      "CITY_MIN_RADIUS": "市最小半径",
      "IS_ENLARGE": "是否下钻放大",
      "ZOOM": "放大倍数",
      "SELECTOR": "选择条件",
      "CITYMAP": "2D区域地图",
      "ZONEMAP": "区域地图",
      "CHORD": "弦图",
      "WIDGET": "图表",
      "DATA_SOURCE": "数据源类型",
      "DATASET": "选择数据模型",
      "LOAD_DATA": "读取数据",
      "WIDGET_NAME": "图表名",
      "AXIS_NAME": "轴名",
      "CATEGORY": "图表分类",
      "WIDGET_TYPE": "图表类型",
      "CANCEL": "取消",
      "SAVE": "保存",
      "PREVIEW": "预览",
      "EXIST_QUERY": "已有查询",
      "NEW_QUERY": "新建查询",
      "SWITCH": "切换",
      "ROW": "列维",
      "GROUP": "行维",
      "VALUE": "指标",
      "MIN_VALUE": "最小值",
      "MAX_VALUE": "最大值",
      "VALUE_AXIS": "轴",
      "FILTER": "过滤",
      "THRESHOLD": "阈值",
      "LABEL": "名称",
      "FORMATTER": "格式化",
      "STYLE": "样式",
      "CHART": "图形",
      "ADD_NEW_AXIS": "添加轴",
      "ADD": "添加",
      "OPTIONAL": "可选",
      "ALIAS": "别名",
      "MORE": "更多",
      "EXAMPLE": "如",
      "FUNNEL": "漏斗图",
      "SANKEY": "桑基图",
      "CIRCULAR": "和弦图",
      "3DMAP": "三维地球",
      "3DBAR": "三维柱图",
      "3DAREA": "三维面图",
      "3DMAPLINE": "三维地球线图",
      "TABLE": "交叉表格",
      "DATALINETABLE": "表格",
      "CROSSTABLE": "下钻表格",
      "TREEGRID": "树状表格",
      "CROSSGREATTABLE": "下钻表格2",
      "FLEX": "灵活配置",
      "FLEX2": "灵活配置2",
      "GANTT": "甘特图",
      "KPI": "KPI",
      "PIE": "饼图",
      "PIE2": "饼图2",
      "flexChart": "flexChart",
      "flexD3Chart": "flexD3Chart",
      "LINE_BAR": "折线/柱状图",
      "LINE_BAR2": "折线/柱状图2",
      "LINE_BAR3": "折线/柱状图3",
      "SCATTER": "散点图/气泡图",
      "SCATTER2": "散点图",
      "MAP": "中国地图",
      "LINEMAP": "2D点线地图",
      "LINE": "折线",
      "LINE2": "折线",
      "LINE3": "折线",
      "ROSE": "玫瑰图",
      "FLEXD3CHART": "灵活配置D3",
      "BAR": "柱状",
      "STACKED_BAR": "堆叠柱状",
      "ONE_LINE_BAR": "一根线柱图",
      "WATER_FALL": "瀑布图",
      "AQUA": "蓝色",
      "RED": "红色",
      "YELLOW": "黄色",
      "GREEN": "绿色",
      "CYAN": "青色",
      "EXPRESSION": "表达式",
      "MEASURE": "指标列",
      "DIMENSION": "维度列",
      "ARITHMETIC": "运算",
      "COLUMN": "字段",
      "AGGREGATE": "聚合",
      "EXPRESSION_TEXT": "表达式",
      "CHECK": "校验",
      "FIND": "查找",
      "EQUAL": "等于",
      "NOT_EQUAL": "不等于",
      "HORIZONTAL": "垂直",
      "VERTICAL": "水平",
      "RADAR": "雷达图",
      "SHOW_BY_FILTER": "根据已有条件过滤",
      "TIPS_ROW_DIM": "行维",
      "TIPS_COLUMN_DIM": "列维",
      "TIPS_MEASURE": "值",
      "TIPS_DIM_NUM_0": "0",
      "TIPS_DIM_NUM_1": "1",
      "TIPS_DIM_NUM_0_MORE": "0个或多个",
      "TIPS_DIM_NUM_1_MORE": "1个或多个",
      "FROM_CACHE": "从缓存加载",
      "SIZE": "大小",
      "COLOR": "透明度",
      "PREVIEW_QUERY": "预览查询",
      "PERCENT_BAR": "百分比堆叠",
      "STACK_LINE": "堆叠面积图",
      "AGGREGATE_TYPE": "汇总类型",
      "GAUGE": "仪表",
      "ADD_NEW_STYLE": "添加样式",
      "LINE_STYLE": "线条样式",
      "STYLE_PROPORTION": "比例",
      "STYLE_COLOR": "颜色",
      "WORD_CLOUD": "标签云",
      "TREE_MAP": "矩形树图",
      "LEAF_DEPTH": "展示层级",
      "MULTI": "混合",
      "RANDOM": "随机",
      "BLUE": "蓝色",
      "PURPLE": "紫色",
      "AREA_MAP": "区域地图",
      "HEAT_MAP_CALENDER": "热点图（日历）",
      "DATE_FORMAT": "日期格式",
      "HEAT_MAP_TABLE": "热点图（表格）",
      "MARK_LINE_MAP": "标线地图(本地)",
      "LIQUID_FILL": "水球图",
      "STATIC": "静态",
      "DYNAMIC": "动态",
      "CIRCLE": "圆形",
      "PIN": "针形",
      "RECT": "矩形",
      "ARROW": "箭头形",
      "TRIANGLE": "三角形",
      "ROUND_RECT": "圆角矩形",
      "SQUARE": "正方形",
      "DIAMOND": "菱形",
      "BARPOLARSTACK": "环形柱图",
      "PIEPROPORTION": "百分比图",
      "BARLIMITS": "柱形范围图",
      "MULTI_LEVEL_PIE": "多层饼图",
      "CODEFLOWER": "多层饼图"
    },
    "DASHBOARD": {
      "DASHBOARD": "数据主题",
      "MY_DASHBOARD": "我的数据主题",
      "CATEGORY": "分类",
      "NAME": "名称",
      "ADD_ROW": "添加行",
      "ADD_COLUMN": "添加列",
      "ROW": "行",
      "HEIGHT": "行高度(像素)",
      "WIDTH": "宽度",
      "WIDGET": "图表",
      "PREVIEW": "预览",
      "ADD_PARAMROW": "添加参数行",
      "ADD_PARAM": "添加参数",
      "PARAM_ROW": "参数行",
      "PARAM": "查询参数",
      "PARAM_NAME": "参数名称",
      "CUBE_TREE": "数据主题中的数据模型/查询",
      "LINKED_COLUMN": "参数关联上的列",
      "PARAM_TYPE": "交互类型",
      "PARAM_TYPE_SELECTOR": "选择器",
      "PARAM_TYPE_SLIDER": "滑动器",
      "CHART_NAME": "图表名称",
      "ENTER_PARAMETER_NAME": "请输入参数名称",
      "DASHBOARD_SOMETHING_WRONG": "有部分图表访问出错,请检查数据主题的配置!",
      "VALUE_FORMMAT": "值格式化",
      "VIEW_FORMMAT": "显示格式化",
      "MIN": "最小值",
      "MAX": "最大值",
      "NOW": "现在",
      "ONE_HOUR_AGO": "一小时前",
      "ONE_DAY_AGO": "一天前",
      "ONE_MONTH_AGO": "一月前",
      "STEP": "步长",
      "MAX_RANGE": "最大间距",
      "DEFAUT_RANGE": "默认间距",
      "ONE_SECOND": "1秒种",
      "ONE_MINUT": "1分钟",
      "ONE_HOUR": "1小时",
      "ONE_DAY": "1天",
      "MAIN_NODE": "主节点",
      "SUB_NODE": "子节点",
      "ADD_MAIN_NODE": "添加主节点",
      "ADD_SUB_NODE": "添加子节点",
      "NODE_NAME": "节点名称",
      "TITLE": "标题",
      "NEW_GRID_LAYOUT": "新建网格布局",
      "NEW_TIMELINE_LAYOUT": "新建时间轴布局",
      "VALUE_FORMMAT_ALERT": "只有日期类型需要格式化",
      "AUTOMATIC_REFRESH_SWITCH": "自动刷新切换",
      "REMOVE_EMPTY_LINES": "清除空行",
      "DATA_REFRESH_TIME": "数据刷新时间"
    },
    "CATEGORY": {
      "NAME": "数据主题分类名称",
      "CATEGORY": "分类"
    },
    "DATASET": {
      "DATASET": "数据模型",
      "NAME": "名称",
      "CATEGORY": "分类",
      "LOAD_DATA": "读取数据",
      "DATASOURCE": "数据源",
      "ADD": "添加",
      "REAL_TIME_INTERVAL": "实时间隔(秒)",
      "REAL_TIME_TIP": "留空则不做后台刷新",
      "DIMENSION": "维度列",
      "HIERARCHY": "维度层级",
      "MEASURE": "指标列",
      "FILTER": "过滤器",
      "UNCLASSIFY": "未分类列",
      "TIP_EDIT_ALIAS": "编辑别名",
      "TIP_ADD_HIERARCHY": "添加层级",
      "TIP_SWITCH_TO_MEASURE": "转换为指标",
      "TIP_SWITCH_TO_DIMENSION": "转换为维度",
      "CUSTOM": "定制语句",
      "DEMAND": "需求制定",
      "EXPLAINATION": "解释"
    },
    "JOB": {
      "CONFIG": "配置",
      "JOB": "定时任务",
      "NAME": "名称",
      "TYPE": "类型",
      "LAST_EXEC_TIME": "最后执行时间",
      "EXEC_NOW": "立即执行",
      "ACTIVE_RANGE": "有效期",
      "MAIL": "邮件",
      "TO": "收件人",
      "CC": "抄送",
      "BCC": "密送",
      "SUBJECT": "主题",
      "ADD_DASHBOARD": "添加数据主题",
      "DASHBOARD": "数据主题",
      "EVERY": "每",
      "Minute": "分钟",
      "Hour": "小时",
      "Day": "天",
      "Week": "周",
      "Month": "月",
      "ON_THE": "的",
      "ON": "的",
      "OF": "的",
      "AT": "在",
      "PAST_THE_HOUR": "分",
      "USERNAME": "创建人",
      "FAIL": "失败",
      "FINISH": "完成",
      "PROCESSING": "处理中",
      "STATUS": "状态"
    },
    "SHARE_RES": {
      "YOUR_RES": "你的资源",
      "SHARE": "资源分享"
    }
  },
  "ADMIN": {
    "USER": {
      "USER": "用户管理",
      "LOGIN_NAME": "账号",
      "NAME": "姓名",
      "PASSWORD": "密码"
    },
    "ROLE": {
      "ROLE": "角色管理",
      "ROLE_NAME": "角色名",
      "ADMIN": "管理员"
    },
    "BOARD": "数据主题",
    "MENU": "菜单",
    "DATASOURCE": "数据源",
    "DATASET": "数据模型",
    "WIDGET": "图表",
    "JOB": "定时任务",
    "BRAIN_MAP": "脑图",
    "CONTACT_ADMIN": "请联系管理员申请以下权限",
    "BY_NAME": "按名称",
    "BY_ROLE": "按角色",
    "REVOKE": "撤销",
    "GRANT": "授予",
    "TOGGLE_UPDATE": "切换UDATE权限",
    "TOGGLE_DELETE": "切换DELETE权限"
  },
  "DATAPROVIDER": {
    "AGGREGATABLE_PROVIDER": "数据源聚合",
    "AGGREGATABLE_PROVIDER_SOLR": "数据源聚合(必须Solr5.0+)",
    "POOLEDCONNECTION": "是否使用连接池",
    "AIRFLOW": "连接算法编排",
    "JDBC": {
      "DRIVER": "驱动类 (如: com.mysql.jdbc.Driver)",
      "JDBCURL": "连接串 (如: jdbc:mysql://hostname:port/db)",
      "USERNAME": "数据库用户名",
      "PASSWORD": "数据库密码",
      "SQLTEXT": "查询语句"
    },
    "SAIKU": {},
    "TEXTFILE": {
      "BASE_PATH": "文件所在目录",
      "FILE_NAME": "文件名",
      "ENCODING": "编码",
      "SEPRATOR": "分隔符",
      "DATA_TYPE": "数据类型",
      "FIELD_NAMES": "字段名称",
      "QUOTE_CHAR": "引用字符",
      "ESCAPE_CHAR": "逃避字符"
    },
    "SOLR": {
      "SOLR_SERVERS": "Solr服务",
      "COLLECTION": "集合名称",
      "Q": "查询字段",
      "FQ": "过滤字段",
      "SORT": "排序字段",
      "START": "开始位置",
      "ROWS": "结果数",
      "FL": "结果字段"
    }
  },
  "NV": {
    "MENU": {
      "HOMEPAGE": "首页",
      "CUBE": "数据模型",
      "EXPLORE": "自助分析",
      "SHARE": "分享",
      "NEOVIS": "智慧图谱"
    },
    "COMMON": {},
    "DASHBOARD": {},
    "EXPLORE": {
      "FILTER": "过滤器",
      "INDEX": "指标",
      "ITEM": "配置项",
      "GRID": "图域",
      "LEGEND": "图例",
      "VAXIS": "值轴",
      "CAXIS": "类轴",
      "EXT": "选项",
      "CUSTOMIZE": "自定义",
      "TEXTPROMPT": "输入n%或一个整数",
      "TOP": "上",
      "BOTTOM": "下",
      "LEFT": "左",
      "RIGHT": "右",
      "CENTER": "中",
      "HORIZONTAL": "横",
      "VERTICAL": "纵",
      "ORIENT": "方向",
      "SHOWLEGEND": "显示图例",
      "INTERVAL": "间隔",
      "ROTATE": "旋转",
      "SHOWDATAZOOM": "显示时间缩放",
      "MARKPOINT": "显示柱状图头",
      "BARWIDTH": "柱宽",
      "LABEL": {
        "TOP": "柱头",
        "BOTTOM": "柱底",
        "OFFSET": {
          "TOP": "向上偏移",
          "BOTTOM": "向下偏移",
          "LEFT": "向左偏移",
          "RIGHT": "向右偏移"
        }
      },
      "FORM": "形态",
      "ANALYSIS": "自助分析",
      "CHART": "图表"
    }
  }
}

// $(function () {
//   angular.bootstrap($('html')[0], ['discovery'])
// })

// $.ajax({
//   url: 'i18n/' + settings.preferredLanguage + '/cboard.json',
//   type: 'GET',
//   dataType: 'json',
//   success: function (data) {
//     $(function () {
//       angular.bootstrap($('html')[0], ['discovery'])
//     })
//     return CB_I18N = data
//   },
//   async: false
// })

function getQueryString(name) {
  var regStr = "(^|&)" + name + "=([^&]*)(&|$)"
  var reg = new RegExp(regStr, "i")
  var r = window.location.search.substr(1).match(reg)
  if (r != null) return unescape(r[2])
  return null
}

// window.yiliToken = getQueryString('yili-token')

var sprintf = function (str) {
  var args = arguments,
    flag = true,
    i = 1

  str = str.replace(/%s/g, function () {
    var arg = args[i++]

    if (typeof arg === 'undefined') {
      flag = false
      return ''
    }
    return arg
  })
  return flag ? str : ''
}

var removeDiacritics = function (str) {
  var defaultDiacriticsRemovalMap = [
    {
      'base': 'A',
      'letters': /[\u0041\u24B6\uFF21\u00C0\u00C1\u00C2\u1EA6\u1EA4\u1EAA\u1EA8\u00C3\u0100\u0102\u1EB0\u1EAE\u1EB4\u1EB2\u0226\u01E0\u00C4\u01DE\u1EA2\u00C5\u01FA\u01CD\u0200\u0202\u1EA0\u1EAC\u1EB6\u1E00\u0104\u023A\u2C6F]/g
    },
    {'base': 'AA', 'letters': /[\uA732]/g},
    {'base': 'AE', 'letters': /[\u00C6\u01FC\u01E2]/g},
    {'base': 'AO', 'letters': /[\uA734]/g},
    {'base': 'AU', 'letters': /[\uA736]/g},
    {'base': 'AV', 'letters': /[\uA738\uA73A]/g},
    {'base': 'AY', 'letters': /[\uA73C]/g},
    {'base': 'B', 'letters': /[\u0042\u24B7\uFF22\u1E02\u1E04\u1E06\u0243\u0182\u0181]/g},
    {'base': 'C', 'letters': /[\u0043\u24B8\uFF23\u0106\u0108\u010A\u010C\u00C7\u1E08\u0187\u023B\uA73E]/g},
    {
      'base': 'D',
      'letters': /[\u0044\u24B9\uFF24\u1E0A\u010E\u1E0C\u1E10\u1E12\u1E0E\u0110\u018B\u018A\u0189\uA779]/g
    },
    {'base': 'DZ', 'letters': /[\u01F1\u01C4]/g},
    {'base': 'Dz', 'letters': /[\u01F2\u01C5]/g},
    {
      'base': 'E',
      'letters': /[\u0045\u24BA\uFF25\u00C8\u00C9\u00CA\u1EC0\u1EBE\u1EC4\u1EC2\u1EBC\u0112\u1E14\u1E16\u0114\u0116\u00CB\u1EBA\u011A\u0204\u0206\u1EB8\u1EC6\u0228\u1E1C\u0118\u1E18\u1E1A\u0190\u018E]/g
    },
    {'base': 'F', 'letters': /[\u0046\u24BB\uFF26\u1E1E\u0191\uA77B]/g},
    {
      'base': 'G',
      'letters': /[\u0047\u24BC\uFF27\u01F4\u011C\u1E20\u011E\u0120\u01E6\u0122\u01E4\u0193\uA7A0\uA77D\uA77E]/g
    },
    {
      'base': 'H',
      'letters': /[\u0048\u24BD\uFF28\u0124\u1E22\u1E26\u021E\u1E24\u1E28\u1E2A\u0126\u2C67\u2C75\uA78D]/g
    },
    {
      'base': 'I',
      'letters': /[\u0049\u24BE\uFF29\u00CC\u00CD\u00CE\u0128\u012A\u012C\u0130\u00CF\u1E2E\u1EC8\u01CF\u0208\u020A\u1ECA\u012E\u1E2C\u0197]/g
    },
    {'base': 'J', 'letters': /[\u004A\u24BF\uFF2A\u0134\u0248]/g},
    {
      'base': 'K',
      'letters': /[\u004B\u24C0\uFF2B\u1E30\u01E8\u1E32\u0136\u1E34\u0198\u2C69\uA740\uA742\uA744\uA7A2]/g
    },
    {
      'base': 'L',
      'letters': /[\u004C\u24C1\uFF2C\u013F\u0139\u013D\u1E36\u1E38\u013B\u1E3C\u1E3A\u0141\u023D\u2C62\u2C60\uA748\uA746\uA780]/g
    },
    {'base': 'LJ', 'letters': /[\u01C7]/g},
    {'base': 'Lj', 'letters': /[\u01C8]/g},
    {'base': 'M', 'letters': /[\u004D\u24C2\uFF2D\u1E3E\u1E40\u1E42\u2C6E\u019C]/g},
    {
      'base': 'N',
      'letters': /[\u004E\u24C3\uFF2E\u01F8\u0143\u00D1\u1E44\u0147\u1E46\u0145\u1E4A\u1E48\u0220\u019D\uA790\uA7A4]/g
    },
    {'base': 'NJ', 'letters': /[\u01CA]/g},
    {'base': 'Nj', 'letters': /[\u01CB]/g},
    {
      'base': 'O',
      'letters': /[\u004F\u24C4\uFF2F\u00D2\u00D3\u00D4\u1ED2\u1ED0\u1ED6\u1ED4\u00D5\u1E4C\u022C\u1E4E\u014C\u1E50\u1E52\u014E\u022E\u0230\u00D6\u022A\u1ECE\u0150\u01D1\u020C\u020E\u01A0\u1EDC\u1EDA\u1EE0\u1EDE\u1EE2\u1ECC\u1ED8\u01EA\u01EC\u00D8\u01FE\u0186\u019F\uA74A\uA74C]/g
    },
    {'base': 'OI', 'letters': /[\u01A2]/g},
    {'base': 'OO', 'letters': /[\uA74E]/g},
    {'base': 'OU', 'letters': /[\u0222]/g},
    {'base': 'P', 'letters': /[\u0050\u24C5\uFF30\u1E54\u1E56\u01A4\u2C63\uA750\uA752\uA754]/g},
    {'base': 'Q', 'letters': /[\u0051\u24C6\uFF31\uA756\uA758\u024A]/g},
    {
      'base': 'R',
      'letters': /[\u0052\u24C7\uFF32\u0154\u1E58\u0158\u0210\u0212\u1E5A\u1E5C\u0156\u1E5E\u024C\u2C64\uA75A\uA7A6\uA782]/g
    },
    {
      'base': 'S',
      'letters': /[\u0053\u24C8\uFF33\u1E9E\u015A\u1E64\u015C\u1E60\u0160\u1E66\u1E62\u1E68\u0218\u015E\u2C7E\uA7A8\uA784]/g
    },
    {
      'base': 'T',
      'letters': /[\u0054\u24C9\uFF34\u1E6A\u0164\u1E6C\u021A\u0162\u1E70\u1E6E\u0166\u01AC\u01AE\u023E\uA786]/g
    },
    {'base': 'TZ', 'letters': /[\uA728]/g},
    {
      'base': 'U',
      'letters': /[\u0055\u24CA\uFF35\u00D9\u00DA\u00DB\u0168\u1E78\u016A\u1E7A\u016C\u00DC\u01DB\u01D7\u01D5\u01D9\u1EE6\u016E\u0170\u01D3\u0214\u0216\u01AF\u1EEA\u1EE8\u1EEE\u1EEC\u1EF0\u1EE4\u1E72\u0172\u1E76\u1E74\u0244]/g
    },
    {'base': 'V', 'letters': /[\u0056\u24CB\uFF36\u1E7C\u1E7E\u01B2\uA75E\u0245]/g},
    {'base': 'VY', 'letters': /[\uA760]/g},
    {'base': 'W', 'letters': /[\u0057\u24CC\uFF37\u1E80\u1E82\u0174\u1E86\u1E84\u1E88\u2C72]/g},
    {'base': 'X', 'letters': /[\u0058\u24CD\uFF38\u1E8A\u1E8C]/g},
    {
      'base': 'Y',
      'letters': /[\u0059\u24CE\uFF39\u1EF2\u00DD\u0176\u1EF8\u0232\u1E8E\u0178\u1EF6\u1EF4\u01B3\u024E\u1EFE]/g
    },
    {
      'base': 'Z',
      'letters': /[\u005A\u24CF\uFF3A\u0179\u1E90\u017B\u017D\u1E92\u1E94\u01B5\u0224\u2C7F\u2C6B\uA762]/g
    },
    {
      'base': 'a',
      'letters': /[\u0061\u24D0\uFF41\u1E9A\u00E0\u00E1\u00E2\u1EA7\u1EA5\u1EAB\u1EA9\u00E3\u0101\u0103\u1EB1\u1EAF\u1EB5\u1EB3\u0227\u01E1\u00E4\u01DF\u1EA3\u00E5\u01FB\u01CE\u0201\u0203\u1EA1\u1EAD\u1EB7\u1E01\u0105\u2C65\u0250]/g
    },
    {'base': 'aa', 'letters': /[\uA733]/g},
    {'base': 'ae', 'letters': /[\u00E6\u01FD\u01E3]/g},
    {'base': 'ao', 'letters': /[\uA735]/g},
    {'base': 'au', 'letters': /[\uA737]/g},
    {'base': 'av', 'letters': /[\uA739\uA73B]/g},
    {'base': 'ay', 'letters': /[\uA73D]/g},
    {'base': 'b', 'letters': /[\u0062\u24D1\uFF42\u1E03\u1E05\u1E07\u0180\u0183\u0253]/g},
    {
      'base': 'c',
      'letters': /[\u0063\u24D2\uFF43\u0107\u0109\u010B\u010D\u00E7\u1E09\u0188\u023C\uA73F\u2184]/g
    },
    {
      'base': 'd',
      'letters': /[\u0064\u24D3\uFF44\u1E0B\u010F\u1E0D\u1E11\u1E13\u1E0F\u0111\u018C\u0256\u0257\uA77A]/g
    },
    {'base': 'dz', 'letters': /[\u01F3\u01C6]/g},
    {
      'base': 'e',
      'letters': /[\u0065\u24D4\uFF45\u00E8\u00E9\u00EA\u1EC1\u1EBF\u1EC5\u1EC3\u1EBD\u0113\u1E15\u1E17\u0115\u0117\u00EB\u1EBB\u011B\u0205\u0207\u1EB9\u1EC7\u0229\u1E1D\u0119\u1E19\u1E1B\u0247\u025B\u01DD]/g
    },
    {'base': 'f', 'letters': /[\u0066\u24D5\uFF46\u1E1F\u0192\uA77C]/g},
    {
      'base': 'g',
      'letters': /[\u0067\u24D6\uFF47\u01F5\u011D\u1E21\u011F\u0121\u01E7\u0123\u01E5\u0260\uA7A1\u1D79\uA77F]/g
    },
    {
      'base': 'h',
      'letters': /[\u0068\u24D7\uFF48\u0125\u1E23\u1E27\u021F\u1E25\u1E29\u1E2B\u1E96\u0127\u2C68\u2C76\u0265]/g
    },
    {'base': 'hv', 'letters': /[\u0195]/g},
    {
      'base': 'i',
      'letters': /[\u0069\u24D8\uFF49\u00EC\u00ED\u00EE\u0129\u012B\u012D\u00EF\u1E2F\u1EC9\u01D0\u0209\u020B\u1ECB\u012F\u1E2D\u0268\u0131]/g
    },
    {'base': 'j', 'letters': /[\u006A\u24D9\uFF4A\u0135\u01F0\u0249]/g},
    {
      'base': 'k',
      'letters': /[\u006B\u24DA\uFF4B\u1E31\u01E9\u1E33\u0137\u1E35\u0199\u2C6A\uA741\uA743\uA745\uA7A3]/g
    },
    {
      'base': 'l',
      'letters': /[\u006C\u24DB\uFF4C\u0140\u013A\u013E\u1E37\u1E39\u013C\u1E3D\u1E3B\u017F\u0142\u019A\u026B\u2C61\uA749\uA781\uA747]/g
    },
    {'base': 'lj', 'letters': /[\u01C9]/g},
    {'base': 'm', 'letters': /[\u006D\u24DC\uFF4D\u1E3F\u1E41\u1E43\u0271\u026F]/g},
    {
      'base': 'n',
      'letters': /[\u006E\u24DD\uFF4E\u01F9\u0144\u00F1\u1E45\u0148\u1E47\u0146\u1E4B\u1E49\u019E\u0272\u0149\uA791\uA7A5]/g
    },
    {'base': 'nj', 'letters': /[\u01CC]/g},
    {
      'base': 'o',
      'letters': /[\u006F\u24DE\uFF4F\u00F2\u00F3\u00F4\u1ED3\u1ED1\u1ED7\u1ED5\u00F5\u1E4D\u022D\u1E4F\u014D\u1E51\u1E53\u014F\u022F\u0231\u00F6\u022B\u1ECF\u0151\u01D2\u020D\u020F\u01A1\u1EDD\u1EDB\u1EE1\u1EDF\u1EE3\u1ECD\u1ED9\u01EB\u01ED\u00F8\u01FF\u0254\uA74B\uA74D\u0275]/g
    },
    {'base': 'oi', 'letters': /[\u01A3]/g},
    {'base': 'ou', 'letters': /[\u0223]/g},
    {'base': 'oo', 'letters': /[\uA74F]/g},
    {'base': 'p', 'letters': /[\u0070\u24DF\uFF50\u1E55\u1E57\u01A5\u1D7D\uA751\uA753\uA755]/g},
    {'base': 'q', 'letters': /[\u0071\u24E0\uFF51\u024B\uA757\uA759]/g},
    {
      'base': 'r',
      'letters': /[\u0072\u24E1\uFF52\u0155\u1E59\u0159\u0211\u0213\u1E5B\u1E5D\u0157\u1E5F\u024D\u027D\uA75B\uA7A7\uA783]/g
    },
    {
      'base': 's',
      'letters': /[\u0073\u24E2\uFF53\u00DF\u015B\u1E65\u015D\u1E61\u0161\u1E67\u1E63\u1E69\u0219\u015F\u023F\uA7A9\uA785\u1E9B]/g
    },
    {
      'base': 't',
      'letters': /[\u0074\u24E3\uFF54\u1E6B\u1E97\u0165\u1E6D\u021B\u0163\u1E71\u1E6F\u0167\u01AD\u0288\u2C66\uA787]/g
    },
    {'base': 'tz', 'letters': /[\uA729]/g},
    {
      'base': 'u',
      'letters': /[\u0075\u24E4\uFF55\u00F9\u00FA\u00FB\u0169\u1E79\u016B\u1E7B\u016D\u00FC\u01DC\u01D8\u01D6\u01DA\u1EE7\u016F\u0171\u01D4\u0215\u0217\u01B0\u1EEB\u1EE9\u1EEF\u1EED\u1EF1\u1EE5\u1E73\u0173\u1E77\u1E75\u0289]/g
    },
    {'base': 'v', 'letters': /[\u0076\u24E5\uFF56\u1E7D\u1E7F\u028B\uA75F\u028C]/g},
    {'base': 'vy', 'letters': /[\uA761]/g},
    {'base': 'w', 'letters': /[\u0077\u24E6\uFF57\u1E81\u1E83\u0175\u1E87\u1E85\u1E98\u1E89\u2C73]/g},
    {'base': 'x', 'letters': /[\u0078\u24E7\uFF58\u1E8B\u1E8D]/g},
    {
      'base': 'y',
      'letters': /[\u0079\u24E8\uFF59\u1EF3\u00FD\u0177\u1EF9\u0233\u1E8F\u00FF\u1EF7\u1E99\u1EF5\u01B4\u024F\u1EFF]/g
    },
    {
      'base': 'z',
      'letters': /[\u007A\u24E9\uFF5A\u017A\u1E91\u017C\u017E\u1E93\u1E95\u01B6\u0225\u0240\u2C6C\uA763]/g
    }
  ]

  for (var i = 0; i < defaultDiacriticsRemovalMap.length; i++) {
    str = str.replace(defaultDiacriticsRemovalMap[i].letters, defaultDiacriticsRemovalMap[i].base)
  }

  return str

}

function MultipleSelect($el, options) {
  var that = this,
    name = $el.attr('name') || options.name || ''

  this.options = options

  // hide select element
  this.$el = $el.hide()

  // label element
  this.$label = this.$el.closest('label')
  if (this.$label.length === 0 && this.$el.attr('id')) {
    this.$label = $(sprintf('label[for="%s"]', this.$el.attr('id').replace(/:/g, '\\:')))
  }

  // restore class and title from select element
  this.$parent = $(sprintf(
    '<div class="ms-parent %s" %s/>',
    $el.attr('class') || '',
    sprintf('title="%s"', $el.attr('title'))))

  // add placeholder to choice button
  this.$choice = $(sprintf([
      '<button type="button" class="ms-choice">',
      '<span class="placeholder">%s</span>',
      '<div></div>',
      '</button>'
    ].join(''),
    this.options.placeholder))

  // default position is bottom
  this.$drop = $(sprintf('<div class="ms-drop %s"%s></div>',
    this.options.position,
    sprintf(' style="width: %s"', this.options.dropWidth)))

  this.$el.after(this.$parent)
  this.$parent.append(this.$choice)
  this.$parent.append(this.$drop)

  if (this.$el.prop('disabled')) {
    this.$choice.addClass('disabled')
  }

  // this.$parent.css('width',
  //     this.options.width ||
  //     this.$el.css('width') ||
  //     this.$el.outerWidth() + 20);

  this.selectAllName = 'data-name="selectAll' + name + '"'
  this.selectGroupName = 'data-name="selectGroup' + name + '"'
  this.selectItemName = 'data-name="selectItem' + name + '"'

  if (!this.options.keepOpen) {
    $(document).click(function (e) {
      if ($(e.target)[0] === that.$choice[0] ||
        $(e.target).parents('.ms-choice')[0] === that.$choice[0]) {
        return
      }
      if (($(e.target)[0] === that.$drop[0] ||
        $(e.target).parents('.ms-drop')[0] !== that.$drop[0] && e.target !== $el[0]) &&
        that.options.isOpen) {
        that.close()
      }
    })
  }
}

MultipleSelect.prototype = {
  constructor: MultipleSelect,

  init: function () {
    var that = this,
      $ul = $('<ul></ul>')

    this.$drop.html('')

    if (this.options.filter) {
      this.$drop.append([
        '<div class="ms-search">',
        '<input type="text" autocomplete="off" autocorrect="off" autocapitilize="off" spellcheck="false">',
        '</div>'].join('')
      )
    }

    if (this.options.selectAll && !this.options.single) {
      $ul.append([
        '<li class="ms-select-all">',
        '<label>',
        sprintf('<input type="checkbox" %s /> ', this.selectAllName),
        this.options.selectAllDelimiter[0],
        this.options.selectAllText,
        this.options.selectAllDelimiter[1],
        '</label>',
        '</li>'
      ].join(''))
    }

    $.each(this.$el.children(), function (i, elm) {
      if ($(elm).val() !== '? undefined:undefined ?') $ul.append(that.optionToHtml(i, elm))
    })
    $ul.append(sprintf('<li class="ms-no-results">%s</li>', this.options.noMatchesFound))
    this.$drop.append($ul)

    this.$drop.find('ul').css('max-height', this.options.maxHeight + 'px')
    this.$drop.find('.multiple').css('width', this.options.multipleWidth + 'px')

    this.$searchInput = this.$drop.find('.ms-search input')
    this.$selectAll = this.$drop.find('input[' + this.selectAllName + ']')
    this.$selectGroups = this.$drop.find('input[' + this.selectGroupName + ']')
    this.$selectItems = this.$drop.find('input[' + this.selectItemName + ']:enabled')
    this.$disableItems = this.$drop.find('input[' + this.selectItemName + ']:disabled')
    this.$noResults = this.$drop.find('.ms-no-results')

    this.events()
    this.updateSelectAll(true)
    this.update(true)

    if (this.options.isOpen) {
      this.open()
    }
  },

  optionToHtml: function (i, elm, group, groupDisabled) {
    var that = this,
      $elm = $(elm),
      classes = $elm.attr('class') || '',
      title = sprintf('title="%s"', $elm.attr('title')),
      multiple = this.options.multiple ? 'multiple' : '',
      disabled,
      type = this.options.single ? 'radio' : 'checkbox'

    if ($elm.is('option')) {
      var value = $elm.val(),
        text = that.options.textTemplate($elm),
        selected = $elm.prop('selected'),
        style = sprintf('style="%s"', this.options.styler(value)),
        $el

      disabled = groupDisabled || $elm.prop('disabled')

      $el = $([
        sprintf('<li class="%s %s" %s %s>', multiple, classes, title, style),
        sprintf('<label class="%s">', disabled ? 'disabled' : ''),
        sprintf('<input type="%s" %s%s%s%s>',
          type, this.selectItemName,
          selected ? ' checked="checked"' : '',
          disabled ? ' disabled="disabled"' : '',
          sprintf(' data-group="%s"', group)),
        sprintf('<span>%s</span>', text),
        '</label>',
        '</li>'
      ].join(''))
      $el.find('input').val(value)
      return $el
    }
    if ($elm.is('optgroup')) {
      var label = that.options.labelTemplate($elm),
        $group = $('<div/>')

      group = 'group_' + i
      disabled = $elm.prop('disabled')

      $group.append([
        '<li class="group">',
        sprintf('<label class="optgroup %s" data-group="%s">', disabled ? 'disabled' : '', group),
        this.options.hideOptgroupCheckboxes || this.options.single ? '' :
          sprintf('<input type="checkbox" %s %s>',
            this.selectGroupName, disabled ? 'disabled="disabled"' : ''),
        label,
        '</label>',
        '</li>'
      ].join(''))

      $.each($elm.children(), function (i, elm) {
        $group.append(that.optionToHtml(i, elm, group, disabled))
      })
      return $group.html()
    }
  },

  events: function () {
    var that = this,
      toggleOpen = function (e) {
        e.preventDefault()
        that[that.options.isOpen ? 'close' : 'open']()
      }

    if (this.$label) {
      this.$label.off('click').on('click', function (e) {
        if (e.target.nodeName.toLowerCase() !== 'label' || e.target !== this) {
          return
        }
        toggleOpen(e)
        if (!that.options.filter || !that.options.isOpen) {
          that.focus()
        }
        e.stopPropagation() // Causes lost focus otherwise
      })
    }

    this.$choice.off('click').on('click', toggleOpen)
      .off('focus').on('focus', this.options.onFocus)
      .off('blur').on('blur', this.options.onBlur)

    this.$parent.off('keydown').on('keydown', function (e) {
      switch (e.which) {
        case 27: // esc key
          that.close()
          that.$choice.focus()
          break
      }
    })

    this.$searchInput.off('keydown').on('keydown', function (e) {
      // Ensure shift-tab causes lost focus from filter as with clicking away
      if (e.keyCode === 9 && e.shiftKey) {
        that.close()
      }
    }).off('keyup').on('keyup', function (e) {
      // enter or space
      // Avoid selecting/deselecting if no choices made
      if (that.options.filterAcceptOnEnter && (e.which === 13 || e.which == 32) && that.$searchInput.val()) {
        that.$selectAll.click()
        that.close()
        that.focus()
        return
      }
      that.filter()
    })

    this.$selectAll.off('click').on('click', function () {
      var checked = $(this).prop('checked'),
        $items = that.$selectItems.filter(':visible')

      if ($items.length === that.$selectItems.length) {
        that[checked ? 'checkAll' : 'uncheckAll']()
      } else { // when the filter option is true
        that.$selectGroups.prop('checked', checked)
        $items.prop('checked', checked)
        that.options[checked ? 'onCheckAll' : 'onUncheckAll']()
        that.update()
      }
    })
    this.$selectGroups.off('click').on('click', function () {
      var group = $(this).parent().attr('data-group'),
        $items = that.$selectItems.filter(':visible'),
        $children = $items.filter(sprintf('[data-group="%s"]', group)),
        checked = $children.length !== $children.filter(':checked').length

      $children.prop('checked', checked)
      that.updateSelectAll()
      that.update()
      that.options.onOptgroupClick({
        label: $(this).parent().text(),
        checked: checked,
        children: $children.get(),
        instance: that
      })
    })
    this.$selectItems.off('click').on('click', function () {
      that.update()
      that.updateOptGroupSelect()
      that.options.onClick({
        label: $(this).parent().text(),
        value: $(this).val(),
        checked: $(this).prop('checked'),
        instance: that
      })

        if (that.options.single && that.options.isOpen && !that.options.keepOpen) {
            that.close()
        }
      if (that.options.single) {
        var clickedVal = $(this).val()
        that.$selectItems.filter(function () {
          return $(this).val() !== clickedVal
        }).each(function () {
          $(this).prop('checked', false)
        })
        that.update()
      }
      that.updateSelectAll()

    })
  },

  open: function () {
    if (this.$choice.hasClass('disabled')) {
      return
    }
    this.options.isOpen = true
    this.$choice.find('>div').addClass('open')
    this.$drop[this.animateMethod('show')]()

    // fix filter bug: no results show
    this.$selectAll.parent().show()
    this.$noResults.hide()

    // Fix #77: 'All selected' when no options
    if (!this.$el.children().length) {
      this.$selectAll.parent().hide()
      this.$noResults.show()
    }

    if (this.options.container) {
      var offset = this.$drop.offset()
      this.$drop.appendTo($(this.options.container))
      this.$drop.offset({
        top: offset.top,
        left: offset.left
      })
    }

    if (this.options.filter) {
      this.$searchInput.val('')
      this.$searchInput.focus()
      this.filter()
    }
    this.options.onOpen()
  },

  close: function () {
    this.options.isOpen = false
    this.$choice.find('>div').removeClass('open')
    this.$drop[this.animateMethod('hide')]()
    if (this.options.container) {
      this.$parent.append(this.$drop)
      this.$drop.css({
        'top': 'auto',
        'left': 'auto'
      })
    }
    this.options.onClose()
  },

  animateMethod: function (method) {
    var methods = {
      show: {
        fade: 'fadeIn',
        slide: 'slideDown'
      },
      hide: {
        fade: 'fadeOut',
        slide: 'slideUp'
      }
    }

    return methods[method][this.options.animate] || method
  },

  update: function (isInit) {
    var selects = this.options.displayValues ? this.getSelects() : this.getSelects('text'),
      $span = this.$choice.find('>span'),
      sl = selects.length

    if (sl === 0) {
      $span.addClass('placeholder').html(this.options.placeholder)
    } else if (this.options.allSelected && sl === this.$selectItems.length + this.$disableItems.length && !this.options.single) {
      $span.removeClass('placeholder').html(this.options.allSelected)
    } else if (this.options.ellipsis && sl > this.options.minimumCountSelected) {
      $span.removeClass('placeholder').text(selects.slice(0, this.options.minimumCountSelected)
        .join(this.options.delimiter) + '...')
    } else if (this.options.countSelected && sl > this.options.minimumCountSelected) {
      $span.removeClass('placeholder').html(this.options.countSelected
        .replace('#', selects.length)
        .replace('%', this.$selectItems.length + this.$disableItems.length))
    } else {
      $span.removeClass('placeholder').text(selects.join(this.options.delimiter))
    }

    if (this.options.addTitle) {
      $span.prop('title', this.getSelects('text'))
    }

    // set selects to select
    this.$el.val(this.getSelects()).trigger('change')

    // add selected class to selected li
    this.$drop.find('li').removeClass('selected')
    this.$drop.find('input:checked').each(function () {
      $(this).parents('li').first().addClass('selected')
    })

    // trigger <select> change event
    if (!isInit) {
      this.$el.trigger('change')
    }
  },

  updateSelectAll: function (isInit) {
    var $items = this.$selectItems

    if (!isInit) {
      $items = $items.filter(':visible')
    }
    this.$selectAll.prop('checked', $items.length &&
      $items.length === $items.filter(':checked').length)
    if (!isInit && this.$selectAll.prop('checked')) {
      this.options.onCheckAll()
    }
  },

  updateOptGroupSelect: function () {
    var $items = this.$selectItems.filter(':visible')
    $.each(this.$selectGroups, function (i, val) {
      var group = $(val).parent().attr('data-group'),
        $children = $items.filter(sprintf('[data-group="%s"]', group))
      $(val).prop('checked', $children.length &&
        $children.length === $children.filter(':checked').length)
    })
  },

  //value or text, default: 'value'
  getSelects: function (type) {
    var that = this,
      texts = [],
      values = [],
      $items = that.$selectItems.filter(':visible')

    if (!$items.length || $items.length === that.$selectItems.length) {
        this.$drop.find(sprintf('input[%s]:checked', this.selectItemName)).each(function () {
            texts.push($(this).parents('li').first().text())
            values.push($(this).val())
        })
    } else {
      $items.each(function () {
          texts.push($(this).parents('li').first().text())
          values.push($(this).val())
      })
    }

    if (type === 'text' && this.$selectGroups.length) {
      texts = []
      this.$selectGroups.each(function () {
        var html = [],
          text = $.trim($(this).parent().text()),
          group = $(this).parent().data('group'),
          $children = that.$drop.find(sprintf('[%s][data-group="%s"]', that.selectItemName, group)),
          $selected = $children.filter(':checked')

        if (!$selected.length) {
          return
        }

        html.push('[')
        html.push(text)
        if ($children.length > $selected.length) {
          var list = []
          $selected.each(function () {
            list.push($(this).parent().text())
          })
          html.push(': ' + list.join(', '))
        }
        html.push(']')
        texts.push(html.join(''))
      })
    }
    return type === 'text' ? texts : values
  },

  setSelects: function (values) {
    var that = this
    if (!this.$selectItems) return
    this.$selectItems.prop('checked', false)
    if (!this.$disableItems) return
    this.$disableItems.prop('checked', false)
    if (that.options.single) {
      window.$$dlut_param[that.$el.data('key')] = values[0]
    } else {
      window.$$dlut_param[that.$el.data('key')] = values
    }
    $.each(values, function (i, value) {
      that.$selectItems.filter(sprintf('[value="%s"]', value)).prop('checked', true)
      that.$disableItems.filter(sprintf('[value="%s"]', value)).prop('checked', true)
    })
    this.$selectAll.prop('checked', this.$selectItems.length ===
      this.$selectItems.filter(':checked').length + this.$disableItems.filter(':checked').length)

    $.each(that.$selectGroups, function (i, val) {
      var group = $(val).parent().attr('data-group'),
        $children = that.$selectItems.filter('[data-group="' + group + '"]')
      $(val).prop('checked', $children.length &&
        $children.length === $children.filter(':checked').length)
    })

    this.update()
  },

  enable: function () {
    this.$choice.removeClass('disabled')
  },

  disable: function () {
    this.$choice.addClass('disabled')
  },

  checkAll: function () {
    this.$selectItems.prop('checked', true)
    this.$selectGroups.prop('checked', true)
    this.$selectAll.prop('checked', true)
    this.update()
    this.options.onCheckAll()
  },

  uncheckAll: function () {
    this.$selectItems.prop('checked', false)
    this.$selectGroups.prop('checked', false)
    this.$selectAll.prop('checked', false)
    this.update()
    this.options.onUncheckAll()
  },

  focus: function () {
    this.$choice.focus()
    this.options.onFocus()
  },

  blur: function () {
    this.$choice.blur()
    this.options.onBlur()
  },

  refresh: function () {
    this.init()
  },

  destroy: function () {
    this.$el.show()
    this.$parent.remove()
    this.$el.data('multipleSelect', null)
  },

  filter: function () {
    var that = this,
      text = $.trim(this.$searchInput.val()).toLowerCase()

    if (text.length === 0) {
      this.$selectAll.parent().show()
      this.$selectItems.parent().parent().show()
      this.$disableItems.parent().show()
      this.$selectGroups.parent().show()
      this.$noResults.hide()
    } else {
      this.$selectItems.each(function () {
        var $parent = $(this).parent().parent()
        $parent[removeDiacritics($parent.text().toLowerCase()).indexOf(removeDiacritics(text)) < 0 ? 'hide' : 'show']()
      })
      this.$disableItems.parent().hide()
      this.$selectGroups.each(function () {
        var $parent = $(this).parent()
        var group = $parent.attr('data-group'),
          $items = that.$selectItems.filter(':visible')
        $parent[$items.filter(sprintf('[data-group="%s"]', group)).length ? 'show' : 'hide']()
      })

      //Check if no matches found
      if (this.$selectItems.parent().filter(':visible').length) {
        this.$selectAll.parent().show()
        this.$noResults.hide()
      } else {
        this.$selectAll.parent().hide()
        this.$noResults.show()
      }
    }
    this.updateOptGroupSelect()
    this.updateSelectAll()
    this.options.onFilter(text)
  }
}

$.fn.multipleSelect = function () {
  var option = arguments[0],
    args = arguments,

    value,
    allowedMethods = [
      'getSelects', 'setSelects',
      'enable', 'disable',
      'open', 'close',
      'checkAll', 'uncheckAll',
      'focus', 'blur',
      'refresh', 'destroy'
    ]

  this.each(function () {
    var $this = $(this),
      data = $this.data('multipleSelect'),
      options = $.extend({}, $.fn.multipleSelect.defaults,
        $this.data(), typeof option === 'object' && option)

    if (!data) {
      data = new MultipleSelect($this, options)
      $this.data('multipleSelect', data)
    }

    if (typeof option === 'string') {
      if ($.inArray(option, allowedMethods) < 0) {
        throw 'Unknown method: ' + option
      }
      value = data[option](args[1])
    } else {
      data.init()
      if (args[1]) {
        value = data[args[1]].apply(data, [].slice.call(args, 2))
      }
    }
  })

  return typeof value !== 'undefined' ? value : this
}

$.fn.multipleSelect.defaults = {
  name: '',
  isOpen: false,
  placeholder: '',
  selectAll: true,
  selectAllDelimiter: ['', ''],
  minimumCountSelected: 3,
  ellipsis: false,
  multiple: false,
  multipleWidth: 80,
  single: false,
  filter: false,
  width: undefined,
  dropWidth: undefined,
  maxHeight: 250,
  container: null,
  position: 'bottom',
  keepOpen: false,
  animate: 'none', // 'none', 'fade', 'slide'
  displayValues: false,
  delimiter: ', ',
  addTitle: false,
  filterAcceptOnEnter: false,
  hideOptgroupCheckboxes: false,

  selectAllText: '全部',
  allSelected: '全部',
  countSelected: '# / % 选中',
  noMatchesFound: '暂无选项',

  styler: function () {
    return false
  },
  textTemplate: function ($elm) {
    return $elm.html()
  },
  labelTemplate: function ($elm) {
    return $elm.attr('label')
  },

  onOpen: function () {
    return false
  },
  onClose: function () {
    return false
  },
  onCheckAll: function () {
    return false
  },
  onUncheckAll: function () {
    return false
  },
  onFocus: function () {
    return false
  },
  onBlur: function () {
    return false
  },
  onOptgroupClick: function () {
    return false
  },
  onClick: function () {
    return false
  },
  onFilter: function () {
    return false
  }
}
