import express from 'express';
import path from 'path';
import { GoogleGenAI } from '@google/genai';
import { createServer as createViteServer } from 'vite';

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '10mb' }));

// Initialize GoogleGenAI SDK safely
const getGeminiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.warn('GEMINI_API_KEY is missing from environment.');
  }
  return new GoogleGenAI({
    apiKey: apiKey || 'DUMMY_KEY',
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build'
      }
    }
  });
};

// --- AI API ENDPOINTS ---

// AI Resume Builder
app.post('/api/ai/resume-builder', async (req, res) => {
  try {
    const { name, role, education, experience, skills, department } = req.body;
    const ai = getGeminiClient();
    
    const prompt = `You are an expert HR and Executive Resume Writer for the Bangladesh Textile & Apparel / RMG Industry.
Write a structured, highly executive professional resume summary, key achievements, and tailored bullet points for:
Name: ${name}
Target Role/Department: ${role} / ${department}
Education: ${JSON.stringify(education)}
Experience: ${JSON.stringify(experience)}
Skills: ${skills ? skills.join(', ') : 'Textile Engineering, Merchandising, Quality Control'}

Return a clean, professional, nicely formatted markdown resume snippet with:
1. Executive Summary
2. Core Technical Competencies
3. High-Impact Career Achievements in RMG
4. Recommended Certifications for Next Step (e.g., ISO 17025, OEKO-TEX, GOTS, FastReact ERP, LEED).`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: prompt
    });

    res.json({ result: response.text });
  } catch (err: any) {
    console.error('Resume builder error:', err);
    res.status(500).json({ error: err.message || 'Failed to generate resume.' });
  }
});

// AI Caption Generator for Posts
app.post('/api/ai/caption-generator', async (req, res) => {
  try {
    const { topic, factory, department, tone } = req.body;
    const ai = getGeminiClient();

    const prompt = `You are a social media strategist for Textile Connect BD (Bangladesh's premier Textile & RMG professional network).
Write 3 engaging, professional LinkedIn-style post options for a Textile Engineer / RMG Professional based on:
Topic/Achievement: ${topic}
Factory/Company: ${factory || 'Textile Industry'}
Department: ${department || 'Engineering'}
Tone: ${tone || 'Professional & Proud'}

Include relevant industry hashtags like #TextileEngineering #RMG #MadeInBangladesh #FashionTech #TextileConnectBD.
Format options clearly as Option 1, Option 2, and Option 3.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: prompt
    });

    res.json({ result: response.text });
  } catch (err: any) {
    console.error('Caption generator error:', err);
    res.status(500).json({ error: err.message || 'Failed to generate caption.' });
  }
});

// AI Career Pathfinder & Skill Recommendations
app.post('/api/ai/career-pathfinder', async (req, res) => {
  try {
    const { currentDesignation, department, experienceYears } = req.body;
    const ai = getGeminiClient();

    const prompt = `Provide a tailored career progression guide for a professional in the Bangladesh Textile & Apparel Industry:
Current Designation: ${currentDesignation}
Department: ${department}
Years of Experience: ${experienceYears}

Include:
1. Next Logical 2 Promotions in RMG hierarchy (e.g. Executive -> Senior Executive -> Assistant Manager -> DGM -> GM)
2. Crucial Technical Skills & Software to Master (e.g. Lectra, FastReact ERP, Datacolor, AATCC, Lean Six Sigma)
3. Estimated Salary Ranges in Bangladesh Taka (BDT)
4. Key Leadership Advice for Bangladesh RMG sector.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: prompt
    });

    res.json({ result: response.text });
  } catch (err: any) {
    console.error('Career pathfinder error:', err);
    res.status(500).json({ error: err.message || 'Failed to generate career path.' });
  }
});

// AI Profile Completion Suggestions
app.post('/api/ai/profile-suggestions', async (req, res) => {
  try {
    const { profile } = req.body;
    const ai = getGeminiClient();

    const prompt = `Analyze this Textile Connect BD professional profile and give 4 concise, high-impact suggestions to increase profile visibility to RMG recruiters:
Profile Details: ${JSON.stringify(profile)}

Format as a quick bulleted list of 4 actionable tips.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: prompt
    });

    res.json({ result: response.text });
  } catch (err: any) {
    console.error('Profile suggestions error:', err);
    res.status(500).json({ error: err.message || 'Failed to get profile suggestions.' });
  }
});

// Health Check Endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

// Start Express Server with Vite Middleware
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
