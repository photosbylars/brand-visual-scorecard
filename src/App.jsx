import { useState, useEffect } from "react";

const BLUE_DARK = "#2E4B66";
const BLUE_LIGHT = "#9DCDFA";
const BLUE_LIGHTEST = "#EBF4FE";
const BLACK = "#1a1a1a";
const WHITE = "#ffffff";

const KIT_FORM_ID = "9227357";
const KIT_API_KEY = "sD_kalaSbNYJQcxxPjt_Yg";
const KIT_TAG_ID = "17696297";

const QUESTIONS = [
  {
    category: "PRODUCT PHOTOGRAPHY",
    q: "If your product appeared next to the category leader on Amazon or a retail shelf, would your hero images hold up?",
    context: "Your hero image is your first impression, and it's competing in a grid, not in isolation.",
    labels: [
      "Our photos don't even come close",
      "There's a noticeable gap between us and them",
      "We're roughly in the same range",
      "We'd hold our own side by side",
      "We'd stand out as the stronger brand",
    ],
  },
  {
    category: "BRAND ELEVATION",
    q: "If a first-time customer landed on your website, would your visuals make you look like an early-stage startup or an established category player?",
    context: "Your photography signals your scale. Buyers, retailers, and partners judge this instantly.",
    labels: [
      "We look like we just launched yesterday",
      "Visuals feel a bit scrappy and unpolished",
      "We look professional but not premium",
      "We look like a well-established brand",
      "Our visuals signal category leadership",
    ],
  },
  {
    category: "E-COMMERCE OPTIMIZATION",
    q: "Does your primary product listing include multiple angles, a scale reference, and at least one infographic or comparison image?",
    context: "Top-converting listings answer every visual question before the customer has to ask.",
    labels: [
      "We only have one or two basic photos",
      "We're missing key angles and details",
      "Decent coverage but with clear gaps",
      "Strong set with only minor gaps",
      "Every angle and detail is covered",
    ],
  },
  {
    category: "BRAND CONSISTENCY",
    q: "If you pulled up your website, Amazon listing, and latest marketing email side by side, would they look like the same brand?",
    context: "Inconsistency erodes trust. Customers notice when your channels feel disconnected.",
    labels: [
      "They look like completely different brands",
      "Recognizable but visually inconsistent",
      "Mostly aligned with some noticeable gaps",
      "Cohesive with only minor differences",
      "Seamless and unmistakably one brand",
    ],
  },
  {
    category: "MOTION CONTENT",
    q: "Are you using stop motion, GIFs, or short-form video on your product pages or in your marketing?",
    context: "Motion content stops the scroll, brands using it see up to 2x higher engagement rates.",
    labels: [
      "We don't use any motion content at all",
      "We've tried it once or twice but nothing consistent",
      "We use it occasionally without a clear system",
      "We produce motion content regularly",
      "Motion is a core part of our content strategy",
    ],
  },
  {
    category: "CONTENT SYSTEM",
    q: "Does your visual content support your price point, would a new customer look at your photos and think 'this is worth what they charge'?",
    context: "If your visuals look budget, your pricing feels unjustified, regardless of product quality.",
    labels: [
      "Our photos actively undercut our pricing",
      "There's a slight disconnect between visuals and price",
      "Neutral, our photos neither help nor hurt",
      "Our visuals reinforce that we're worth it",
      "Our photography elevates the perceived value",
    ],
  },
  {
    category: "PRODUCT PHOTOGRAPHY",
    q: "Do you have lifestyle images that show your product being used in a real context, not just on a white background?",
    context: "Lifestyle imagery drives emotional purchase decisions, especially in DTC.",
    labels: [
      "We only have white background product shots",
      "A few lifestyle images but they're inconsistent",
      "Some lifestyle content but no real system",
      "We have a solid library of lifestyle images",
      "We have a full lifestyle content system",
    ],
  },
  {
    category: "BRAND ELEVATION",
    q: "Could someone who's never heard of your brand tell what makes you different within 3 seconds of landing on your site or product page?",
    context: "Visual differentiation is the fastest way to stand out in a crowded category.",
    labels: [
      "We completely blend in with everyone else",
      "It would take some digging to see the difference",
      "There are hints of differentiation but nothing strong",
      "Our visual identity is noticeably distinct",
      "We're unmistakable, you'd know us anywhere",
    ],
  },
  {
    category: "MOTION CONTENT",
    q: "If a competitor started using motion content on their product pages and ads tomorrow, would you feel behind?",
    context: "Static-only content is becoming the baseline. Motion is quickly becoming the expectation.",
    labels: [
      "We'd be completely outmatched",
      "We'd definitely feel the pressure",
      "We'd be a little concerned but not panicked",
      "We'd be on roughly equal footing",
      "We're already ahead on motion content",
    ],
  },
  {
    category: "E-COMMERCE OPTIMIZATION",
    q: "How often do you refresh your product photography, seasonally, at launch only, or never?",
    context: "Stale imagery signals a stale brand. Category leaders refresh visuals at least quarterly.",
    labels: [
      "We've never updated our original photos",
      "We only shoot new photos at product launch",
      "We update when something starts feeling dated",
      "We refresh annually or with seasonal campaigns",
      "We have a continuous content refresh cycle",
    ],
  },
  {
    category: "BRAND CONSISTENCY",
    q: "When you've had product photos shot at different times or by different people, do the results look like they belong together?",
    context: "Without a consistent visual direction, every new shoot resets to zero.",
    labels: [
      "Every shoot looks completely different",
      "There are noticeable style differences between shoots",
      "Somewhat consistent but you can tell they're different",
      "Mostly cohesive with minor variations",
      "Every image looks like it came from the same system",
    ],
  },
  {
    category: "CONTENT SYSTEM",
    q: "Does your visual content tell a story about your brand, or does it just show the product?",
    context: "Product-only imagery sells features. Brand storytelling sells identity, and commands premium pricing.",
    labels: [
      "It's purely product shots, nothing more",
      "Product photos with basic styling and props",
      "There's some brand personality coming through",
      "We have a clear visual narrative and point of view",
      "Our content builds a full brand world people want to be part of",
    ],
  },
];

const CATEGORY_LIST = [
  "PRODUCT PHOTOGRAPHY", "BRAND CONSISTENCY", "E-COMMERCE OPTIMIZATION",
  "MOTION CONTENT", "CONTENT SYSTEM", "BRAND ELEVATION"
];

const SCORE_TIERS = [
  { min: 0, max: 24, label: "FOUNDATION", color: "#C0392B", desc: "Your visual presence has significant gaps that are actively holding back growth. The good news: the biggest ROI improvements are directly ahead of you." },
  { min: 25, max: 36, label: "DEVELOPING", color: "#E67E22", desc: "You've got pieces in place, but inconsistency and missing content types are limiting your conversion potential and brand perception." },
  { min: 37, max: 48, label: "COMPETITIVE", color: "#1D9E75", desc: "Your visual presence is solid, you're in the game. Now it's about the details that separate 'good enough' from category-leading." },
  { min: 49, max: 60, label: "CATEGORY LEADER", color: BLUE_DARK, desc: "Your visual presence is a genuine competitive advantage. The focus now is maintaining momentum and staying ahead." },
];

const CATEGORY_INSIGHTS = {
  "PRODUCT PHOTOGRAPHY": {
    benchmark: "Top-performing DTC brands in the $1–10M range typically score 8+/10 here, with dedicated hero images per SKU and at least 3 lifestyle angles.",
    quickWin: "Pull up your top 3 product listings and screenshot them next to your top competitor's. Put them side by side in a doc. That 5-minute comparison reveals every gap instantly, and gives you the ammunition to prioritize what to reshoot first.",
  },
  "BRAND CONSISTENCY": {
    benchmark: "Brands scoring 8+/10 on consistency have documented visual guidelines and use the same photographer or creative direction across every shoot.",
    quickWin: "Open your website, your Amazon listing, and your last marketing email in three browser tabs. Flip between them quickly. If the colors, styling, or overall feel shifts noticeably, that inconsistency is costing you trust with every customer who crosses channels.",
  },
  "E-COMMERCE OPTIMIZATION": {
    benchmark: "High-converting product listings typically include 7+ images: hero, back, scale reference, lifestyle, infographic, comparison, and at least one detail/texture shot.",
    quickWin: "Check your top-selling SKU's listing right now. Count the images. If it's under 6, you're leaving conversion rate on the table. Add 'number of product images per SKU' to your next content planning session.",
  },
  "MOTION CONTENT": {
    benchmark: "Brands using stop motion or GIFs on product pages see 40–60% higher time-on-page. Fewer than 15% of DTC brands in your range are doing this consistently.",
    quickWin: "Record a simple 5-second turntable video of your best-selling product on your phone. Post it as a Reel or TikTok. That one piece of motion content will likely outperform your last 5 static posts combined, and it shows you the potential before investing in professional motion.",
  },
  "CONTENT SYSTEM": {
    benchmark: "Brands that treat photography as a system (not one-off projects) typically refresh visuals quarterly and allocate 3–5% of revenue to visual content.",
    quickWin: "Look at your last 10 social or marketing assets. Count how many just show the product versus how many communicate something about your brand's identity, values, or story. If it's 8+ product-only, you're selling features when you could be building a brand.",
  },
  "BRAND ELEVATION": {
    benchmark: "The visual gap between a $3M brand and a $10M brand is usually not product quality. It's photography quality. Premium visuals are the fastest way to signal that you belong at the next level.",
    quickWin: "Find 3 brands in your category that are 2–3x your revenue. Save their homepage hero images and product pages. Now look at yours. The differences you notice are exactly what your customers, retail buyers, and partners notice too.",
  },
};

function analyzeScoreShape(catScores, brandName) {
  const pcts = catScores.map(c => c.pct);
  const avg = pcts.reduce((a, b) => a + b, 0) / pcts.length;
  const min = Math.min(...pcts);
  const max = Math.max(...pcts);
  const spread = max - min;
  const weakCats = catScores.filter(c => c.pct < 40);
  const strongCats = catScores.filter(c => c.pct >= 70);
  const midCats = catScores.filter(c => c.pct >= 40 && c.pct < 70);
  const sorted = [...catScores].sort((a, b) => a.pct - b.pct);
  const weakest = sorted[0];
  const secondWeakest = sorted[1];

  if (weakCats.length === 1 && avg > 50 && (avg - weakest.pct) > 25) {
    return `${brandName}'s visual presence is strong in most areas, but there's a clear gap in ${weakest.name.toLowerCase()}. This is actually good news: you have a single, high-leverage improvement that would bring your entire brand up. For brands at your level, this is typically the fastest-ROI visual investment you can make.`;
  }

  if (strongCats.length >= 2 && weakCats.length >= 2 && spread > 50) {
    return `${brandName}'s visual presence is uneven. ${strongCats.map(c => c.name.toLowerCase()).join(" and ")} are genuinely competitive, but ${weakCats.map(c => c.name.toLowerCase()).join(" and ")} create a disconnect that undermines the overall brand perception. Customers who see your strong side and then encounter your weak side lose trust. Closing the gap between your best and worst categories should be the priority.`;
  }

  if (strongCats.length >= 3 && weakCats.length === 0 && min >= 40) {
    const gaps = midCats.sort((a, b) => a.pct - b.pct).slice(0, 2);
    return `${brandName} is close to category-leading across the board. The difference between where you are and the next level comes down to ${gaps.map(c => c.name.toLowerCase()).join(" and ")}. At this stage, incremental improvements in your weaker categories deliver outsized results because the rest of your visual system is already strong enough to amplify them.`;
  }

  if (weakCats.length >= 4) {
    return `${brandName}'s visual presence needs a foundational upgrade. The gap exists across multiple categories, which means almost any investment in professional visual content will move the needle. The strategic move is to start with product photography and brand consistency first, because those two categories lift every other channel — your e-commerce, your marketing, and your brand perception all improve once the foundation is right.`;
  }

  if (spread < 30 && avg >= 35 && avg <= 65 && strongCats.length <= 1) {
    return `${brandName}'s visual presence is professional but undifferentiated. Nothing is broken, but nothing stands out either. This is one of the trickiest positions to be in because there's no obvious fire to put out. The move here is to pick one category and make it exceptional rather than trying to incrementally improve everything. ${weakest.name.toLowerCase()} and ${secondWeakest.name.toLowerCase()} are your best candidates.`;
  }

  return `${brandName} scored strongest in ${sorted[sorted.length - 1].name.toLowerCase()} and has the most room to grow in ${weakest.name.toLowerCase()} and ${secondWeakest.name.toLowerCase()}. Focusing on these two areas will have the biggest impact on your overall visual presence and brand perception.`;
}

function getTier(score) {
  return SCORE_TIERS.find(t => score >= t.min && score <= t.max) || SCORE_TIERS[0];
}

function getCategoryScores(answers) {
  const scores = {};
  QUESTIONS.forEach((q, i) => {
    if (!scores[q.category]) scores[q.category] = { total: 0, count: 0 };
    scores[q.category].total += (answers[i] || 0);
    scores[q.category].count += 1;
  });
  return CATEGORY_LIST.map(name => {
    const data = scores[name] || { total: 0, count: 2 };
    return { name, score: data.total, max: data.count * 5, pct: Math.round((data.total / (data.count * 5)) * 100) };
  });
}

async function submitToKit({ email, firstName, brandName, score, tier, weakest, scoreShape }) {
  try {
    await fetch(`https://api.convertkit.com/v3/forms/${KIT_FORM_ID}/subscribe`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        api_key: KIT_API_KEY, email, first_name: firstName, tags: [KIT_TAG_ID],
        fields: { brand_name: brandName, scorecard_score: String(score), scorecard_tier: tier, weakest_category: weakest, score_shape: scoreShape },
      }),
    });
    return true;
  } catch (err) { console.error("Kit submission error:", err); return false; }
}

function ScoreBar({ pct, color, delay = 0 }) {
  const [width, setWidth] = useState(0);
  useEffect(() => { const t = setTimeout(() => setWidth(pct), 100 + delay); return () => clearTimeout(t); }, [pct, delay]);
  return (
    <div style={{ height: 6, background: "rgba(128,128,128,0.12)", borderRadius: 3, overflow: "hidden" }}>
      <div style={{ height: "100%", borderRadius: 3, background: color, width: `${width}%`, transition: "width 1s cubic-bezier(0.4,0,0.2,1)" }} />
    </div>
  );
}

export default function BrandVisualScorecard() {
  const [screen, setScreen] = useState("intro");
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState({});
  const [animScore, setAnimScore] = useState(0);
  const [brandName, setBrandName] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const totalScore = Object.values(answers).reduce((a, b) => a + b, 0);
  const tier = getTier(totalScore);
  const catScores = getCategoryScores(answers);
  const weakest = [...catScores].sort((a, b) => a.pct - b.pct).slice(0, 2);

  useEffect(() => {
    if (screen === "results") {
      let frame = 0;
      const target = totalScore;
      const interval = setInterval(() => {
        frame++;
        const progress = Math.min(frame / 40, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setAnimScore(Math.round(eased * target));
        if (progress >= 1) clearInterval(interval);
      }, 25);
      return () => clearInterval(interval);
    }
  }, [screen, totalScore]);

  const handleAnswer = (val) => {
    const newAnswers = { ...answers, [currentQ]: val };
    setAnswers(newAnswers);
    if (currentQ < QUESTIONS.length - 1) {
      setTimeout(() => setCurrentQ(currentQ + 1), 250);
    } else {
      setTimeout(() => setScreen("email_gate"), 400);
    }
  };

  const fontsLink = "https://fonts.googleapis.com/css2?family=Anton&family=Pontano+Sans:wght@300;400;500;600;700&display=swap";
  const baseStyle = { fontFamily: "'Pontano Sans', sans-serif", color: BLACK, maxWidth: 640, margin: "0 auto", padding: "0 20px", minHeight: "100vh", lineHeight: 1.6 };
  const headingStyle = { fontFamily: "'Anton', sans-serif", textTransform: "uppercase", letterSpacing: "0.02em", lineHeight: 1.1 };
  const inputStyle = { width: "100%", padding: "13px 16px", fontSize: 15, fontFamily: "'Pontano Sans', sans-serif", border: "1.5px solid #ddd", borderRadius: 2, outline: "none", transition: "border-color 0.2s", boxSizing: "border-box" };

  if (screen === "intro") {
    return (
      <div style={baseStyle}>
        <link href={fontsLink} rel="stylesheet" />
        <div style={{ paddingTop: 60, paddingBottom: 40 }}>
          <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: BLUE_DARK, marginBottom: 20 }}>PHOTOS BY LARS</div>
          <h1 style={{ ...headingStyle, fontSize: 42, marginBottom: 16 }}>BRAND VISUAL<br />SCORECARD</h1>
          <div style={{ width: 48, height: 3, background: BLUE_DARK, marginBottom: 24 }} />
          <p style={{ fontSize: 17, color: "#444", maxWidth: 480, marginBottom: 12 }}>
            Score your brand's visual presence across 6 critical dimensions. Get a personalized breakdown with benchmarks against top-performing DTC brands, plus 3 actionable next steps sent to your inbox.
          </p>
          <p style={{ fontSize: 15, color: "#888", marginBottom: 40 }}>12 questions · Takes ~6 minutes · Immediate results + email breakdown</p>

          <div style={{ marginBottom: 32 }}>
            <label style={{ display: "block", fontSize: 12, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#888", marginBottom: 6 }}>YOUR BRAND NAME</label>
            <input type="text" value={brandName} onChange={e => setBrandName(e.target.value)} placeholder="Your brand" style={inputStyle}
              onFocus={e => e.target.style.borderColor = BLUE_DARK} onBlur={e => e.target.style.borderColor = "#ddd"} />
          </div>

          <button onClick={() => brandName.trim() && setScreen("questions")} style={{
            ...headingStyle, fontSize: 14, letterSpacing: "0.12em", padding: "16px 40px",
            background: brandName.trim() ? BLUE_DARK : "#ccc", color: WHITE, border: "none",
            cursor: brandName.trim() ? "pointer" : "default", transition: "all 0.25s",
          }}
            onMouseEnter={e => { if (brandName.trim()) e.target.style.background = "#3d5f80" }}
            onMouseLeave={e => { if (brandName.trim()) e.target.style.background = BLUE_DARK }}
          >START SCORECARD →</button>

          <div style={{ marginTop: 60, paddingTop: 20 }}>
            <div style={{ fontSize: 12, color: BLUE_DARK, letterSpacing: "0.08em", fontWeight: 600, marginBottom: 12 }}>YOU'LL BE SCORED ACROSS</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {CATEGORY_LIST.map(c => (
                <span key={c} style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", padding: "8px 14px", background: BLUE_LIGHTEST, color: BLUE_DARK, textTransform: "uppercase", border: `1px solid ${BLUE_LIGHT}` }}>{c}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (screen === "questions") {
    const q = QUESTIONS[currentQ];
    const progress = ((currentQ) / QUESTIONS.length) * 100;
    const canGoForward = answers[currentQ] !== undefined && currentQ < QUESTIONS.length - 1;

    return (
      <div style={baseStyle}>
        <link href={fontsLink} rel="stylesheet" />
        <div style={{ paddingTop: 32 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
            <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: BLUE_DARK }}>{q.category}</span>
            <span style={{ fontSize: 13, color: "#999" }}>{currentQ + 1} / {QUESTIONS.length}</span>
          </div>
          <div style={{ height: 3, background: BLUE_LIGHTEST, marginBottom: 44 }}>
            <div style={{ height: "100%", background: BLUE_DARK, width: `${progress}%`, transition: "width 0.4s ease" }} />
          </div>

          <div key={currentQ} style={{ animation: "fadeIn 0.25s ease" }}>
            <h2 style={{ ...headingStyle, fontSize: 24, marginBottom: 10, maxWidth: 560 }}>{q.q.toUpperCase()}</h2>
            <p style={{ fontSize: 13, color: BLUE_DARK, marginBottom: 32, fontStyle: "italic", opacity: 0.7 }}>{q.context}</p>

            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {q.labels.map((label, i) => {
                const val = i + 1;
                const isSelected = answers[currentQ] === val;
                return (
                  <button key={i} onClick={() => handleAnswer(val)} style={{
                    display: "flex", alignItems: "center", gap: 14, padding: "13px 16px",
                    background: isSelected ? BLUE_DARK : "#fafaf8", color: isSelected ? WHITE : "#333",
                    border: isSelected ? `1.5px solid ${BLUE_DARK}` : "1.5px solid #e8e8e4",
                    borderRadius: 2, cursor: "pointer", fontSize: 15, fontFamily: "'Pontano Sans', sans-serif", textAlign: "left", transition: "all 0.15s ease",
                  }}
                    onMouseEnter={e => { if (!isSelected) { e.target.style.borderColor = BLUE_LIGHT; e.target.style.background = BLUE_LIGHTEST; } }}
                    onMouseLeave={e => { if (!isSelected) { e.target.style.borderColor = "#e8e8e4"; e.target.style.background = "#fafaf8"; } }}
                  >
                    <span style={{
                      width: 28, height: 28, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 12, fontWeight: 700, flexShrink: 0,
                      background: isSelected ? WHITE : "transparent", color: isSelected ? BLUE_DARK : "#bbb",
                      border: isSelected ? "none" : "1.5px solid #ddd",
                    }}>{val}</span>
                    {label}
                  </button>
                );
              })}
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 20 }}>
              {currentQ > 0 ? (
                <button onClick={() => setCurrentQ(currentQ - 1)} style={{ padding: "8px 0", background: "none", border: "none", cursor: "pointer", fontSize: 13, color: "#999", fontFamily: "'Pontano Sans', sans-serif" }}>← Previous</button>
              ) : <span />}
              {canGoForward && (
                <button onClick={() => setCurrentQ(currentQ + 1)} style={{ padding: "8px 0", background: "none", border: "none", cursor: "pointer", fontSize: 13, color: BLUE_DARK, fontFamily: "'Pontano Sans', sans-serif", fontWeight: 600 }}>Next →</button>
              )}
            </div>
          </div>
        </div>
        <style>{`@keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }`}</style>
      </div>
    );
  }

  if (screen === "email_gate") {
    const isValid = email.includes("@") && email.includes(".") && firstName.trim();
    const handleSubmit = async () => {
      if (!isValid) return;
      setSubmitting(true);
      const score = Object.values(answers).reduce((a, b) => a + b, 0);
      const tierLabel = getTier(score).label;
      const weakestCat = [...getCategoryScores(answers)].sort((a, b) => a.pct - b.pct)[0]?.name || "";
      await submitToKit({ email, firstName, brandName, score, tier: tierLabel, weakest: weakestCat, scoreShape: analyzeScoreShape(getCategoryScores(answers), brandName) });
      setSubmitting(false);
      setScreen("results");
    };

    return (
      <div style={baseStyle}>
        <link href={fontsLink} rel="stylesheet" />
        <div style={{ paddingTop: 60, paddingBottom: 40 }}>
          <div style={{ textAlign: "center", marginBottom: 44 }}>
            <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 64, height: 64, borderRadius: "50%", background: BLUE_DARK, marginBottom: 20 }}>
              <span style={{ color: WHITE, fontSize: 26, fontFamily: "'Anton', sans-serif", letterSpacing: "0.02em" }}>{Object.values(answers).reduce((a, b) => a + b, 0)}</span>
            </div>
            <h2 style={{ ...headingStyle, fontSize: 28, marginBottom: 8 }}>YOUR SCORE IS READY</h2>
            <p style={{ fontSize: 15, color: "#666", maxWidth: 420, margin: "0 auto" }}>
              See your results now, plus we'll send your full breakdown with 3 personalized next steps for {brandName} to your inbox.
            </p>
          </div>

          <div style={{ maxWidth: 380, margin: "0 auto" }}>
            <div style={{ marginBottom: 14 }}>
              <label style={{ display: "block", fontSize: 12, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#888", marginBottom: 6 }}>FIRST NAME</label>
              <input type="text" value={firstName} onChange={e => setFirstName(e.target.value)} placeholder="Your first name" style={inputStyle}
                onFocus={e => e.target.style.borderColor = BLUE_DARK} onBlur={e => e.target.style.borderColor = "#ddd"} />
            </div>
            <div style={{ marginBottom: 24 }}>
              <label style={{ display: "block", fontSize: 12, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#888", marginBottom: 6 }}>WORK EMAIL</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@yourbrand.com" style={inputStyle}
                onFocus={e => e.target.style.borderColor = BLUE_DARK} onBlur={e => e.target.style.borderColor = "#ddd"} />
            </div>

            <button onClick={handleSubmit} disabled={!isValid || submitting} style={{
              ...headingStyle, width: "100%", fontSize: 14, letterSpacing: "0.12em", padding: "16px 40px",
              background: isValid && !submitting ? BLUE_DARK : "#ccc", color: WHITE, border: "none",
              cursor: isValid && !submitting ? "pointer" : "default", transition: "all 0.25s",
            }}
              onMouseEnter={e => { if (isValid && !submitting) e.target.style.background = "#3d5f80" }}
              onMouseLeave={e => { if (isValid && !submitting) e.target.style.background = BLUE_DARK }}
            >{submitting ? "UNLOCKING..." : "SEE MY RESULTS →"}</button>

            <p style={{ fontSize: 12, color: "#bbb", textAlign: "center", marginTop: 14, lineHeight: 1.6 }}>
              You'll also receive occasional visual strategy tips for DTC brands. Unsubscribe anytime with one click.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (screen === "results") {
    const shapeInsight = analyzeScoreShape(catScores, brandName);

    return (
      <div style={baseStyle}>
        <link href={fontsLink} rel="stylesheet" />
        <div style={{ paddingTop: 48, paddingBottom: 60 }}>

          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <span style={{ ...headingStyle, fontSize: 16, letterSpacing: "0.12em", color: BLUE_DARK }}>PHOTOS BY LARS</span>
          </div>

          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: "#999", marginBottom: 16 }}>{brandName.toUpperCase()} — VISUAL SCORECARD RESULTS</div>
            <div style={{ ...headingStyle, fontSize: 96, color: tier.color, marginBottom: 4, transition: "color 0.5s" }}>{animScore}</div>
            <div style={{ fontSize: 14, color: "#999", marginBottom: 12 }}>out of 60</div>
            <div style={{ display: "inline-block", ...headingStyle, fontSize: 16, letterSpacing: "0.15em", padding: "8px 24px", background: tier.color, color: WHITE }}>{tier.label}</div>
          </div>

          <div style={{ textAlign: "center", maxWidth: 480, margin: "0 auto 48px", padding: "24px", background: BLUE_LIGHTEST, borderLeft: `3px solid ${tier.color}` }}>
            <p style={{ fontSize: 15, color: "#444", margin: 0 }}>{tier.desc}</p>
          </div>

          <div style={{ marginBottom: 48 }}>
            <h3 style={{ ...headingStyle, fontSize: 18, marginBottom: 12 }}>WHAT YOUR SCORE TELLS US</h3>
            <p style={{ fontSize: 15, color: "#444", lineHeight: 1.7, margin: 0 }}>{shapeInsight}</p>
          </div>

          <div style={{ marginBottom: 48 }}>
            <h3 style={{ ...headingStyle, fontSize: 18, marginBottom: 20 }}>BREAKDOWN BY CATEGORY</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              {catScores.map((cat, i) => (
                <div key={cat.name}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 6 }}>
                    <span style={{ fontSize: 13, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#555" }}>{cat.name}</span>
                    <span style={{ fontSize: 13, color: "#999" }}>{cat.score} / {cat.max}</span>
                  </div>
                  <ScoreBar pct={cat.pct} color={cat.pct >= 70 ? "#1D9E75" : cat.pct >= 40 ? "#E67E22" : "#C0392B"} delay={i * 150} />
                </div>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: 48 }}>
            <h3 style={{ ...headingStyle, fontSize: 18, marginBottom: 6 }}>YOUR BIGGEST GAPS</h3>
            <p style={{ fontSize: 14, color: "#888", marginBottom: 16 }}>These are the areas with the most room for improvement, with one thing you can do today.</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {weakest.map((cat) => {
                const insight = CATEGORY_INSIGHTS[cat.name];
                return (
                  <div key={cat.name} style={{ padding: "20px", background: BLUE_LIGHTEST, borderLeft: `3px solid ${cat.pct < 40 ? "#C0392B" : "#E67E22"}` }}>
                    <div style={{ fontSize: 13, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: cat.pct < 40 ? "#C0392B" : "#E67E22", marginBottom: 4 }}>{cat.name}</div>
                    <div style={{ fontSize: 14, color: "#555", marginBottom: 12 }}>
                      Scored {cat.score} / {cat.max} ({cat.pct}%)
                      {cat.pct < 40 && " — significant opportunity for improvement"}
                      {cat.pct >= 40 && cat.pct < 70 && " — room to strengthen"}
                    </div>
                    {insight && (
                      <div style={{ paddingTop: 12, borderTop: "1px solid rgba(46,75,102,0.1)" }}>
                        <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: BLUE_DARK, marginBottom: 6 }}>QUICK WIN</div>
                        <p style={{ fontSize: 14, color: "#555", margin: 0, lineHeight: 1.6 }}>{insight.quickWin}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div style={{ textAlign: "center", padding: "36px 24px", background: BLACK, color: WHITE }}>
            <div style={{ ...headingStyle, fontSize: 22, marginBottom: 8 }}>WANT TO CLOSE THE GAPS?</div>
            <p style={{ fontSize: 14, color: "#ccc", maxWidth: 400, margin: "0 auto 20px", lineHeight: 1.5 }}>
              Book a free 20-minute call to walk through your results and explore what a visual upgrade looks like for {brandName}.
            </p>
            <a href="https://www.photosbylars.com/book-a-call" target="_blank" rel="noopener noreferrer" style={{
              display: "inline-block", ...headingStyle, fontSize: 13, letterSpacing: "0.12em", padding: "14px 36px",
              background: BLUE_DARK, color: WHITE, textDecoration: "none", transition: "all 0.2s",
            }}
              onMouseEnter={e => e.target.style.background = "#3d5f80"}
              onMouseLeave={e => e.target.style.background = BLUE_DARK}
            >BOOK A DISCOVERY CALL →</a>
            <div style={{ marginTop: 16, fontSize: 12, color: "#777" }}>No commitment · We'll review your scorecard together</div>
            <div style={{ marginTop: 10, fontSize: 12, color: "#666" }}>
              or email <a href="mailto:lars@photosbylars.com" style={{ color: BLUE_LIGHT, textDecoration: "underline" }}>lars@photosbylars.com</a>
            </div>
          </div>

          <div style={{ textAlign: "center", marginTop: 24 }}>
            <button onClick={() => { setAnswers({}); setCurrentQ(0); setScreen("intro"); setBrandName(""); setEmail(""); setFirstName(""); setAnimScore(0); }}
              style={{ background: "none", border: "none", cursor: "pointer", fontSize: 13, color: "#999", fontFamily: "'Pontano Sans', sans-serif", textDecoration: "underline" }}>
              Retake scorecard
            </button>
          </div>

          <div style={{ textAlign: "center", marginTop: 48, paddingTop: 24, borderTop: "1px solid #eee" }}>
            <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: BLUE_DARK }}>PHOTOS BY LARS</div>
            <div style={{ fontSize: 12, color: "#aaa", marginTop: 4 }}>Motion-focused product photography for DTC brands</div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
