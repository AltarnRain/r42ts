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


# TODO
* Sounds
  * Plan on using original sounds but...
    * I might try my hand at the AudioContext's API for generating beeps and bops.
    * I might record each enemies sound at varies pitches and deploy the game with that.
* General tweaking like starting position, movement speeds of, e.g, enemies, the player, bullets.