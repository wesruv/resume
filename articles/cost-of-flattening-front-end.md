# The Cost of Flattening the Front-End and AI-First Dev

More and more, I'm seeing a widening of what a front-end role is responsible for. The explosion of JavaScript into a server-side technology broadened expectations significantly; now it seems AI has turned most "front-end" roles into full-stack ones.

AI is helping solve _a lot_ of problems in coding spaces. I can approach a library or technology that I have a halfway decent understanding of and likely make a functioning, nice-looking app. Given a design, plus the ability to test and code-review to catch major issues, development speed can be many times faster than it was 10 years ago.

Widening responsibilities does mean less complexity for hiring, but with it, I'm often seeing mountains of tech debt and bad approaches that directly affect the business.

## AI-First

I had an interview for an "AI-first" job a few months ago at a relatively young company. I knew someone working there and got a scoop: they were starting to land government customers and were excited about the potential. Unfortunately, their accessibility wasn't doing well, and they have to be Section 508 compliant.

I got a look at one of their biggest apps before the interview and saw a lot of places I could help.

It's a large app with complicated forms and workflows — this is my wheelhouse! I have a track record, great recommendations, and could speak confidently about it. Their accessibility problem was the worst I've seen as of writing. Their design was solid, but the UX left a lot of room for improvement.

The interview did not go well.

When they mentioned their 508 compliance problem, I was prepared. Improved awareness, a process shift, and better resources are probably the best solve. This was best treated as a systemic issue, and getting people on board by making their jobs easier is the best approach.

It turned out that wasn't the conversation we were going to have.

I was told "94% of their code was written by AI," followed by how much they're willing to spend on tokens and AI tools.

It wasn't my work or track record that mattered; it was how I worked that was important to them. There was an assumption that AI could fix this problem, just like any other.

What I was seeing in their codebase was direct confirmation that that was unlikely. Their problem wasn't the technology though.

## Tech Problems vs People Problems

Most of the jobs/teams/major projects I've worked on have had dysfunction at some point in how we:

* Work together
* Communicate
* Make decisions
* Understand and approach problems

My shorthand for this is "people problems", as in a "class of problem" where the solution is more likely found by examining those areas.

Tech problems exist, if you want users to be able comment with emoji from a phone's emoji palette; the database has to be able to store multi byte characters.

That solution may be meaningless to your users if it turned out people wanted to add gif/video reactions as comments.

So I'm more often worried about the "people problems" before the technical, and unfortunately working on problems from the above list doesn't prevent these kinds of problems.

## Areas of Expertise in Building a Website or App

In my headcanon, building a web app or site spans a spectrum of expertise that I generally break down into five areas:
* **SysOps:** Linux/server OS expert; can debug server issues via logs; understands low-level networking, containers, server security, etc.
* **Backend Dev:** Deep understanding of database technologies, data structures, queries, server response performance, auth/login/security, etc.
* **Frontend Dev:** Understands HTML and how it affects machine parsing of web functionality and content (SEO/AEO/accessibility); advanced CSS knowledge (particularly layout); adding or manipulating browser behaviors with JavaScript; knows how to fetch and transform data.
* **UX Design:** Understands usability, interactive design concepts, form design, and how to structure navigation and workflows.
* **Graphic Design:** Understanding visual relationships, typography, color, aesthetics, etc.

Web professionals generally have 1 or 1.5; People that are strong in 2 or 3 are often called unicorns.

In my experience, the vast majority of full-stack developers are either:
* Strong SysOps, solid Backend
* Strong Backend, solid Front-End

What _almost always_ falls through the floor are the harder parts of UX design and front-end development:
* SEO/AEO
* UX design skills: advanced workflow and form design, and intuitive navigation
* Accessibility
* Responsive layout

It's possible to ship without these, but at any significant scale, neglecting them directly affects success and revenue in measurable ways: user drop-off, bounces, cart abandonment, and decreased daily active users.


## AI's Blind Spots

AI is only as good as what it's trained on and how much compute goes into that training. In my experience, AI is weak in the same areas full-stack developers tend to be weak in.

Many of these areas are highly contextual and constantly changing:
A number of these areas are highly contextual, and are constantly changing:
* SEO/AEO
  * They're a black box- search and AI providers give us guidelines on what to do, but we aren't allowed to see how they actually work.
  * The rules are always changing due to bad actors figuring out how to manipulate current standards.
  * Both are heavily affected by semantic HTML, which isn't one of AI's strong suits.
* Advanced workflow and form design
  * In my opinion, most forms and workflows on the web are quite bad. It's a particularly hard, highly contextual skill, and from what I've seen, AI is a C+ designer—passable, but quite lacking.
  * AI does not do well on uncommon forms or complex workflows.
* HTML/CSS/Accessibility
  * Each of these is _highly_ contextual, requiring an understanding of the intention of the whole page as well as each individual piece.
  * Internet sources on all three tend to be out of date or outright wrong (no matter when they were written).
  * In my experience, AI's output in these areas ranges between an F and a C-.


## So what?

When I think about why some apps, sites, and software win out over others, UI and UX are powerful differentiators. Decreasing friction for new users and making sure they reach their goals will always factor into success.

"AI-first" means the human is responsible for guiding and managing the AI, providing judgment and expertise.
Are the right problems being solved if there are glaring blind spots on your teams?

I know more talented UX designers and "front-of-the-front-end" folks looking for a job right now than ever in my career.

It feels like we're plowing more fields to sow more cash crops than ever with new tools, but bound for the dust bowl.
