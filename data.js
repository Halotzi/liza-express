/*
 * כאן עורכים חנויות, מנות, אפשרויות ומספרי WhatsApp.
 * מספרי טלפון נשמרים בפורמט בינלאומי — ספרות בלבד, בלי +, רווחים או מקפים.
 */
window.LIZA_DATA = {
  brand: "ליזה אקספרס",
  stores: [
    {
      id: "love-madness", name: "שיגעון של אהבה", emoji: "💘", categories: ["love", "experiences"], image: "breakfast", cover: "assets/generated/love-madness-cover.png",
      tagline: "אהבה, הרפתקאות וקצת סבל — הכול באחריות ליעד",
      recipient: { name: "ליעד", greeting: "היי ליעד!", phone: "972502887680" },
      eta: "מתי שתרצי", accent: "#009de0",
      items: [
        { id: "blackheads", name: "הסבל שלא ברא השטן", description: "הוצאת שחורים בכל הגוף. אסור לך לבכות או להתבכיין, אתה כבר לא ילד קטן.", image: "secret", photo: "assets/generated/blackheads.png", emoji: "😈" },
        { id: "lets-go", name: "הכול מוכן, בואי נצא לדרך", description: "לא משנה לאיפה הולכים, בטוח שיהיה לנו כיף ושמח.", image: "breakfast", photo: "assets/generated/lets-go.png", emoji: "🚗",
          choice: { label: "לאן יוצאים?", required: true, values: ["בארץ", "בחו״ל"] },
          extras: { label: "מה בא לך להוסיף?", required: false, values: ["מוזיקה בפול ווליום", "פיקניק", "אוכל בחוץ", "שופינג"] } },
        { id: "cat-prank", name: "חתול תעלול", description: "געגוע לסימבה? אין בעיה, אדאג שתקבלי את מנת האהבה שלך.", image: "syrniki", photo: "assets/generated/cat-prank.png", emoji: "🐈",
          extras: { label: "איך לקבל את מנת סימבה?", required: true, values: ["סרטון", "דיבוב שלו", "שיחת וידאו", "תמונה", "לשחק איתו", "להאכיל אותו", "לבקר אותו"] } },
        { id: "geek-wiki", name: "ויקי־חנון", description: "כל דבר גיקי אענה לך עליו בשמחה, תוך פירוט מוגזם שיגרום לך לכאב ראש.", image: "movie", photo: "assets/generated/geek-wiki.png", emoji: "🤓",
          extras: { label: "על מה חופרים?", required: true, values: ["מארוול", "לגו", "משחקי וידאו", "צ׳לסי", "איפה סבא, סבתא ובר גרים"] } },
        { id: "come-in-peace", name: "בואי בשלום", description: "כל דבר שנעשה יהיה מבורך, אז בואי נעשה משהו.", image: "pie", photo: "assets/generated/come-in-peace.png", emoji: "🕊️",
          extras: { label: "מה עושים?", required: true, values: ["סרט", "הופעה", "מסעדה", "אימון", "טיילת", "החלקה על הקרח", "ים", "פיקניק", "אחר"] } },
        { id: "cheeky", name: "אפשר להיות קצת חוצפנית?", description: "עזרה בכל אשר תבחרי, בכל מקום ובכל שעה אני אהיה כאן בשבילך.", image: "blini", photo: "assets/generated/cheeky.png", emoji: "🙋‍♀️",
          extras: { label: "רמז קטן לליעד", required: false, values: ["תבוא לקחת אותי", "אני באה אליך", "אני ממש רוצה לקנות משהו"] } }
      ]
    },
    {
      id: "big-sister", name: "אחות גדולה עם לב גדול", emoji: "💗", categories: ["love", "food"], image: "coffee", cover: "assets/generated/big-sister-cover.png",
      tagline: "אחות, שף, קוסמטיקאית ומוקד תמיכה — הכול במקום אחד",
      recipient: { name: "בת חן", greeting: "היי בת חן!", phone: "972505751863" },
      eta: "עם הרבה לב", accent: "#e85d9e",
      items: [
        { id: "nails", name: "תור למילוי", description: "ציפורניים זה דבר חשוב, אבל הכי חשוב לעשות אצל אחותי המוכשרת!", image: "syrniki", photo: "assets/generated/big-sister-nails.png", emoji: "💅" },
        { id: "moroccan-fish", name: "דג מרוקאי חריף אש!!", description: "בהצלחה בנודים אחרי הביס הראשון.", image: "borscht", photo: "assets/generated/big-sister-fish.png", emoji: "🐟" },
        { id: "pep-talk", name: "שיחת עידוד", description: "בת חן מבטיחה להקשיב ולא לשפוט, אצלה הכול באהבת חינם.", image: "coffee", photo: "assets/generated/big-sister-pep-talk.png", emoji: "🫶" },
        { id: "avi-special", name: "הספיישל של אבי", description: "מנות אתיופיות אסליות טעימות מבית אמא.", image: "pelmeni", photo: "assets/generated/big-sister-avi-special.png", emoji: "🍲" }
      ]
    },
    {
      id: "not-just-blonde", name: "לא רק בלונדינית", emoji: "👱‍♀️", categories: ["love", "experiences"], image: "pie", cover: "assets/generated/esther-cover.png",
      tagline: "אופנה, נוסטלגיה וברכות עם לב ענק",
      recipient: { name: "אסתר", greeting: "היי אסתר!", phone: "972547243541" },
      eta: "בסטייל", accent: "#f0b429",
      items: [
        { id: "clothes", name: "שאריות של בגדים", description: "כל מה שאת לא רוצה תביאי לי, בטח שעכשיו אני מתקרבת למידה שלך.", image: "breakfast", photo: "assets/generated/esther-clothes.png", emoji: "👗" },
        { id: "karaoke", name: "קריוקי כמעט מלאכים", description: "חוסטינה, מר, טיאגו, חסמין, רמה, ט׳צו... אף אחד לא ישיר יותר טוב מאיתנו.", image: "movie", photo: "assets/generated/esther-karaoke.png", emoji: "🎤" },
        { id: "kotel", name: "ברכה בכותל", description: "לכתוב את הבקשה על פתק ולשים במקום שמרגיש הכי נכון בין כל האבנים.", image: "secret", photo: "assets/generated/esther-wall.png", emoji: "📝" }
      ]
    },
    {
      id: "bff", name: "BFF", emoji: "👯‍♀️", categories: ["love", "experiences"], image: "movie", cover: "assets/generated/bff-cover-v2.png",
      tagline: "חברות, תחרות, ים וקצת רעש — כמו שצריך",
      recipient: { name: "נעורי", greeting: "היי נעורי!", phone: "972502906908" },
      eta: "תמיד זמינה", accent: "#8b5cf6",
      items: [
        { id: "board-games", name: "משחקי קופסה — תתכונני להשמדה", description: "אל תדאגי, אני אביא בשבילך טישו.", image: "movie", photo: "assets/generated/bff-board-games.png", emoji: "🎲",
          extras: { label: "במה מפסידים?", required: true, values: ["אליאס", "טאקי", "ג׳ונגל ספיד", "היטסטר", "שש־בש", "קלפים רגילים"] } },
        { id: "crow-spikes", name: "דוקרנים נגד עורבים", description: "זה אחלה שאת נהנית והכול, אבל תורידי את הווליום...", image: "secret", photo: "assets/generated/bff-crow-spikes.png", emoji: "🐦‍⬛" },
        { id: "tan", name: "שיזוף בגד ים", description: "יאללה להזיז ת׳תחת ותביאי בגד ים.", image: "breakfast", photo: "assets/generated/bff-tan.png", emoji: "🏖️",
          extras: { label: "מה מביאים?", required: true, values: ["אלכוהול", "קרם הגנה", "קרם התקפה", "כדור", "מטקות", "מחצלת", "כובע", "תרסיס נגד ערסים", "פירות"] } },
        { id: "clean-house", name: "שיגעון על הבית", description: "הגיע הזמן לנקות את הבית. אי אפשר שהוא יישאר ככה.", image: "blini", photo: "assets/generated/bff-clean-house.png", emoji: "🧹" },
        { id: "dance", name: "כולם להזיז ת׳טוסיק", description: "נכנסה משכורת, הגיע הזמן לצאת ולרקוד.", image: "coffee", photo: "assets/generated/bff-dance.png", emoji: "💃" }
      ]
    },
    {
      id: "one-two-shot", name: "אחת שתיים שוט!", emoji: "🥃", categories: ["food", "experiences"], image: "pelmeni", cover: "assets/generated/binyamin-cover.png",
      tagline: "אח, אוכל ושיחות קצרות או ארוכות — לבחירתך",
      recipient: { name: "בנימין", greeting: "היי בנימין!", phone: "972543025631" },
      eta: "אחרי האפטר", accent: "#ef7f1a",
      items: [
        { id: "brother-talk", name: "שיחה עם אח שלך", description: "הייתי אומר שכל מילה תהיה בתוספת תשלום, אבל הכול פה בחינם...", image: "coffee", photo: "assets/generated/binyamin-talk.png", emoji: "📞",
          textChoice: { label: "כמה משפטים בשיחה?", required: true, placeholder: "למשל: 20 משפטים" } },
        { id: "schnitzel", name: "שניצל בחלה", description: "לא משנה אם זה אפטר מהצבא, נסיעה מאילת או סתם רעב שמגיע — שניצל בחלה תמיד טוב.", image: "blini", photo: "assets/generated/binyamin-schnitzel.png", emoji: "🥙",
          choice: { label: "איך להגיש?", required: true, values: ["בבגט", "בפיתה", "בחלה"] },
          extras: { label: "תוספות", required: false, values: ["מטבוחה", "חצילים", "חריף", "חומוס", "כרוב סגול", "כרוב לבן", "תוספת שניצל", "רוטב שום", "רוטב שזיפים"] } }
      ]
    },
    {
      id: "good-guys", name: "בחורים טובים", emoji: "🍻", categories: ["food", "experiences"], image: "coffee", cover: "assets/generated/ido-cover.png",
      tagline: "שומרים על כושר שתייה ועל הכפכפים",
      recipient: { name: "עידו", greeting: "היי עידו!", phone: "972525663118" },
      eta: "בלי הפסקה", accent: "#2f855a",
      items: [
        { id: "alcohol", name: "אלכוהול בלי הפסקה", description: "חשוב מאוד לשמור על כושר שתייה.", image: "coffee", photo: "assets/generated/ido-alcohol.png", emoji: "🍸",
          extras: { label: "מה שותים?", required: true, values: ["בירה", "יין", "וודקה", "וויסקי", "טקילה", "ערק", "ג׳ין", "רום", "קוקטיילים", "צ׳ייסרים"] } },
        { id: "flip-flops", name: "כפכפים", description: "גם ככה גונבים פה אותם על ימין ועל שמאל, אז לפחות הפעם מבקשים.", image: "pie", photo: "assets/generated/ido-flip-flops.png", emoji: "🩴" }
      ]
    },
    {
      id: "mama-strong", name: "אמא הו אמא חבניקי חזק", emoji: "🥣", categories: ["love", "food"], image: "borscht", cover: "assets/generated/mama-cover.png",
      tagline: "אהבה של אמא, גם במשלוח מיוחד מחו״ל",
      recipient: { name: "אמא", greeting: "היי אמא!", phone: "380680229495" },
      eta: "עד הבית", accent: "#d64545",
      items: [
        { id: "mama-hug", name: "חיבוק של אמא", description: "מגיע גם במשלוח מיוחד כל הדרך מחו״ל במידה וצריך.", image: "breakfast", photo: "assets/generated/mama-hug.png", emoji: "🤗" },
        { id: "hot-borscht", name: "בורשט חם ומשביע", description: "מנה שאף פעם לא נמאס לליזה ממנה.", image: "borscht", photo: "assets/generated/mama-borscht.png", emoji: "🥣" },
        { id: "cooking-course", name: "קורס בישול", description: "מה שתגידי אני אסביר בדיוק איך אני עושה.", image: "pelmeni", photo: "assets/generated/mama-cooking-course.png", emoji: "👩‍🍳" }
      ]
    },
    {
      id: "abroad-vibes", name: "אווירה של חו״ל", emoji: "✈️", categories: ["love", "experiences"], image: "breakfast", cover: "assets/generated/roman-cover.png",
      tagline: "אחיינים, דרכונים ורומן אחד שמסדר הכול",
      recipient: { name: "רומן", greeting: "היי רומן!", phone: "" },
      eta: "מעבר לים", accent: "#2563eb",
      items: [
        { id: "nieces-video", name: "סרטון מהאחיינים המוצלחים והנהדרים", description: "דה דה, אחיינים חמודים: ילד אוהב מסי, ילדה צומי.", image: "movie", photo: "assets/generated/roman-nephews-video.png", emoji: "🎥" },
        { id: "passport", name: "להחתים דרכון", description: "טאק, אני רומן מסדר לך טיסה — את, ליזה, באה וחותמת דרכון.", image: "secret", photo: "assets/generated/roman-passport.png", emoji: "🛂" }
      ]
    }
  ]
};
