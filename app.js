const projects = [
  {
    id: "berkeley-humanoid-lite",
    name: "Berkeley Humanoid Lite",
    kind: "project",
    lane: "Humanoids",
    maintainer: "Hybrid Robotics / UC Berkeley",
    maturity: "Buildable prototype",
    status: "High priority",
    cost: "Source claim: sub-$5,000",
    url: "https://github.com/hybridrobotics/berkeley-humanoid-lite",
    image: "https://opengraph.githubassets.com/open-robotics-nexus-20260629/hybridrobotics/berkeley-humanoid-lite",
    summary:
      "Open-source humanoid platform centered on accessible components, 3D-printed gearboxes, docs, and active release notes.",
    tags: ["humanoid", "3d-printing", "home-fit", "benchmark"],
    artifacts: { code: true, cad: true, bom: true, docs: true, firmware: true, sim: true, license: true },
    signals: { readiness: 92, velocity: 88, homeFit: 96 },
    evidence: [
      ["GitHub repo", "https://github.com/hybridrobotics/berkeley-humanoid-lite"],
      ["Documentation releases", "https://berkeley-humanoid-lite.gitbook.io/docs/releases"],
      ["arXiv demo paper", "https://arxiv.org/html/2504.17249v1"]
    ],
    notes: "Anchor candidate for the sub-$5k open humanoid benchmark lane."
  },
  {
    id: "xlerobot",
    name: "XLeRobot",
    kind: "project",
    lane: "Mobile Manipulators",
    maintainer: "Vector-Wangel / RobotPi Lab",
    maturity: "Candidate",
    status: "Needs review",
    cost: "Source claim: $660",
    url: "https://github.com/Vector-Wangel/XLeRobot",
    image: "https://opengraph.githubassets.com/open-robotics-nexus-20260629/Vector-Wangel/XLeRobot",
    summary:
      "Dual-arm mobile home robot candidate aimed at practical household manipulation at an unusually low claimed cost.",
    tags: ["mobile-manipulator", "dual-arm", "home-robot", "low-cost"],
    artifacts: { code: true, cad: true, bom: true, docs: true, firmware: false, sim: false, license: true },
    signals: { readiness: 76, velocity: 82, homeFit: 94 },
    evidence: [["GitHub repo", "https://github.com/Vector-Wangel/XLeRobot"]],
    notes: "Strong fit for the hub thesis; needs manual artifact and reproducibility review."
  },
  {
    id: "alohamini",
    name: "AlohaMini",
    kind: "project",
    lane: "Mobile Manipulators",
    maintainer: "Yiteng Li",
    maturity: "Buildable prototype",
    status: "High priority",
    cost: "BOM present",
    url: "https://github.com/liyiteng/alohamini",
    image: "https://opengraph.githubassets.com/open-robotics-nexus-20260629/liyiteng/alohamini",
    summary:
      "Open-source dual-arm mobile robot with CAD, URDF, software, LeRobot alignment, and published performance notes.",
    tags: ["mobile-manipulator", "dual-arm", "lerobot", "bom"],
    artifacts: { code: true, cad: true, bom: true, docs: true, firmware: false, sim: true, license: true },
    signals: { readiness: 86, velocity: 82, homeFit: 90 },
    evidence: [["GitHub repo", "https://github.com/liyiteng/alohamini"]],
    notes: "Useful comparison point for low-cost mobile manipulation and teleoperation workflows."
  },
  {
    id: "lekiwi",
    name: "LeKiwi",
    kind: "project",
    lane: "Mobile Manipulators",
    maintainer: "SIGRobotics UIUC",
    maturity: "Candidate",
    status: "Watch",
    cost: "Uses SO-ARM101",
    url: "https://github.com/SIGRobotics-UIUC/LeKiwi",
    image: "https://opengraph.githubassets.com/open-robotics-nexus-20260629/SIGRobotics-UIUC/LeKiwi",
    summary:
      "Low-cost mobile manipulator combining a mobile base, SO-ARM101, teleoperation, data collection, camera streaming, CAD, and URDF.",
    tags: ["mobile-manipulator", "teleoperation", "data", "cad"],
    artifacts: { code: true, cad: true, bom: false, docs: true, firmware: false, sim: true, license: true },
    signals: { readiness: 78, velocity: 78, homeFit: 84 },
    evidence: [["GitHub repo", "https://github.com/SIGRobotics-UIUC/LeKiwi"]],
    notes: "Good example of composable open subsystems turning into a useful platform."
  },
  {
    id: "low-cost-robot",
    name: "Low Cost Robot Arm",
    kind: "project",
    lane: "Arms",
    maintainer: "Alexander Koch-Koch",
    maturity: "Buildable",
    status: "High priority",
    cost: "Source claim: $250 follower / $430 pair",
    url: "https://github.com/AlexanderKoch-Koch/low_cost_robot",
    image: "https://opengraph.githubassets.com/open-robotics-nexus-20260629/AlexanderKoch-Koch/low_cost_robot",
    summary:
      "Low-cost follower and leader arm design for robot learning, teleoperation, and accessible manipulation experiments.",
    tags: ["arm", "teleoperation", "robot-learning", "low-cost"],
    artifacts: { code: true, cad: true, bom: true, docs: true, firmware: true, sim: false, license: true },
    signals: { readiness: 84, velocity: 78, homeFit: 82 },
    evidence: [["GitHub repo", "https://github.com/AlexanderKoch-Koch/low_cost_robot"]],
    notes: "Strong starter project for newcomers who want tangible manipulation without humanoid complexity."
  },
  {
    id: "so-arm100",
    name: "SO-ARM100 / SO-101",
    kind: "project",
    lane: "Arms",
    maintainer: "TheRobotStudio",
    maturity: "Buildable",
    status: "High priority",
    cost: "Kit ecosystem",
    url: "https://github.com/TheRobotStudio/SO-ARM100",
    image: "https://opengraph.githubassets.com/open-robotics-nexus-20260629/TheRobotStudio/SO-ARM100",
    summary:
      "Standard Open Arm family used heavily in the LeRobot ecosystem, with printable files and practical assembly guidance.",
    tags: ["arm", "lerobot", "education", "data"],
    artifacts: { code: true, cad: true, bom: true, docs: true, firmware: true, sim: false, license: true },
    signals: { readiness: 88, velocity: 85, homeFit: 80 },
    evidence: [
      ["GitHub repo", "https://github.com/TheRobotStudio/SO-ARM100"],
      ["Seeed build guide", "https://wiki.seeedstudio.com/lerobot_so100m/"]
    ],
    notes: "Important hub connector because multiple newer projects build around SO-ARM variants."
  },
  {
    id: "am-arm",
    name: "AM-ARM200",
    kind: "project",
    lane: "Arms",
    maintainer: "Yiteng Li",
    maturity: "Candidate",
    status: "Watch",
    cost: "Source claim: ~$380 teleop kit",
    url: "https://github.com/liyiteng/AM-ARM",
    image: "https://opengraph.githubassets.com/open-robotics-nexus-20260629/liyiteng/AM-ARM",
    summary:
      "Open-source 6+1 DoF robotic arm candidate with claimed 1 kg payload and embodied AI research orientation.",
    tags: ["arm", "payload", "3d-printing", "teleoperation"],
    artifacts: { code: true, cad: true, bom: true, docs: true, firmware: false, sim: false, license: true },
    signals: { readiness: 78, velocity: 84, homeFit: 78 },
    evidence: [["GitHub repo", "https://github.com/liyiteng/AM-ARM"]],
    notes: "Needs side-by-side comparison with SO-ARM, low_cost_robot, and OpenArm."
  },
  {
    id: "openarm",
    name: "OpenArm",
    kind: "project",
    lane: "Arms",
    maintainer: "Enactic",
    maturity: "Buildable prototype",
    status: "High priority",
    cost: "BOM/docs present",
    url: "https://github.com/enactic/openarm",
    image: "https://opengraph.githubassets.com/open-robotics-nexus-20260629/enactic/openarm",
    summary:
      "Open-source 7DOF humanoid arm for physical AI research, contact-rich interaction, compliance, and simulation-first work.",
    tags: ["humanoid-arm", "7dof", "compliance", "simulation"],
    artifacts: { code: true, cad: true, bom: true, docs: true, firmware: true, sim: true, license: true },
    signals: { readiness: 90, velocity: 86, homeFit: 82 },
    evidence: [
      ["GitHub repo", "https://github.com/enactic/openarm"],
      ["Hardware repo", "https://github.com/enactic/openarm_hardware"],
      ["Hardware docs", "https://www.roboticscenter.ai/wiki/openarm/hardware"]
    ],
    notes: "Strategically useful as a higher-capability humanoid arm reference."
  },
  {
    id: "bcn3d-moveo",
    name: "BCN3D Moveo",
    kind: "project",
    lane: "Arms",
    maintainer: "BCN3D",
    maturity: "Buildable",
    status: "Reference",
    cost: "BOM present",
    url: "https://github.com/BCN3D/BCN3D-Moveo",
    image: "https://opengraph.githubassets.com/open-robotics-nexus-20260629/BCN3D/BCN3D-Moveo",
    summary:
      "Established open-source 3D printed robotic arm with CAD, STL, user manual, assembly manual, firmware, and BOM.",
    tags: ["arm", "education", "3d-printing", "bom"],
    artifacts: { code: true, cad: true, bom: true, docs: true, firmware: true, sim: false, license: true },
    signals: { readiness: 86, velocity: 45, homeFit: 58 },
    evidence: [["GitHub repo", "https://github.com/BCN3D/BCN3D-Moveo"]],
    notes: "Good reference for documentation completeness even if not the freshest home robotics wedge."
  },
  {
    id: "amazing-hand",
    name: "Amazing Hand",
    kind: "project",
    lane: "Hands",
    maintainer: "Pollen Robotics",
    maturity: "Buildable prototype",
    status: "High priority",
    cost: "Source claim: < EUR 200",
    url: "https://github.com/pollen-robotics/AmazingHand",
    image: "https://opengraph.githubassets.com/open-robotics-nexus-20260629/pollen-robotics/AmazingHand",
    summary:
      "3D-printable humanoid hand with eight degrees of freedom, compact actuation, model files, and moderate-cost components.",
    tags: ["hand", "dexterity", "3d-printing", "reachy"],
    artifacts: { code: true, cad: true, bom: true, docs: true, firmware: false, sim: false, license: true },
    signals: { readiness: 82, velocity: 76, homeFit: 84 },
    evidence: [
      ["GitHub repo", "https://github.com/pollen-robotics/AmazingHand"],
      ["Hugging Face article", "https://huggingface.co/blog/pollen-robotics/amazing-hand"],
      ["Seeed wiki", "https://wiki.seeedstudio.com/hand_amazinghand/"]
    ],
    notes: "Excellent subsystem candidate for low-cost manipulation and humanoid hands."
  },
  {
    id: "linorobot2",
    name: "Linorobot2",
    kind: "project",
    lane: "Mobile Bases",
    maintainer: "Linorobot",
    maturity: "Buildable",
    status: "Reference",
    cost: "Accessible parts",
    url: "https://github.com/linorobot/linorobot2",
    image: "https://opengraph.githubassets.com/open-robotics-nexus-20260629/linorobot/linorobot2",
    summary:
      "ROS 2 foundation for autonomous 2WD, 4WD, and Mecanum mobile robots with Nav2, SLAM Toolbox, and localization.",
    tags: ["mobile-base", "ros2", "nav2", "slam"],
    artifacts: { code: true, cad: false, bom: false, docs: true, firmware: true, sim: true, license: true },
    signals: { readiness: 72, velocity: 74, homeFit: 76 },
    evidence: [
      ["GitHub repo", "https://github.com/linorobot/linorobot2"],
      ["Linorobot site", "https://linorobot.org/"],
      ["Hardware repo", "https://github.com/linorobot/linorobot2_hardware"]
    ],
    notes: "A practical base/control stack to pair with arms or home robot experiments."
  },
  {
    id: "open-duck-mini",
    name: "Open Duck Mini",
    kind: "project",
    lane: "Legged Robots",
    maintainer: "Antoine Pirrone / community",
    maturity: "Working repo",
    status: "Watch",
    cost: "Source claim: under $400",
    url: "https://github.com/apirrone/Open_Duck_Mini",
    image: "https://opengraph.githubassets.com/open-robotics-nexus-20260629/apirrone/Open_Duck_Mini",
    summary:
      "Miniature open biped robot hub with hardware/software resources and sim-to-real walking experimentation.",
    tags: ["biped", "rl", "low-cost", "learning"],
    artifacts: { code: true, cad: true, bom: true, docs: true, firmware: true, sim: true, license: true },
    signals: { readiness: 80, velocity: 82, homeFit: 62 },
    evidence: [
      ["GitHub repo", "https://github.com/apirrone/Open_Duck_Mini"],
      ["Runtime repo", "https://github.com/apirrone/Open_Duck_Mini_Runtime"],
      ["Growbotics page", "https://robotics.growbotics.ai/projects/hardware/open-duck-mini-v2/assembly"]
    ],
    notes: "Great newcomer-friendly legged robotics and reinforcement learning project."
  },
  {
    id: "mini-pupper",
    name: "Mini Pupper",
    kind: "project",
    lane: "Legged Robots",
    maintainer: "MangDang Robotics Club",
    maturity: "Kit / buildable",
    status: "Reference",
    cost: "Source claim: under $500",
    url: "https://github.com/mangdangroboticsclub/QuadrupedRobot",
    image: "https://opengraph.githubassets.com/open-robotics-nexus-20260629/mangdangroboticsclub/QuadrupedRobot",
    summary:
      "Open-source ROS robot dog platform for SLAM, navigation, OpenCV AI, and compact legged robotics education.",
    tags: ["quadruped", "ros", "education", "kit"],
    artifacts: { code: true, cad: true, bom: true, docs: true, firmware: true, sim: true, license: true },
    signals: { readiness: 84, velocity: 70, homeFit: 58 },
    evidence: [["GitHub repo", "https://github.com/mangdangroboticsclub/QuadrupedRobot"]],
    notes: "Useful for legged entry paths, less directly tied to useful home manipulation."
  },
  {
    id: "stair-traversal-tutorial",
    name: "Autonomous Stair Traversal Tutorial",
    kind: "project",
    lane: "Stair Mobility",
    maintainer: "TU Darmstadt ROS package",
    maturity: "Simulation tutorial",
    status: "Gap signal",
    cost: "Simulation",
    url: "https://github.com/tu-darmstadt-ros-pkg/autonomous_stair_traversal_tutorial",
    image:
      "https://opengraph.githubassets.com/open-robotics-nexus-20260629/tu-darmstadt-ros-pkg/autonomous_stair_traversal_tutorial",
    summary:
      "ROS workspace setup for simulating a tracked robot capable of autonomous stair climbing in Gazebo.",
    tags: ["stairs", "gazebo", "ros", "mobility"],
    artifacts: { code: true, cad: false, bom: false, docs: true, firmware: false, sim: true, license: true },
    signals: { readiness: 58, velocity: 35, homeFit: 72 },
    evidence: [["GitHub repo", "https://github.com/tu-darmstadt-ros-pkg/autonomous_stair_traversal_tutorial"]],
    notes: "Shows how thin the stair-climbing open source lane still is compared with arms and humanoids."
  },
  {
    id: "stair-climber-ivlabs",
    name: "Stair-Climber",
    kind: "project",
    lane: "Stair Mobility",
    maintainer: "IvLabs",
    maturity: "Research candidate",
    status: "Gap signal",
    cost: "Unknown",
    url: "https://github.com/IvLabs/Stair-Climber",
    image: "https://opengraph.githubassets.com/open-robotics-nexus-20260629/IvLabs/Stair-Climber",
    summary:
      "Autonomous stair-climbing robot research candidate with reinforcement learning and deep learning topics.",
    tags: ["stairs", "reinforcement-learning", "mobility", "candidate"],
    artifacts: { code: true, cad: false, bom: false, docs: true, firmware: false, sim: true, license: true },
    signals: { readiness: 48, velocity: 32, homeFit: 70 },
    evidence: [["GitHub repo", "https://github.com/IvLabs/Stair-Climber"]],
    notes: "Needs a deeper source review, but belongs in the stair mobility watchlist."
  },
  {
    id: "poppy-humanoid",
    name: "Poppy Humanoid",
    kind: "project",
    lane: "Humanoids",
    maintainer: "Poppy Project",
    maturity: "Established",
    status: "Reference",
    cost: "Source claim: $8,000-$9,000",
    url: "https://github.com/poppy-project/poppy-humanoid",
    image: "https://opengraph.githubassets.com/open-robotics-nexus-20260629/poppy-project/poppy-humanoid",
    summary:
      "Open-source and 3D printed humanoid platform with software/hardware sources, BOM, STL releases, and assembly instructions.",
    tags: ["humanoid", "education", "3d-printing", "research"],
    artifacts: { code: true, cad: true, bom: true, docs: true, firmware: true, sim: true, license: true },
    signals: { readiness: 88, velocity: 42, homeFit: 58 },
    evidence: [
      ["GitHub repo", "https://github.com/poppy-project/poppy-humanoid"],
      ["Poppy docs", "https://docs.poppy-project.org/en/getting-started/"],
      ["Source file guide", "https://poppy.discourse.group/t/how-to-get-the-poppy-humanoid-sources-files/94"]
    ],
    notes: "A mature documentation reference and useful historical comparison for open humanoids."
  },
  {
    id: "reachy-mini",
    name: "Reachy Mini",
    kind: "project",
    lane: "Companion Robots",
    maintainer: "Pollen Robotics / Hugging Face",
    maturity: "SDK / product ecosystem",
    status: "Watch",
    cost: "Orderable ecosystem",
    url: "https://github.com/pollen-robotics/reachy_mini",
    image: "https://opengraph.githubassets.com/open-robotics-nexus-20260629/pollen-robotics/reachy_mini",
    summary:
      "Open-source expressive desktop robot SDK and app ecosystem aimed at hackers, AI builders, and human-robot interaction.",
    tags: ["companion", "sdk", "ai", "hri"],
    artifacts: { code: true, cad: false, bom: false, docs: true, firmware: false, sim: false, license: true },
    signals: { readiness: 62, velocity: 88, homeFit: 64 },
    evidence: [
      ["GitHub repo", "https://github.com/pollen-robotics/reachy_mini"],
      ["Pollen Robotics", "https://www.pollen-robotics.com/"],
      ["Hugging Face org", "https://huggingface.co/pollen-robotics"]
    ],
    notes: "Important distribution/community signal for open robotics plus AI application builders."
  },
  {
    id: "lerobot",
    name: "LeRobot",
    kind: "stack",
    lane: "AI / Control Stacks",
    maintainer: "Hugging Face",
    maturity: "Active stack",
    status: "Critical stack",
    cost: "Software",
    url: "https://github.com/huggingface/lerobot",
    image: "https://opengraph.githubassets.com/open-robotics-nexus-20260629/huggingface/lerobot",
    summary:
      "Python-native robotics AI stack with models, datasets, and tools for real-world robotics from low-cost arms to humanoids.",
    tags: ["ai", "datasets", "models", "robot-learning"],
    artifacts: { code: true, cad: false, bom: false, docs: true, firmware: false, sim: true, license: true },
    signals: { readiness: 78, velocity: 95, homeFit: 78 },
    evidence: [["GitHub repo", "https://github.com/huggingface/lerobot"]],
    notes: "Core software ecosystem to track because hardware projects increasingly converge around it."
  },
  {
    id: "awesome-open-source-robots",
    name: "Awesome Open Source Robots",
    kind: "resource",
    lane: "Meta Lists",
    maintainer: "Stephane Caron / community",
    maturity: "Directory",
    status: "Seed source",
    cost: "Free",
    url: "https://github.com/stephane-caron/awesome-open-source-robots",
    image:
      "https://opengraph.githubassets.com/open-robotics-nexus-20260629/stephane-caron/awesome-open-source-robots",
    summary:
      "Large curated list of open-source robots and hardware projects. Best used as a crawl seed, not a scored catalog.",
    tags: ["directory", "seed-source", "robots", "hardware"],
    artifacts: { code: false, cad: false, bom: false, docs: true, firmware: false, sim: false, license: true },
    signals: { readiness: 40, velocity: 68, homeFit: 66 },
    evidence: [["GitHub repo", "https://github.com/stephane-caron/awesome-open-source-robots"]],
    notes: "The hub should ingest this, then add classification, evidence, and scoring."
  },
  {
    id: "awesome-robotic-arms",
    name: "Awesome Open Source Robotic Arms",
    kind: "resource",
    lane: "Meta Lists",
    maintainer: "Adafruit / community",
    maturity: "Directory",
    status: "Seed source",
    cost: "Free",
    url: "https://github.com/adafruit/awesome-open-source-robotic-arms",
    image:
      "https://opengraph.githubassets.com/open-robotics-nexus-20260629/adafruit/awesome-open-source-robotic-arms",
    summary:
      "Curated robotic arm directory for discovering arm designs before deeper readiness and reproducibility scoring.",
    tags: ["directory", "arms", "seed-source", "hardware"],
    artifacts: { code: false, cad: false, bom: false, docs: true, firmware: false, sim: false, license: true },
    signals: { readiness: 36, velocity: 55, homeFit: 54 },
    evidence: [["GitHub repo", "https://github.com/adafruit/awesome-open-source-robotic-arms"]],
    notes: "Good source lane for arm candidates that need normalization."
  },
  {
    id: "open-robotics",
    name: "Open Robotics / ROS",
    kind: "stack",
    lane: "AI / Control Stacks",
    maintainer: "Open Robotics",
    maturity: "Core ecosystem",
    status: "Critical stack",
    cost: "Software",
    url: "https://www.openrobotics.org/",
    image: "https://opengraph.githubassets.com/open-robotics-nexus-20260629/ros2/ros2",
    summary:
      "Core open robotics ecosystem behind ROS, Gazebo, and community infrastructure that many catalog projects depend on.",
    tags: ["ros", "gazebo", "middleware", "community"],
    artifacts: { code: true, cad: false, bom: false, docs: true, firmware: false, sim: true, license: true },
    signals: { readiness: 82, velocity: 92, homeFit: 72 },
    evidence: [
      ["Open Robotics", "https://www.openrobotics.org/"],
      ["Planet ROS", "https://planet.ros.org/"]
    ],
    notes: "Needed as infrastructure context rather than a single robot project."
  },
  {
    id: "awesome-humanoid-learning",
    name: "Awesome Humanoid Robot Learning",
    kind: "resource",
    lane: "Meta Lists",
    maintainer: "Yanjie Ze / community",
    maturity: "Directory",
    status: "Seed source",
    cost: "Free",
    url: "https://github.com/YanjieZe/awesome-humanoid-robot-learning",
    image:
      "https://opengraph.githubassets.com/open-robotics-nexus-20260629/YanjieZe/awesome-humanoid-robot-learning",
    summary:
      "Humanoid learning paper and resource list useful for tracking methods, benchmarks, and robot learning literature.",
    tags: ["directory", "humanoid", "learning", "papers"],
    artifacts: { code: false, cad: false, bom: false, docs: true, firmware: false, sim: false, license: true },
    signals: { readiness: 35, velocity: 72, homeFit: 62 },
    evidence: [["GitHub repo", "https://github.com/YanjieZe/awesome-humanoid-robot-learning"]],
    notes: "Should feed the benchmark watcher rather than the buildability leaderboard."
  },
  {
    id: "robot-descriptions",
    name: "Awesome Robot Descriptions",
    kind: "resource",
    lane: "Simulation / Descriptions",
    maintainer: "robot-descriptions community",
    maturity: "Directory",
    status: "Seed source",
    cost: "Free",
    url: "https://github.com/robot-descriptions/awesome-robot-descriptions",
    image:
      "https://opengraph.githubassets.com/open-robotics-nexus-20260629/robot-descriptions/awesome-robot-descriptions",
    summary:
      "Directory of robot description packages for simulation, URDF/MJCF workflows, and reproducible robotics experiments.",
    tags: ["simulation", "urdf", "mjcf", "directory"],
    artifacts: { code: false, cad: false, bom: false, docs: true, firmware: false, sim: true, license: true },
    signals: { readiness: 52, velocity: 68, homeFit: 56 },
    evidence: [["GitHub repo", "https://github.com/robot-descriptions/awesome-robot-descriptions"]],
    notes: "Useful connector between physical robots and sim-first research."
  },
  {
    id: "asimov-v1",
    name: "Asimov v1",
    kind: "project",
    lane: "Humanoids",
    maintainer: "Asimov Inc.",
    maturity: "Candidate",
    status: "Needs review",
    cost: "Unknown",
    url: "https://github.com/asimovinc/asimov-1",
    image: "https://opengraph.githubassets.com/open-robotics-nexus-20260629/asimovinc/asimov-1",
    summary:
      "Open humanoid project candidate with mechanical and software assets that should be reviewed for build completeness.",
    tags: ["humanoid", "candidate", "mechanical", "software"],
    artifacts: { code: true, cad: true, bom: false, docs: true, firmware: false, sim: false, license: true },
    signals: { readiness: 62, velocity: 64, homeFit: 72 },
    evidence: [["GitHub repo", "https://github.com/asimovinc/asimov-1"]],
    notes: "Good candidate for deeper artifact review and comparison against Berkeley Humanoid Lite."
  },
  {
    id: "robotis-op3",
    name: "ROBOTIS OP3",
    kind: "project",
    lane: "Humanoids",
    maintainer: "ROBOTIS",
    maturity: "Established platform",
    status: "Reference",
    cost: "Commercial kit",
    url: "https://github.com/ROBOTIS-GIT/ROBOTIS-OP3",
    image: "https://opengraph.githubassets.com/open-robotics-nexus-20260629/ROBOTIS-GIT/ROBOTIS-OP3",
    summary:
      "Open-source humanoid research platform with ROS packages, robot descriptions, simulation, and broad education usage.",
    tags: ["humanoid", "ros", "education", "simulation"],
    artifacts: { code: true, cad: false, bom: false, docs: true, firmware: true, sim: true, license: true },
    signals: { readiness: 74, velocity: 54, homeFit: 50 },
    evidence: [["GitHub repo", "https://github.com/ROBOTIS-GIT/ROBOTIS-OP3"]],
    notes: "Useful reference for humanoid software and simulation, though not a low-cost home robot wedge."
  },
  {
    id: "inmoov",
    name: "InMoov",
    kind: "project",
    lane: "Humanoids",
    maintainer: "InMoov community",
    maturity: "Established",
    status: "Reference",
    cost: "3D printed build",
    url: "https://inmoov.fr/",
    image: "",
    summary:
      "Long-running open-source 3D printed life-size robot project with extensive community build documentation.",
    tags: ["humanoid", "3d-printing", "community", "education"],
    artifacts: { code: true, cad: true, bom: true, docs: true, firmware: true, sim: false, license: true },
    signals: { readiness: 82, velocity: 44, homeFit: 54 },
    evidence: [
      ["Project site", "https://inmoov.fr/"],
      ["MyRobotLab InMoov", "https://github.com/MyRobotLab/inmoov"]
    ],
    notes: "A historical open humanoid reference and source of community lessons."
  },
  {
    id: "open-manipulator-x",
    name: "OpenMANIPULATOR-X",
    kind: "project",
    lane: "Arms",
    maintainer: "ROBOTIS",
    maturity: "Established platform",
    status: "Reference",
    cost: "Commercial kit",
    url: "https://github.com/ROBOTIS-GIT/open_manipulator",
    image: "https://opengraph.githubassets.com/open-robotics-nexus-20260629/ROBOTIS-GIT/open_manipulator",
    summary:
      "Open-source ROS-compatible manipulator platform with packages, examples, simulation, and hardware ecosystem support.",
    tags: ["arm", "ros", "education", "simulation"],
    artifacts: { code: true, cad: true, bom: false, docs: true, firmware: true, sim: true, license: true },
    signals: { readiness: 80, velocity: 58, homeFit: 62 },
    evidence: [["GitHub repo", "https://github.com/ROBOTIS-GIT/open_manipulator"]],
    notes: "Good baseline for ROS manipulation stacks and teaching."
  },
  {
    id: "parol6",
    name: "PAROL6 Desktop Robot Arm",
    kind: "project",
    lane: "Arms",
    maintainer: "Petar Crnjak",
    maturity: "Buildable",
    status: "High priority",
    cost: "Desktop arm BOM",
    url: "https://github.com/PCrnjak/PAROL6-Desktop-robot-arm",
    image: "https://opengraph.githubassets.com/open-robotics-nexus-20260629/PCrnjak/PAROL6-Desktop-robot-arm",
    summary:
      "Open-source 6-axis desktop robotic arm with printable/mechanical files, electronics, firmware, and software resources.",
    tags: ["arm", "desktop", "6-axis", "bom"],
    artifacts: { code: true, cad: true, bom: true, docs: true, firmware: true, sim: true, license: true },
    signals: { readiness: 88, velocity: 70, homeFit: 70 },
    evidence: [["GitHub repo", "https://github.com/PCrnjak/PAROL6-Desktop-robot-arm"]],
    notes: "Strong buildability candidate for the arms lane."
  },
  {
    id: "niryo-one",
    name: "Niryo One",
    kind: "project",
    lane: "Arms",
    maintainer: "Niryo Robotics",
    maturity: "Established",
    status: "Reference",
    cost: "Education kit",
    url: "https://github.com/NiryoRobotics/niryo_one",
    image: "https://opengraph.githubassets.com/open-robotics-nexus-20260629/NiryoRobotics/niryo_one",
    summary:
      "Open-source 6-axis collaborative robot arm project with ROS software and education-oriented documentation.",
    tags: ["arm", "ros", "education", "collaborative"],
    artifacts: { code: true, cad: true, bom: false, docs: true, firmware: true, sim: true, license: true },
    signals: { readiness: 78, velocity: 40, homeFit: 58 },
    evidence: [["GitHub repo", "https://github.com/NiryoRobotics/niryo_one"]],
    notes: "Useful as an established open arm reference, even if not a newest low-cost entrant."
  },
  {
    id: "thor-arm",
    name: "Thor Robot Arm",
    kind: "project",
    lane: "Arms",
    maintainer: "Angel L. M.",
    maturity: "Buildable",
    status: "Reference",
    cost: "3D printed build",
    url: "https://github.com/AngelLM/Thor",
    image: "https://opengraph.githubassets.com/open-robotics-nexus-20260629/AngelLM/Thor",
    summary:
      "Open-source 3D-printable robotic arm with mechanical design files, firmware, and assembly-oriented community material.",
    tags: ["arm", "3d-printing", "firmware", "education"],
    artifacts: { code: true, cad: true, bom: true, docs: true, firmware: true, sim: false, license: true },
    signals: { readiness: 82, velocity: 38, homeFit: 56 },
    evidence: [["GitHub repo", "https://github.com/AngelLM/Thor"]],
    notes: "Older but important reference for printable robot arm documentation."
  },
  {
    id: "yale-openhand",
    name: "Yale OpenHand",
    kind: "project",
    lane: "Hands",
    maintainer: "Yale GRAB Lab",
    maturity: "Established",
    status: "Reference",
    cost: "Research hardware",
    url: "https://www.eng.yale.edu/grablab/openhand/",
    image: "",
    summary:
      "Open-source robotic hand initiative with multiple underactuated hand designs and research hardware documentation.",
    tags: ["hand", "underactuated", "research", "hardware"],
    artifacts: { code: false, cad: true, bom: true, docs: true, firmware: false, sim: false, license: true },
    signals: { readiness: 72, velocity: 30, homeFit: 62 },
    evidence: [["Project site", "https://www.eng.yale.edu/grablab/openhand/"]],
    notes: "Important canonical hand hardware source and seed for dexterity taxonomy."
  },
  {
    id: "turtlebot3",
    name: "TurtleBot3",
    kind: "project",
    lane: "Mobile Bases",
    maintainer: "ROBOTIS / Open Robotics ecosystem",
    maturity: "Established platform",
    status: "Reference",
    cost: "Commercial kit",
    url: "https://github.com/ROBOTIS-GIT/turtlebot3",
    image: "https://opengraph.githubassets.com/open-robotics-nexus-20260629/ROBOTIS-GIT/turtlebot3",
    summary:
      "Open-source ROS mobile robot platform used heavily for navigation, SLAM, education, and extensible base research.",
    tags: ["mobile-base", "ros", "nav2", "education"],
    artifacts: { code: true, cad: true, bom: false, docs: true, firmware: true, sim: true, license: true },
    signals: { readiness: 84, velocity: 70, homeFit: 68 },
    evidence: [["GitHub repo", "https://github.com/ROBOTIS-GIT/turtlebot3"]],
    notes: "Baseline mobile robotics platform and important ecosystem reference."
  },
  {
    id: "mushr",
    name: "MuSHR",
    kind: "project",
    lane: "Mobile Bases",
    maintainer: "Personal Robotics Lab",
    maturity: "Buildable",
    status: "Reference",
    cost: "Low-cost racecar",
    url: "https://github.com/prl-mushr/mushr",
    image: "https://opengraph.githubassets.com/open-robotics-nexus-20260629/prl-mushr/mushr",
    summary:
      "Low-cost open-source robotic racecar platform for autonomy, planning, controls, and classroom-scale experimentation.",
    tags: ["mobile-base", "autonomy", "education", "planning"],
    artifacts: { code: true, cad: true, bom: true, docs: true, firmware: true, sim: true, license: true },
    signals: { readiness: 86, velocity: 56, homeFit: 52 },
    evidence: [["GitHub repo", "https://github.com/prl-mushr/mushr"]],
    notes: "Not a home robot, but a strong reference for low-cost autonomous platform reproducibility."
  },
  {
    id: "scuttle",
    name: "SCUTTLE",
    kind: "project",
    lane: "Mobile Bases",
    maintainer: "SCUTTLE Robot community",
    maturity: "Buildable",
    status: "Reference",
    cost: "Education build",
    url: "https://github.com/scuttlerobot/SCUTTLE",
    image: "https://opengraph.githubassets.com/open-robotics-nexus-20260629/scuttlerobot/SCUTTLE",
    summary:
      "Open-source mobile robot platform for hands-on mechatronics and robotics education with build-oriented resources.",
    tags: ["mobile-base", "education", "mechatronics", "build"],
    artifacts: { code: true, cad: true, bom: true, docs: true, firmware: true, sim: false, license: true },
    signals: { readiness: 80, velocity: 48, homeFit: 58 },
    evidence: [["GitHub repo", "https://github.com/scuttlerobot/SCUTTLE"]],
    notes: "Useful mobile-base entry for newcomers and hardware build pedagogy."
  },
  {
    id: "openbot",
    name: "OpenBot",
    kind: "project",
    lane: "Mobile Bases",
    maintainer: "OpenBot / Intel Labs origin",
    maturity: "Buildable",
    status: "Reference",
    cost: "Phone-powered low cost",
    url: "https://github.com/isl-org/OpenBot",
    image: "https://opengraph.githubassets.com/open-robotics-nexus-20260629/isl-org/OpenBot",
    summary:
      "Open-source smartphone-powered robot platform for affordable embodied AI, navigation, and data collection experiments.",
    tags: ["mobile-base", "embodied-ai", "phone", "low-cost"],
    artifacts: { code: true, cad: true, bom: true, docs: true, firmware: true, sim: false, license: true },
    signals: { readiness: 84, velocity: 46, homeFit: 66 },
    evidence: [["GitHub repo", "https://github.com/isl-org/OpenBot"]],
    notes: "Good example of radical cost reduction through commodity compute."
  },
  {
    id: "opencat",
    name: "OpenCat",
    kind: "project",
    lane: "Legged Robots",
    maintainer: "Petoi",
    maturity: "Kit / buildable",
    status: "Reference",
    cost: "Kit ecosystem",
    url: "https://github.com/PetoiCamp/OpenCat",
    image: "https://opengraph.githubassets.com/open-robotics-nexus-20260629/PetoiCamp/OpenCat",
    summary:
      "Open-source quadruped robot platform behind Petoi educational robot kits with firmware and motion resources.",
    tags: ["quadruped", "education", "firmware", "kit"],
    artifacts: { code: true, cad: true, bom: false, docs: true, firmware: true, sim: false, license: true },
    signals: { readiness: 74, velocity: 68, homeFit: 54 },
    evidence: [["GitHub repo", "https://github.com/PetoiCamp/OpenCat"]],
    notes: "Broad educational legged platform and community source."
  },
  {
    id: "stanford-pupper",
    name: "Stanford Pupper",
    kind: "project",
    lane: "Legged Robots",
    maintainer: "Stanford Robotics Club",
    maturity: "Buildable",
    status: "Reference",
    cost: "Low-cost quadruped",
    url: "https://github.com/stanfordroboticsclub/StanfordQuadruped",
    image: "https://opengraph.githubassets.com/open-robotics-nexus-20260629/stanfordroboticsclub/StanfordQuadruped",
    summary:
      "Open-source quadruped platform for learning legged locomotion, controls, mechanical design, and robotics education.",
    tags: ["quadruped", "education", "controls", "low-cost"],
    artifacts: { code: true, cad: true, bom: true, docs: true, firmware: true, sim: false, license: true },
    signals: { readiness: 82, velocity: 42, homeFit: 52 },
    evidence: [["GitHub repo", "https://github.com/stanfordroboticsclub/StanfordQuadruped"]],
    notes: "Important reference for accessible quadruped design."
  },
  {
    id: "solo12",
    name: "Solo 12",
    kind: "project",
    lane: "Legged Robots",
    maintainer: "Open Dynamic Robot Initiative",
    maturity: "Research platform",
    status: "Reference",
    cost: "Research hardware",
    url: "https://github.com/open-dynamic-robot-initiative/robot_properties_solo",
    image:
      "https://opengraph.githubassets.com/open-robotics-nexus-20260629/open-dynamic-robot-initiative/robot_properties_solo",
    summary:
      "Open dynamic quadruped research platform with simulation/control resources and related open hardware ecosystem work.",
    tags: ["quadruped", "research", "control", "simulation"],
    artifacts: { code: true, cad: true, bom: true, docs: true, firmware: true, sim: true, license: true },
    signals: { readiness: 84, velocity: 58, homeFit: 48 },
    evidence: [
      ["Robot properties repo", "https://github.com/open-dynamic-robot-initiative/robot_properties_solo"],
      ["Open robot actuator hardware", "https://github.com/open-dynamic-robot-initiative/open_robot_actuator_hardware"]
    ],
    notes: "Research-grade open hardware reference for dynamic legged locomotion."
  },
  {
    id: "droid-dataset",
    name: "DROID Dataset",
    kind: "resource",
    lane: "Datasets / Benchmarks",
    maintainer: "DROID collaboration",
    maturity: "Active dataset",
    status: "Critical dataset",
    cost: "Dataset",
    url: "https://github.com/droid-dataset/droid",
    image: "https://opengraph.githubassets.com/open-robotics-nexus-20260629/droid-dataset/droid",
    summary:
      "Large-scale robot manipulation dataset and tooling for training and evaluating real-world robot policies.",
    tags: ["dataset", "manipulation", "robot-learning", "benchmark"],
    artifacts: { code: true, cad: false, bom: false, docs: true, firmware: false, sim: false, license: true },
    signals: { readiness: 70, velocity: 86, homeFit: 72 },
    evidence: [["GitHub repo", "https://github.com/droid-dataset/droid"]],
    notes: "Important for the AI/context side of the hub, especially manipulation policy progress."
  },
  {
    id: "open-x-embodiment",
    name: "Open X-Embodiment",
    kind: "resource",
    lane: "Datasets / Benchmarks",
    maintainer: "Open X-Embodiment collaboration",
    maturity: "Benchmark/dataset",
    status: "Critical dataset",
    cost: "Dataset",
    url: "https://robotics-transformer-x.github.io/",
    image: "",
    summary:
      "Cross-embodiment robot learning dataset and benchmark work for training policies across many robot platforms.",
    tags: ["dataset", "benchmark", "robot-learning", "cross-embodiment"],
    artifacts: { code: true, cad: false, bom: false, docs: true, firmware: false, sim: false, license: true },
    signals: { readiness: 68, velocity: 72, homeFit: 70 },
    evidence: [
      ["Project site", "https://robotics-transformer-x.github.io/"],
      ["GitHub org", "https://github.com/google-deepmind/open_x_embodiment"]
    ],
    notes: "Useful context for how hardware standardization feeds better shared robot learning."
  },
  {
    id: "ros-discourse",
    name: "ROS Discourse",
    kind: "resource",
    lane: "Community / Signals",
    maintainer: "ROS community",
    maturity: "Active community",
    status: "Discovery source",
    cost: "Free",
    url: "https://discourse.ros.org/",
    image: "",
    summary:
      "Core discussion forum for ROS announcements, releases, community questions, robotics packages, and ecosystem signals.",
    tags: ["community", "ros", "announcements", "discovery"],
    artifacts: { code: false, cad: false, bom: false, docs: true, firmware: false, sim: false, license: true },
    signals: { readiness: 42, velocity: 88, homeFit: 58 },
    evidence: [["Community forum", "https://discourse.ros.org/"]],
    notes: "High-value source for scheduled discovery agents."
  },
  {
    id: "hackaday-robots",
    name: "Hackaday Robotics Projects",
    kind: "resource",
    lane: "Community / Signals",
    maintainer: "Hackaday community",
    maturity: "Discovery source",
    status: "Discovery source",
    cost: "Free",
    url: "https://hackaday.io/projects?tag=robot",
    image: "",
    summary:
      "Broad stream of community robotics builds and early-stage hardware projects worth crawling for emerging open designs.",
    tags: ["community", "hardware", "discovery", "projects"],
    artifacts: { code: false, cad: false, bom: false, docs: true, firmware: false, sim: false, license: false },
    signals: { readiness: 32, velocity: 82, homeFit: 56 },
    evidence: [["Robotics tag", "https://hackaday.io/projects?tag=robot"]],
    notes: "Useful for discovery, but each candidate needs licensing and source verification."
  }
];

const laneDescriptions = {
  Humanoids: "Full-body platforms where openness, cost, safety, and reproducibility matter most.",
  "Mobile Manipulators": "Bases plus arms, closest to practical home utility and data collection.",
  Arms: "Accessible manipulation hardware, teleoperation rigs, and embodied AI workhorses.",
  Hands: "Dexterous end-effectors, soft structures, tactile possibilities, and low-cost actuation.",
  "Mobile Bases": "Navigation foundations for home robots, ROS integration, SLAM, and mobility.",
  "Legged Robots": "Biped and quadruped projects for locomotion, balance, and sim-to-real learning.",
  "Stair Mobility": "The underbuilt lane: tracked, wheeled, legged, or hybrid stair traversal.",
  "Companion Robots": "Expressive robots, HRI, desktop agents, and approachable AI hardware.",
  "AI / Control Stacks": "Software infrastructure, robot learning, datasets, middleware, and simulation.",
  "Datasets / Benchmarks": "Robot learning corpora, evaluation protocols, and evidence of cross-embodiment progress.",
  "Community / Signals": "Forums, project streams, and social surfaces that discovery agents should monitor.",
  "Meta Lists": "Seed directories that become useful after deduplication, taxonomy, and evidence scoring.",
  "Simulation / Descriptions": "URDF/MJCF packages, robot descriptions, and sim-first reproducibility."
};

const state = {
  search: "",
  lane: "all",
  kind: "all",
  sort: "homeFit",
  filters: new Set(),
  selectedId: projects[0].id
};

const artifactLabels = {
  code: "Code",
  cad: "CAD",
  bom: "BOM",
  docs: "Docs",
  firmware: "Firmware",
  sim: "Sim",
  license: "License"
};

window.ORN_DATA = { projects, laneDescriptions, artifactLabels };

const laneFilter = document.querySelector("#lane-filter");
const kindFilter = document.querySelector("#kind-filter");
const sortSelect = document.querySelector("#sort-select");
const searchInput = document.querySelector("#search-input");
const projectGrid = document.querySelector("#project-grid");
const detailPanel = document.querySelector("#detail-panel");
const laneGrid = document.querySelector("#lane-grid");
const catalogStatus = document.querySelector("#catalog-status");

function init() {
  injectIconsIntoNav();
  markActiveNav();

  const page = document.body.dataset.page || "home";
  if (page === "home") initHome();
  if (page === "lanes") initLaneIndex();
  if (page === "lane") initLaneDetail();
  if (page === "project") initProjectPage();
  if (page === "ai") initAiPage();
  if (page === "agents") initAgentsPage();

  refreshLucide();
}

function initHome() {
  applyInitialQuery();
  populateLaneFilter();
  bindControls();
  renderMetrics();
  renderLanes();
  renderCatalog();
}

function injectIconsIntoNav() {
  document.querySelectorAll("[data-icon]").forEach((item) => {
    if (item.querySelector("svg")) return;
    const icon = item.dataset.icon;
    item.insertAdjacentHTML("afterbegin", `<i data-lucide="${icon}"></i>`);
  });
}

function markActiveNav() {
  const page = document.body.dataset.page || "home";
  const activePage = page === "lane" ? "lanes" : page;
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.classList.toggle("active", link.dataset.nav === activePage);
  });
}

function applyInitialQuery() {
  const params = new URLSearchParams(window.location.search);
  const lane = params.get("lane");
  const query = params.get("q");
  if (lane) state.lane = lane;
  if (query) state.search = query.trim().toLowerCase();
}

function populateLaneFilter() {
  if (!laneFilter) return;
  const lanes = [...new Set(projects.map((project) => project.lane))].sort();
  lanes.forEach((lane) => {
    const option = document.createElement("option");
    option.value = lane;
    option.textContent = lane;
    laneFilter.appendChild(option);
  });
  laneFilter.value = state.lane;
  if (searchInput && state.search) searchInput.value = state.search;
}

function bindControls() {
  if (!searchInput || !laneFilter || !kindFilter || !sortSelect) return;
  searchInput.addEventListener("input", (event) => {
    state.search = event.target.value.trim().toLowerCase();
    renderCatalog();
  });

  laneFilter.addEventListener("change", (event) => {
    state.lane = event.target.value;
    renderCatalog();
  });

  kindFilter.addEventListener("change", (event) => {
    state.kind = event.target.value;
    renderCatalog();
  });

  sortSelect.addEventListener("change", (event) => {
    state.sort = event.target.value;
    renderCatalog();
  });

  document.querySelectorAll(".filter-toggle").forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter;
      if (state.filters.has(filter)) {
        state.filters.delete(filter);
        button.classList.remove("active");
      } else {
        state.filters.add(filter);
        button.classList.add("active");
      }
      renderCatalog();
    });
  });
}

function renderMetrics() {
  if (!document.querySelector("#metric-total")) return;
  const hardware = projects.filter((project) => project.kind === "project").length;
  const avgReadiness = average(projects.map((project) => project.signals.readiness));
  const avgHomeFit = average(projects.map((project) => project.signals.homeFit));

  document.querySelector("#metric-total").textContent = projects.length;
  document.querySelector("#metric-hardware").textContent = hardware;
  document.querySelector("#metric-readiness").textContent = `${Math.round(avgReadiness)}%`;
  document.querySelector("#metric-home-fit").textContent = `${Math.round(avgHomeFit)}%`;
}

function renderLanes() {
  if (!laneGrid) return;
  const lanes = [...new Set(projects.map((project) => project.lane))].sort();
  laneGrid.innerHTML = lanes
    .map((lane) => {
      const count = projects.filter((project) => project.lane === lane).length;
      return `
        <a class="lane-card" href="${laneHref(lane)}">
          <header>
            <h3>${lane}</h3>
            <strong>${count}</strong>
          </header>
          <p>${laneDescriptions[lane] || "Catalog lane for related robotics research."}</p>
          <span class="inline-link">View lane</span>
        </a>
      `;
    })
    .join("");
}

function renderCatalog() {
  if (!projectGrid || !catalogStatus) return;
  const filtered = getFilteredProjects();
  catalogStatus.textContent = `${filtered.length} shown`;

  if (!filtered.length) {
    projectGrid.innerHTML = `<div class="empty-state">No catalog entries match these filters.</div>`;
    detailPanel.innerHTML = "";
    return;
  }

  if (!filtered.some((project) => project.id === state.selectedId)) {
    state.selectedId = filtered[0].id;
  }

  projectGrid.innerHTML = filtered.map(renderProjectCard).join("");

  const selected = projects.find((project) => project.id === state.selectedId) || filtered[0];
  renderDetail(selected);
  refreshLucide();
}

function getFilteredProjects() {
  const needle = state.search;
  const activeFilters = [...state.filters];
  const filtered = projects.filter((project) => {
    const haystack = [
      project.name,
      project.kind,
      project.lane,
      project.maintainer,
      project.summary,
      project.status,
      ...project.tags
    ]
      .join(" ")
      .toLowerCase();

    if (needle && !haystack.includes(needle)) return false;
    if (state.lane !== "all" && project.lane !== state.lane) return false;
    if (state.kind !== "all" && project.kind !== state.kind) return false;

    return activeFilters.every((filter) => {
      if (filter === "stair") return hasStairSignal(project);
      return Boolean(project.artifacts[filter]);
    });
  });

  return filtered.sort((a, b) => {
    if (state.sort === "name") return a.name.localeCompare(b.name);
    const metric = state.sort === "homeFit" ? "homeFit" : state.sort;
    return b.signals[metric] - a.signals[metric] || a.name.localeCompare(b.name);
  });
}

function renderProjectCard(project) {
  const selected = project.id === state.selectedId ? " selected" : "";
  return `
    <a class="project-card${selected}" href="${projectHref(project)}" data-id="${project.id}">
      <div class="project-media">
        ${renderImage(project, "card")}
        <span class="status-pill">${project.status}</span>
        <span class="kind-pill">${project.kind}</span>
      </div>
      <div class="project-body">
        <h3>${project.name}</h3>
        <p>${project.summary}</p>
        <div class="tag-row">
          ${project.tags.slice(0, 4).map((tag) => `<span class="tag">${tag}</span>`).join("")}
        </div>
        <div class="score-row">
          ${renderScore("Open", project.signals.readiness)}
          ${renderScore("Ship", project.signals.velocity)}
          ${renderScore("Home", project.signals.homeFit)}
        </div>
      </div>
    </a>
  `;
}

function renderDetail(project) {
  if (!detailPanel) return;
  detailPanel.innerHTML = `
    <div class="detail-hero">${renderImage(project, "detail")}</div>
    <div class="detail-body">
      <h3>${project.name}</h3>
      <p>${project.summary}</p>
      <div class="detail-actions">
        <a class="detail-link" href="${projectHref(project)}">
          <i data-lucide="panel-top-open"></i>
          Project Page
        </a>
        <a class="ghost-button compact" href="${project.url}" target="_blank" rel="noreferrer">
          <i data-lucide="external-link"></i>
          Source
        </a>
      </div>

      <div class="detail-meta">
        <div><span>Lane</span><strong><a href="${laneHref(project.lane)}">${project.lane}</a></strong></div>
        <div><span>Maturity</span><strong>${project.maturity}</strong></div>
        <div><span>Maintainer</span><strong>${project.maintainer}</strong></div>
        <div><span>Cost</span><strong>${project.cost}</strong></div>
      </div>

      <div class="artifact-row">
        ${Object.entries(artifactLabels)
          .map(([key, label]) => `<span class="artifact ${project.artifacts[key] ? "on" : ""}">${label}</span>`)
          .join("")}
      </div>

      <div class="score-row">
        ${renderScore("Open readiness", project.signals.readiness)}
        ${renderScore("Shipping", project.signals.velocity)}
        ${renderScore("Home fit", project.signals.homeFit)}
      </div>

      <p>${project.notes}</p>

      <ul class="evidence-list">
        ${project.evidence
          .map(([label, href]) => `<li><a href="${href}" target="_blank" rel="noreferrer">${label}</a></li>`)
          .join("")}
      </ul>
    </div>
  `;
}

function renderVerificationCards(laneProjects) {
  const checks = [
    ["Missing BOM", (project) => !project.artifacts.bom],
    ["Missing CAD", (project) => !project.artifacts.cad],
    ["Needs simulation check", (project) => !project.artifacts.sim],
    ["Candidate/watch item", (project) => /candidate|watch|needs review/i.test(project.status)]
  ];

  return checks
    .map(([label, predicate]) => {
      const matches = laneProjects.filter(predicate);
      return `
        <article class="verification-card">
          <span>${label}</span>
          <strong>${matches.length}</strong>
          <p>${matches.slice(0, 4).map((project) => project.name).join(", ") || "None in this lane."}</p>
        </article>
      `;
    })
    .join("");
}

function answerQuestion(question, chatLog) {
  addMessage(chatLog, "user", escapeHtml(question));
  const ranked = rankProjects(question).slice(0, 5);
  const lower = question.toLowerCase();
  let intro = "Here is the closest catalog context I found.";

  if (lower.includes("build") || lower.includes("start")) {
    intro =
      "If you want to build something real, start where the evidence is strongest: CAD, BOM, docs, and a clear reproduction path.";
  }
  if (lower.includes("stair")) {
    intro =
      "Stair mobility is still sparse. The lane looks underbuilt, which makes it strategically interesting if someone can publish real hardware evidence.";
  }
  if (lower.includes("hand") || lower.includes("gripper")) {
    intro =
      "For hands and grippers, I would compare dexterity against buildability: the best project is the one other people can actually reproduce.";
  }
  if (lower.includes("humanoid")) {
    intro =
      "For humanoids, the key split is full-platform ambition versus actually reproducible low-cost subsystems.";
  }

  const projectList = ranked
    .map(
      (project) =>
        `<a href="${projectHref(project)}"><strong>${project.name}</strong><span>${project.lane} / ${project.status} / ${project.signals.readiness}% open readiness</span></a>`
    )
    .join("");

  const laneCounts = [...new Set(ranked.map((project) => project.lane))]
    .map((lane) => `<a href="${laneHref(lane)}">${lane}</a>`)
    .join(", ");

  addMessage(
    chatLog,
    "ai",
    `${intro}<div class="ai-result-list">${projectList || "No strong project matches yet."}</div><p>Relevant lanes: ${laneCounts || "none yet"}.</p><p class="nosy">Nosy community question: what have you been building, reading, or noticing in this corner of robotics? If you share it below, the future backend can turn it into searchable community memory.</p>`
  );
}

function rankProjects(question) {
  const terms = question
    .toLowerCase()
    .split(/[^a-z0-9+#-]+/)
    .filter((term) => term.length > 1);

  return projects
    .map((project) => {
      const haystack = [
        project.name,
        project.lane,
        project.kind,
        project.maintainer,
        project.summary,
        project.notes,
        project.status,
        ...project.tags
      ]
        .join(" ")
        .toLowerCase();
      const lexical = terms.reduce((score, term) => score + (haystack.includes(term) ? 12 : 0), 0);
      const artifactBonus = ["cad", "bom", "docs", "sim"].reduce(
        (score, key) => score + (project.artifacts[key] ? 2 : 0),
        0
      );
      return {
        project,
        score: lexical + artifactBonus + project.signals.homeFit * 0.18 + project.signals.readiness * 0.12
      };
    })
    .sort((a, b) => b.score - a.score)
    .map((item) => item.project);
}

function addMessage(chatLog, who, html) {
  const message = document.createElement("article");
  message.className = `chat-message ${who}`;
  message.innerHTML = `<span>${who === "ai" ? "Nexus AI" : "You"}</span><div>${html}</div>`;
  chatLog.appendChild(message);
  chatLog.scrollTop = chatLog.scrollHeight;
}

function loadCommunityNotes() {
  try {
    return JSON.parse(localStorage.getItem("orn-community-notes") || "[]");
  } catch {
    return [];
  }
}

function renderCommunityMemory(memoryList) {
  const notes = loadCommunityNotes();
  if (!notes.length) {
    memoryList.innerHTML = `<div class="empty-state compact">No local community notes yet. Add the first field report.</div>`;
    return;
  }
  memoryList.innerHTML = notes
    .map(
      (note) => `
        <article class="memory-note">
          <span>${new Date(note.createdAt).toLocaleDateString()}</span>
          <strong>${escapeHtml(note.focus)}</strong>
          <p>${escapeHtml(note.body)}</p>
          <small>${escapeHtml(note.name)}</small>
        </article>
      `
    )
    .join("");
}

function initLaneIndex() {
  const root = document.querySelector("#lane-index-root");
  if (!root) return;
  const lanes = [...new Set(projects.map((project) => project.lane))].sort();
  root.innerHTML = lanes
    .map((lane) => {
      const laneProjects = projects.filter((project) => project.lane === lane);
      const topProjects = laneProjects
        .slice()
        .sort((a, b) => b.signals.homeFit - a.signals.homeFit)
        .slice(0, 4);
      return `
        <a class="lane-deep-card" href="${laneHref(lane)}">
          <header>
            <div>
              <p class="eyebrow">${laneProjects.length} entries</p>
              <h2>${lane}</h2>
            </div>
            <strong>${Math.round(average(laneProjects.map((project) => project.signals.readiness)))}%</strong>
          </header>
          <p>${laneDescriptions[lane] || "Catalog lane for related robotics research."}</p>
          <div class="mini-project-list">
            ${topProjects.map((project) => `<span>${project.name}</span>`).join("")}
          </div>
        </a>
      `;
    })
    .join("");
}

function projectHref(project) {
  return `project.html?id=${encodeURIComponent(project.id)}`;
}

function laneHref(lane) {
  return `lane.html?lane=${encodeURIComponent(lane)}`;
}

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, (char) => {
    const replacements = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    };
    return replacements[char];
  });
}

function initLaneDetail() {
  const root = document.querySelector("#lane-detail-root");
  if (!root) return;
  const params = new URLSearchParams(window.location.search);
  const requestedLane = params.get("lane") || "Humanoids";
  const lane = projects.some((project) => project.lane === requestedLane) ? requestedLane : "Humanoids";
  const laneProjects = projects
    .filter((project) => project.lane === lane)
    .sort((a, b) => b.signals.homeFit - a.signals.homeFit);

  document.title = `${lane} - Open Robotics Nexus`;
  const readiness = Math.round(average(laneProjects.map((project) => project.signals.readiness)));
  const homeFit = Math.round(average(laneProjects.map((project) => project.signals.homeFit)));
  const hardware = laneProjects.filter((project) => project.kind === "project").length;

  root.innerHTML = `
    <header class="page-header">
      <a class="back-link" href="lanes.html"><i data-lucide="arrow-left"></i> All lanes</a>
      <p class="eyebrow">Research Lane</p>
      <h1>${lane}</h1>
      <p>${laneDescriptions[lane] || "Catalog lane for related robotics research."}</p>
    </header>

    <section class="metrics-grid page-metrics" aria-label="${lane} lane metrics">
      <article class="metric-card"><span>Entries</span><strong>${laneProjects.length}</strong><small>catalog records</small></article>
      <article class="metric-card"><span>Hardware</span><strong>${hardware}</strong><small>projects</small></article>
      <article class="metric-card"><span>Open Readiness</span><strong>${readiness}%</strong><small>avg. evidence score</small></article>
      <article class="metric-card"><span>Home Fit</span><strong>${homeFit}%</strong><small>avg. strategic score</small></article>
    </section>

    <section class="dashboard-section">
      <div class="section-heading">
        <div>
          <p class="eyebrow">All entries</p>
          <h2>${lane} Catalog</h2>
        </div>
      </div>
      <div class="project-grid lane-project-grid">
        ${laneProjects.map(renderProjectCard).join("")}
      </div>
    </section>

    <section class="dashboard-section">
      <div class="section-heading">
        <div>
          <p class="eyebrow">Crawler work</p>
          <h2>What the agents still need to verify</h2>
        </div>
      </div>
      <div class="verification-grid">
        ${renderVerificationCards(laneProjects)}
      </div>
    </section>
  `;
}

function initProjectPage() {
  const root = document.querySelector("#project-page-root");
  if (!root) return;
  const params = new URLSearchParams(window.location.search);
  const project = projects.find((item) => item.id === params.get("id")) || projects[0];
  const siblings = projects
    .filter((item) => item.lane === project.lane && item.id !== project.id)
    .sort((a, b) => b.signals.homeFit - a.signals.homeFit)
    .slice(0, 6);

  document.title = `${project.name} - Open Robotics Nexus`;
  root.innerHTML = `
    <header class="page-header">
      <a class="back-link" href="${laneHref(project.lane)}"><i data-lucide="arrow-left"></i> ${project.lane}</a>
      <p class="eyebrow">${project.kind} / ${project.status}</p>
      <h1>${project.name}</h1>
      <p>${project.summary}</p>
      <div class="detail-actions">
        <a class="solid-button" href="${project.url}" target="_blank" rel="noreferrer"><i data-lucide="external-link"></i> Open source page</a>
        <a class="ghost-button" href="ai.html?q=${encodeURIComponent(project.name)}"><i data-lucide="message-square-text"></i> Ask the AI</a>
      </div>
    </header>

    <section class="project-page-layout">
      <div class="project-main-panel">
        <div class="project-page-media">${renderImage(project, "detail")}</div>
        <h2>Research Notes</h2>
        <p>${project.notes}</p>
        <div class="artifact-row large">
          ${Object.entries(artifactLabels)
            .map(([key, label]) => `<span class="artifact ${project.artifacts[key] ? "on" : ""}">${label}</span>`)
            .join("")}
        </div>
        <h2>Evidence</h2>
        <ul class="evidence-list">
          ${project.evidence
            .map(([label, href]) => `<li><a href="${href}" target="_blank" rel="noreferrer">${label}</a></li>`)
            .join("")}
        </ul>
      </div>

      <aside class="project-side-panel">
        <div class="detail-meta stacked">
          <div><span>Lane</span><strong><a href="${laneHref(project.lane)}">${project.lane}</a></strong></div>
          <div><span>Maturity</span><strong>${project.maturity}</strong></div>
          <div><span>Maintainer</span><strong>${project.maintainer}</strong></div>
          <div><span>Cost</span><strong>${project.cost}</strong></div>
        </div>
        <div class="score-row stacked">
          ${renderScore("Open readiness", project.signals.readiness)}
          ${renderScore("Shipping velocity", project.signals.velocity)}
          ${renderScore("Home robot fit", project.signals.homeFit)}
        </div>
        <div class="tag-row spaced">
          ${project.tags.map((tag) => `<span class="tag">${tag}</span>`).join("")}
        </div>
      </aside>
    </section>

    <section class="dashboard-section">
      <div class="section-heading">
        <div>
          <p class="eyebrow">Related</p>
          <h2>More in ${project.lane}</h2>
        </div>
      </div>
      <div class="project-grid">
        ${siblings.map(renderProjectCard).join("")}
      </div>
    </section>
  `;
}

function initAgentsPage() {
  const total = document.querySelector("#agent-catalog-total");
  if (total) total.textContent = projects.length;
}

function initAiPage() {
  const chatLog = document.querySelector("#chat-log");
  const chatForm = document.querySelector("#chat-form");
  const chatInput = document.querySelector("#chat-input");
  const memoryForm = document.querySelector("#memory-form");
  const memoryList = document.querySelector("#memory-list");
  if (!chatLog || !chatForm || !chatInput || !memoryForm || !memoryList) return;

  renderCommunityMemory(memoryList);
  addMessage(
    chatLog,
    "ai",
    "Ask me what to build, which projects have CAD/BOM/docs, what lanes are underbuilt, or where your own work fits. I will answer from the current catalog and then ask you what you have been seeing."
  );

  const params = new URLSearchParams(window.location.search);
  const initial = params.get("q");
  if (initial) {
    chatInput.value = initial;
    answerQuestion(chatInput.value, chatLog);
    chatInput.value = "";
  }

  document.querySelectorAll("[data-prompt]").forEach((button) => {
    button.addEventListener("click", () => {
      chatInput.value = button.dataset.prompt;
      answerQuestion(chatInput.value, chatLog);
      chatInput.value = "";
    });
  });

  chatForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const question = chatInput.value.trim();
    if (!question) return;
    answerQuestion(question, chatLog);
    chatInput.value = "";
  });

  memoryForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(memoryForm);
    const note = {
      name: String(formData.get("name") || "Anonymous builder").trim(),
      focus: String(formData.get("focus") || "Open robotics").trim(),
      body: String(formData.get("body") || "").trim(),
      createdAt: new Date().toISOString()
    };
    if (!note.body) return;
    const notes = loadCommunityNotes();
    notes.unshift(note);
    localStorage.setItem("orn-community-notes", JSON.stringify(notes.slice(0, 25)));
    memoryForm.reset();
    renderCommunityMemory(memoryList);
    addMessage(
      chatLog,
      "ai",
      `Logged locally: ${note.focus}. The production version should ask for explicit consent, then feed notes like this into a community memory and review queue. What evidence, repo, demo, or build log should we ask you for next?`
    );
  });
}

function renderScore(label, value) {
  return `
    <div class="score-mini">
      <span><b>${label}</b><b>${value}</b></span>
      <div class="bar"><i style="width: ${value}%"></i></div>
    </div>
  `;
}

function renderImage(project, mode) {
  const fallback = `<div class="media-fallback">${project.name}</div>`;
  if (!project.image) return fallback;
  return `<img src="${project.image}" alt="${project.name}" loading="${mode === "card" ? "lazy" : "eager"}" onerror="this.replaceWith(Object.assign(document.createElement('div'), { className: 'media-fallback', textContent: this.alt }))" />`;
}

function hasStairSignal(project) {
  return [project.name, project.lane, project.summary, ...project.tags].join(" ").toLowerCase().includes("stair");
}

function average(values) {
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

function refreshLucide() {
  if (window.lucide) {
    window.lucide.createIcons();
  }
}

document.addEventListener("DOMContentLoaded", init);
