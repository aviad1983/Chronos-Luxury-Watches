
import { GoogleGenAI } from "@google/genai";
import { SYSTEM_PROMPT } from "../constants";

// פונקציה ליצירת מופע API בצורה בטוחה
const getAIInstance = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.warn("מפתח API חסר. הצ'אט יעבוד במצב מוגבל.");
    return null;
  }
  return new GoogleGenAI({ apiKey });
};

export async function sendMessageToAI(message: string, history: {role: 'user' | 'model', parts: {text: string}[]}[]) {
  try {
    const ai = getAIInstance();
    if (!ai) return "מערכת הייעוץ בשיפוצים כרגע. אנא נסה שוב בעוד דקה או פנה אלינו באימייל.";

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [
        ...history,
        { role: 'user', parts: [{ text: message }] }
      ],
      config: {
        systemInstruction: SYSTEM_PROMPT,
        temperature: 0.7,
      },
    });

    return response.text || "סליחה, אני חווה קושי טכני. איך אוכל לעזור אחרת?";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "מצטער, חלה שגיאה בחיבור ליועץ הדיגיטלי שלנו. וודא שהגדרת API_KEY בהגדרות האחסון.";
  }
}
