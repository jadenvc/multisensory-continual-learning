// Project content adapted from the existing index.html for the shared template.
// Open preview.html locally. Edit this file and refresh to update the preview.
// siteUrl follows the GitHub Pages URL for this repository; confirm before publishing.
// Web videos preserve original files; rollout speed is baked into the web copies.
window.PAPER_CONTENT = {
  "schemaVersion": 1,
  "sectionOrder": [
    "overview",
    "method",
    "results",
    "crossmodal",
    "forward-transfer",
    "backward-transfer",
    "questions",
    "citation",
    "acknowledgements"
  ],
  "theme": {
    "accent": "#1a52c8",
    "text": "#253243",
    "tintBackground": false,
    "backgroundTintPercent": 0,
    "codeTintPercent": 8
  },
  "media": {
    "autoplay": true,
    "pauseOthers": false,
    "maxConcurrentVideos": 24
  },
  "paper": {
    "name": "Multisensory Continual Learning",
    "title": "Adapting Pretrained Visuomotor Policies to Force",
    "description": "Project page for multisensory continual learning in robot manipulation from Stanford University.",
    "siteUrl": "https://jadenvc.github.io/multisensory-continual-learning/",
    "socialImage": "assets/paper-figures/teaser-v9.png",
    "analyticsId": "",
    "authors": [
      {
        "name": "Jaden Clark",
        "website": "https://jadenvc.github.io/",
        "affiliations": [
          "1"
        ]
      },
      {
        "name": "Changhao Wang",
        "website": "https://changhaowang.github.io/",
        "affiliations": [
          "1"
        ]
      },
      {
        "name": "Yihuai Gao",
        "website": "https://yihuai-gao.github.io/",
        "affiliations": [
          "1"
        ]
      },
      {
        "name": "Seongheon Hong",
        "website": "https://www.linkedin.com/in/seongheon/",
        "affiliations": [
          "1"
        ]
      },
      {
        "name": "Hojung Choi",
        "website": "https://www.hojungchoi.com/",
        "affiliations": [
          "1"
        ]
      },
      {
        "name": "Mark Cutkosky",
        "website": "https://bdml.stanford.edu/pmwiki/pmwiki.php/Profiles/MarkCutkosky",
        "affiliations": [
          "1"
        ]
      },
      {
        "name": "Yifan Hou",
        "website": "https://yifan-hou.github.io/",
        "affiliations": [
          "1"
        ]
      },
      {
        "name": "Shuran Song",
        "website": "https://shurans.github.io/",
        "affiliations": [
          "1"
        ]
      }
    ],
    "affiliations": [
      {
        "id": "1",
        "name": "Stanford University",
        "website": ""
      }
    ],
    "authorNotes": "",
    "conference": "Conference on Robot Learning 2026\n🏆 CoRL Pretrain to Adapt Spotlight\n🏆 NeurIPS Robot Learning with World Models Best Paper Finalist",
    "links": [
      {
        "label": "Paper",
        "url": "https://arxiv.org/abs/2606.30988"
      },
      {
        "label": "Code",
        "url": "https://github.com/jadenvc/multisensory_wm/blob/main/README.md"
      }
    ],
    "logos": [],
    "video": {
      "src": "assets/web/intro.mp4",
      "gif": true,
      "alt": "MuSe multisensory robot manipulation demonstration",
      "title": "",
      "caption": "",
      "loop": true,
      "width": 1904,
      "height": 600,
      "poster": "assets/web/posters/intro.jpg",
      "originalSrc": "assets/intro.mp4",
      "playbackRate": 1.5
    }
  },
  "overview": {
    "title": "Q: How do we train a multisensory world-action model?",
    "navTitle": "Overview",
    "paragraphs": [
      "A: Add new modalities during post-training! We find that strong base models can be quickly adapted to small multisensory datasets without losing their generality.",
      "Adding new sensor modalities is key for contact-rich tasks, but we lack the data to scale multisensory foundation models. What if all our data doesn't need to contain multisensory observations? With MultiSensory World Model (MuSe), multitask visuomotor policies such as VLAs, Video-Action Models, or World-Action Models learn new modalities during finetuning (such as force or tactile) with only a fraction of the pretraining data. We find MuSe:",
      {
        "bullets": [
          "improves visual generalization from broad-scale pretraining (forward transfer)",
          "leverages new modality to improve on pretraining tasks that do not exist in minimal finetuning stage (backward transfer)"
        ]
      },
      "MuSe provides a scalable pathway to training large-scale multisensory robot policies and world models with practical data composition: large amounts of visual pretraining data, robot vision-action data, and a small amount of diverse multisensory data such as force, tactile, or audio."
    ]
  },
  "method": {
    "title": "How does MuSe work?",
    "navTitle": "Method",
    "blocks": [
      {
        "videos": [
          {
            "src": "assets/web/method.mp4",
            "gif": true,
            "alt": "MuSe method overview",
            "title": "MuSe method overview",
            "caption": "",
            "loop": true,
            "width": 2560,
            "height": 994,
            "poster": "assets/web/posters/method.jpg",
            "originalSrc": "assets/method.mp4",
            "playbackRate": 1
          }
        ]
      },
      {
        "paragraphs": [
          "Incorporating new modalities requires the model to reason over new input dimensions, without either over-relying on or ignoring them. This requires an algorithm that avoids catastrophic forgetting of knowledge acquired during pretraining while properly incorporating new input modalities through an effective cross-modal representation. We design MuSe to achieve this using three key mechanisms:"
        ]
      },
      {
        "layout": "figure-wrap",
        "figure": {
          "src": "assets/paper-figures/method_detail.png",
          "alt": "MuSe method detail figure.",
          "caption": "",
          "width": 2199,
          "height": 2400
        },
        "orderedList": [
          {
            "title": "Multisensory Prediction Targets",
            "paragraphs": [
              "The model predicts future actions, future visual observations, and future F/T signals, encouraging a shared representation grounded in both visual dynamics and contact."
            ]
          },
          {
            "title": "Multi-stage (early + late) fusion",
            "paragraphs": [
              "Language, images, and actions are combined with token concatenation (early fusion). F/T conditioning is further amplified via cross-attention adapters (late fusion)."
            ]
          },
          {
            "title": "Experience replay",
            "paragraphs": [
              "Finetuning mixes new multisensory data with the original pretraining data. The original pretraining data does not contain F/T inputs, so we use optional masking in replay when F/T is not available. This enables preserving old skills while adding the new modality."
            ]
          }
        ]
      }
    ]
  },
  "results": {
    "title": "How is MuSe trained and evaluated?",
    "navTitle": "Results",
    "blocks": [
      {
        "figure": {
          "src": "assets/paper-figures/ew2_v2.svg",
          "alt": "Dataset overview: 1,271 pretraining episodes across 21 tasks and 434 force-labeled finetuning episodes across 5 contact-rich tasks.",
          "caption": "Pretraining uses 1,271 vision-action episodes across 21 tasks. Finetuning adds 434 force-labeled episodes across 5 contact-rich tasks.",
          "width": 906,
          "height": 489
        }
      },
      {
        "paragraphs": [
          "We evaluate MuSe in the context of multisensory continual learning: the challenge of extending a pretrained policy to incorporate new sensory modalities for new tasks, while retaining performance on the original tasks. To do so we evaluate representation learning, forward transfer (performance on finetuning tasks), and backward transfer (performance on pretraining tasks with new sensor modality)."
        ]
      },
      {
        "figure": {
          "src": "assets/paper-figures/results2.svg",
          "alt": "Results overview.",
          "caption": "",
          "width": 884,
          "height": 248
        }
      }
    ]
  },
  "crossmodal": {
    "title": "Does MuSe learn effective cross-modal representations?",
    "blocks": [
      {
        "title": "MuSe predicts force where force was never supervised.",
        "paragraphs": [
          "After learning from limited multisensory finetuning data, MuSe can predict F/T traces on pretraining tasks that only used vision-action supervision.",
          "Shared multisensory representation: F/T prediction on unlabeled pretraining tasks suggests the model learns a shared multisensory representation that transfers beyond the finetuning distribution.",
          [
            {
              "text": "Adaptive compliance",
              "url": "https://adaptive-compliance.github.io/"
            },
            " at runtime: predicted future F/T provides a contact profile that can set compliance targets during deployment."
          ]
        ]
      },
      {
        "videos": [
          {
            "src": "assets/web/paper-figures/crossmodal.mp4",
            "alt": "Orange curves show MuSe force predictions aligned with measured F/T signals on pretraining tasks where force labels were withheld during training.",
            "title": "",
            "caption": "Orange curves show MuSe force predictions aligned with measured F/T signals on pretraining tasks where force labels were withheld during training.",
            "loop": true,
            "width": 1280,
            "height": 686,
            "poster": "assets/web/posters/paper-figures/crossmodal.jpg",
            "originalSrc": "assets/paper-figures/crossmodal.mp4",
            "playbackRate": 2
          }
        ]
      }
    ]
  },
  "forward-transfer": {
    "title": "MuSe leverages F/T sensing to improve on finetuning tasks",
    "navTitle": "Rollouts",
    "paragraphs": [
      "+35% over baselines without F/T on contact-rich finetuning tasks"
    ],
    "carousel": {
      "label": "Forward transfer tasks",
      "slides": [
        {
          "title": "Vase Wiping",
          "paragraphs": [
            "To wipe the vase, the policy leverages F/T sensing to sense when contact with the vase is made and adjusts its compliance to apply sufficient force to maintain contact and follow the curved surface, but not so much force that it jams into the vase and breaks the F/T limit set on the robot arm."
          ],
          "playbackRate": 3,
          "groups": [
            {
              "title": "MuSe",
              "blocks": [
                {
                  "videos": [
                    {
                      "src": "assets/web/rollouts/forward/vase_wiping/ours_orange.mp4",
                      "alt": "Generalize to erasing orange drawing that doesn't exist in finetuning data.",
                      "title": "MuSe",
                      "caption": "Generalize to erasing orange drawing that doesn't exist in finetuning data.",
                      "loop": true,
                      "width": 640,
                      "height": 360,
                      "poster": "assets/web/posters/rollouts/forward/vase_wiping/ours_orange.jpg",
                      "originalSrc": "assets/rollouts/forward/vase_wiping/ours_orange.mp4",
                      "playbackRate": 1
                    },
                    {
                      "src": "assets/web/rollouts/forward/vase_wiping/ours_middle.mp4",
                      "alt": "Tracks the middle surface and regulates pressure through the wipe.",
                      "title": "MuSe",
                      "caption": "Tracks the middle surface and regulates pressure through the wipe.",
                      "loop": true,
                      "width": 640,
                      "height": 360,
                      "poster": "assets/web/posters/rollouts/forward/vase_wiping/ours_middle.jpg",
                      "originalSrc": "assets/rollouts/forward/vase_wiping/ours_middle.mp4",
                      "playbackRate": 1
                    },
                    {
                      "src": "assets/web/rollouts/forward/vase_wiping/ours_big.mp4",
                      "alt": "Generalize to a larger eraser without applying too much force.",
                      "title": "MuSe",
                      "caption": "Generalize to a larger eraser without applying too much force.",
                      "loop": true,
                      "width": 640,
                      "height": 360,
                      "poster": "assets/web/posters/rollouts/forward/vase_wiping/ours_big.jpg",
                      "originalSrc": "assets/rollouts/forward/vase_wiping/ours_big.mp4",
                      "playbackRate": 1
                    },
                    {
                      "src": "assets/web/rollouts/forward/vase_wiping/muse_big_eraser_success.mp4",
                      "alt": "Successfully wipes the vase with a larger eraser while maintaining safe contact.",
                      "title": "MuSe",
                      "caption": "Successfully wipes the vase with a larger eraser while maintaining safe contact.",
                      "loop": true,
                      "width": 640,
                      "height": 360,
                      "poster": "assets/web/posters/rollouts/forward/vase_wiping/muse_big_eraser_success.jpg",
                      "originalSrc": "assets/rollouts/forward/vase_wiping/muse_big_eraser_success.mp4",
                      "playbackRate": 1
                    }
                  ]
                },
                {
                  "paragraphs": [
                    "Use force feedback to maintain contact with the curved vase.",
                    "Adjust compliance to maintain forceful but safe contact across drawing configurations and colors."
                  ]
                }
              ],
              "metric": "77% success"
            },
            {
              "title": "No Pretrain",
              "metric": "53% success",
              "blocks": [
                {
                  "videos": [
                    {
                      "src": "assets/web/rollouts/forward/vase_wiping/no_pretrain_fail.mp4",
                      "alt": "Less robust to different drawing appearances and vase variations.",
                      "title": "No Pretrain",
                      "caption": "Less robust to different drawing appearances and vase variations.",
                      "loop": true,
                      "width": 640,
                      "height": 360,
                      "poster": "assets/web/posters/rollouts/forward/vase_wiping/no_pretrain_fail.jpg",
                      "originalSrc": "assets/rollouts/forward/vase_wiping/no_pretrain_fail.mp4",
                      "playbackRate": 1
                    },
                    {
                      "src": "assets/web/rollouts/forward/vase_wiping/no_pretrain_orange_ood.mp4",
                      "alt": "Fails to generalize to an out-of-distribution orange drawing.",
                      "title": "No Pretrain",
                      "caption": "Fails to generalize to an out-of-distribution orange drawing.",
                      "loop": true,
                      "width": 640,
                      "height": 360,
                      "poster": "assets/web/posters/rollouts/forward/vase_wiping/no_pretrain_orange_ood.jpg",
                      "originalSrc": "assets/rollouts/forward/vase_wiping/no_pretrain_orange_ood.mp4",
                      "playbackRate": 1
                    }
                  ]
                },
                {
                  "paragraphs": [
                    "Fail to generalize to unseen drawings and vase variations without pretraining."
                  ]
                }
              ]
            },
            {
              "title": "No F/T",
              "metric": "33% success",
              "blocks": [
                {
                  "videos": [
                    {
                      "src": "assets/web/rollouts/forward/vase_wiping/no_ft_weak.mp4",
                      "alt": "Applies too little force, leaving the drawing partially unerased.",
                      "title": "No F/T",
                      "caption": "Applies too little force, leaving the drawing partially unerased.",
                      "loop": true,
                      "width": 640,
                      "height": 360,
                      "poster": "assets/web/posters/rollouts/forward/vase_wiping/no_ft_weak.jpg",
                      "originalSrc": "assets/rollouts/forward/vase_wiping/no_ft_weak.mp4",
                      "playbackRate": 1
                    },
                    {
                      "src": "assets/web/rollouts/forward/vase_wiping/no_ft_stuck.mp4",
                      "alt": "Gets stuck against the vase after reaching the F/T safety limit.",
                      "title": "No F/T",
                      "caption": "Gets stuck against the vase after reaching the F/T safety limit.",
                      "loop": true,
                      "width": 640,
                      "height": 360,
                      "poster": "assets/web/posters/rollouts/forward/vase_wiping/no_ft_stuck.jpg",
                      "originalSrc": "assets/rollouts/forward/vase_wiping/no_ft_stuck.mp4",
                      "playbackRate": 1
                    }
                  ]
                },
                {
                  "paragraphs": [
                    "Apply insufficient force or exceed the F/T safety limit without force feedback."
                  ]
                }
              ]
            }
          ]
        },
        {
          "title": "Peg Insertion",
          "paragraphs": [
            "The policy must fully insert the peg into a hole. The hole angle varies between ±20 degrees and contains high friction and serrations. This means the policy must leverage F/T feedback to assess the direction it must push into the hole and adjust its compliance to stay stiff in the direction of the hole but remain compliant in other directions. The policy can also leverage F/T feedback to find the hole if the initial insertion is imprecise."
          ],
          "playbackRate": 3,
          "groups": [
            {
              "title": "MuSe",
              "blocks": [
                {
                  "videos": [
                    {
                      "src": "assets/web/rollouts/forward/peg_insertion/ours_back_tilt.mp4",
                      "alt": "Adapts to a backward-tilted hole and completes insertion.",
                      "title": "MuSe",
                      "caption": "Adapts to a backward-tilted hole and completes insertion.",
                      "loop": true,
                      "width": 640,
                      "height": 360,
                      "poster": "assets/web/posters/rollouts/forward/peg_insertion/ours_back_tilt.jpg",
                      "originalSrc": "assets/rollouts/forward/peg_insertion/ours_back_tilt.mp4",
                      "playbackRate": 1
                    },
                    {
                      "src": "assets/web/rollouts/forward/peg_insertion/ours_forward_tilt.mp4",
                      "alt": "Predicts high force before contact - decreasing stiffness and preventing robot from jamming and breaking F/T limit.",
                      "title": "MuSe",
                      "caption": "Predicts high force before contact - decreasing stiffness and preventing robot from jamming and breaking F/T limit.",
                      "loop": true,
                      "width": 640,
                      "height": 360,
                      "poster": "assets/web/posters/rollouts/forward/peg_insertion/ours_forward_tilt.jpg",
                      "originalSrc": "assets/rollouts/forward/peg_insertion/ours_forward_tilt.mp4",
                      "playbackRate": 1
                    },
                    {
                      "src": "assets/web/rollouts/forward/peg_insertion/ours_back.mp4",
                      "alt": "Identify correct hole orientation and fully insert peg.",
                      "title": "MuSe",
                      "caption": "Identify correct hole orientation and fully insert peg.",
                      "loop": true,
                      "width": 640,
                      "height": 360,
                      "poster": "assets/web/posters/rollouts/forward/peg_insertion/ours_back.jpg",
                      "originalSrc": "assets/rollouts/forward/peg_insertion/ours_back.mp4",
                      "playbackRate": 1
                    }
                  ]
                },
                {
                  "figure": {
                    "src": "assets/rollouts/forward/peg_insertion/peg_angles_serrations.png",
                    "alt": "Peg insertion holes at varying angles with internal serrations.",
                    "width": 870,
                    "height": 594,
                    "caption": "Policy adapts to insert peg in holes at varying angles (±20 degrees) with serrations that easily cause jams."
                  }
                },
                {
                  "paragraphs": [
                    "Use F/T feedback to precisely insert the peg, identify hole angle, and escape serrations. Generalize to different peg sizes."
                  ]
                }
              ],
              "metric": "87% success"
            },
            {
              "title": "No Pretrain",
              "metric": "40% success",
              "blocks": [
                {
                  "videos": [
                    {
                      "src": "assets/web/rollouts/forward/peg_insertion/no_pretrain_misses.mp4",
                      "alt": "Misses the insertion target.",
                      "title": "No Pretrain",
                      "caption": "Misses the insertion target.",
                      "loop": true,
                      "width": 640,
                      "height": 360,
                      "poster": "assets/web/posters/rollouts/forward/peg_insertion/no_pretrain_misses.jpg",
                      "originalSrc": "assets/rollouts/forward/peg_insertion/no_pretrain_misses.mp4",
                      "playbackRate": 1
                    },
                    {
                      "src": "assets/web/rollouts/forward/peg_insertion/no_pretrain_stuck.mp4",
                      "alt": "Gets stuck after contact due to high forces and struggles to generalize without pretraining.",
                      "title": "No Pretrain",
                      "caption": "Gets stuck after contact due to high forces and struggles to generalize without pretraining.",
                      "loop": true,
                      "width": 640,
                      "height": 360,
                      "poster": "assets/web/posters/rollouts/forward/peg_insertion/no_pretrain_stuck.jpg",
                      "originalSrc": "assets/rollouts/forward/peg_insertion/no_pretrain_stuck.mp4",
                      "playbackRate": 1
                    }
                  ]
                },
                {
                  "paragraphs": [
                    "Miss the insertion target or struggle to generalize without broad visual pretraining."
                  ]
                }
              ]
            },
            {
              "title": "No F/T",
              "metric": "60% success",
              "blocks": [
                {
                  "videos": [
                    {
                      "src": "assets/web/rollouts/forward/peg_insertion/no_ft_back_fall.mp4",
                      "alt": "Breaks the F/T limit during insertion.",
                      "title": "No F/T",
                      "caption": "Breaks the F/T limit during insertion.",
                      "loop": true,
                      "width": 640,
                      "height": 360,
                      "poster": "assets/web/posters/rollouts/forward/peg_insertion/no_ft_back_fall.jpg",
                      "originalSrc": "assets/rollouts/forward/peg_insertion/no_ft_back_fall.mp4",
                      "playbackRate": 1
                    },
                    {
                      "src": "assets/web/rollouts/forward/peg_insertion/no_ft_tall_stuck.mp4",
                      "alt": "Cannot adapt its compliance profile and breaks the F/T limit on impact.",
                      "title": "No F/T",
                      "caption": "Cannot adapt its compliance profile and breaks the F/T limit on impact.",
                      "loop": true,
                      "width": 640,
                      "height": 360,
                      "poster": "assets/web/posters/rollouts/forward/peg_insertion/no_ft_tall_stuck.jpg",
                      "originalSrc": "assets/rollouts/forward/peg_insertion/no_ft_tall_stuck.mp4",
                      "playbackRate": 1
                    }
                  ]
                },
                {
                  "paragraphs": [
                    "Jam or get stuck without force feedback for contact-aware adaptation."
                  ]
                }
              ]
            }
          ]
        },
        {
          "title": "Pick and Place",
          "paragraphs": [
            "The policy must place the can in the bowl with various distractors and bowl color changes. The policy without pretraining struggles to generalize."
          ],
          "playbackRate": 3,
          "groups": [
            {
              "title": "MuSe",
              "blocks": [
                {
                  "videos": [
                    {
                      "src": "assets/web/rollouts/forward/pick_and_place/ours_distractor.mp4",
                      "alt": "Robustness to distractors",
                      "title": "MuSe",
                      "caption": "Robustness to distractors",
                      "loop": true,
                      "width": 640,
                      "height": 360,
                      "poster": "assets/web/posters/rollouts/forward/pick_and_place/ours_distractor.jpg",
                      "originalSrc": "assets/rollouts/forward/pick_and_place/ours_distractor.mp4",
                      "playbackRate": 1
                    },
                    {
                      "src": "assets/web/rollouts/forward/pick_and_place/ours_red.mp4",
                      "alt": "Robustness to object colors",
                      "title": "MuSe",
                      "caption": "Robustness to object colors",
                      "loop": true,
                      "width": 640,
                      "height": 360,
                      "poster": "assets/web/posters/rollouts/forward/pick_and_place/ours_red.jpg",
                      "originalSrc": "assets/rollouts/forward/pick_and_place/ours_red.mp4",
                      "playbackRate": 1
                    },
                    {
                      "src": "assets/web/rollouts/forward/pick_and_place/ours_lr.mp4",
                      "alt": "Robustness to object configurations",
                      "title": "MuSe",
                      "caption": "Robustness to object configurations",
                      "loop": true,
                      "width": 640,
                      "height": 360,
                      "poster": "assets/web/posters/rollouts/forward/pick_and_place/ours_lr.jpg",
                      "originalSrc": "assets/rollouts/forward/pick_and_place/ours_lr.mp4",
                      "playbackRate": 1
                    },
                    {
                      "src": "assets/web/rollouts/forward/pick_and_place/ours_easy.mp4",
                      "alt": "Robustness to object configurations",
                      "title": "MuSe",
                      "caption": "Robustness to object configurations",
                      "loop": true,
                      "width": 640,
                      "height": 360,
                      "poster": "assets/web/posters/rollouts/forward/pick_and_place/ours_easy.jpg",
                      "originalSrc": "assets/rollouts/forward/pick_and_place/ours_easy.mp4",
                      "playbackRate": 1
                    }
                  ]
                },
                {
                  "paragraphs": [
                    "Remain robust to visual changes and distractors."
                  ]
                }
              ],
              "metric": "75% success"
            },
            {
              "title": "No Pretrain",
              "blocks": [
                {
                  "videos": [
                    {
                      "src": "assets/web/rollouts/forward/pick_and_place/no_pretrain_distractor_fail.mp4",
                      "alt": "Struggles with distractors and task variation without broad visual pretraining.",
                      "title": "No Pretrain",
                      "caption": "Struggles with distractors and task variation without broad visual pretraining.",
                      "loop": true,
                      "width": 640,
                      "height": 360,
                      "poster": "assets/web/posters/rollouts/forward/pick_and_place/no_pretrain_distractor_fail.jpg",
                      "originalSrc": "assets/rollouts/forward/pick_and_place/no_pretrain_distractor_fail.mp4",
                      "playbackRate": 1
                    },
                    {
                      "src": "assets/web/rollouts/forward/pick_and_place/no_pretrain_red.mp4",
                      "alt": "Decreased performance under visual changes.",
                      "title": "No Pretrain",
                      "caption": "Decreased performance under visual changes.",
                      "loop": true,
                      "width": 640,
                      "height": 360,
                      "poster": "assets/web/posters/rollouts/forward/pick_and_place/no_pretrain_red.jpg",
                      "originalSrc": "assets/rollouts/forward/pick_and_place/no_pretrain_red.mp4",
                      "playbackRate": 1
                    }
                  ]
                },
                {
                  "paragraphs": [
                    "Fail with distractors and visual changes without pretraining."
                  ]
                }
              ],
              "metric": "50% success"
            }
          ]
        }
      ]
    }
  },
  "backward-transfer": {
    "title": "MuSe improves performance on pretraining tasks",
    "paragraphs": [
      "+20% over pretrained model on pretraining tasks"
    ],
    "carousel": {
      "label": "Backward transfer tasks",
      "slides": [
        {
          "title": "Whiteboard Wiping",
          "paragraphs": [
            "To erase the drawing, the policy leverages F/T sensing to sense when contact with the board is made and adjusts its compliance to apply sufficient force to erase the drawing, but not so much force that it jams into the table, moves the whiteboard, or breaks the F/T limit set on the robot arm."
          ],
          "playbackRate": 3,
          "groups": [
            {
              "title": "MuSe",
              "blocks": [
                {
                  "videos": [
                    {
                      "src": "assets/web/rollouts/backward/whiteboard_wiping/ours_back_right.mp4",
                      "alt": "Adjusts compliance profile to maintain forceful but safe contact.",
                      "title": "MuSe",
                      "caption": "Adjusts compliance profile to maintain forceful but safe contact.",
                      "loop": true,
                      "width": 640,
                      "height": 360,
                      "poster": "assets/web/posters/rollouts/backward/whiteboard_wiping/ours_back_right.jpg",
                      "originalSrc": "assets/rollouts/backward/whiteboard_wiping/ours_back_right.mp4",
                      "playbackRate": 1
                    },
                    {
                      "src": "assets/web/rollouts/backward/whiteboard_wiping/ours_pickup.mp4",
                      "alt": "Adapt to varying initial conditions.",
                      "title": "MuSe",
                      "caption": "Adapt to varying initial conditions.",
                      "loop": true,
                      "width": 640,
                      "height": 360,
                      "poster": "assets/web/posters/rollouts/backward/whiteboard_wiping/ours_pickup.jpg",
                      "originalSrc": "assets/rollouts/backward/whiteboard_wiping/ours_pickup.mp4",
                      "playbackRate": 1
                    },
                    {
                      "src": "assets/web/rollouts/backward/whiteboard_wiping/ours_back.mp4",
                      "alt": "Erase drawings in varying locations.",
                      "title": "MuSe",
                      "caption": "Erase drawings in varying locations.",
                      "loop": true,
                      "width": 640,
                      "height": 360,
                      "poster": "assets/web/posters/rollouts/backward/whiteboard_wiping/ours_back.jpg",
                      "originalSrc": "assets/rollouts/backward/whiteboard_wiping/ours_back.mp4",
                      "playbackRate": 1
                    },
                    {
                      "src": "assets/web/rollouts/backward/whiteboard_wiping/ours_middle_back.mp4",
                      "alt": "Erase drawings in varying locations.",
                      "title": "MuSe",
                      "caption": "Erase drawings in varying locations.",
                      "loop": true,
                      "width": 640,
                      "height": 360,
                      "poster": "assets/web/posters/rollouts/backward/whiteboard_wiping/ours_middle_back.jpg",
                      "originalSrc": "assets/rollouts/backward/whiteboard_wiping/ours_middle_back.mp4",
                      "playbackRate": 1
                    }
                  ]
                },
                {
                  "paragraphs": [
                    "Use F/T feedback to identify contact with the board. Accurate F/T predictions enable compliance adaptation for forceful but safe contact."
                  ]
                }
              ],
              "metric": "83% success"
            },
            {
              "title": "Pretrain Only",
              "metric": "57% success",
              "blocks": [
                {
                  "videos": [
                    {
                      "src": "assets/web/rollouts/backward/whiteboard_wiping/pretrain_stuck.mp4",
                      "alt": "No F/T feedback means the model cannot adapt its compliance - resulting in breaking F/T limit on contact.",
                      "title": "Pretrain Only",
                      "caption": "No F/T feedback means the model cannot adapt its compliance - resulting in breaking F/T limit on contact.",
                      "loop": true,
                      "width": 640,
                      "height": 360,
                      "poster": "assets/web/posters/rollouts/backward/whiteboard_wiping/pretrain_stuck.jpg",
                      "originalSrc": "assets/rollouts/backward/whiteboard_wiping/pretrain_stuck.mp4",
                      "playbackRate": 1
                    },
                    {
                      "src": "assets/web/rollouts/backward/whiteboard_wiping/pretrain_not_hard.mp4",
                      "alt": "Applies insufficient force (no F/T feedback means it cannot react to forces or adjust stiffness).",
                      "title": "Pretrain Only",
                      "caption": "Applies insufficient force (no F/T feedback means it cannot react to forces or adjust stiffness).",
                      "loop": true,
                      "width": 640,
                      "height": 360,
                      "poster": "assets/web/posters/rollouts/backward/whiteboard_wiping/pretrain_not_hard.jpg",
                      "originalSrc": "assets/rollouts/backward/whiteboard_wiping/pretrain_not_hard.mp4",
                      "playbackRate": 1
                    }
                  ]
                },
                {
                  "paragraphs": [
                    "Break the F/T limit, jam into the board, or fail to detect board contact."
                  ]
                }
              ]
            },
            {
              "title": "No ER",
              "metric": "3% success",
              "blocks": [
                {
                  "videos": [
                    {
                      "src": "assets/web/rollouts/backward/whiteboard_wiping/no_er_back.mp4",
                      "alt": "Forgets the original wiping behavior after multisensory finetuning.",
                      "title": "No ER",
                      "caption": "Forgets the original wiping behavior after multisensory finetuning.",
                      "loop": true,
                      "width": 640,
                      "height": 360,
                      "poster": "assets/web/posters/rollouts/backward/whiteboard_wiping/no_er_back.jpg",
                      "originalSrc": "assets/rollouts/backward/whiteboard_wiping/no_er_back.mp4",
                      "playbackRate": 1
                    },
                    {
                      "src": "assets/web/rollouts/backward/whiteboard_wiping/no_er_middle.mp4",
                      "alt": "Forgets the original wiping behavior after multisensory finetuning.",
                      "title": "No ER",
                      "caption": "Forgets the original wiping behavior after multisensory finetuning.",
                      "loop": true,
                      "width": 640,
                      "height": 360,
                      "poster": "assets/web/posters/rollouts/backward/whiteboard_wiping/no_er_middle.jpg",
                      "originalSrc": "assets/rollouts/backward/whiteboard_wiping/no_er_middle.mp4",
                      "playbackRate": 1
                    }
                  ]
                },
                {
                  "paragraphs": [
                    "Forget the task and fail after finetuning."
                  ]
                }
              ]
            }
          ]
        },
        {
          "title": "Peg Insertion",
          "paragraphs": [
            "The policy must leverage F/T sensing to adjust its compliance, find the direction of the hole, and release the peg from internal high-friction serrations. Backward transfer tests pegs with different sizes, shapes (rectangular and small cylindrical pegs that demand different strategies than the finetuning pegs), and colors to assess whether the model preserves strategies from pretraining that may interfere with finetuning strategies."
          ],
          "playbackRate": 6,
          "groups": [
            {
              "title": "MuSe",
              "blocks": [
                {
                  "videos": [
                    {
                      "src": "assets/web/rollouts/backward/peg_insertion/ours_red_green.mp4",
                      "alt": "Inserts a red rectangular peg in a green hole (configuration seen in pretraining but not finetuning).",
                      "title": "MuSe",
                      "caption": "Inserts a red rectangular peg in a green hole (configuration seen in pretraining but not finetuning).",
                      "loop": true,
                      "width": 640,
                      "height": 360,
                      "poster": "assets/web/posters/rollouts/backward/peg_insertion/ours_red_green.jpg",
                      "originalSrc": "assets/rollouts/backward/peg_insertion/ours_red_green.mp4",
                      "playbackRate": 1
                    },
                    {
                      "src": "assets/web/rollouts/backward/peg_insertion/ours_rpg_good.mp4",
                      "alt": "Inserts a red rectangular peg in a green hole (configuration seen in pretraining but not finetuning).",
                      "title": "MuSe",
                      "caption": "Inserts a red rectangular peg in a green hole (configuration seen in pretraining but not finetuning).",
                      "loop": true,
                      "width": 640,
                      "height": 360,
                      "poster": "assets/web/posters/rollouts/backward/peg_insertion/ours_rpg_good.jpg",
                      "originalSrc": "assets/rollouts/backward/peg_insertion/ours_rpg_good.mp4",
                      "playbackRate": 1
                    },
                    {
                      "src": "assets/web/rollouts/backward/peg_insertion/ours_purple.mp4",
                      "alt": "Regulate contact to insert small circular purple peg in white hole (configuration seen in pretraining but not finetuning).",
                      "title": "MuSe",
                      "caption": "Regulate contact to insert small circular purple peg in white hole (configuration seen in pretraining but not finetuning).",
                      "loop": true,
                      "width": 640,
                      "height": 360,
                      "poster": "assets/web/posters/rollouts/backward/peg_insertion/ours_purple.jpg",
                      "originalSrc": "assets/rollouts/backward/peg_insertion/ours_purple.mp4",
                      "playbackRate": 1
                    },
                    {
                      "src": "assets/web/rollouts/backward/peg_insertion/ours_purple2.mp4",
                      "alt": "Regulate contact to insert small circular purple peg in white hole (configuration seen in pretraining but not finetuning).",
                      "title": "MuSe",
                      "caption": "Regulate contact to insert small circular purple peg in white hole (configuration seen in pretraining but not finetuning).",
                      "loop": true,
                      "width": 640,
                      "height": 360,
                      "poster": "assets/web/posters/rollouts/backward/peg_insertion/ours_purple2.jpg",
                      "originalSrc": "assets/rollouts/backward/peg_insertion/ours_purple2.mp4",
                      "playbackRate": 1
                    }
                  ]
                },
                {
                  "paragraphs": [
                    "Predict high-F/T interactions and adjust compliance to prevent jams. Leverage F/T feedback to precisely identify the hole."
                  ]
                }
              ],
              "metric": "67% success"
            },
            {
              "title": "Pretrain Only",
              "metric": "53% success",
              "blocks": [
                {
                  "videos": [
                    {
                      "src": "assets/web/rollouts/backward/peg_insertion/pretrain_miss.mp4",
                      "alt": "Fails to leverage contact for proper insertion.",
                      "title": "Pretrain Only",
                      "caption": "Fails to leverage contact for proper insertion.",
                      "loop": true,
                      "width": 640,
                      "height": 360,
                      "poster": "assets/web/posters/rollouts/backward/peg_insertion/pretrain_miss.jpg",
                      "originalSrc": "assets/rollouts/backward/peg_insertion/pretrain_miss.mp4",
                      "playbackRate": 1
                    },
                    {
                      "src": "assets/web/rollouts/backward/peg_insertion/pretrain_purple_fail.mp4",
                      "alt": "Model without contact signal fails to insert the purple peg.",
                      "title": "Pretrain Only",
                      "caption": "Model without contact signal fails to insert the purple peg.",
                      "loop": true,
                      "width": 640,
                      "height": 360,
                      "poster": "assets/web/posters/rollouts/backward/peg_insertion/pretrain_purple_fail.jpg",
                      "originalSrc": "assets/rollouts/backward/peg_insertion/pretrain_purple_fail.mp4",
                      "playbackRate": 1
                    }
                  ]
                },
                {
                  "paragraphs": [
                    "Jam into serrations or fail to use contact for insertion."
                  ]
                }
              ]
            },
            {
              "title": "No ER",
              "metric": "13% success",
              "blocks": [
                {
                  "videos": [
                    {
                      "src": "assets/web/rollouts/backward/peg_insertion/no_er_twist.mp4",
                      "alt": "Overfits to a finetuning-specific twisting strategy and misses the rectangular peg insertion.",
                      "title": "No ER",
                      "caption": "Overfits to a finetuning-specific twisting strategy and misses the rectangular peg insertion.",
                      "loop": true,
                      "width": 640,
                      "height": 360,
                      "poster": "assets/web/posters/rollouts/backward/peg_insertion/no_er_twist.jpg",
                      "originalSrc": "assets/rollouts/backward/peg_insertion/no_er_twist.mp4",
                      "playbackRate": 1
                    },
                    {
                      "src": "assets/web/rollouts/backward/peg_insertion/no_er_purple_fail.mp4",
                      "alt": "Loses robust pretraining behavior and drifts away from hole.",
                      "title": "No ER",
                      "caption": "Loses robust pretraining behavior and drifts away from hole.",
                      "loop": true,
                      "width": 640,
                      "height": 360,
                      "poster": "assets/web/posters/rollouts/backward/peg_insertion/no_er_purple_fail.jpg",
                      "originalSrc": "assets/rollouts/backward/peg_insertion/no_er_purple_fail.mp4",
                      "playbackRate": 1
                    }
                  ]
                },
                {
                  "paragraphs": [
                    "Overfit to finetuning strategies that fail on pretraining peg configurations."
                  ]
                }
              ]
            }
          ]
        },
        {
          "title": "Pick and Place",
          "paragraphs": [
            "The policy must pick and place object configurations that exist in pretraining data but not in finetuning data. This assesses whether the model preserves generalization capabilities from pretraining."
          ],
          "playbackRate": 3,
          "groups": [
            {
              "title": "MuSe",
              "blocks": [
                {
                  "videos": [
                    {
                      "src": "assets/web/rollouts/backward/pick_place_new/muse_pepper_pot_forward.mp4",
                      "alt": "Correctly place the pepper in the pot.",
                      "title": "MuSe",
                      "caption": "Correctly place the pepper in the pot.",
                      "loop": true,
                      "width": 960,
                      "height": 540,
                      "poster": "assets/web/posters/rollouts/backward/pick_place_new/muse_pepper_pot_forward.jpg",
                      "originalSrc": "assets/rollouts/backward/pick_place_new/muse_pepper_pot_forward.mp4",
                      "playbackRate": 1
                    },
                    {
                      "src": "assets/web/rollouts/backward/pick_place_new/muse_pepper_pot_lr.mp4",
                      "alt": "Correctly place the pepper in the pot.",
                      "title": "MuSe",
                      "caption": "Correctly place the pepper in the pot.",
                      "loop": true,
                      "width": 960,
                      "height": 540,
                      "poster": "assets/web/posters/rollouts/backward/pick_place_new/muse_pepper_pot_lr.jpg",
                      "originalSrc": "assets/rollouts/backward/pick_place_new/muse_pepper_pot_lr.mp4",
                      "playbackRate": 1
                    },
                    {
                      "src": "assets/web/rollouts/backward/pick_place_new/muse_pepper_plate_lr.mp4",
                      "alt": "Correctly place the pepper on the plate.",
                      "title": "MuSe",
                      "caption": "Correctly place the pepper on the plate.",
                      "loop": true,
                      "width": 960,
                      "height": 540,
                      "poster": "assets/web/posters/rollouts/backward/pick_place_new/muse_pepper_plate_lr.jpg",
                      "originalSrc": "assets/rollouts/backward/pick_place_new/muse_pepper_plate_lr.mp4",
                      "playbackRate": 1
                    },
                    {
                      "src": "assets/web/rollouts/backward/pick_place_new/muse_pepper_plate_lr2.mp4",
                      "alt": "Correctly place the pepper on the plate.",
                      "title": "MuSe",
                      "caption": "Correctly place the pepper on the plate.",
                      "loop": true,
                      "width": 960,
                      "height": 540,
                      "poster": "assets/web/posters/rollouts/backward/pick_place_new/muse_pepper_plate_lr2.jpg",
                      "originalSrc": "assets/rollouts/backward/pick_place_new/muse_pepper_plate_lr2.mp4",
                      "playbackRate": 1
                    }
                  ]
                },
                {
                  "paragraphs": [
                    "Adapt to various object configurations."
                  ]
                }
              ],
              "metric": "65% success"
            },
            {
              "title": "No ER",
              "blocks": [
                {
                  "videos": [
                    {
                      "src": "assets/web/rollouts/backward/pick_place_new/no_er_pepper_pot_fail.mp4",
                      "alt": "Model trained without ER lacks robustness on pretraining tasks.",
                      "title": "No ER",
                      "caption": "Model trained without ER lacks robustness on pretraining tasks.",
                      "loop": true,
                      "width": 960,
                      "height": 540,
                      "poster": "assets/web/posters/rollouts/backward/pick_place_new/no_er_pepper_pot_fail.jpg",
                      "originalSrc": "assets/rollouts/backward/pick_place_new/no_er_pepper_pot_fail.mp4",
                      "playbackRate": 1
                    },
                    {
                      "src": "assets/web/rollouts/backward/pick_place_new/no_er_pepper_pot_fail2.mp4",
                      "alt": "Model trained without ER lacks robustness on pretraining tasks.",
                      "title": "No ER",
                      "caption": "Model trained without ER lacks robustness on pretraining tasks.",
                      "loop": true,
                      "width": 960,
                      "height": 540,
                      "poster": "assets/web/posters/rollouts/backward/pick_place_new/no_er_pepper_pot_fail2.jpg",
                      "originalSrc": "assets/rollouts/backward/pick_place_new/no_er_pepper_pot_fail2.mp4",
                      "playbackRate": 1
                    },
                    {
                      "src": "assets/web/rollouts/backward/pick_place_new/no_er_pepper_plate_fail_forward.mp4",
                      "alt": "Model trained without ER lacks robustness on pretraining tasks.",
                      "title": "No ER",
                      "caption": "Model trained without ER lacks robustness on pretraining tasks.",
                      "loop": true,
                      "width": 960,
                      "height": 540,
                      "poster": "assets/web/posters/rollouts/backward/pick_place_new/no_er_pepper_plate_fail_forward.jpg",
                      "originalSrc": "assets/rollouts/backward/pick_place_new/no_er_pepper_plate_fail_forward.mp4",
                      "playbackRate": 1
                    },
                    {
                      "src": "assets/web/rollouts/backward/pick_place_new/no_er_pepper_plate_lr_fail.mp4",
                      "alt": "Forgets task structure from pretraining.",
                      "title": "No ER",
                      "caption": "Forgets task structure from pretraining.",
                      "loop": true,
                      "width": 960,
                      "height": 540,
                      "poster": "assets/web/posters/rollouts/backward/pick_place_new/no_er_pepper_plate_lr_fail.jpg",
                      "originalSrc": "assets/rollouts/backward/pick_place_new/no_er_pepper_plate_lr_fail.mp4",
                      "playbackRate": 1
                    }
                  ]
                },
                {
                  "paragraphs": [
                    "Forget task structure or lose robustness on pretraining tasks."
                  ]
                }
              ],
              "metric": "55% success"
            }
          ]
        }
      ]
    }
  },
  "questions": {
    "title": "Q&A",
    "navTitle": "Q&A",
    "details": [
      {
        "title": "Why F/T?",
        "paragraphs": [
          [
            "MuSe uses F/T in two complementary ways. As an input, force histories tell the policy when contact has started, whether the robot is pushing too hard, and when a peg has jammed. As an output, predicted future F/T gives the controller an expected contact profile that can be converted into ",
            {
              "text": "adaptive compliance",
              "url": "https://adaptive-compliance.github.io/"
            },
            " targets, so the robot can stay stiff in free space and become compliant when contact is anticipated."
          ],
          "We find that even despite imperfect F/T predictions, MuSe improves success rate on contact rich tasks — approximate magnitude and direction is all that is needed to improve forceful interactions."
        ],
        "videos": [
          {
            "src": "assets/web/wbw_targets.mp4",
            "alt": "Force/torque prediction and compliance targets",
            "title": "Force/torque prediction and compliance targets",
            "caption": "",
            "loop": true,
            "width": 1134,
            "height": 1080,
            "poster": "assets/web/posters/wbw_targets.jpg",
            "originalSrc": "assets/wbw_targets.mp4",
            "playbackRate": 1
          }
        ]
      },
      {
        "title": "Why care about backward transfer?",
        "paragraphs": [
          "New sensor modality should extend a robot's capabilities, enabling the robot to continually adapt to new skills without forgetting old ones. Backward transfer confirms that MuSe representations generalize beyond the finetuning distribution — the model learns to use force not just on the tasks it was trained with, but also on the diverse set of pretraining tasks where no force labels existed."
        ]
      },
      {
        "title": "Why not train at once?",
        "paragraphs": [
          "Sensors are constantly developing and existing large-scale pretraining datasets do not contain them. Re-collecting all pretraining data every time a new sensor becomes available is impractical at scale. MuSe is designed as a realistic framework to tackle this challenge: learn from large vision-action pretraining data, then incorporate new modalities through a small multisensory finetuning stage without starting over."
        ]
      }
    ]
  },
  "citation": {
    "title": "Citation",
    "navTitle": "Citation",
    "bibtex": "@inproceedings{clark2026multisensory,\n  title     = {Multisensory Continual Learning: Adapting Pretrained Visuomotor Policies to Force},\n  author    = {Jaden Clark and Changhao Wang and Yihuai Gao and Seongheon Hong and Hojung Choi and Mark Cutkosky and Yifan Hou and Shuran Song},\n  booktitle = {Conference on Robot Learning},\n  year      = {2026}\n}"
  },
  "acknowledgements": {
    "title": "Acknowledgements",
    "paragraphs": [
      "Jaden Clark is supported by the Knight-Hennessy Fellowship and the NSF Graduate Research Fellowships Program (GRFP). This work was supported in part by the NSF Award #2143601, #2037101, and #2132519, Toyota Research Institute, Amazon, Stanford System-X, Stanford HAI Center.",
      "We would like to thank Mandi Zhao and Maximilian Du for presentation feedback as well as all members of the REAL lab at Stanford for their detailed feedback on paper drafts and experiment directions. The views and conclusions contained herein are those of the authors and should not be interpreted as necessarily representing the official policies, either expressed or implied, of the sponsors."
    ]
  }
};
