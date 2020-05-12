# Round 42 - Remade

It was 1990 give or take and the first PC made it into my family's home. It came with three games. I remember them to this day:
1. Digger
1. A pinball game
1. Round 42

These were MS-DOS times (MS-DOS 3.21 to be exact) and getting a give to start was, well, a bit more involved then it was these days.

But oh man was I hooked on Round 42 so I sat down and figured out how to get it running so I could play.

It was The game that got me hooked on gaming. It was The game that got me where I am today.

A full-stack developer.

I felt it deserved a remake because it was and still is a good game.

# Round 42 - History & me

Round 42 was released as Shareware in 1986. For those not familiar with the term Shareware, it was a program you could use for free and share and could, optionally, pay for.

A bit like kickstarters these days but no pay up front stuff.

The game is a 'simple' shoot-the-bad-guys type and a lot of people compare it to Space Invaders.

I don't think this is a fair comparison.

Round 42 had 42 levels. Duh. And despite the fact that many levels used the same enemies they did use them differently adding or altering behaviour to make the game more challenging.

Round 42 also gave you a never-miss weapon called the Phasor (Phaser?). This added resource and risk management because if you used all your Phasers you get stuck trying to kill an enemy that's really hard to kill.

Oh, and while Space Invaders acceleration as you killed enemies was a happy accident Round 42 had that hard coded into it.

And to top it all off there are the warp levels where you have to traverse a generated tunnel that gets harder the further to progress.

It took me years to actually finish the game but it felt like an achievement something I'd been building up to for years.

It's safe to say that Round 42 was the spark that lit the fuse and may have played a big part in why I am writing this now and working on a 1 on 1(ish) remake.

# The Remake
I initially wanted to build this game using React. I wrote several games using React as a personal challenge (and to learn more about React) but when I got to the point where I had 20 enemies + a player ship shooting I saw the CPU was at 100% all the time.

Yeah, React is great for UI's but not so much for game development. It was time to use the Canvas.

So, rewrote the entire game to render using the canvas instead of React and, duh, it turned out to be much, much faster.

I decided I was going to do a pixel by pixel render style using the colors the CGA Composite resolution permitted. Plus, it's pretty easy just drawing squares and I had all the resources setup to do just that I just had to use the canvas 2d abilities.

When I finally made the transition the real work began.

I decided I would not render the game to match the 160x120 resolution of the original game. My remake uses as 'game pixel' internally and attempts to render the animations as closely to the original as possible but in this version but there is a limit as far as I'm willing to go.


# Level 01
I'm happy about how the birds look and fly around. I did a frame by frame comparison and I think I got the animation right. I also setup the birds starting position to match the ones from the original game as close as I could.

However, I'm not sure if the birds their movement angles are set at the beginning of the level or not. I initially thought they were random and that's how I implemented them. But when I compared two of my playthroughs I noticed the birds start in exactly the same position every time. This I added but I'm leaving the random directions. It's not a huge impact I think.

# Level 02
Ah, the robot enemies. I like the animation I managed to produce. It looks like the original game moved the robots down a pixel after they finished an animation sequence but I'm not doing that.

My robots move down at a fixed angle and the animation you see is a location deviation from their actual position. As soon as their 'real' position goes below a certain threshhold they go to the top of the screen.

In the original game the robots (and other enemies) would bounce up and down a few times before continuing downwards. I tried to mimic this effect but for these enemies it proved rather problematic because their downward movement is slow and if you're not careful you'll pop up and down all over the place.

# Level 03
Now this level I am happy about. This was the level I reallllllyy got stuck on as a kid. Not surprising as this these enemies (Orbs) shoot to kill. Yes, they aim.

At no point are there more than 5 bullets on screen but the original game picks the 5 most likely orbs to hit you and has them fire a bullet.

Now that was fun to figure out :)

In my version the orbs will shoot to kill. Also, there's a slight change that they will shoot directly at you. This chance goes up as you kill them. I am not sure how the original game handled this but I am happy with the result.

# Level 04 - The first warp level
Wow, now this was cool to code but now that I'm finished I'm litteraly finished with every warp level in the game.

One thing I didn't do (but might) is the random starting point. I didn't see the value of it so warp levels in the remake will have you spawn center screen.

# Level 05 - Spinners
They move from left to right nicely and use the same bullet shooting behaviour of the obs.

# Level 06 - Balloons
These enemies always reminded me of balloons! They jiggle around but you can clearly tell the game runs at a much higher rez then the original.
Still, their shooting behaviour looks good, animation is spot on and.

# Level 07 - First asteroids
Very happy about the result. You'll have 7 ish asteroids to content with. If you damage and enemy it will reappear for you to kill later just like the original game. Though, it might have a new angle and speed. I can live with that. This level takes 20 seconds to complete. Seems about the right time when I look at the original.

# Level 08 - Warp
The nice this about algorithms is that if they work right they do the work for you. Easy level :)

# Level 09 - Pistons
These enemies remind me of a piston. I still need to do their movement right and write some code to make them shoot like the OG. Other than that, looking good.

# Done
1. Adding and removing lives
1. Phaser hits a random target and pauses the game for a second so you can revel in its awsomenes.
1. When the player warps in and there's enemies on screen you can alter your warp in location
1. When the player warps in and there's no enemies on screen you warp in instantly.
1. You can win a level and transition to the next.
1. A phaser is awarded when you complete a level
1. A life and phaser is awarded each 7500 points.
1. Level 01 with birds
1. Level 02 with robots
1. Level 03 with orbs.
1. Level 04, warp and all warps.

# TODO
* Lots more levels
  * This also means a lot of 'bitmaps' but they're pretty simple.
* Game over. Seriously, you can die but you never lose the game.
* Keeping track of bullets shot by the player. Original game did this
* Keeping track of hits.
* Sounds
  * Plan on using original sounds but...
    * I might try my hand at the AudioContext's API for generating beeps and bops.
    * I might record each enemies sound at varies pitches and deploy the game with that.
* General tweaking like starting position, movement speeds of, e.g, enemies, the player, bullets.