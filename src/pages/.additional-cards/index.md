---
projectType: 'case study'
date: "2021-10"
date2: "Now"
lastUpdated: "2023-02"
title: "Nubank's Additional Cards"
minibio: "Enabling people to extend their purchase power to loved ones."
description: "Designing from end-to-end the first social product of the company's portfolio. The Additional Card is an extra card users may request to extend their purchase power to family and friends, and brings all the complexity of a full Credit Card product and meeting the needs of both the card owner and holder."
metrics: ['Incremental NPS', 'Incremental avg purchase volume']
tags: ['design', 'UX research']
color: '#820ad1'
cover: './cover.png'
liveLink: "https://blog.nubank.com.br/cartao-de-credito-adicional-do-nubank-tudo-o-que-voce-precisa-saber/"
isHidden: true
---

# Context

## The company
[Nubank](https://nubank.com.br/) was born in 2013 with the mission to fight complexity to empower people in their daily lives by reinventing financial services. It's one of the world’s largest digital banking platforms, serving more than 75 million customers across Brazil, Mexico, and Colombia. Nubank is one of the most recognized digital product companies in the country, and is often associated with products and services that are simple, intuitive and transparent.

## What's an Additional Card?

Also known as Authorized User or Additional Cardholder, it's a common product found in most banks' portfolios. It's an extra physical card that you request for someone you have high trust who'll be able to do purchases in your behalf using your credit line and you'll be liable for paying the bill.

```grid|1
![](./uvcards.jpg)
``` 

Although we see many couples using this product as a way to share their finances or optimize credit benefits, it's a product that works very well for parents wishing to initiate their children in the financial world. In general, it's used for extending someone's purchase power to a dependent that might not have access to credit products.


# Problem statement

## Business & user needs 

Since Nubank didn't offer this product, we found out that clients have been finding "hacks" to accomplish these goals, such as sharing a single credit card among people in their households, either via the physical card or sharing the information of their virtual cards. This not only could present risks to their data security, but also offered a bad experience for their shared financial lives.

Our team's objective was to increase our customer's satisfaction, measured by NPS. Through previous interviews with our clients, the Research team identified that financial support has an important role in family relationships and there's a strong emotional bond that makes that support so important, with an opportunity to connect providers and dependents on a platform that enables sharing and controlling family finances.

<!-- Our main mission was to provide a delightful experience for anyone wishing to extend their credit purchase power. Nubank is well known for offering innovative solutions and we didn't want to build something incrementally better, but fundamentally different. -->


## Two sides of the same card

This project aimed at building actually two full user experiences. This is where the complexity of this product starts to show: not only we have to design and implement a full new credit card product, but also consider two sides that have things in common but also important differences. In collaboration with the Product Manager we mapped the needs for these two users:
* **Card Owner**: the person who requests the card and who is actually sharing their credit line. They need to have visibility of spending, specially when paying the credit card bill, and to have control of the card settings, such as defining a spending limit.
* **Card Holder**: the person who effectively uses the card for purchases. By looking at the competitive landscape we noticed the holder needs are often not prioritized, leaving the users with a lack of autonomy and visibility. Our focus them was providing a native-like experience, so this person would feel like the card was their own.

<jumbo caption="The card owner and the card holder share many needs, but others are specific to each of these users.">
    <img src="./userstories.jpg"/>
</jumbo> 


# Prototyping

With the main user needs mapped, the next step of the Discovery phase was to start prototyping the ideas we had in mind so we could put them in user's hands as soon as possible. Nubank has a very mature Design System, which enabled me to make ideas tangible in high-fidelity very quickly, and later it would speed up the development process.

Starting with the request flow, our objective was to make it as simple as possible but without compromising transparency with the customer. With the constraint of only being able to offer Additional Cards to who's already a client, all we needed was the Holder's CPF number (it's like a brazilian social security number).

An additional legal requirement was ask the relationship between them. Although I was not happy with asking such a personal question here, it provided nice data for understanding better our converting users later.

<jumbo caption="The card request flow, designed to be very simple without compromising transparency.">
    <img src="./request.png"/>
</jumbo>

The main challenge of this project was not the onboarding or the request flow, but the actual day-to-day of managing this card and the purchases, and for that I took a step back to understand how Credit Card exists in today's app structure. I noticed we have 3 main areas, and each one had a general theme with specific tasks.

```grid|1
![](./infoarch.png "Mapping the app's information architecture of everything related to Credit Card")
```

Brainstorming with the team about possible ways to solve the problems that were still open, I've prototyped 3 different concepts for the Owner management and 2 for the Holder, exploring in different ways the app architecture.

## User testing the concepts

To better understand our user's mental model, our UX Researcher Ana Urquiza and I interviewed 16 customers split into different groups of card owners and card holders. This was not a regular usability test, so we focused less on tasks and more in talking with the users using the prototypes as conversation-starters.

```grid|1 
![](./prototype.png "The interactive prototype we used to test the main concepts. There were 3 concepts for the card owner, and 2 for the holder.")
``` 

Our main takeaways were:
* User mental models about Credit Card were aligned to how the app was currently structured, so the solutions that maintain the status quo performed better and should be prioritized. 
* Although the Transactions Feed filter solution performed very well with users, we found out most users preferred using another part of the app. Seeing this was a strong trend since the first interviews, we quickly prototyped a solution for that in the middle of the research, and it proved to be the best according to users.
* The relationship-centered architecture vision is very intuitive and perceived as more clear and organized than our current - but the short-term solution works well too.

```grid|1
![](./concepttests.png)
```

# Designing the physical credit card

Since Card Holders might already have another Nubank Credit Card with their name, we wanted to offer a better visual differentiation than just the card number on the back. Understanding these main design constraints since the beginning was crucial when exploring the solution space:
* Design changes could impact the card manufacturing process ranging from weeks to several months.
* Some Additional Card users suffer from social prejudice, e.g. when going to a bar with friends and paying with a card given by your parents, so the design shouldn't call too much attention.
* Competitors use custom printed names and alternative card colors. We couldn't do that, so it was an opportunity to be innovative.

```grid|1 
![](./cardsfamily.png "Nubank's global family of cards, including cards for Brazil, Mexico and Colombia. Any change in the Additional Card plastic design would have to adapt and scale to potentially be combined with any of these.")
```

In tandem with our Marketing and Creative teams we explored many ideas such as new shapes, colors and extra icons on the card design. After many alignments and a Design Review with the VP of Design we moved forward with a solution that is very elegant in its simplicity: an extra label on the back of the card saying "compartilhado por" ("shared by") followed by the card owner's name. Not only this helps differentiate among multiple cards, but users mentioned this design values the emotional bond between the two people.
 
```grid|1
![](./plastic.png "The new design of the Additional Card bring a subtle text on the back, helping the user differentiate between their cards and reinforcing the relationship bond.")
```


# Results

After many months of internal tests and bug fixes, at the moment of writing this article the team is thrilled that we've just released the product publicly! Its launch was covered by most of the big brazilian tech and financial portals, with extensively positive takes.

For the past months I've been helping to monitor data and respond to user feedbacks. Most feature requests were of things that are either in the making or that were already on our roadmap. Some of these you can see on the next section "Next steps".

Although we can already see an increase in customers' purchase volume we still couldn't reach statistical evidence to assess changes in NPS. As soon as we do I'll update here.

<results-banner
    data='{
        "cards requested": "95,000+",
        "increase in purchase volume": "+ 15%",
        "increased customer NPS": "—"
    }'>
</results-banner>


# Next steps

Here are some of the main next improvements we've explored and user-tested and are still being implemented by Engineering.

## Card feed
 
One of the most requested features is having more visibility on purchases made on a particular Additional Card. We're implementing a new screen that shows more clearly how much has been spent on that card, with a dedicated transactions feed.

```grid|1
![](./feed.png "An improved experience for monitoring spendings in the Additional Card, available for both card owner and holders.")
```

## Customer support tooling

To empower our customer support agents to help customers with anything they need related to Additional Cards we designed several improvements to the CX tool.

<jumbo caption="A series of improvements on the customer support tool.">
    <img src="./shufflewidgetfull.png"/>
</jumbo>

## Holder onboarding

We'd like to improve the Card Holder onboarding with a more visual presentation of the main features and where to find them on the app.This might improve customer engagement and reduce churn.

```grid|1
![](./onboarding.png "Design proposal for a more visual user onboarding.")
```

## "What's the card password?"

Many users have been reporting problems understanding what's the card password, which have been impacting our results. We've been trying to add more clarifications in key points of the flow, but it hasn't been working. We're exploring hypothesis of the problem and possible solutions to experiment on.
 
```grid|1
![](./password.png "Mapping of hypothesis, solutions and risks related to the password issue.")
```

# Future

## Cards Platform
The traditional Additional Card is a good solution for frequently sharing with high-trust people from your close social circle, but we see this as just the first step. We wanted to build a platform on top of which we'd build other features, expanding the coverage for more diverse use cases. One example is enabling users to share Temporary Virtual Cards, more suited for people willing to share with someone they don't trust so much, or that are less frequent, such as friends in need.

```grid|1
![](./usecases.png "A visualization that illustrates the space of different user needs and features we could explore.")
```  


## A social vision for the company

In a broader context, this was the first social product being built at Nubank. For that reason, some members of the team, including me, were selected to work on a cross-team, cross-functional taskforce to build a Social Vision for the whole company - but that's an story for other case study. ;)

This helped us understand how a short-term solution could evolve to a long-term vision, from being card-centric with the current App structure, for a more social experience in the future.
 
<jumbo caption="A summary of our short, medium and long-term design vision for the product, moving from a card-centric experience to a more relationship-centred.">
    <img src="./longterm.png"/>
</jumbo>


# Learnings & conclusion

This was the longest and most complex project I've developed at Nubank yet. It was a team effort of dozens of people of almost all specialties, and required alignments with many different teams. Here are a few of my main learnings from this experience:

* The product roadmap was reprioritized many times during the process. This was very important since technical challenges were being uncovered. Although it was a little sad to see soo many good ideas being left for later, it was a great exercise for everyone to focus on what is essential to our users.
* Nobody in the team expected this to be so hard. Although one might think it's a simple project, because "it's just an extra card", but it was actually the work of remaking the whole credit card experience again, and twice. It had many moving parts, and many points of contact with other teams that we needed to align with.
* Card holders have been having a hard time understanding what the card password is. We decided to do it differently than any competitor does, and while we did so thinking it was the best for the user, we failed in acknowledging their mental model.
* One of the biggest challenges was designing the physical card, which seemed like a daunting task at first but, deeply understanding the problem, uncovering all the constraints and collaborating with multiple people, the solution started to emerge.
* We went back-and-forth with the product naming decision many times. We didn't have clarity on who'd was responsible for the final decision, and we had doubts between using a more common name or going for something more innovative. In the end I wrote a document detailing the rationale as a way to gather feedback and spread the word, but I could've done it sooner.

Anyhow, this was an amazing experience being able to design something from the very start to seeing it go to production. The team was amazing too, we collaborated and lot and everyone involved learned something new.


# Links

<links-list
    items='[
        {
            "label": "Public release blog post",
            "url": "https://blog.nubank.com.br/cartao-de-credito-adicional-do-nubank-tudo-o-que-voce-precisa-saber/"
        },
        {
            "label": "Nubank website",
            "url": "https://nubank.com.br/"
        }
    ]'>
</links-list> 
