import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../app.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComponent implements OnInit {
  profileData = {
    fname: '',
    lname: '',
    email: '',
    companySize: '',
    yearEstablished: '',
    phone: '',
    position: '',
    companyName: '',
    location: '',
    contact: '',
    revenue: '',
    marketSegments: [],
    partnerships: [],
    certifications: [],
    technologyFocus: '',
    keyMarkets: [],
    customerSegments: [],
    competitivePosition: '',
    salesChannels: [],
    productCategories: [],
    productSpecifications: '',
    serviceOfferings: '',
    deliveryAndFulfillment: '',
    customerSupport: '',
    pricingAndPackages: '',
    mission: '',
    vision: '',
    strengths: [],
    weaknesses: [],
    opportunities: [],
    threats: [],
    kpis: [],
    growthStrategy: '',
  };

  selectedSection: string = 'personal-info'; // Default section

  constructor(private router: Router, private service: AppService) {}

  ngOnInit(): void {
    this.loadProfileData();
  }

  loadProfileData() {
    const email = localStorage.getItem('userEmail');
    const fname = localStorage.getItem('userFirstName');
    const lname = localStorage.getItem('userLastName');

    if (email) {
      this.service.loginUserDetails({ email }).subscribe((data: any) => {
        if (data.status === true) {
          const userData = data.data;
          this.profileData = {
            ...this.profileData,
            fname: userData.firstName,
            lname: userData.lastName,
            email: userData.email,
            companySize: userData.companyInfo.size || '',
            yearEstablished: userData.companyInfo.established || '',
            phone: userData.phone || '',
            position: userData.position || '',
            companyName: userData.companyInfo.name || '',
            location: userData.companyInfo.location || '',
            contact: userData.companyInfo.contact || '',
            revenue: userData.companyInfo.revenue || '',
            marketSegments: userData.companyInfo.marketSegments || [],
            partnerships: userData.companyInfo.partnerships || [],
            certifications: userData.companyInfo.certifications || [],
            technologyFocus: userData.companyInfo.technologyFocus || '',
            keyMarkets: userData.marketCustomerData.keyMarkets || [],
            customerSegments:
              userData.marketCustomerData.customerSegments || [],
            competitivePosition:
              userData.marketCustomerData.competitivePosition || '',
            salesChannels: userData.marketCustomerData.salesChannels || [],
            productCategories:
              userData.productServicesInfo.productCategories || [],
            productSpecifications:
              userData.productServicesInfo.productSpecifications || '',
            serviceOfferings:
              userData.productServicesInfo.serviceOfferings || '',
            deliveryAndFulfillment:
              userData.productServicesInfo.deliveryAndFulfillment || '',
            customerSupport: userData.productServicesInfo.customerSupport || '',
            pricingAndPackages:
              userData.productServicesInfo.pricingAndPackages || '',
            mission: userData.strategicInformation.missionVision.mission || '',
            vision: userData.strategicInformation.missionVision.vision || '',
            strengths:
              userData.strategicInformation.swotAnalysis.strengths || [],
            weaknesses:
              userData.strategicInformation.swotAnalysis.weaknesses || [],
            opportunities:
              userData.strategicInformation.swotAnalysis.opportunities || [],
            threats: userData.strategicInformation.swotAnalysis.threats || [],
            kpis: userData.strategicInformation.kpis || [],
            growthStrategy: userData.strategicInformation.growthStrategy || '',
          };
        } else {
          alert(data.message);
        }
      });
    }
  }

  selectSection(section: string) {
    this.selectedSection = section;
  }

  saveProfileData() {
    // Implement the logic to save the profile data
    // For now, we are just logging the profile data to the console
    console.log('Profile data to be saved:', this.profileData);
    this.router.navigate(['view-profile']);
  } // Add this for each method
  savePersonalInfo() {
    // Your logic to handle personal info saving
    console.log('Personal Info saved!');
  }

  saveGeneralInfo() {
    // Your logic to handle general info saving
    console.log('General Info saved!');
  }

  saveAvailability() {
    // Your logic to handle availability saving
    console.log('Availability saved!');
  }

  saveProfileKeywords() {
    // Your logic to handle profile keywords saving
    console.log('Profile Keywords saved!');
  }

  saveCompanyInfo() {
    // Your logic to handle company info saving
    console.log('Company Info saved!');
  }

  saveProductInfo() {
    // Your logic to handle product info saving
    console.log('Product Info saved!');
  }

  saveMarketData() {
    // Your logic to handle market data saving
    console.log('Market Data saved!');
  }

  saveStrategicInfo() {
    // Your logic to handle strategic info saving
    console.log('Strategic Info saved!');
  }

  close() {
    this.router.navigate(['view-profile']);
  }
}
