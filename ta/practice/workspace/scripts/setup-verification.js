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

// Check for Cursor IDE (recommended but not required)
console.log('ℹ️ Cursor IDE check: This course works best with Cursor IDE');
console.log('   💡 Tip: Install Cursor IDE from https://cursor.com/ if not already installed');
console.log('   💡 Tip: Cursor IDE provides integrated AI assistance for test automation');
// Not checking version as Cursor might not be in PATH even when installed
warnings++;

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
checkSuccess(fs.existsSync('env.example'), 'Environment template found');

// Check required directories
const requiredDirs = ['src', 'tests/e2e', 'scripts', 'practice-artifacts'];
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
  console.log('   1. Verify Cursor IDE is installed and running (https://cursor.com/)');
  console.log('   2. Test Cursor\'s AI assistance: Type "// function to add two numbers" and see suggestions');
  console.log('   3. Check that you can access Cursor\'s chat with Cmd/Ctrl + L');
  console.log('   4. Try Cursor\'s inline editing with Cmd/Ctrl + K');
  console.log('\n🚀 Next step: Start with the first module - ../01_START_HERE.md');
} else {
  console.log('🔧 Please fix the errors above before proceeding.');
  console.log('\n💡 TROUBLESHOOTING TIPS:');
  console.log('   • Node.js issues: Reinstall from https://nodejs.org/');
  console.log('   • Cursor IDE: Download and install from https://cursor.com/');
  console.log('   • Playwright issues: Run "npx playwright install"');
  console.log('   • npm issues: Run "npm cache clean --force && npm install"');
  console.log('\n📚 For detailed help: See ../01_START_HERE.md');
}

process.exit(errors > 0 ? 1 : 0); 