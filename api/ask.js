export default async function handler(req, res) {
  try {
    const { message } = req.body;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: "You are Pixodra, a friendly AI assistant that helps students learn and find symposiums in Tamil Nadu."
          },
          {
            role: "user",
            content: message
          }
        ],
        max_tokens: 500
      })
    });

    const data = await response.json();

    res.status(200).json({
      reply: data.choices[0].message.content
    });
  } catch (error) {
    res.status(500).json({
      reply: "Sorry, something went wrong. Please try again."
    });
  }
}
