#!/usr/bin/env node

/**
 * Setup Verification Script for AI-Assisted Test Automation Practicum
 * Validates environment, dependencies, and basic configuration
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🔍 AI Test Automation Practicum - Setup Verification');
console.log('============================================================');

let successes = 0;
let warnings = 0;
let errors = 0;

function checkSuccess(condition, message) {
  if (condition) {
    console.log(`✅ ${message}`);
    successes++;
    return true;
  } else {
    console.log(`❌ ${message}`);
    errors++;
    return false;
  }
}

function checkWarning(condition, message, warningMessage) {
  if (condition) {
    console.log(`✅ ${message}`);
    successes++;
    return true;
  } else {
    console.log(`⚠️  ${warningMessage}`);
    warnings++;
    return false;
  }
}

function checkCommand(command, successMessage, errorMessage) {
  try {
    const result = execSync(command, { encoding: 'utf8', stdio: 'pipe' });
    console.log(`✅ ${successMessage}: ${result.trim()}`);
    successes++;
    return true;
  } catch (error) {
    console.log(`❌ ${errorMessage}`);
    errors++;
    return false;
  }
}

// Check Node.js version
try {
  const nodeVersion = execSync('node --version', { encoding: 'utf8', stdio: 'pipe' }).trim();
  const majorVersion = parseInt(nodeVersion.substring(1).split('.')[0]);
  if (majorVersion >= 22) {
    console.log(`✅ Node.js version: ${nodeVersion} (✓ 22+ required)`);
    successes++;
  } else {
    console.log(`❌ Node.js version: ${nodeVersion} (✗ Need 22+, install from nodejs.org)`);
    errors++;
  }
} catch (error) {
  console.log('❌ Node.js not found - install from https://nodejs.org/');
  errors++;
}

// Check npm version
checkCommand('npm --version', 'npm version', 'npm not found');

// Check VS Code installation
try {
  const codeVersion = execSync('code --version', { encoding: 'utf8', stdio: 'pipe' });
  console.log(`✅ VS Code installed: ${codeVersion.split('\n')[0]}`);
  successes++;
} catch (error) {
  console.log('❌ VS Code not found in PATH - install from https://code.visualstudio.com/');
  console.log('   💡 Tip: After installing, add VS Code to PATH or use full path');
  errors++;
}

// Check for package.json
checkSuccess(fs.existsSync('package.json'), 'package.json found');

// Check for key dependencies
if (fs.existsSync('package.json')) {
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  const allDeps = { ...packageJson.dependencies, ...packageJson.devDependencies };

  checkSuccess(allDeps['@playwright/test'], 'Required dependency installed: @playwright/test');
  checkSuccess(allDeps['typescript'], 'Required dependency installed: typescript');
  checkSuccess(allDeps['dotenv'], 'Required dependency installed: dotenv');
}

// Check TypeScript configuration
checkSuccess(fs.existsSync('tsconfig.json'), 'TypeScript configuration found');

// Check Playwright configuration
const playwrightConfig = fs.existsSync('playwright.config.ts') || fs.existsSync('playwright.config.js');
checkSuccess(playwrightConfig, 'Playwright configuration found: playwright.config.ts');

// Check environment template
checkSuccess(fs.existsSync('.env.example'), 'Environment template found');

// Check required directories
const requiredDirs = ['src/pages', 'tests/e2e', 'modules', 'resources', 'scripts'];
requiredDirs.forEach(dir => {
  checkSuccess(fs.existsSync(dir), `Directory exists: ${dir}`);
});

// Test basic Playwright functionality
try {
  console.log('🧪 Testing Playwright installation...');
  execSync('npx playwright --version', { stdio: 'pipe' });
  console.log('✅ Playwright installation verified');
  successes++;

  // Try to run a basic test if available
  if (fs.existsSync('tests') && fs.readdirSync('tests').length > 0) {
    console.log('✅ Test files found - ready for testing');
    successes++;
  } else {
    console.log('⚠️  No test files found yet - you\'ll create them in the modules');
    warnings++;
  }
} catch (error) {
  console.log('❌ Playwright not properly installed - run: npx playwright install');
  errors++;
}

console.log('\n============================================================');
console.log('🎯 AI-ASSISTED TEST AUTOMATION SETUP VERIFICATION');
console.log('============================================================\n');

console.log(`✅ Successes: ${successes}`);
if (warnings > 0) console.log(`⚠️  Warnings: ${warnings}`);
if (errors > 0) console.log(`❌ Errors: ${errors}`);

console.log('\n============================================================');

if (errors === 0) {
  console.log('🎉 Setup verification complete! Ready for AI-assisted testing!');
  console.log('\n📋 MANUAL CHECKS NEEDED:');
  console.log('   1. Open VS Code and verify Copilot icon in status bar');
  console.log('   2. Test Copilot: Type "// function to add two numbers" and see suggestions');
  console.log('   3. Verify GitHub Copilot subscription at: https://github.com/settings/copilot');
  console.log('\n🚀 Next step: Start Module 1 - modules/01-setup/README.md');
} else {
  console.log('🔧 Please fix the errors above before proceeding.');
  console.log('\n💡 TROUBLESHOOTING TIPS:');
  console.log('   • Node.js issues: Reinstall from https://nodejs.org/');
  console.log('   • VS Code issues: Install from https://code.visualstudio.com/');
  console.log('   • Playwright issues: Run "npx playwright install"');
  console.log('   • npm issues: Run "npm cache clean --force && npm install"');
  console.log('\n📚 For detailed help: ./setup-instructions.md');
}

process.exit(errors > 0 ? 1 : 0); 