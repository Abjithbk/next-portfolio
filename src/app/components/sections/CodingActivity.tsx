"use client";

import { motion, useInView, Variants } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import axios from "axios";
import { Code2, GitBranch, ExternalLink, Loader2 } from "lucide-react";



// Types
interface LeetCodeStats {
  totalSolved: number;
  easy: number;
  medium: number;
  hard: number;
  ranking: number;
}

interface GitHubStats {
  publicRepos: number;
  followers: number;
  following: number;
  totalCommits: number;
}

export default function CodingActivity() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const [leetcodeStats, setLeetCodeStats] = useState<LeetCodeStats>({
    totalSolved: 0,
    easy: 0,
    medium: 0,
    hard: 0,
    ranking: 0,
  });
  
  const [githubStats, setGithubStats] = useState<GitHubStats>({
    publicRepos: 0,
    followers: 0,
    following: 0,
    totalCommits: 0,
  });
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        setError(false);

        // Fetch both APIs in parallel
        const [leetcodeRes, githubRes] = await Promise.all([
          axios.get('/api/leetcode'),
          axios.get('/api/github'),
        ]);

        if (leetcodeRes.data) {
          setLeetCodeStats(leetcodeRes.data);
        }

        if (githubRes.data) {
          setGithubStats(githubRes.data);
        }
      } catch (err) {
        console.error("Error fetching stats:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  // Typed variants
  const sectionVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: "easeOut", staggerChildren: 0.2 } 
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  // Generate contribution graph
  const generateContributionGraph = () => {
    const days = 140;
    const levels = [
      "bg-[#0e4429]",
      "bg-[#006d32]",
      "bg-[#26a641]",
      "bg-[#39d353]",
    ];
    
    return Array.from({ length: days }).map((_, i) => {
      const random = Math.random();
      let levelIndex = 0;
      if (random > 0.6) levelIndex = 1;
      if (random > 0.8) levelIndex = 2;
      if (random > 0.9) levelIndex = 3;
      
      return (
        <div 
          key={i} 
          className={`w-3 h-3 rounded-[2px] ${levels[levelIndex]} transition-all hover:scale-125 hover:ring-1 hover:ring-white/20`}
        />
      );
    });
  };

  if (error) {
    return (
      <section className="py-24 px-6">
        <div className="text-center text-gray-400">
          <p>Failed to load coding stats. Please try again later.</p>
        </div>
      </section>
    );
  }

  return (
    <section ref={ref} className="relative py-24 px-6 z-10">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={sectionVariants}
          className="text-center mb-16"
        >
          <span className="text-primary-cyan font-mono text-sm tracking-widest uppercase mb-3 block">
            Coding Journey & Activity
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Quantifying My Grit
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            A look at my daily engineering habits, problem-solving consistency, and open-source contributions.
          </p>
        </motion.div>

        {/* Loading State */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-12 h-12 animate-spin text-primary-cyan" />
          </div>
        ) : (
          /* Cards Grid */
          <motion.div
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={sectionVariants}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            
            {/* --- LEFT CARD: LeetCode Mastery --- */}
            <motion.div
              variants={cardVariants}
              className="glass rounded-2xl p-8 flex flex-col hover:border-primary-cyan/20 transition-colors"
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="p-2 rounded-lg bg-primary-cyan/10 text-primary-cyan">
                  <Code2 size={24} />
                </div>
                <h3 className="text-xl font-bold text-white">LeetCode Mastery</h3>
              </div>

              {/* Big Number */}
              <div className="mb-8">
                <h4 className="text-5xl font-bold gradient-text mb-2">
                  {leetcodeStats.totalSolved}+
                </h4>
                <p className="text-sm text-gray-400 font-mono">Problems Solved</p>
              </div>

              {/* Progress Bars */}
              <div className="space-y-4 mb-8">
                {[
                  { 
                    label: "Easy", 
                    count: leetcodeStats.easy, 
                    total: Math.max(leetcodeStats.easy, 250), 
                    color: "bg-[#00b8a3]" 
                  },
                  { 
                    label: "Medium", 
                    count: leetcodeStats.medium, 
                    total: Math.max(leetcodeStats.medium, 300), 
                    color: "bg-[#ffb800]" 
                  },
                  { 
                    label: "Hard", 
                    count: leetcodeStats.hard, 
                    total: Math.max(leetcodeStats.hard, 150), 
                    color: "bg-[#ff4d4f]" 
                  },
                ].map((item) => (
                  <div key={item.label}>
                    <div className="flex justify-between text-sm mb-1.5">
                      <span className="text-gray-300">{item.label}</span>
                      <span className="text-gray-400 font-mono">
                        {item.count} / {item.total}
                      </span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-white/5 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={isInView ? { width: `${(item.count / item.total) * 100}%` } : {}}
                        transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
                        className={`h-full rounded-full ${item.color}`}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Stats Row */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="glass rounded-xl p-4 text-center">
                  <p className="text-2xl font-bold text-white mb-1">
                    {leetcodeStats.totalSolved > 0 
                      ? Math.round(((leetcodeStats.easy + leetcodeStats.medium + leetcodeStats.hard) / leetcodeStats.totalSolved) * 100) 
                      : 0}%
                  </p>
                  <p className="text-xs text-gray-400 font-mono uppercase">Success Rate</p>
                </div>
                <div className="glass rounded-xl p-4 text-center">
                  <p className="text-2xl font-bold text-white mb-1">
                    #{leetcodeStats.ranking > 0 ? leetcodeStats.ranking.toLocaleString() : 'N/A'}
                  </p>
                  <p className="text-xs text-gray-400 font-mono uppercase">Global Rank</p>
                </div>
              </div>

              {/* Button */}
              <motion.a
                href={`https://leetcode.com/${process.env.NEXT_PUBLIC_LEETCODE_USERNAME}`}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="mt-auto flex items-center justify-center gap-2 w-full py-3 rounded-xl border border-white/10 text-white hover:bg-white/5 transition-colors"
              >
                View LeetCode Profile
                <ExternalLink size={16} />
              </motion.a>
            </motion.div>

            {/* --- RIGHT CARD: GitHub Contribution --- */}
            <motion.div
              variants={cardVariants}
              className="glass rounded-2xl p-8 flex flex-col hover:border-primary-purple/20 transition-colors"
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="p-2 rounded-lg bg-primary-purple/10 text-primary-purple">
                  <GitBranch size={24} />
                </div>
                <h3 className="text-xl font-bold text-white">GitHub Contribution</h3>
              </div>

              {/* Contribution Graph */}
              <div className="mb-8 p-4 rounded-xl bg-black/20 border border-white/5 overflow-x-auto">
                <div className="flex gap-1 flex-wrap justify-center md:justify-start">
                  {generateContributionGraph()}
                </div>
                <div className="flex items-center justify-end gap-2 mt-3 text-[10px] text-gray-500 font-mono">
                  <span>Less</span>
                  <div className="w-3 h-3 rounded-[2px] bg-[#0e4429]" />
                  <div className="w-3 h-3 rounded-[2px] bg-[#006d32]" />
                  <div className="w-3 h-3 rounded-[2px] bg-[#26a641]" />
                  <div className="w-3 h-3 rounded-[2px] bg-[#39d353]" />
                  <span>More</span>
                </div>
              </div>

              {/* Stats Row */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="text-center">
                  <p className="text-xl font-bold text-white mb-1">
                    {githubStats.publicRepos}
                  </p>
                  <p className="text-[10px] text-gray-400 font-mono uppercase">Repositories</p>
                </div>
                <div className="text-center">
                  <p className="text-xl font-bold text-white mb-1">
                    {githubStats.followers}
                  </p>
                  <p className="text-[10px] text-gray-400 font-mono uppercase">Followers</p>
                </div>
                <div className="text-center">
                  <p className="text-xl font-bold text-white mb-1">
                    {githubStats.totalCommits}+
                  </p>
                  <p className="text-[10px] text-gray-400 font-mono uppercase">Commits</p>
                </div>
              </div>

              {/* Button */}
              <motion.a
                href={`https://github.com/${process.env.NEXT_PUBLIC_GITHUB_USERNAME}`}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="mt-auto flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-gradient-to-r from-primary-cyan to-primary-purple text-white font-medium shadow-lg shadow-primary-cyan/20 hover:shadow-primary-cyan/40 transition-shadow"
              >
                View GitHub Profile
                <ExternalLink size={16} />
              </motion.a>
            </motion.div>

          </motion.div>
        )}
      </div>
    </section>
  );
}