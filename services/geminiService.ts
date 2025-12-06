import { GoogleGenAI, Type, Schema } from "@google/genai";
import { UrbanAnalysis } from "../types";

const SYSTEM_INSTRUCTION = `
You are an expert Urban Planner and Architect AI (UrbanFlow AI). 
Your goal is to analyze images of urban environments and user descriptions to identify issues, provide actionable recommendations, and suggest a conceptual improvement proposal.
Focus on sustainability, mobility, green spaces, and community well-being.
Return the response in strict JSON format.
`;

const RESPONSE_SCHEMA: Schema = {
  type: Type.OBJECT,
  properties: {
    problems: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "List of 3-5 specific detected urban problems (e.g., congestion, lack of shade).",
    },
    recommendations: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "List of 3-5 specific actionable urban planning recommendations.",
    },
    proposal: {
      type: Type.STRING,
      description: "A concise paragraph describing a conceptual proposal to transform the area.",
    },
  },
  required: ["problems", "recommendations", "proposal"],
};

export const analyzeUrbanSector = async (
  imageFile: File,
  contextDescription: string
): Promise<UrbanAnalysis> => {
  try {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      throw new Error("API Key is missing. Please check your environment configuration.");
    }

    const ai = new GoogleGenAI({ apiKey });

    // Convert file to base64
    const base64Data = await fileToGenerativePart(imageFile);

    const prompt = `
      Analyze the attached image of an urban sector.
      
      Additional Context provided by user:
      "${contextDescription}"
      
      Based on the visual evidence and the context, generate a professional urban analysis.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: {
        parts: [
          { inlineData: { data: base64Data, mimeType: imageFile.type } },
          { text: prompt },
        ],
      },
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: "application/json",
        responseSchema: RESPONSE_SCHEMA,
      },
    });

    const textResponse = response.text;
    if (!textResponse) {
      throw new Error("No response received from Gemini.");
    }

    return JSON.parse(textResponse) as UrbanAnalysis;
  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    throw error;
  }
};

async function fileToGenerativePart(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      // Remove the data URL prefix (e.g., "data:image/jpeg;base64,")
      const base64Data = base64String.split(",")[1];
      resolve(base64Data);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}