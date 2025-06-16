
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { CreditCard, Settings, AlertTriangle } from 'lucide-react';
import { paymentConfig, bookingDepositConfig } from '@/utils/paymentConfig';

const PaymentEditor = () => {
  const [config, setConfig] = useState(paymentConfig);
  const [depositConfig, setDepositConfig] = useState(bookingDepositConfig);
  const [isChanged, setIsChanged] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    setIsChanged(
      JSON.stringify(config) !== JSON.stringify(paymentConfig) ||
      JSON.stringify(depositConfig) !== JSON.stringify(bookingDepositConfig)
    );
  }, [config, depositConfig]);

  const handleSave = () => {
    // In a real implementation, this would save to your backend/config system
    console.log('Saving payment configuration:', { config, depositConfig });
    
    toast({
      title: "Payment settings saved",
      description: "Configuration has been updated successfully.",
    });
    
    setIsChanged(false);
  };

  const handleReset = () => {
    setConfig(paymentConfig);
    setDepositConfig(bookingDepositConfig);
    setIsChanged(false);
  };

  const togglePaymentMethod = (methodId: string) => {
    setConfig(prev => ({
      ...prev,
      supportedMethods: prev.supportedMethods.map(method =>
        method.id === methodId ? { ...method, enabled: !method.enabled } : method
      )
    }));
  };

  const isConfigured = config.apiBaseUrl !== 'https://your-payment-api.com/api' && 
                      config.publicKey !== 'pk_test_your_public_key';

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <CreditCard className="h-5 w-5" />
          <h2 className="text-xl font-semibold">Payment Configuration</h2>
        </div>
        {isChanged && (
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleReset}>Reset</Button>
            <Button onClick={handleSave} className="bg-bright-orange hover:bg-orange-600">
              Save Changes
            </Button>
          </div>
        )}
      </div>

      {!isConfigured && (
        <Card className="border-yellow-200 bg-yellow-50">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
              <div>
                <h3 className="font-semibold text-yellow-800">Payment System Not Configured</h3>
                <p className="text-sm text-yellow-700 mt-1">
                  Update the API URL and public key below to enable online payments. 
                  Until configured, the system will use demo mode.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* API Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            API Configuration
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="apiUrl">API Base URL</Label>
              <Input
                id="apiUrl"
                value={config.apiBaseUrl}
                onChange={(e) => setConfig(prev => ({ ...prev, apiBaseUrl: e.target.value }))}
                placeholder="https://your-payment-api.com/api"
              />
            </div>
            <div>
              <Label htmlFor="publicKey">Public Key</Label>
              <Input
                id="publicKey"
                value={config.publicKey}
                onChange={(e) => setConfig(prev => ({ ...prev, publicKey: e.target.value }))}
                placeholder="pk_test_your_public_key"
              />
            </div>
            <div>
              <Label htmlFor="currency">Currency</Label>
              <Input
                id="currency"
                value={config.currency}
                onChange={(e) => setConfig(prev => ({ ...prev, currency: e.target.value }))}
                placeholder="GBP"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="testMode"
                checked={config.testMode}
                onCheckedChange={(checked) => setConfig(prev => ({ ...prev, testMode: checked }))}
              />
              <Label htmlFor="testMode">Test Mode</Label>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment Methods */}
      <Card>
        <CardHeader>
          <CardTitle>Supported Payment Methods</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {config.supportedMethods.map(method => (
              <div key={method.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <span className="text-xl">{method.icon}</span>
                  <div>
                    <span className="font-medium">{method.name}</span>
                    <Badge variant="secondary" className="ml-2">
                      {method.type.replace('_', ' ')}
                    </Badge>
                  </div>
                </div>
                <Switch
                  checked={method.enabled}
                  onCheckedChange={() => togglePaymentMethod(method.id)}
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Booking Deposit Configuration */}
      <Card>
        <CardHeader>
          <CardTitle>Booking Deposit Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-2">
            <Switch
              id="depositEnabled"
              checked={depositConfig.enabled}
              onCheckedChange={(checked) => setDepositConfig(prev => ({ ...prev, enabled: checked }))}
            />
            <Label htmlFor="depositEnabled">Require deposit for table bookings</Label>
          </div>
          
          {depositConfig.enabled && (
            <>
              <Separator />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="depositAmount">Deposit Amount (£)</Label>
                  <Input
                    id="depositAmount"
                    type="number"
                    step="0.01"
                    value={depositConfig.amount}
                    onChange={(e) => setDepositConfig(prev => ({ 
                      ...prev, 
                      amount: parseFloat(e.target.value) || 0 
                    }))}
                  />
                </div>
                <div>
                  <Label htmlFor="depositDescription">Description</Label>
                  <Input
                    id="depositDescription"
                    value={depositConfig.description}
                    onChange={(e) => setDepositConfig(prev => ({ 
                      ...prev, 
                      description: e.target.value 
                    }))}
                  />
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="depositRefundable"
                  checked={depositConfig.refundable}
                  onCheckedChange={(checked) => setDepositConfig(prev => ({ 
                    ...prev, 
                    refundable: checked 
                  }))}
                />
                <Label htmlFor="depositRefundable">Deposit is refundable</Label>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentEditor;
